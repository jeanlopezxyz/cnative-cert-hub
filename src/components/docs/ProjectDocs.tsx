/**
 * Project Documentation Page Component
 * Displays all CNCF projects with links to their official documentation
 */

import type { Language } from '../../types';
import { useTranslations } from '../../i18n/utils';
import { APP_CONFIG } from '../../constants';

interface ProjectDocProps {
  lang: Language;
}

interface Project {
  id: string;
  name: string;
  descKey: string;
  url: string;
  logo: string;
  color: string;
  relatedCerts?: string[];
}

interface Category {
  key: string;
  titleKey: string;
  projects: Project[];
}

const DOCUMENTATION_CATEGORIES: Category[] = [
  {
    key: 'kubernetes',
    titleKey: 'docs.category.kubernetes',
    projects: [
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        descKey: 'docs.kubernetes.desc',
        url: 'https://kubernetes.io/docs/',
        logo: '/logos/kubernetes.svg',
        color: 'blue',
      },
    ],
  },
  {
    key: 'gitops',
    titleKey: 'docs.category.gitops',
    projects: [
      {
        id: 'argocd',
        name: 'Argo CD',
        descKey: 'docs.argocd.desc',
        url: 'https://argo-cd.readthedocs.io/',
        logo: '/logos/argocd.svg',
        color: 'orange',
      },
    ],
  },
  {
    key: 'networking',
    titleKey: 'docs.category.networking',
    projects: [
      {
        id: 'cilium',
        name: 'Cilium',
        descKey: 'docs.cilium.desc',
        url: 'https://docs.cilium.io/',
        logo: '/logos/cilium.svg',
        color: 'amber',
      },
    ],
  },
  {
    key: 'observability',
    titleKey: 'docs.category.observability',
    projects: [
      {
        id: 'opentelemetry',
        name: 'OpenTelemetry',
        descKey: 'docs.opentelemetry.desc',
        url: 'https://opentelemetry.io/docs/',
        logo: '/logos/opentelemetry.svg',
        color: 'purple',
      },
      {
        id: 'prometheus',
        name: 'Prometheus',
        descKey: 'docs.prometheus.desc',
        url: 'https://prometheus.io/docs/',
        logo: '/logos/prometheus.svg',
        color: 'red',
      },
    ],
  },
  {
    key: 'platform',
    titleKey: 'docs.category.platform',
    projects: [
      {
        id: 'backstage',
        name: 'Backstage',
        descKey: 'docs.backstage.desc',
        url: 'https://backstage.io/docs/',
        logo: '/logos/backstage.svg',
        color: 'cyan',
      },
    ],
  },
  {
    key: 'security',
    titleKey: 'docs.category.security',
    projects: [
      {
        id: 'kyverno',
        name: 'Kyverno',
        descKey: 'docs.kyverno.desc',
        url: 'https://kyverno.io/docs/',
        logo: '/logos/kyverno.svg',
        color: 'green',
      },
    ],
  },
  {
    key: 'serviceMesh',
    titleKey: 'docs.category.serviceMesh',
    projects: [
      {
        id: 'istio',
        name: 'Istio',
        descKey: 'docs.istio.desc',
        url: 'https://istio.io/latest/docs/',
        logo: '/logos/istio.svg',
        color: 'indigo',
      },
    ],
  },
  {
    key: 'linux',
    titleKey: 'docs.category.linux',
    projects: [
      {
        id: 'linux',
        name: 'Linux',
        descKey: 'docs.linux.desc',
        url: 'https://www.kernel.org/doc/html/latest/',
        logo: '/logos/linux.svg',
        color: 'yellow',
      },
    ],
  },
];

// Color mappings for soft badges (WowDash style)
const colorStyles: Record<string, { badge: string; icon: string }> = {
  blue: {
    badge: 'bg-blue-100 text-blue-600 dark:bg-blue-600/25 dark:text-blue-400',
    icon: 'bg-blue-500',
  },
  orange: {
    badge: 'bg-orange-100 text-orange-600 dark:bg-orange-600/25 dark:text-orange-400',
    icon: 'bg-orange-500',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-600 dark:bg-amber-600/25 dark:text-amber-400',
    icon: 'bg-amber-500',
  },
  purple: {
    badge: 'bg-purple-100 text-purple-600 dark:bg-purple-600/25 dark:text-purple-400',
    icon: 'bg-purple-500',
  },
  red: {
    badge: 'bg-red-100 text-red-600 dark:bg-red-600/25 dark:text-red-400',
    icon: 'bg-red-500',
  },
  cyan: {
    badge: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-600/25 dark:text-cyan-400',
    icon: 'bg-cyan-500',
  },
  green: {
    badge: 'bg-green-100 text-green-600 dark:bg-green-600/25 dark:text-green-400',
    icon: 'bg-green-500',
  },
  indigo: {
    badge: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-600/25 dark:text-indigo-400',
    icon: 'bg-indigo-500',
  },
  yellow: {
    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-600/25 dark:text-yellow-400',
    icon: 'bg-yellow-500',
  },
};

export default function ProjectDocs({ lang }: ProjectDocProps) {
  const t = useTranslations(lang);

  // Flatten all projects with their category info
  const allProjects = DOCUMENTATION_CATEGORIES.flatMap((category) =>
    category.projects.map((project) => ({
      ...project,
      categoryKey: category.titleKey,
    }))
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
          {t('docs.title')}
        </h1>
        <p className="text-base text-neutral-500 dark:text-neutral-400">
          {t('docs.subtitle')}
        </p>
      </div>

      {/* All Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProjects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-neutral-100 dark:bg-neutral-700/50 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Color overlay on hover */}
            <div className={`absolute inset-0 ${colorStyles[project.color]?.icon || 'bg-blue-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

            {/* Top row: Logo + Category badge */}
            <div className="flex items-start justify-between mb-3">
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={`${APP_CONFIG.basePath}${project.logo}`}
                  alt={`${project.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Category badge - Soft style */}
              <span className={`text-base font-semibold px-2.5 py-1 rounded-md ${colorStyles[project.color]?.badge || 'bg-blue-100 text-blue-600'}`}>
                {t(project.categoryKey)}
              </span>
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                {project.name}
                <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                {t(project.descKey)}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${colorStyles[project.color]?.icon || 'bg-blue-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
          </a>
        ))}
      </div>

      {/* Spacer to push button down */}
      <div className="flex-grow" />

      {/* CNCF Landscape Link */}
      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
        <a
          href="https://landscape.cncf.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg group"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t('docs.exploreLandscape')}</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
