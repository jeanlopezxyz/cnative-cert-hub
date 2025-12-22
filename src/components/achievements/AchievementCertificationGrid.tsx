import React from 'react';
import { useTranslations } from '../../i18n/utils';
import type { Language, Certification } from '../../types';
import { getLevelColors } from '../../utils';

interface CertificationGridProps {
  certIds: string[];
  certifications: Certification[];
  basePath: string;
  lang: Language;
  gridClass?: string;
  role?: string;
  'aria-label'?: string;
  variant?: 'kubestronaut' | 'cncf';
}

/**
 * WowDash-style certification grid for achievement pages
 */
export default function CertificationGrid({
  certIds,
  certifications,
  basePath,
  lang,
  gridClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  role = "list",
  'aria-label': ariaLabel,
  variant = 'kubestronaut'
}: CertificationGridProps) {
  const t = useTranslations(lang);

  const getGridClass = () => {
    if (variant === 'cncf') {
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    }
    return gridClass;
  };

  return (
    <div
      className={`grid ${getGridClass()} gap-3 sm:gap-4`}
      role={role}
      aria-label={ariaLabel}
    >
      {certIds.map((certId, index) => {
        const cert = certifications.find(c => c.id === certId);
        const colors = getLevelColors(cert?.level || 'intermediate');

        return (
          <a
            key={certId}
            href={`${basePath}/certifications/${certId}`}
            className="group block"
            role="listitem"
            aria-posinset={index + 1}
            aria-setsize={certIds.length}
            aria-label={`${t('certifications.card.viewDetails')}: ${cert?.acronym ?? certId}`}
          >
            {/* WowDash Card - colored background based on level, no borders */}
            <div className={`card h-full rounded-xl overflow-hidden border-0 ${colors.bg} text-center transition-all duration-300`}>
              <div className="card-body p-4 sm:p-5">
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto inline-flex items-center justify-center ${colors.icon} text-white mb-3 rounded-xl`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>

                {/* Acronym */}
                <h3 className={`text-base sm:text-lg font-bold mb-1 ${colors.text}`}>{cert?.acronym}</h3>

                {/* Name */}
                <p className="text-neutral-600 dark:text-neutral-300 text-base mb-3 line-clamp-2 min-h-[40px]">
                  {cert?.name}
                </p>

                {/* Level Badge */}
                <span className={`text-base px-3 py-1.5 rounded-lg font-medium ${colors.text} bg-white/60 dark:bg-neutral-900/40`}>
                  {t(`certifications.level.${cert?.level}`)}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}