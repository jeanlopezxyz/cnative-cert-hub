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

  // No questions available state - Compact style
  if (!questions || questions.length === 0) {
    return (
      <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 inline-flex items-center justify-center bg-purple-100 dark:bg-purple-600/25 text-purple-600 dark:text-purple-400 rounded-full">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h5 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 mb-1">
              {t('quiz.title')}
            </h5>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-0">
              {t('quiz.comingSoon')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Start screen - Compact style
  if (!state.isActive && !state.showResults) {
    return (
      <div className="border border-neutral-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex justify-center items-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">{t('quiz.title')}</h5>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{t('quiz.subtitle')}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-4 text-center">
          <div className="flex-1 p-2.5 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <div className="text-base font-bold text-cyan-700 dark:text-cyan-400">{questions.length}</div>
            <div className="text-xs text-cyan-600 dark:text-cyan-300">{t('quiz.questions')}</div>
          </div>
          <div className="flex-1 p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="text-base font-bold text-amber-700 dark:text-amber-400">{examDuration}m</div>
            <div className="text-xs text-amber-600 dark:text-amber-300">{t('quiz.duration')}</div>
          </div>
          <div className="flex-1 p-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-base font-bold text-green-700 dark:text-green-400">75%</div>
            <div className="text-xs text-green-600 dark:text-green-300">{t('quiz.passing')}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => startQuiz('exam')}
            className="flex-1 py-2.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            {t('quiz.examMode')}
          </button>
          <button
            onClick={() => startQuiz('study')}
            className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            {t('quiz.studyMode')}
          </button>
        </div>
      </div>
    );
  }

  // Results screen - Compact style
  if (state.showResults) {
    const score = calculateScore();
    const correct = state.answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
    const passed = score >= 75;

    return (
      <div className="space-y-4">
        {/* Result Header */}
        <div className={`card rounded-xl border-0 overflow-hidden ${
          passed ? 'bg-success-100 dark:bg-success-600/25' : 'bg-danger-100 dark:bg-danger-600/25'
        }`}>
          <div className="card-body p-4 sm:p-5">
            <div className="text-center">
              <div className={`w-14 h-14 mx-auto mb-3 inline-flex items-center justify-center ${
                passed ? 'bg-success-600' : 'bg-danger-600'
              } text-white rounded-xl`}>
                {passed ? (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h4 className={`text-base font-semibold mb-1 ${
                passed ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {t('quiz.quizComplete')}
              </h4>
              <div className={`text-3xl font-bold mb-2 ${
                passed ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {score}%
              </div>
              <p className={`text-sm font-medium mb-0 ${
                passed ? 'text-success-700 dark:text-success-300' : 'text-danger-700 dark:text-danger-300'
              }`}>
                {passed ? t('quiz.passed') : t('quiz.failed')} ({t('quiz.threshold')}: 75%)
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-3 text-center">
              <div className="w-8 h-8 mx-auto mb-2 inline-flex items-center justify-center bg-success-600 text-white rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-success-600 dark:text-success-400 mb-0.5">{correct}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-0">{t('quiz.correctCount')}</p>
            </div>
          </div>
          <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-3 text-center">
              <div className="w-8 h-8 mx-auto mb-2 inline-flex items-center justify-center bg-danger-600 text-white rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-danger-600 dark:text-danger-400 mb-0.5">{questions.length - correct}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-0">{t('quiz.incorrectCount')}</p>
            </div>
          </div>
          <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
            <div className="card-body p-3 text-center">
              <div className="w-8 h-8 mx-auto mb-2 inline-flex items-center justify-center bg-primary-600 text-white rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-0.5">
                {state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0} {t('quiz.min')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-0">{t('quiz.timeUsed')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
          <div className="card-body p-3">
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={resetQuiz}
                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('quiz.takeAnother')}
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  // Quiz screen - Compact style
  const currentQ = questions[state.currentQuestion];
  const userAnswer = state.answers[state.currentQuestion];
  const isLastQuestion = state.currentQuestion === questions.length - 1;
  const canGoNext = state.mode === 'study' || userAnswer !== null;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-header py-3 px-4 bg-white dark:bg-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-600 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 inline-flex items-center justify-center bg-primary-600 text-white rounded-lg font-bold text-sm">
              {state.currentQuestion + 1}
            </div>
            <div>
              <h6 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-0">
                {t('quiz.question')} {state.currentQuestion + 1} {t('quiz.of')} {questions.length}
              </h6>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('quiz.domain')}: {currentQ?.domain}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={finishQuiz}
              className="px-3 py-1.5 bg-danger-600 hover:bg-danger-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              {t('quiz.finish')}
            </button>
            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 text-neutral-700 dark:text-neutral-200 text-xs font-medium rounded-lg transition-colors"
            >
              {t('quiz.reset')}
            </button>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            <span>{t('quiz.progress')}: {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%</span>
            <span>{state.answers.filter(a => a !== null).length} {t('quiz.answered')}</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-body p-4">
          <h5 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-4 leading-relaxed">
            {currentQ?.question}
          </h5>

          <div className="space-y-2">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  userAnswer === index
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-600/20'
                    : 'border-neutral-200 dark:border-neutral-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-neutral-800'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    userAnswer === index
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-500'
                  }`}>
                    <span className="text-xs font-semibold">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Study Mode Explanation */}
          {state.mode === 'study' && userAnswer !== null && currentQ && (
            <div className={`mt-4 p-3 rounded-lg border ${
              userAnswer === currentQ.correctAnswer
                ? 'bg-success-50 dark:bg-success-600/20 border-success-200 dark:border-success-600'
                : 'bg-danger-50 dark:bg-danger-600/20 border-danger-200 dark:border-danger-600'
            }`}>
              <div className={`text-sm font-semibold mb-1.5 flex items-center gap-1.5 ${
                userAnswer === currentQ.correctAnswer ? 'text-success-700 dark:text-success-300' : 'text-danger-700 dark:text-danger-300'
              }`}>
                {userAnswer === currentQ.correctAnswer ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {userAnswer === currentQ.correctAnswer ? t('quiz.correct') : t('quiz.incorrect')}
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 text-xs mb-0">{currentQ.explanation}</p>
              {userAnswer !== currentQ.correctAnswer && (
                <p className="mt-2 text-xs text-success-700 dark:text-success-300 font-medium mb-0">
                  {t('quiz.correctAnswer')}: {String.fromCharCode(65 + currentQ.correctAnswer)}) {currentQ.options[currentQ.correctAnswer]}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="card rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 overflow-hidden">
        <div className="card-body p-3">
          {/* Mobile */}
          <div className="sm:hidden w-full">
            <div className="grid grid-cols-2 gap-2">
              {state.mode === 'study' && (
                <button
                  onClick={prevQuestion}
                  disabled={state.currentQuestion === 0}
                  className="px-3 py-2.5 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 disabled:opacity-50 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-lg transition-colors"
                >
                  {t('quiz.previous')}
                </button>
              )}
              {isLastQuestion ? (
                <button
                  onClick={finishQuiz}
                  className="px-3 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors col-span-full"
                >
                  {t('quiz.finishQuiz')}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={state.mode === 'exam' && !canGoNext}
                  className={`px-3 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors ${
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
                className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500 disabled:opacity-50 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                {t('quiz.previous')}
              </button>
            ) : (
              <div />
            )}

            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {state.currentQuestion + 1} / {questions.length}
            </span>

            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                {t('quiz.finishQuiz')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={state.mode === 'exam' && !canGoNext}
                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                {t('quiz.next')} {state.mode === 'exam' && !canGoNext ? t('quiz.answerRequired') : ''}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
