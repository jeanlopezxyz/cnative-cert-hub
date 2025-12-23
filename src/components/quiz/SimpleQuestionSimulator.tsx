import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useTranslations } from '../../i18n/utils';
import type { Language } from '../../types';
import { useOptimizedStorage } from '../../utils/storage';
import { logger } from '../../utils/logger';

interface Question {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SimpleQuizState {
  isActive: boolean;
  mode: 'exam' | 'study' | null;
  currentQuestion: number;
  answers: (number | null)[];
  startTime: number | null;
  showResults: boolean;
}

interface SimpleQuestionSimulatorProps {
  questions: Question[];
  examDuration: number;
  certificationId: string;
  lang: Language;
}

export default function SimpleQuestionSimulator({
  questions,
  examDuration,
  certificationId,
  lang,
}: SimpleQuestionSimulatorProps) {
  const t = useTranslations(lang);
  const storage = useOptimizedStorage();

  const [state, setState] = useState<SimpleQuizState>({
    isActive: false,
    mode: null,
    currentQuestion: 0,
    answers: new Array(questions.length).fill(null),
    startTime: null,
    showResults: false,
  });

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Helper to check if native file sharing is supported
  const canShareFiles = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    if (!navigator.share || !navigator.canShare) return false;
    // Test with a dummy file
    try {
      const testFile = new File(['test'], 'test.png', { type: 'image/png' });
      return navigator.canShare({ files: [testFile] });
    } catch {
      return false;
    }
  };

