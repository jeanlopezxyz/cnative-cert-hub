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
        color: 'from-blue-500 to-blue-600',
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
        color: 'from-orange-500 to-amber-600',
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
        color: 'from-yellow-500 to-orange-500',
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
        color: 'from-purple-500 to-indigo-600',
      },
      {
        id: 'prometheus',
        name: 'Prometheus',
        descKey: 'docs.prometheus.desc',
        url: 'https://prometheus.io/docs/',
        logo: '/logos/prometheus.svg',
        color: 'from-orange-500 to-red-500',
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
        color: 'from-teal-500 to-cyan-600',
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
        color: 'from-teal-500 to-green-600',
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
        color: 'from-blue-600 to-indigo-700',
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
        color: 'from-yellow-500 to-amber-600',
      },
    ],
  },
];

export default function ProjectDocs({ lang }: ProjectDocProps) {
  const t = useTranslations(lang);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          {t('docs.title')}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          {t('docs.subtitle')}
        </p>
      </div>

      {/* Categories - Two column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOCUMENTATION_CATEGORIES.map((category) => (
          <section key={category.key} className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              {t(category.titleKey)}
            </h2>

            <div className="space-y-2">
              {category.projects.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                >
                  {/* Logo */}
                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 flex items-center justify-center p-1.5">
                    <img
                      src={`${APP_CONFIG.basePath}${project.logo}`}
                      alt={`${project.name} logo`}
                      className="w-7 h-7 object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {t(project.descKey)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CNCF Landscape Link */}
      <div className="mt-12 text-center">
        <a
          href="https://landscape.cncf.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          CNCF Landscape
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
