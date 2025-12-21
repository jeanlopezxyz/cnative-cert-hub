import React, { useState, useEffect } from 'react';
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

  // Load saved state
  useEffect(() => {
    const saved = storage.getItem(`simple-quiz-${certificationId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
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

  // No questions available state
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h5 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            {t('quiz.title')}
          </h5>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {t('quiz.comingSoon')}
          </p>
        </div>
      </div>
    );
  }

  // Start screen - Modern design
  if (!state.isActive && !state.showResults) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden shadow-sm">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-lg">{t('quiz.title')}</h5>
              <p className="text-white/80 text-sm">{t('quiz.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">{questions.length}</div>
              <div className="text-xs font-medium text-cyan-600 dark:text-cyan-300">{t('quiz.questions')}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-amber-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{examDuration}m</div>
              <div className="text-xs font-medium text-amber-600 dark:text-amber-300">{t('quiz.duration')}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">75%</div>
              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-300">{t('quiz.passing')}</div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-3">
            <button
              onClick={() => startQuiz('study')}
              className="w-full p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">{t('quiz.studyMode')}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-300">{t('quiz.studyModeDesc')}</div>
                </div>
                <div className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                  {t('quiz.recommended')}
                </div>
              </div>
            </button>

            <button
              onClick={() => startQuiz('exam')}
              className="w-full p-4 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:border-purple-400 dark:hover:border-purple-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-purple-700 dark:text-purple-400">{t('quiz.examMode')}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-300">{t('quiz.examModeDesc')}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen - Enhanced design
  if (state.showResults) {
    const score = calculateScore();
    const correct = state.answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
    const passed = score >= 75;

    return (
      <div className="space-y-4">
        {/* Result Header */}
        <div className={`rounded-2xl overflow-hidden ${
          passed
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
            : 'bg-gradient-to-br from-rose-500 to-red-600'
        }`}>
          <div className="p-6 text-white text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              passed ? 'bg-white/20' : 'bg-white/20'
            }`}>
              {passed ? (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <h4 className="text-xl font-bold mb-2">{t('quiz.quizComplete')}</h4>
            <div className="text-5xl font-black mb-2">{score}%</div>
            <p className="text-white/80 font-medium">
              {passed ? t('quiz.passed') : t('quiz.failed')} ({t('quiz.threshold')}: 75%)
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{correct}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs">{t('quiz.correctCount')}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400">{questions.length - correct}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs">{t('quiz.incorrectCount')}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0}m
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs">{t('quiz.timeUsed')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('quiz.takeAnother')}
            </button>
          </div>
        </div>
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
        <div className={`h-1.5 ${isStudyMode ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`} />

        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${
                isStudyMode
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25'
                  : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/25'
              }`}>
                {state.currentQuestion + 1}
              </div>
              <div>
                <h6 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {t('quiz.question')} {state.currentQuestion + 1} {t('quiz.of')} {questions.length}
                </h6>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isStudyMode
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                  }`}>
                    {isStudyMode ? t('quiz.studyMode') : t('quiz.examMode')}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{currentQ?.domain}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={finishQuiz}
                className="px-3 py-2 bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-lg transition-colors"
              >
                {t('quiz.finish')}
              </button>
              <button
                onClick={resetQuiz}
                className="px-3 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-lg transition-colors"
              >
                {t('quiz.reset')}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span>{t('quiz.progress')}: {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%</span>
              <span>{state.answers.filter(a => a !== null).length} {t('quiz.answered')}</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  isStudyMode
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500'
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
                      <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">{String.fromCharCode(65 + index)}</span>
                    </div>
                  );
                }
              } else {
                // Before answering or in exam mode
                if (isSelected) {
                  optionClasses = 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500/20';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{String.fromCharCode(65 + index)}</span>
                    </div>
                  );
                } else {
                  optionClasses = 'border-neutral-200 dark:border-neutral-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-neutral-800';
                  iconContent = (
                    <div className="w-7 h-7 rounded-full border-2 border-neutral-300 dark:border-neutral-500 flex items-center justify-center group-hover:border-primary-400 transition-colors">
                      <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500 transition-colors">{String.fromCharCode(65 + index)}</span>
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
                    <span className={`text-sm leading-relaxed ${
                      showFeedback
                        ? isCorrectOption
                          ? 'text-emerald-800 dark:text-emerald-200 font-medium'
                          : isSelected
                            ? 'text-rose-800 dark:text-rose-200'
                            : 'text-neutral-500 dark:text-neutral-400'
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
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  <span className="font-semibold text-neutral-900 dark:text-white">{t('quiz.explanation')}:</span> {currentQ.explanation}
                </p>
              </div>

              {!isCorrect && (
                <div className="flex items-center gap-2 p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
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

            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {state.currentQuestion + 1} / {questions.length}
            </span>

            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                className={`px-5 py-3 font-semibold rounded-xl transition-all shadow-lg inline-flex items-center gap-2 ${
                  isStudyMode
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-purple-500/25'
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
                className={`px-5 py-3 font-semibold rounded-xl transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 ${
                  isStudyMode
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-purple-500/25'
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
