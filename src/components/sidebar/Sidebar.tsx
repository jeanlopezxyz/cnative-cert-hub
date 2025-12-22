import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from '../../i18n/utils';
import { certifications } from '../../data/certifications';
import { APP_CONFIG } from '../../constants';
import {
  CERTIFICATION_CATEGORIES,
  ACHIEVEMENTS_ITEMS,
  DOCUMENTATION_ITEMS,
  QUICK_LINKS_ITEMS,
  groupCertificationsByCategory,
} from '../../config/sidebar.config';
import SidebarSection from './SidebarSection';
import CertificationCategory from './CertificationCategory';

import type { ui } from '../../i18n/ui';

interface SidebarProps {
  lang: keyof typeof ui;
}

// Default sections to show expanded on first visit
const DEFAULT_OPEN_SECTIONS = ['certifications'];

// Helper to read from localStorage safely (only on user interaction, not initial render)
function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) return JSON.parse(saved);
  } catch {}
  return defaultValue;
}

// Helper to save to localStorage safely
function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export default function Sidebar({ lang }: SidebarProps) {
  const t = useTranslations(lang);
  const isFirstRender = useRef(true);

  // Initialize state - use defaults on first render, localStorage only affects subsequent interactions
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : ''
  );
  const [isDesktopCollapsed] = useState(() =>
    getStoredValue('sidebarCollapsed', false)
  );
  const [openSections, setOpenSections] = useState<string[]>(() =>
    getStoredValue('sidebarOpenSections', DEFAULT_OPEN_SECTIONS)
  );
  const [openCategories, setOpenCategories] = useState<string[]>(() =>
    getStoredValue('sidebarOpenCategories', [])
  );

  // Update current path on navigation (single effect for all path-related updates)
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    // Mark first render complete
    isFirstRender.current = false;

    // Listen for Astro View Transitions and browser navigation
    document.addEventListener('astro:page-load', updatePath);
    document.addEventListener('astro:after-swap', updatePath);
    window.addEventListener('popstate', updatePath);

    return () => {
      document.removeEventListener('astro:page-load', updatePath);
      document.removeEventListener('astro:after-swap', updatePath);
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  // Collapse all sections and go to home
  const handleLogoClick = () => {
    const emptySections: string[] = [];
    const emptyCategories: string[] = [];
    setOpenSections(emptySections);
    setOpenCategories(emptyCategories);
    saveToStorage('sidebarOpenSections', emptySections);
    saveToStorage('sidebarOpenCategories', emptyCategories);
  };

  const toggleSection = useCallback((section: string) => {
    setOpenSections(prev => {
      const newSections = prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section];
      saveToStorage('sidebarOpenSections', newSections);
      return newSections;
    });
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setOpenCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      saveToStorage('sidebarOpenCategories', newCategories);
      return newCategories;
    });
  }, []);

  const certificationsByCategory = groupCertificationsByCategory(certifications);

  return (
    <>
      {/* Mobile Backdrop - visibility controlled by body.mobile-sidebar-open class */}
      <div
        data-mobile-backdrop
        className="
          fixed inset-0 z-30 lg:hidden transition-all duration-300
          bg-transparent backdrop-blur-none invisible
          mobile-backdrop
        "
      />

      {/* Sidebar - position controlled by body.mobile-sidebar-open class */}
      <aside
        className={`
          fixed top-0 h-screen z-40
          w-[300px] lg:w-[280px]
          bg-neutral-100 dark:bg-neutral-900
          shadow-xl lg:shadow-none
          transition-all duration-300 ease-out
          -left-full lg:left-0
          mobile-sidebar
          ${isDesktopCollapsed ? 'lg:w-[80px] lg:hover:w-[280px]' : ''}
        `}
      >
        {/* Logo Section - Enhanced for mobile */}
        <div className="h-16 px-4 lg:px-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 lg:border-0">
          <a href={`${APP_CONFIG.basePath}/${lang === 'en' ? '' : lang}`} onClick={handleLogoClick} className="flex items-center">
            {/* Logo Text Only */}
            <div className={`transition-opacity duration-200 ${isDesktopCollapsed ? 'lg:opacity-0 lg:group-hover:opacity-100' : ''}`}>
              <span className="text-3xl font-bold text-neutral-900 dark:text-white">CN</span>
              <span className="text-3xl font-bold text-primary-600">Cert</span>
              <span className="text-3xl font-bold text-neutral-900 dark:text-white">Hub</span>
            </div>
          </a>

          {/* Mobile Close Button - Enhanced */}
          <button
            data-sidebar-close
            className="lg:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Menu Area */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden px-3 lg:px-4 py-4 lg:py-6 sidebar-scroll">
          <nav className="space-y-1.5">

            {/* Achievement Programs */}
            <SidebarSection
              title={t('sidebar.sections.achievementPaths')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              }
              isOpen={openSections.includes('achievements')}
              onToggle={() => toggleSection('achievements')}
              isCollapsed={isDesktopCollapsed}
            >
              {ACHIEVEMENTS_ITEMS.map((item) => {
                const basePath = APP_CONFIG.basePath || '';
                const langPath = lang === 'en' ? '' : `/${lang}`;
                const href = `${basePath}${langPath}/${item.href}`;
                const isActive = currentPath === href;

                return (
                  <a
                    key={item.id}
                    href={href}
                    className={`
                      sidebar-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-primary-500'}`} />
                    <span>{t(item.translationKey)}</span>
                  </a>
                );
              })}
            </SidebarSection>

            {/* Separator */}
            <div className="my-3 mx-2">
              <div className="h-px bg-neutral-200 dark:bg-neutral-700/60" />
            </div>

            {/* Certifications */}
            <SidebarSection
              title={t('sidebar.certifications')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
              isOpen={openSections.includes('certifications')}
              onToggle={() => toggleSection('certifications')}
              isCollapsed={isDesktopCollapsed}
            >
              <div className="space-y-1">
                {CERTIFICATION_CATEGORIES.map((category) => (
                  <CertificationCategory
                    key={category.key}
                    categoryKey={category.key}
                    categoryName={category.name}
                    certifications={certificationsByCategory[category.key] || []}
                    isOpen={openCategories.includes(category.key)}
                    onToggle={() => toggleCategory(category.key)}
                    lang={lang}
                    currentPath={currentPath}
                  />
                ))}
              </div>
            </SidebarSection>

            {/* Separator */}
            <div className="my-3 mx-2">
              <div className="h-px bg-neutral-200 dark:bg-neutral-700/60" />
            </div>

            {/* Project Documentation */}
            <SidebarSection
              title={t('sidebar.sections.documentation')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              }
              isOpen={openSections.includes('documentation')}
              onToggle={() => toggleSection('documentation')}
              isCollapsed={isDesktopCollapsed}
            >
              {DOCUMENTATION_ITEMS.map((item) => {
                const basePath = APP_CONFIG.basePath || '';
                const langPath = lang === 'en' ? '' : `/${lang}`;
                const href = `${basePath}${langPath}/${item.href}`;
                const isActive = currentPath === href;

                return (
                  <a
                    key={item.id}
                    href={href}
                    className={`
                      sidebar-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-indigo-500'}`} />
                    <span>{t(item.translationKey)}</span>
                  </a>
                );
              })}
            </SidebarSection>

            {/* Separator */}
            <div className="my-3 mx-2">
              <div className="h-px bg-neutral-200 dark:bg-neutral-700/60" />
            </div>

            {/* External Resources */}
            <SidebarSection
              title={t('sidebar.sections.externalResources')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              }
              isOpen={openSections.includes('resources')}
              onToggle={() => toggleSection('resources')}
              isCollapsed={isDesktopCollapsed}
            >
              {QUICK_LINKS_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    sidebar-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    text-neutral-600 dark:text-neutral-400
                    hover:bg-neutral-100 dark:hover:bg-neutral-700/50
                    hover:text-primary-600 dark:hover:text-primary-400
                    transition-all duration-200 group
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="flex-1">{t(item.translationKey)}</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </SidebarSection>

          </nav>
        </div>
      </aside>
    </>
  );
}
