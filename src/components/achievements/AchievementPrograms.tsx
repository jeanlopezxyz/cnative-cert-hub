import { useTranslations } from '../../i18n/utils';
import { APP_CONFIG } from '../../constants';

import type { ui } from '../../i18n/ui';

interface AchievementProgramsProps {
  lang: keyof typeof ui;
}

export default function AchievementPrograms({ lang }: AchievementProgramsProps) {
  const t = useTranslations(lang);
  
  // Build proper URLs that work both locally and on GitHub Pages
  const basePath = APP_CONFIG.basePath || '';
  const langPath = lang === 'en' ? '' : `/${lang}`;

  const programs = [
    {
      id: 'kubestronaut',
      title: t('achievements.kubestronaut.title'),
      description: t('achievements.kubestronaut.description'),
      href: `${basePath}${langPath}/achievements/kubestronaut`,
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      subtextColor: 'text-neutral-600 dark:text-neutral-300',
    },
    {
      id: 'golden',
      title: t('achievements.golden.title'),
      description: t('achievements.golden.description'),
      href: `${basePath}${langPath}/achievements/golden-kubestronaut`,
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
      iconBg: 'bg-amber-500',
      textColor: 'text-amber-600 dark:text-amber-400',
      subtextColor: 'text-neutral-600 dark:text-neutral-300',
    },
  ];

  return (
    <section id="achievements" className="pt-4 pb-6 sm:pt-6 sm:pb-8 scroll-section">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-12 3xl:px-16">
        {/* Section Header - Same style as CertificationGrid */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
            {t('achievements.programs.title')}
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t('achievements.programs.subtitle')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {programs.map((program) => (
            <a
              key={program.id}
              href={program.href}
              className={`group relative ${program.bgColor} rounded-xl p-5 flex overflow-hidden transition-all duration-200 hover:scale-[1.02]`}
            >
              <div className="flex flex-col w-full h-full relative z-10">
                <h3 className={`text-lg font-bold mb-1 ${program.textColor}`}>
                  {program.title}
                </h3>
                <p className={`text-base leading-relaxed ${program.subtextColor}`}>
                  {program.description}
                </p>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />

                {/* Button - aligned to bottom right */}
                <div className="mt-3 flex justify-end">
                  <span className={`inline-flex items-center gap-1.5 text-base font-medium ${program.textColor}`}>
                    {t('certifications.card.viewDetails')}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
