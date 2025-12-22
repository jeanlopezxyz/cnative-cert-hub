import { useTranslations } from '../../i18n/utils';

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
        <div className="card shadow-none bg-primary-50 dark:bg-primary-900/20 rounded-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Content */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-neutral-900 dark:text-white leading-tight">
                {t('hero.title')}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 max-w-2xl">
                {t('hero.description')}
              </p>

              {/* Buttons - More prominent CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('achievements');
                    if (el) {
                      const headerHeight = 64;
                      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-primary-600/30"
                >
                  {t('hero.cta.programs')}
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('certifications');
                    if (el) {
                      const headerHeight = 64;
                      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-100 dark:bg-primary-800/30 text-primary-700 dark:text-primary-300 font-semibold rounded-xl hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-all duration-200"
                >
                  {t('hero.cta.certifications')}
                </button>
                <a
                  href="https://www.cncf.io/training/certification/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
                >
                  {t('hero.cta.official')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
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
                <p className="text-white/90 text-base font-medium">{t('hero.visual.cloudNative')}</p>
                <p className="text-white text-2xl font-bold">{t('hero.visual.certifications')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
