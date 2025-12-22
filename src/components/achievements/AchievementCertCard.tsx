import { useTranslations } from '../../i18n/utils';
import type { Certification, Language } from '../../types';
import { buildCertificationUrl, getLevelColors } from '../../utils';

type BadgeTone = 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'amber';

interface AchievementCertCardProps {
  cert: Certification | undefined;
  certId: string;
  basePath: string;
  lang: Language;
  index: number;
  setSize?: number;
  showArrow?: boolean;
  gradient?: string;
  badge?: { text: string; tone?: BadgeTone };
}

/**
 * WowDash-style achievement certification card
 */
export default function AchievementCertCard({
  cert,
  certId,
  lang,
  index,
  setSize = 5,
  badge,
}: AchievementCertCardProps) {
  const t = useTranslations(lang);
  const isCKS = certId === 'cks';

  // Unified badge support
  const resolvedBadge = badge || (isCKS ? { text: t('achievements.kubestronaut.requiresCka'), tone: 'orange' as BadgeTone } : undefined);

  const colors = getLevelColors(cert?.level || 'intermediate');

  return (
    <div
      className="w-full"
      role="listitem"
      aria-posinset={index + 1}
      aria-setsize={setSize}
    >
      <a
        href={buildCertificationUrl(certId, lang)}
        className="block group"
        aria-label={`${t('certifications.card.viewDetails')}: ${cert?.acronym ?? certId}`}
      >
        {/* WowDash Card Style */}
        <div className={`card h-full rounded-xl overflow-hidden border-0 ${colors.bg} text-center`}>
          <div className="card-body p-5">
            {/* Icon */}
            <div className={`w-12 h-12 mx-auto inline-flex items-center justify-center ${colors.icon} text-white mb-3 rounded-xl`}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>

            {/* Acronym */}
            <h6 className={`text-lg font-bold mb-1 ${colors.text}`}>{cert?.acronym}</h6>

            {/* Name */}
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3 line-clamp-2 min-h-[40px]">
              {cert?.name}
            </p>

            {/* Badge if exists */}
            {resolvedBadge && (
              <span className="text-sm px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-medium">
                {resolvedBadge.text}
              </span>
            )}

            {/* Level */}
            {!resolvedBadge && (
              <span className={`text-sm px-2.5 py-1 rounded-md font-medium ${colors.text} bg-white/60 dark:bg-neutral-900/40`}>
                {t(`certifications.level.${cert?.level}`)}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
