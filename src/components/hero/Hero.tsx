import { useTranslations } from '../../i18n/utils';
import { APP_CONFIG } from '../../constants';

import type { ui } from '../../i18n/ui';

interface HeroProps {
  lang: keyof typeof ui;
}

export default function Hero({ lang }: HeroProps) {
  const t = useTranslations(lang);

  return (
    <section className="py-6 sm:py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-12 3xl:px-16">
        {/* Hero Card - WowDash Style with gradient accent */}
        <div className="card shadow-none bg-primary-50 dark:bg-primary-900/20 rounded-xl overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row">
            {/* Content */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              {/* Badge - WowDash Style */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{t('hero.stats.badge')}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-neutral-900 dark:text-white leading-tight">
                {t('hero.title')}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 max-w-2xl">
                {t('hero.description')}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#achievements"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>{t('hero.cta.programs')}</span>
                </a>
                <a
                  href="#certifications"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-100 dark:bg-primary-800/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>{t('hero.cta.certifications')}</span>
                </a>
              </div>
            </div>

            {/* Visual Side Panel */}
            <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 min-w-[280px]">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-white/90 text-sm font-medium">{t('hero.visual.cloudNative')}</p>
                <p className="text-white text-2xl font-bold">{t('hero.visual.certifications')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - WowDash Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Certifications - Primary/Blue theme */}
          <div className="card shadow-none bg-primary-50 dark:bg-primary-900/20 rounded-xl h-full">
            <div className="card-body p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800/50 rounded-xl flex justify-center items-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <h6 className="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-1">16+</h6>
                  <p className="font-medium text-primary-600 dark:text-primary-400 text-sm">{t('hero.stats.certifications')}</p>
                </div>
              </div>
              <div className="mt-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <p className="text-sm text-primary-600/80 dark:text-primary-400/80">
                    {t('hero.stats.certProvider')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Languages - Purple theme */}
          <div className="card shadow-none bg-purple-50 dark:bg-purple-900/20 rounded-xl h-full">
            <div className="card-body p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800/50 rounded-xl flex justify-center items-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <h6 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">3</h6>
                  <p className="font-medium text-purple-600 dark:text-purple-400 text-sm">{t('hero.stats.languages')}</p>
                </div>
              </div>
              <div className="mt-4 pt-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800/50 rounded text-xs font-medium text-purple-700 dark:text-purple-300">EN</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800/50 rounded text-xs font-medium text-purple-700 dark:text-purple-300">ES</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800/50 rounded text-xs font-medium text-purple-700 dark:text-purple-300">PT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Free Resources - Green theme */}
          <div className="card shadow-none bg-green-50 dark:bg-green-900/20 rounded-xl h-full">
            <div className="card-body p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-800/50 rounded-xl flex justify-center items-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <h6 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">100%</h6>
                  <p className="font-medium text-green-600 dark:text-green-400 text-sm">{t('hero.stats.freeResources')}</p>
                </div>
              </div>
              <div className="mt-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-green-600/80 dark:text-green-400/80">
                    {t('hero.stats.openSource')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
