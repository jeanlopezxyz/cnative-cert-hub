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

  if (!questions || questions.length === 0) {
    return (
      <div className="card rounded-xl overflow-hidden border-0 bg-amber-50 dark:bg-amber-600/20">
        <div className="card-body p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 inline-flex items-center justify-center bg-amber-600 text-white rounded-2xl flex-shrink-0">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                {t('quiz.title')}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300">
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
        {/* Header Card */}
        <div className="card rounded-xl overflow-hidden border-0 bg-primary-50 dark:bg-primary-600/20">
          <div className="card-body p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 inline-flex items-center justify-center bg-primary-600 text-white rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {t('quiz.title')}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('quiz.subtitle')} {questions.length} {t('quiz.questionsAvailable').toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{questions.length}</div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{t('quiz.questionsAvailable')}</div>
          </div>
          <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{examDuration} {t('quiz.min')}</div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{t('quiz.suggestedDuration')}</div>
          </div>
          <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">75%</div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{t('quiz.passingScore')}</div>
          </div>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Exam Mode */}
          <div className="card rounded-xl overflow-hidden border-0 bg-violet-50 dark:bg-violet-600/20 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 inline-flex items-center justify-center bg-violet-600 text-white rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-violet-600 dark:text-violet-400">{t('quiz.examMode')}</h4>
            </div>
            <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 mb-4 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">•</span>
                {t('quiz.examModeDesc1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">•</span>
                {t('quiz.examModeDesc2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">•</span>
                {t('quiz.examModeDesc3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">•</span>
                {t('quiz.examModeDesc4')}
              </li>
            </ul>
            <button
              onClick={() => startQuiz('exam')}
              className="w-full px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors mt-auto"
            >
              {t('quiz.startExamMode')}
            </button>
          </div>

          {/* Study Mode */}
          <div className="card rounded-xl overflow-hidden border-0 bg-teal-50 dark:bg-teal-600/20 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 inline-flex items-center justify-center bg-teal-600 text-white rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-teal-600 dark:text-teal-400">{t('quiz.studyMode')}</h4>
            </div>
            <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 mb-4 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                {t('quiz.studyModeDesc1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                {t('quiz.studyModeDesc2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                {t('quiz.studyModeDesc3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                {t('quiz.studyModeDesc4')}
              </li>
            </ul>
            <button
              onClick={() => startQuiz('study')}
              className="w-full px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors mt-auto"
            >
              {t('quiz.startStudyMode')}
            </button>
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
        {/* Result Header */}
        <div className={`card rounded-xl overflow-hidden border-0 ${
          passed ? 'bg-emerald-50 dark:bg-emerald-600/20' : 'bg-red-50 dark:bg-red-600/20'
        }`}>
          <div className="card-body p-6 sm:p-8">
            <div className="text-center">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 inline-flex items-center justify-center ${
                passed ? 'bg-emerald-600' : 'bg-red-600'
              } text-white rounded-2xl`}>
                {passed ? (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {t('quiz.quizComplete')}
              </h2>
              <div className={`text-5xl sm:text-6xl font-bold mb-3 ${
                passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {score}%
              </div>
              <div className={`text-lg font-semibold ${
                passed ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {passed ? t('quiz.passed') : t('quiz.failed')} ({t('quiz.threshold')}: 75%)
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 inline-flex items-center justify-center bg-emerald-600 text-white rounded-xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{correct}</div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{t('quiz.correctCount')}</div>
          </div>
          <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 inline-flex items-center justify-center bg-red-600 text-white rounded-xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">{questions.length - correct}</div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{t('quiz.incorrectCount')}</div>
          </div>
          <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0} {t('quiz.min')}
            </div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{t('quiz.timeUsed')}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-5">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
            >
              {t('quiz.takeAnother')}
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors"
            >
              {t('quiz.printResults')}
            </button>
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
      {/* Header */}
      <div className="card rounded-xl overflow-hidden border-0 bg-primary-50 dark:bg-primary-600/20 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 inline-flex items-center justify-center bg-primary-600 text-white rounded-xl font-bold">
                {state.currentQuestion + 1}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-primary-600 dark:text-primary-400">
                  {t('quiz.question')} {state.currentQuestion + 1} {t('quiz.of')} {questions.length}
                </h2>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{t('quiz.domain')}: {currentQ?.domain}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={finishQuiz}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
            >
              {t('quiz.finish')}
            </button>
            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 text-sm rounded-lg transition-colors"
            >
              {t('quiz.reset')}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-2">
            <span>{t('quiz.progress')}: {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%</span>
            <span>{state.answers.filter(a => a !== null).length} {t('quiz.answered')}</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="card rounded-xl overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-800/50 p-6 sm:p-8">
        <div className="mb-6">
          {/* Questions are always displayed in English - no translation */}
          <h3 className="text-xl text-neutral-800 dark:text-neutral-100 leading-relaxed">{currentQ?.question}</h3>
        </div>

        <div className="space-y-3">
          {currentQ?.options.map((option, index) => (
            <div
              key={index}
              className={`block p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                userAnswer === index
                  ? 'bg-primary-100 dark:bg-primary-900/40 border-2 border-primary-500'
                  : 'bg-white/60 dark:bg-neutral-800/50 border-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
              onClick={() => selectAnswer(index)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  userAnswer === index
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                }`}>
                  <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                </div>
                <span className="text-neutral-700 dark:text-neutral-200 leading-relaxed cursor-pointer">
                  {/* Options are always displayed in English - no translation */}
                  {option}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Study Mode Explanation */}
        {state.mode === 'study' && userAnswer !== null && currentQ && (
          <div className={`mt-6 p-4 rounded-xl ${
            userAnswer === currentQ.correctAnswer
              ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
          }`}>
            <div className={`font-semibold mb-2 flex items-center gap-2 ${
              userAnswer === currentQ.correctAnswer ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
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
            {/* Explanations are always displayed in English - no translation */}
            <div className="text-neutral-600 dark:text-neutral-300 text-sm">{currentQ.explanation}</div>
            {userAnswer !== currentQ.correctAnswer && (
              <div className="mt-2 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                {/* Correct answer display - label translated, content in English */}
                {t('quiz.correctAnswer')}: {String.fromCharCode(65 + currentQ.correctAnswer)}) {currentQ.options[currentQ.correctAnswer]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="card rounded-xl overflow-hidden border-0 bg-neutral-100 dark:bg-neutral-800 p-4">
        {/* Mobile */}
        <div className="sm:hidden w-full">
          <div className="grid grid-cols-2 gap-3">
            {state.mode === 'study' && (
              <button
                onClick={prevQuestion}
                disabled={state.currentQuestion === 0}
                className="px-4 py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors"
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
              className="px-6 py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors"
            >
              {t('quiz.previous')}
            </button>
          ) : (
            <div />
          )}

          <div className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            {state.currentQuestion + 1} / {questions.length}
          </div>

          {isLastQuestion ? (
            <button
              onClick={finishQuiz}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
            >
              {t('quiz.finishQuiz')}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={state.mode === 'exam' && !canGoNext}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
            >
              {t('quiz.next')} {state.mode === 'exam' && !canGoNext ? t('quiz.answerRequired') : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}