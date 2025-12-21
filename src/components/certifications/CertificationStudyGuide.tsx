import React, { useState } from 'react';
import { useTranslations, translateCertificationValue } from '../../i18n/utils';
import type { Certification } from '../../types';
import SimpleQuestionSimulator from '../quiz/SimpleQuestionSimulator';

import type { ui } from '../../i18n/ui';

interface CertificationStudyGuideProps {
  certification: Certification;
  lang: keyof typeof ui;
}

// Helper functions for safe property access
const hasProperty = (obj: unknown, prop: string): boolean => {
  return typeof obj === 'object' && obj !== null && prop in obj;
};

const getStringProperty = (obj: unknown, prop: string): string | undefined => {
  if (hasProperty(obj, prop)) {
    const value = (obj as Record<string, unknown>)[prop];
    return typeof value === 'string' ? value : undefined;
  }
  return undefined;
};

const getBooleanProperty = (obj: unknown, prop: string): boolean => {
  if (hasProperty(obj, prop)) {
    const value = (obj as Record<string, unknown>)[prop];
    return Boolean(value);
  }
  return false;
};

export default function CertificationStudyGuide({
  certification,
  lang,
}: CertificationStudyGuideProps) {
  const t = useTranslations(lang);
  const [activeTab, setActiveTab] = useState<'overview' | 'domains' | 'resources' | 'path'>(
    'overview'
  );
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);
  const [expandedResourceCategories, setExpandedResourceCategories] = useState<string[]>([]);
  const [activeResourceTab, setActiveResourceTab] = useState<
    'official' | 'learning' | 'practice' | 'community'
  >('official');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleExpandDomain = (domainName: string) => {
    setExpandedDomains(prev =>
      prev.includes(domainName) ? prev.filter(d => d !== domainName) : [...prev, domainName]
    );
  };

  const toggleResourceCategory = (categoryId: string) => {
    setExpandedResourceCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) ? prev.filter(s => s !== sectionId) : [...prev, sectionId]
    );
  };

  // Organized study sections structure
  const studySections = [
    // OFFICIAL TAB - Official resources and documentation
    {
      id: 'official',
      title: t('certification.sections.official'),
      type: 'official' as const,
      tab: 'official',
      resources: [
        {
          title: t('certification.resource.officialPage'),
          url: certification.resources.official,
          description: t('certification.resource.officialDesc'),
        },
      ],
    },
    {
      id: 'documentation',
      title: t('certification.sections.documentation'),
      type: 'documentation' as const,
      tab: 'official',
      resources: (certification.resources.documentation || []).map(doc => ({
        title: doc.title || t('certification.resource.projectDocs'),
        url: doc.url,
        description: doc.description || t('certification.resource.projectDocsDesc'),
      })),
    },

    // LEARNING TAB - All courses, videos, and books
    {
      id: 'courses',
      title: t('certification.sections.courses'),
      type: 'courses' as const,
      tab: 'learning',
      resources: certification.resources.courses || [],
    },
    {
      id: 'videos',
      title: t('certification.sections.videos'),
      type: 'videos' as const,
      tab: 'learning',
      resources: certification.resources.videos || [],
    },
    {
      id: 'books',
      title: t('certification.sections.books'),
      type: 'books' as const,
      tab: 'learning',
      resources: certification.resources.books || [],
    },

    // PRACTICE TAB - Simulators, GitHub repos, and tools
    {
      id: 'simulators',
      title: t('certification.sections.practice'),
      type: 'practice' as const,
      tab: 'practice',
      resources: certification.resources.practice || [],
    },
    {
      id: 'github',
      title: t('certification.sections.github'),
      type: 'github' as const,
      tab: 'practice',
      resources: certification.resources.github.map(url => ({
        title: url.split('/').slice(-2).join('/'),
        url,
        description: t('certification.resource.githubDesc'),
      })),
    },
    {
      id: 'tools',
      title: t('certification.sections.tools'),
      type: 'tools' as const,
      tab: 'practice',
      resources: certification.resources.tools || [],
    },

    // COMMUNITY TAB - Blogs and communities
    {
      id: 'blogs',
      title: t('certification.sections.blogs'),
      type: 'blogs' as const,
      tab: 'community',
      resources: certification.resources.blogs || [],
    },
    {
      id: 'communities',
      title: t('certification.sections.communities'),
      type: 'communities' as const,
      tab: 'community',
      resources: certification.resources.communities || [],
    },
  ].filter(section => section.resources.length > 0); // Only show sections with resources

  return (
    <div>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-12 3xl:px-16 py-6 sm:py-8">
        {/* Header Section - Compact Style */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {certification.acronym}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {certification.name}
            </span>
          </div>
        </div>

        {/* Navigation Tabs - Compact Style */}
        <div className="mb-6">
          <nav className="flex flex-wrap gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            {[
              {
                id: 'overview',
                label: t('certification.overview'),
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              },
              {
                id: 'domains',
                label: t('certification.domains'),
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              },
              {
                id: 'resources',
                label: t('certification.studyResources'),
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              },
              {
                id: 'path',
                label: t('certification.practiceQuestions'),
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as 'overview' | 'domains' | 'resources' | 'path')
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-neutral-900 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {tab.icon}
                </svg>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-4">
                {/* Basic Exam Information - Compact Style */}
                <div className="card rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-sky-50 dark:bg-sky-600/20">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 inline-flex items-center justify-center bg-sky-600 text-white rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                        {t('certification.examOverview')}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {/* Left sub-column */}
                      <div className="space-y-2">
                        <div className="p-2.5 bg-white/60 dark:bg-neutral-900/40 rounded-lg">
                          <div className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-0.5">
                            {t('certification.examType')}
                          </div>
                          <div className="text-sm text-neutral-800 dark:text-neutral-100">
                            {certification.type === 'performance'
                              ? t('certification.performance')
                              : t('certification.multipleChoice')}
                          </div>
                        </div>
                        <div className="p-2.5 bg-white/60 dark:bg-neutral-900/40 rounded-lg">
                          <div className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-0.5">
                            {t('certification.duration')}
                          </div>
                          <div className="text-sm text-neutral-800 dark:text-neutral-100">
                            {certification.duration} {t('certification.minutes')}
                          </div>
                        </div>
                        <div className="p-2.5 bg-white/60 dark:bg-neutral-900/40 rounded-lg">
                          <div className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-0.5">
                            {t('certification.level')}
                          </div>
                          <div className="text-sm text-neutral-800 dark:text-neutral-100 capitalize">
                            {certification.level === 'entry'
                              ? t('certification.beginner')
                              : certification.level === 'intermediate'
                                ? t('certification.intermediate')
                                : t('certification.advanced')}
                          </div>
                        </div>
                        {certification.kubernetesVersion && (
                          <div className="p-2.5 bg-white/60 dark:bg-neutral-900/40 rounded-lg">
                            <div className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-0.5">
                              {t('certification.kubernetesVersion')}
                            </div>
                            <div className="text-sm text-neutral-800 dark:text-neutral-100">
                              {translateCertificationValue(certification.kubernetesVersion, lang)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right sub-column */}
                      <div className="space-y-2">
                        {certification.prerequisites && (
                          <div className="p-2.5 bg-amber-100/60 dark:bg-amber-900/30 rounded-lg">
                            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-0.5">
                              {t('certification.prerequisites')}
                            </div>
                            <div className="text-sm text-neutral-800 dark:text-neutral-100">
                              {translateCertificationValue(certification.prerequisites, lang)}
                            </div>
                          </div>
                        )}
                        {certification.examAttempts && (
                          <div className="p-2.5 bg-emerald-100/60 dark:bg-emerald-900/30 rounded-lg">
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-0.5">
                              {t('certification.examAttempts')}
                            </div>
                            <div className="text-sm text-neutral-800 dark:text-neutral-100">
                              {certification.examAttempts} {t('certification.attemptsIncluded')}
                            </div>
                          </div>
                        )}
                        {certification.requiredFor && (
                          <div className="p-2.5 bg-purple-100/60 dark:bg-purple-900/30 rounded-lg">
                            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-0.5">
                              {t('certification.requiredFor')}
                            </div>
                            <div className="text-sm text-neutral-800 dark:text-neutral-100">
                              {certification.requiredFor
                                .map(item => translateCertificationValue(item, lang))
                                .join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practice Simulator Section - Compact Style */}
                {certification.type === 'performance' && certification.simulatorProvider && (
                  <div className="card rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-emerald-50 dark:bg-emerald-600/20">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 inline-flex items-center justify-center bg-emerald-600 text-white rounded-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {t('certification.practiceSimulatorIncluded')}
                        </h3>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-neutral-900/40 rounded-lg">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mb-0.5">
                          {certification.simulatorProvider}
                        </div>
                        <div className="text-neutral-600 dark:text-neutral-300 text-xs">
                          {t('certification.practiceEnvironmentIncluded')}
                        </div>
                        {certification.simulatorAccess && (
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                            <span className="font-medium">{t('certification.access')}:</span>{' '}
                            {translateCertificationValue(certification.simulatorAccess, lang)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Compact Style */}
              <div className="space-y-4">
                {/* Exam Registration */}
                <div className="card rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-primary-50 dark:bg-primary-600/20">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 inline-flex items-center justify-center bg-primary-600 text-white rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {t('certification.registerForExam')}
                      </h3>
                    </div>
                    <a
                      href={certification.resources.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg transition-all text-white text-sm"
                    >
                      <span className="font-medium">{t('certification.officialRegistration')}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domains Tab */}
          {activeTab === 'domains' && (
            <div className="space-y-3">
              {/* Domain Cards Grid */}
              <div className="grid gap-3">
                {certification.domains.map((domain, index) => {
                  // Professional 3-color rotation: primary, teal, violet
                  const domainColors = [
                    { bg: 'bg-primary-50 dark:bg-primary-600/20', icon: 'bg-primary-600', text: 'text-primary-600 dark:text-primary-400', badge: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300', progress: 'text-primary-500' },
                    { bg: 'bg-teal-50 dark:bg-teal-600/20', icon: 'bg-teal-600', text: 'text-teal-600 dark:text-teal-400', badge: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300', progress: 'text-teal-500' },
                    { bg: 'bg-violet-50 dark:bg-violet-600/20', icon: 'bg-violet-600', text: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300', progress: 'text-violet-500' },
                  ];
                  const colors = domainColors[index % domainColors.length];

                  return (
                    <div
                      key={domain.name}
                      className={`card rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 ${colors.bg} transition-all duration-300`}
                    >
                      <button
                        className="w-full p-4 text-left transition-all duration-300"
                        onClick={() => toggleExpandDomain(domain.name)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Domain Number */}
                            <div className={`w-8 h-8 rounded-lg ${colors.icon} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                              {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold ${colors.text} transition-colors truncate`}>
                                {domain.name}
                              </h4>

                              {/* Info Pills */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                <span className={`inline-flex items-center px-1.5 py-0.5 ${colors.badge} text-xs font-medium rounded`}>
                                  {domain.weight}%
                                </span>
                                <span className="inline-flex items-center px-1.5 py-0.5 bg-white/60 dark:bg-neutral-900/40 text-neutral-500 dark:text-neutral-400 text-xs rounded">
                                  {domain.topics.length} {t('certification.topics')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Arrow */}
                          <div className="p-1.5 rounded-lg bg-white/60 dark:bg-neutral-900/40 transition-colors flex-shrink-0">
                            <svg
                              className={`w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 ${
                                expandedDomains.includes(domain.name) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {expandedDomains.includes(domain.name) && (
                        <div className="border-t border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/30 px-4 py-3">
                          <div className="grid gap-2">
                            {domain.topics.map((topic, topicIndex) => {
                              const topicName = typeof topic === 'string' ? topic : topic.name;
                              const topicUrl = typeof topic === 'object' ? topic.url : undefined;

                              return (
                                <div
                                  key={topicIndex}
                                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-white dark:hover:bg-neutral-800/50 transition-colors"
                                >
                                  <div className={`w-5 h-5 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <span className="text-[10px] text-white font-medium">{topicIndex + 1}</span>
                                  </div>
                                  {topicUrl ? (
                                    <a
                                      href={topicUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`text-xs ${colors.text} leading-relaxed transition-colors underline-offset-2 hover:underline`}
                                    >
                                      {topicName}
                                    </a>
                                  ) : (
                                    <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{topicName}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Summary Card - Compact Style */}
              <div className="mt-4 card rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-primary-50 dark:bg-primary-600/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 inline-flex items-center justify-center bg-primary-600 text-white rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('certification.totalDomains')}</p>
                      <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{certification.domains.length}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('certification.totalTopics')}</p>
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {certification.domains.reduce((acc, d) => acc + d.topics.length, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              {/* Resource Tabs - Compact Style */}
              <div className="flex flex-wrap gap-1.5 mb-4 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                <button
                  onClick={() => setActiveResourceTab('official')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeResourceTab === 'official'
                      ? 'bg-white dark:bg-neutral-900 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  {t('certification.official')}
                </button>
                <button
                  onClick={() => setActiveResourceTab('learning')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeResourceTab === 'learning'
                      ? 'bg-white dark:bg-neutral-900 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  {t('certification.learning')}
                </button>
                <button
                  onClick={() => setActiveResourceTab('practice')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeResourceTab === 'practice'
                      ? 'bg-white dark:bg-neutral-900 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  {t('certification.practice')}
                </button>
                <button
                  onClick={() => setActiveResourceTab('community')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeResourceTab === 'community'
                      ? 'bg-white dark:bg-neutral-900 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  {t('certification.community')}
                </button>
              </div>

              {/* Resource Content by Tab */}
              <div className="space-y-3">
                {/* All Resource Tabs - Compact Style with Tab Colors */}
                {['official', 'learning', 'practice', 'community'].map(tabName => {
                  // Color per tab type
                  const tabColors: Record<string, { bg: string; icon: string; text: string }> = {
                    official: { bg: 'bg-primary-50 dark:bg-primary-600/20', icon: 'bg-primary-600', text: 'text-primary-600 dark:text-primary-400' },
                    learning: { bg: 'bg-violet-50 dark:bg-violet-600/20', icon: 'bg-violet-600', text: 'text-violet-600 dark:text-violet-400' },
                    practice: { bg: 'bg-teal-50 dark:bg-teal-600/20', icon: 'bg-teal-600', text: 'text-teal-600 dark:text-teal-400' },
                    community: { bg: 'bg-amber-50 dark:bg-amber-600/20', icon: 'bg-amber-600', text: 'text-amber-600 dark:text-amber-400' },
                  };
                  const colors = tabColors[tabName];

                  return activeResourceTab === tabName && (
                    <React.Fragment key={tabName}>
                      {studySections
                        .filter(s => s.tab === tabName)
                        .map(section => (
                          <div
                            key={section.id}
                            className="card rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700"
                          >
                            <button
                              onClick={() => toggleResourceCategory(section.id)}
                              className="w-full px-3 py-2.5 flex items-center justify-between transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-600"
                            >
                              <h4 className={`text-sm font-semibold ${colors.text} flex items-center gap-1.5`}>
                                {section.title}
                                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                                  ({section.resources.length})
                                </span>
                              </h4>
                              <svg
                                className={`w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 transition-transform ${
                                  expandedResourceCategories.includes(section.id) ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {expandedResourceCategories.includes(section.id) && (
                              <div className="border-t border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/30 p-3">
                                <div className="grid gap-2">
                                  {(expandedSections.includes(section.id)
                                    ? section.resources
                                    : section.resources.slice(0, 3)
                                  ).map((resource, index) => (
                                    <a
                                      key={index}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex items-start gap-2 p-2.5 bg-white/80 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-all"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-medium text-neutral-800 dark:text-neutral-100 group-hover:${colors.text} transition-colors truncate`}>
                                          {resource.title}
                                        </div>
                                        {getStringProperty(resource, 'author') && (
                                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                            {t('certification.by')}{' '}
                                            {getStringProperty(resource, 'author')}
                                          </div>
                                        )}
                                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                          {getBooleanProperty(resource, 'isPaid') && (
                                            <span className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-[10px] font-semibold rounded">
                                              {t('certification.paid')}
                                            </span>
                                          )}
                                          {getStringProperty(resource, 'difficulty') && (
                                            <span className="px-1.5 py-0.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-[10px] font-semibold rounded">
                                              {getStringProperty(resource, 'difficulty') === 'beginner'
                                                ? t('certification.beginner')
                                                : getStringProperty(resource, 'difficulty') === 'intermediate'
                                                  ? t('certification.intermediate')
                                                  : t('certification.advanced')}
                                            </span>
                                          )}
                                          {getStringProperty(resource, 'duration') && (
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                              {getStringProperty(resource, 'duration')}
                                            </span>
                                          )}
                                        </div>
                                        {resource.description && (
                                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2">
                                            {resource.description}
                                          </p>
                                        )}
                                      </div>
                                      <svg
                                        className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 flex-shrink-0 mt-0.5 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  ))}
                                  {section.resources.length > 3 && !expandedSections.includes(section.id) && (
                                    <div className="text-center pt-1">
                                      <button
                                        onClick={() => toggleSection(section.id)}
                                        className={`text-xs ${colors.text} hover:opacity-80 transition-colors`}
                                      >
                                        {t('certification.showMore')} {section.resources.length - 3}...
                                      </button>
                                    </div>
                                  )}
                                  {expandedSections.includes(section.id) && section.resources.length > 3 && (
                                    <div className="text-center pt-1">
                                      <button
                                        onClick={() => toggleSection(section.id)}
                                        className={`text-xs ${colors.text} hover:opacity-80 transition-colors`}
                                      >
                                        {t('certification.showLess')}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Practice Questions Tab */}
          {activeTab === 'path' && (
            <SimpleQuestionSimulator
              questions={certification.questions || []}
              examDuration={certification.duration}
              certificationId={certification.id}
              lang={lang}
            />
          )}
        </div>
      </div>
    </div>
  );
}