  // Load saved state
  useEffect(() => {
    const saved = storage.getItem(`simple-quiz-${certificationId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (_error) {
        logger.warn('Failed to load quiz state:', error);
      }
    }
  }, [certificationId, storage]);

  // Save state whenever it changes
  useEffect(() => {
    if (state.isActive || state.showResults) {
      storage.setBatched(`simple-quiz-${certificationId}`, JSON.stringify(state));
    }
  }, [state, certificationId, storage]);

  const startQuiz = (mode: 'exam' | 'study') => {
    setState({
      isActive: true,
      mode,
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      startTime: Date.now(),
      showResults: false,
    });
  };

  const selectAnswer = (answerIndex: number) => {
    setState(prev => ({
      ...prev,
      answers: prev.answers.map((ans, idx) =>
        idx === prev.currentQuestion ? answerIndex : ans
      )
    }));
  };

  const nextQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.min(prev.currentQuestion + 1, questions.length - 1)
    }));
  };

  const prevQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0)
    }));
  };

  const finishQuiz = () => {
    setState(prev => ({
      ...prev,
      isActive: false,
      showResults: true
    }));
  };

  const resetQuiz = () => {
    storage.removeItem(`simple-quiz-${certificationId}`);
    setState({
      isActive: false,
      mode: null,
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      startTime: null,
      showResults: false,
    });
  };

  // Calculate results
  const calculateScore = () => {
    const correct = state.answers.filter((ans, idx) =>
      ans === questions[idx]?.correctAnswer
    ).length;
    return Math.round((correct / questions.length) * 100);
  };

  // Share functionality
  const getShareText = () => {
    const score = calculateScore();
    const correct = state.answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
    const passed = score >= 75;
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    return `${status} - I scored ${score}% (${correct}/${questions.length}) on the ${certificationId.toUpperCase()} Practice Quiz!\n\n🎯 Test your knowledge: https://cncf-certification-hub.pages.dev/${lang}/certifications/${certificationId}\n\n#CloudNative #CNCF #${certificationId.toUpperCase()} #Kubernetes`;
  };

  const generateResultImage = async (): Promise<Blob | null> => {
    if (!resultsRef.current) return null;

    try {
      setIsGeneratingImage(true);
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          setIsGeneratingImage(false);
          resolve(blob);
        }, 'image/png', 1.0);
      });
    } catch (_error) {
      logger.warn('Failed to generate image:', error);
      setIsGeneratingImage(false);
      return null;
    }
  };

  const handleNativeShare = async () => {
    const imageBlob = await generateResultImage();
    const shareText = getShareText();

    if (navigator.share && imageBlob) {
      try {
        const file = new File([imageBlob], `${certificationId}-quiz-result.png`, { type: 'image/png' });

        // Check if we can share files
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${certificationId.toUpperCase()} Quiz Results`,
            text: shareText,
            files: [file],
          });
          return;
        }
      } catch (_error) {
        // User cancelled or error occurred, fall through to menu
      }
    }
    setShowShareMenu(true);
  };

  const downloadImage = async (): Promise<boolean> => {
    const imageBlob = await generateResultImage();
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${certificationId}-quiz-result.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    }
    return false;
  };

  const showToast = (message: string) => {
    setShareToast(message);
    setTimeout(() => setShareToast(null), 4000);
  };

  const shareWithImage = async (platform: 'whatsapp' | 'linkedin' | 'twitter') => {
    const imageBlob = await generateResultImage();
    if (!imageBlob) return;

    const file = new File([imageBlob], `${certificationId}-quiz-result.png`, { type: 'image/png' });
    const shareText = getShareText();

    // Try native share with file first (works on mobile)
    if (canShareFiles()) {
      try {
        await navigator.share({
          text: shareText,
          files: [file],
        });
        return; // Success - exit early
      } catch (_error) {
        // User cancelled or error - fall through to web share
      }
    }

    // Fallback: Download image and open platform URL
    await downloadImage();
    showToast(t('quiz.imageDownloaded'));

    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(`https://cncf-certification-hub.pages.dev/${lang}/certifications/${certificationId}`);

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
        break;
    }
  };

  const shareToWhatsApp = () => shareWithImage('whatsapp');
  const shareToLinkedIn = () => shareWithImage('linkedin');
  const shareToTwitter = () => shareWithImage('twitter');

  const copyImageToClipboard = async () => {
    try {
      const imageBlob = await generateResultImage();
      if (imageBlob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': imageBlob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (_error) {
      // Fallback: copy text if image copy fails
      try {
        await navigator.clipboard.writeText(getShareText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        logger.warn('Failed to copy:', e);
      }
    }
  };

  // No questions available state
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h5 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            {t('quiz.title')}
          </h5>
          <p className="text-neutral-600 dark:text-neutral-400 text-base">
            {t('quiz.comingSoon')}
          </p>
        </div>
      </div>
    );
  }

  // Start screen - Clean didactic design with solid colors
  if (!state.isActive && !state.showResults) {
    return (
      <div className="rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden">
        {/* Header with solid color */}
        <div className="bg-blue-600 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-lg text-white">{t('quiz.title')}</h5>
              <p className="text-blue-100 text-sm sm:text-base">{t('quiz.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Stats - Clean cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center border border-blue-100 dark:border-blue-800">
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">{questions.length}</div>
              <div className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-300">{t('quiz.questions')}</div>
            </div>
            <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center border border-amber-100 dark:border-amber-800">
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 bg-amber-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400">{examDuration}m</div>
              <div className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-300">{t('quiz.duration')}</div>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center border border-green-100 dark:border-green-800">
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400">75%</div>
              <div className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-300">{t('quiz.passing')}</div>
            </div>
          </div>

          {/* Mode Selection - Clean buttons */}
          <div className="space-y-3">
            <button
              onClick={() => startQuiz('study')}
              className="w-full p-4 rounded-xl border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-bold text-green-800 dark:text-green-300">{t('quiz.studyMode')}</div>
                  <div className="text-sm text-green-700 dark:text-green-400 truncate">{t('quiz.studyModeDesc')}</div>
                </div>
                <div className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm font-bold rounded-full flex-shrink-0">
                  {t('quiz.recommended')}
                </div>
              </div>
            </button>

            <button
              onClick={() => startQuiz('exam')}
              className="w-full p-4 rounded-xl border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-bold text-blue-800 dark:text-blue-300">{t('quiz.examMode')}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-400 truncate">{t('quiz.examModeDesc')}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen - Clean design with solid colors
  if (state.showResults) {
    const score = calculateScore();
    const correct = state.answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
    const passed = score >= 75;

    return (
      <div className="space-y-4">
        {/* Shareable Result Card */}
        <div ref={resultsRef} className="space-y-4 p-4 bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700">
          {/* Result Header */}
          <div className={`rounded-xl overflow-hidden ${passed ? 'bg-green-600' : 'bg-red-600'}`}>
            <div className="p-5 sm:p-6 text-white text-center">
              {/* Certification Badge */}
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-3">
                {certificationId.toUpperCase()} Practice Quiz
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                {passed ? (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2">{t('quiz.quizComplete')}</h4>
              <div className="text-4xl sm:text-5xl font-black mb-2">{score}%</div>
              <p className="text-white/90 font-medium text-sm sm:text-base">
                {passed ? t('quiz.passed') : t('quiz.failed')} ({t('quiz.threshold')}: 75%)
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 text-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 bg-green-600 text-white rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400">{correct}</h3>
              <p className="text-green-600 dark:text-green-300 text-xs sm:text-sm">{t('quiz.correctCount')}</p>
            </div>
            <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 sm:p-4 text-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 bg-red-600 text-white rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400">{questions.length - correct}</h3>
              <p className="text-red-600 dark:text-red-300 text-xs sm:text-sm">{t('quiz.incorrectCount')}</p>
            </div>
            <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 text-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">
                {state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0}m
              </h3>
              <p className="text-blue-600 dark:text-blue-300 text-xs sm:text-sm">{t('quiz.timeUsed')}</p>
            </div>
          </div>

          {/* Branding for shared image */}
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 pt-2">
            cncerthub.xyz
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('quiz.takeAnother')}
            </button>
            <div className="relative flex-1">
              <button
                onClick={handleNativeShare}
                disabled={isGeneratingImage}
                className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-wait text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                {isGeneratingImage ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
                {isGeneratingImage ? t('quiz.generating') : t('quiz.shareResult')}
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowShareMenu(false)}
                  />
                  {/* Menu */}
                  <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-xl overflow-hidden">
                    <div className="p-2 space-y-1">
                      {/* WhatsApp */}
                      <button
                        onClick={() => { shareToWhatsApp(); setShowShareMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">WhatsApp</span>
                      </button>

                      {/* LinkedIn */}
                      <button
                        onClick={() => { shareToLinkedIn(); setShowShareMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">LinkedIn</span>
                      </button>

                      {/* Twitter/X */}
                      <button
                        onClick={() => { shareToTwitter(); setShowShareMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">X (Twitter)</span>
                      </button>

                      {/* Divider */}
                      <div className="border-t border-neutral-200 dark:border-neutral-700 my-1" />

                      {/* Download Image */}
                      <button
                        onClick={() => { downloadImage(); setShowShareMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </div>
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">{t('quiz.downloadImage')}</span>
                      </button>

                      {/* Copy Image */}
                      <button
                        onClick={() => { copyImageToClipboard(); setShowShareMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                          {copied ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">
                          {copied ? t('quiz.copied') : t('quiz.copyResult')}
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Toast notification */}
        {shareToast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-pulse">
            <div className="flex items-center gap-3 px-5 py-3 bg-amber-500 text-white rounded-xl shadow-lg">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-base">{shareToast}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Quiz screen - Enhanced with study mode visual feedback
  const currentQ = questions[state.currentQuestion];
  const userAnswer = state.answers[state.currentQuestion];
  const isLastQuestion = state.currentQuestion === questions.length - 1;
  const canGoNext = state.mode === 'study' || userAnswer !== null;
  const isStudyMode = state.mode === 'study';
  const hasAnswered = userAnswer !== null;
  const isCorrect = hasAnswered && userAnswer === currentQ?.correctAnswer;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden shadow-sm">
        {/* Mode indicator bar */}
        <div className={`h-1.5 ${isStudyMode ? 'bg-green-600' : 'bg-blue-600'}`} />

        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                isStudyMode ? 'bg-green-600' : 'bg-blue-600'
              }`}>
                {state.currentQuestion + 1}
              </div>
              <div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t('quiz.question')} {state.currentQuestion + 1} {t('quiz.of')} {questions.length}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-base font-medium px-2 py-0.5 rounded-full ${
                    isStudyMode
                      ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                      : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                  }`}>
                    {isStudyMode ? t('quiz.studyMode') : t('quiz.examMode')}
                  </span>
                  <span className="text-base text-neutral-600 dark:text-neutral-300">{currentQ?.domain}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={finishQuiz}
                className="px-3 py-2 bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-base font-semibold rounded-lg transition-colors"
              >
                {t('quiz.finish')}
              </button>
              <button
                onClick={resetQuiz}
                className="px-3 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-base font-semibold rounded-lg transition-colors"
              >
                {t('quiz.reset')}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-base text-neutral-600 dark:text-neutral-300 mb-2">
              <span>{t('quiz.progress')}: {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%</span>
              <span>{state.answers.filter(a => a !== null).length} {t('quiz.answered')}</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  isStudyMode ? 'bg-green-600' : 'bg-blue-600'
                }`}
                style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden shadow-sm">
        <div className="p-5">
          <h5 className="text-base font-semibold text-neutral-900 dark:text-white mb-5 leading-relaxed">
            {currentQ?.question}
          </h5>

          <div className="space-y-3">
            {currentQ?.options.map((option, index) => {
              const isSelected = userAnswer === index;
              const isCorrectOption = index === currentQ.correctAnswer;
              const showFeedback = isStudyMode && hasAnswered;

              let optionClasses = '';
              let iconContent = null;

              if (showFeedback) {
                if (isCorrectOption) {
                  // Always show correct answer in green
                  optionClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 ring-2 ring-emerald-500/20';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  );
                } else if (isSelected && !isCorrectOption) {
                  // Show selected wrong answer in red
                  optionClasses = 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 ring-2 ring-rose-500/20';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  );
                } else {
                  // Non-selected, non-correct options
                  optionClasses = 'border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700/50 opacity-60';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-neutral-600 dark:text-neutral-300">{String.fromCharCode(65 + index)}</span>
                    </div>
                  );
                }
              } else {
                // Before answering or in exam mode
                if (isSelected) {
                  optionClasses = 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500/20';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{String.fromCharCode(65 + index)}</span>
                    </div>
                  );
                } else {
                  optionClasses = 'border-neutral-200 dark:border-neutral-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-neutral-800';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full border-2 border-neutral-300 dark:border-neutral-500 flex items-center justify-center group-hover:border-primary-400 transition-colors">
                      <span className="text-sm font-bold text-neutral-600 dark:text-neutral-300 group-hover:text-primary-500 transition-colors">{String.fromCharCode(65 + index)}</span>
                    </div>
                  );
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && selectAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group ${optionClasses} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-3">
                    {iconContent}
                    <span className={`text-base leading-relaxed ${
                      showFeedback
                        ? isCorrectOption
                          ? 'text-emerald-800 dark:text-emerald-200 font-medium'
                          : isSelected
                            ? 'text-rose-800 dark:text-rose-200'
                            : 'text-neutral-600 dark:text-neutral-300'
                        : 'text-neutral-700 dark:text-neutral-200'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Study Mode Explanation */}
          {isStudyMode && hasAnswered && currentQ && (
            <div className={`mt-5 p-4 rounded-xl border-2 ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700'
                : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700'
            }`}>
              <div className={`flex items-center gap-2 mb-3 ${
                isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
              }`}>
                {isCorrect ? (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-bold text-base">{t('quiz.correct')}!</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="font-bold text-base">{t('quiz.incorrect')}</span>
                  </>
                )}
              </div>

              <div className="bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 mb-3">
                <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
                  <span className="font-semibold text-neutral-900 dark:text-white">{t('quiz.explanation')}:</span> {currentQ.explanation}
                </p>
              </div>

              {!isCorrect && (
                <div className="flex items-center gap-2 p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-base text-emerald-700 dark:text-emerald-300">
                    <span className="font-semibold">{t('quiz.correctAnswer')}:</span> {String.fromCharCode(65 + currentQ.correctAnswer)}) {currentQ.options[currentQ.correctAnswer]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            {isStudyMode ? (
              <button
                onClick={prevQuestion}
                disabled={state.currentQuestion === 0}
                className="px-4 py-3 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-200 font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">{t('quiz.previous')}</span>
              </button>
            ) : (
              <div />
            )}

            <span className="text-base font-medium text-neutral-600 dark:text-neutral-300">
              {state.currentQuestion + 1} / {questions.length}
            </span>

            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                className={`px-5 py-3 font-semibold rounded-xl transition-all inline-flex items-center gap-2 ${
                  isStudyMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>{t('quiz.finishQuiz')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={state.mode === 'exam' && !canGoNext}
                className={`px-5 py-3 font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 ${
                  isStudyMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span className="hidden sm:inline">{t('quiz.next')}</span>
                <span className="sm:hidden">{t('quiz.next')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
