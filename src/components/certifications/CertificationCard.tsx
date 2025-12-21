import { useTranslations } from '../../i18n/utils';
import { buildCertificationUrl, getLevelColors } from '../../utils';
import type { Certification, Language } from '../../types';
import { useFadeInUpStagger } from '../../hooks/useStaggeredAnimation';

interface CertificationCardProps {
  certification: Certification;
  lang: Language;
  index: number;
}

/**
 * WowDash-style certification card - clean, minimal, no borders
 */
export default function CertificationCard({
  certification: cert,
  lang,
  index,
}: CertificationCardProps) {
  const t = useTranslations(lang);
  const certUrl = buildCertificationUrl(cert.id, lang);
  const animationProps = useFadeInUpStagger(index);
  const colors = getLevelColors(cert.level);

  return (
    <a
      href={certUrl}
      className={`block group ${animationProps.className}`}
      style={animationProps.style}
    >
      {/* WowDash Card Style - no border, rounded-xl, shadow on hover */}
      <div className={`card h-full rounded-xl overflow-hidden border-0 ${colors.bg}`}>
        <div className="card-body p-6">
          {/* Icon */}
          <div className={`w-14 h-14 inline-flex items-center justify-center ${colors.icon} text-white mb-4 rounded-xl`}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>

          {/* Acronym & Name */}
          <h6 className={`text-lg font-bold mb-1 ${colors.text}`}>{cert.acronym}</h6>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
            {cert.name}
          </p>

          {/* Read More Link */}
          <span className={`btn ${colors.text} hover:underline px-0 py-0 mt-auto inline-flex items-center gap-2 text-sm font-medium`}>
            {t('certifications.card.viewDetails')}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
