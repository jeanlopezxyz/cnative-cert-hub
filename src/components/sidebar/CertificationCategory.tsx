import type { Certification } from '../../types';
import { APP_CONFIG } from '../../constants';
import { useTranslations } from '../../i18n/utils';

interface CertificationCategoryProps {
  categoryKey: string;
  categoryName: string;
  certifications: Certification[];
  isOpen: boolean;
  onToggle: () => void;
  lang: string;
  currentPath: string;
  onLinkClick?: () => void;
}

/**
 * WowDash-style certification category dropdown
 */
export default function CertificationCategory({
  categoryKey: _categoryKey,
  categoryName,
  certifications,
  isOpen,
  onToggle,
  lang,
  currentPath,
  onLinkClick,
}: CertificationCategoryProps) {
  const hasCerts = !!(certifications && certifications.length > 0);
  const t = useTranslations(lang as 'en' | 'es' | 'pt');
  const basePath = `${APP_CONFIG.basePath}${lang === 'en' ? '' : '/' + lang}`;

  if (!hasCerts) return null;

  // Check if any certification in this category is active
  const hasActiveChild = certifications.some(cert => {
    const certHref = `${basePath}/certifications/${cert.id}`;
    return currentPath === certHref;
  });

  return (
    <div className="mb-0.5">
      {/* Category Header */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-sm font-medium transition-all duration-200 group
          ${isOpen || hasActiveChild
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600'
          }
        `}
        aria-expanded={isOpen}
        aria-label={`Toggle ${categoryName} category`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isOpen || hasActiveChild ? 'bg-primary-500' : 'bg-neutral-400'}`} />
          <span>{t(categoryName) || categoryName}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Count Badge */}
          <span className={`
            text-xs px-1.5 py-0.5 rounded-md
            ${isOpen || hasActiveChild
              ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
            }
          `}>
            {certifications.length}
          </span>

          {/* Chevron */}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Certifications List - Using grid for smooth animation */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="pt-1 pl-4 space-y-0.5">
            {certifications.map((cert) => {
              const certHref = `${basePath}/certifications/${cert.id}`;
              const isActive = currentPath === certHref;

              return (
                <a
                  key={cert.id}
                  href={certHref}
                  onClick={onLinkClick}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary-600 text-white font-medium shadow-sm shadow-primary-600/30'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }
                  `}
                >
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-neutral-400'}`} />
                  <span>{cert.acronym}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
