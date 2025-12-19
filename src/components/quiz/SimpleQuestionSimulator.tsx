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
      <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-body p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 inline-flex items-center justify-center bg-warning-600 text-white rounded-xl flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h5 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
                {t('quiz.title')}
              </h5>
              <p className="text-neutral-600 dark:text-neutral-400 mb-0">
                {t('quiz.comingSoon')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Start screen
  if (!state.isActive && !state.showResults) {
    return (
      <div className="space-y-6">
        {/* Header Card - WowDash style with gradient */}
        <div className="card rounded-2xl border-0 overflow-hidden bg-gradient-to-r from-primary-600/10 to-white dark:from-primary-600/20 dark:to-neutral-800">
          <div className="card-body p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl flex-shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
                  {t('quiz.title')}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-0">
                  {t('quiz.subtitle')} {questions.length} {t('quiz.questionsAvailable').toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - WowDash style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 inline-flex items-center justify-center bg-primary-100 dark:bg-primary-600/25 text-primary-600 dark:text-primary-400 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{questions.length}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-0">{t('quiz.questionsAvailable')}</p>
            </div>
          </div>
          <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 inline-flex items-center justify-center bg-warning-100 dark:bg-warning-600/25 text-warning-600 dark:text-warning-400 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">{examDuration} {t('quiz.min')}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-0">{t('quiz.suggestedDuration')}</p>
            </div>
          </div>
          <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 inline-flex items-center justify-center bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">75%</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-0">{t('quiz.passingScore')}</p>
            </div>
          </div>
        </div>

        {/* Mode Selection Cards - WowDash colored background style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exam Mode */}
          <div className="card rounded-2xl border-0 overflow-hidden bg-purple-100 dark:bg-purple-600/25 h-full">
            <div className="card-body p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 inline-flex items-center justify-center bg-purple-600 text-white rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h6 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-0">{t('quiz.examMode')}</h6>
              </div>
              <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  {t('quiz.examModeDesc1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  {t('quiz.examModeDesc2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  {t('quiz.examModeDesc3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  {t('quiz.examModeDesc4')}
                </li>
              </ul>
              <button
                onClick={() => startQuiz('exam')}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
              >
                {t('quiz.startExamMode')}
              </button>
            </div>
          </div>

          {/* Study Mode */}
          <div className="card rounded-2xl border-0 overflow-hidden bg-success-100 dark:bg-success-600/25 h-full">
            <div className="card-body p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 inline-flex items-center justify-center bg-success-600 text-white rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h6 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-0">{t('quiz.studyMode')}</h6>
              </div>
              <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-success-600 dark:text-success-400 mt-0.5">•</span>
                  {t('quiz.studyModeDesc1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-600 dark:text-success-400 mt-0.5">•</span>
                  {t('quiz.studyModeDesc2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-600 dark:text-success-400 mt-0.5">•</span>
                  {t('quiz.studyModeDesc3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-600 dark:text-success-400 mt-0.5">•</span>
                  {t('quiz.studyModeDesc4')}
                </li>
              </ul>
              <button
                onClick={() => startQuiz('study')}
                className="w-full px-4 py-3 bg-success-600 hover:bg-success-700 text-white font-semibold rounded-xl transition-colors"
              >
                {t('quiz.startStudyMode')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (state.showResults) {
    const score = calculateScore();
    const correct = state.answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
    const passed = score >= 75;

    return (
      <div className="space-y-6">
        {/* Result Header - WowDash style */}
        <div className={`card rounded-2xl border-0 overflow-hidden ${
          passed ? 'bg-success-100 dark:bg-success-600/25' : 'bg-danger-100 dark:bg-danger-600/25'
        }`}>
          <div className="card-body p-6 sm:p-8">
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 inline-flex items-center justify-center ${
                passed ? 'bg-success-600' : 'bg-danger-600'
              } text-white rounded-2xl`}>
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
              <h4 className={`text-2xl font-semibold mb-2 ${
                passed ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {t('quiz.quizComplete')}
              </h4>
              <div className={`text-5xl font-bold mb-3 ${
                passed ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {score}%
              </div>
              <p className={`text-lg font-medium mb-0 ${
                passed ? 'text-success-700 dark:text-success-300' : 'text-danger-700 dark:text-danger-300'
              }`}>
                {passed ? t('quiz.passed') : t('quiz.failed')} ({t('quiz.threshold')}: 75%)
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards - WowDash style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 inline-flex items-center justify-center bg-success-600 text-white rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">{correct}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-0">{t('quiz.correctCount')}</p>
            </div>
          </div>
          <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 inline-flex items-center justify-center bg-danger-600 text-white rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-danger-600 dark:text-danger-400 mb-1">{questions.length - correct}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-0">{t('quiz.incorrectCount')}</p>
            </div>
          </div>
          <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0} {t('quiz.min')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-0">{t('quiz.timeUsed')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - WowDash style */}
        <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
          <div className="card-body p-6">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('quiz.takeAnother')}
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {t('quiz.printResults')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const currentQ = questions[state.currentQuestion];
  const userAnswer = state.answers[state.currentQuestion];
  const isLastQuestion = state.currentQuestion === questions.length - 1;
  const canGoNext = state.mode === 'study' || userAnswer !== null;

  return (
    <div className="w-full space-y-6">
      {/* Header - WowDash style with header and footer */}
      <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-header py-4 px-6 bg-white dark:bg-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-600 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl font-bold text-lg">
              {state.currentQuestion + 1}
            </div>
            <div>
              <h6 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-0">
                {t('quiz.question')} {state.currentQuestion + 1} {t('quiz.of')} {questions.length}
              </h6>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">{t('quiz.domain')}: {currentQ?.domain}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={finishQuiz}
              className="px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {t('quiz.finish')}
            </button>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-lg transition-colors"
            >
              {t('quiz.reset')}
            </button>
          </div>
        </div>
        <div className="card-body p-6">
          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-3">
            <span>{t('quiz.progress')}: {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%</span>
            <span>{state.answers.filter(a => a !== null).length} {t('quiz.answered')}</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card - WowDash accordion style */}
      <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-body p-6">
          <h5 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200 mb-6 leading-relaxed">
            {currentQ?.question}
          </h5>

          <div className="space-y-3">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  userAnswer === index
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-600/20'
                    : 'border-neutral-200 dark:border-neutral-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-neutral-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    userAnswer === index
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-500'
                  }`}>
                    <span className="text-sm font-semibold">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-200 leading-relaxed pt-1">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Study Mode Explanation - WowDash alert style */}
          {state.mode === 'study' && userAnswer !== null && currentQ && (
            <div className={`mt-6 p-5 rounded-xl border ${
              userAnswer === currentQ.correctAnswer
                ? 'bg-success-50 dark:bg-success-600/20 border-success-200 dark:border-success-600'
                : 'bg-danger-50 dark:bg-danger-600/20 border-danger-200 dark:border-danger-600'
            }`}>
              <div className={`font-semibold mb-2 flex items-center gap-2 ${
                userAnswer === currentQ.correctAnswer ? 'text-success-700 dark:text-success-300' : 'text-danger-700 dark:text-danger-300'
              }`}>
                {userAnswer === currentQ.correctAnswer ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {userAnswer === currentQ.correctAnswer ? t('quiz.correct') : t('quiz.incorrect')}
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-0">{currentQ.explanation}</p>
              {userAnswer !== currentQ.correctAnswer && (
                <p className="mt-3 text-sm text-success-700 dark:text-success-300 font-medium mb-0">
                  {t('quiz.correctAnswer')}: {String.fromCharCode(65 + currentQ.correctAnswer)}) {currentQ.options[currentQ.correctAnswer]}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation - WowDash card footer style */}
      <div className="card rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-body p-4">
          {/* Mobile */}
          <div className="sm:hidden w-full">
            <div className="grid grid-cols-2 gap-3">
              {state.mode === 'study' && (
                <button
                  onClick={prevQuestion}
                  disabled={state.currentQuestion === 0}
                  className="px-4 py-3 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 disabled:opacity-50 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors"
                >
                  {t('quiz.previous')}
                </button>
              )}
              {isLastQuestion ? (
                <button
                  onClick={finishQuiz}
                  className="px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors col-span-full"
                >
                  {t('quiz.finishQuiz')}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={state.mode === 'exam' && !canGoNext}
                  className={`px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors ${
                    state.mode === 'exam' ? 'col-span-full' : ''
                  }`}
                >
                  {t('quiz.next')} {state.mode === 'exam' && !canGoNext ? t('quiz.answerRequired') : ''}
                </button>
              )}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
            {state.mode === 'study' ? (
              <button
                onClick={prevQuestion}
                disabled={state.currentQuestion === 0}
                className="px-6 py-3 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 disabled:opacity-50 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                {t('quiz.previous')}
              </button>
            ) : (
              <div />
            )}

            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              {state.currentQuestion + 1} / {questions.length}
            </span>

            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2"
              >
                {t('quiz.finishQuiz')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={state.mode === 'exam' && !canGoNext}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2"
              >
                {t('quiz.next')} {state.mode === 'exam' && !canGoNext ? t('quiz.answerRequired') : ''}
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
