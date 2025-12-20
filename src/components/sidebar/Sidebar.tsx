import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '../../i18n/utils';
import { certifications } from '../../data/certifications';
import { useOptimizedStorage } from '../../utils/storage';
import { APP_CONFIG } from '../../constants';
import {
  CERTIFICATION_CATEGORIES,
  ACHIEVEMENTS_ITEMS,
  QUICK_LINKS_ITEMS,
  groupCertificationsByCategory,
} from '../../config/sidebar.config';
import SidebarSection from './SidebarSection';
import CertificationCategory from './CertificationCategory';

import type { ui } from '../../i18n/ui';

interface SidebarProps {
  lang: keyof typeof ui;
}

export default function Sidebar({ lang }: SidebarProps) {
  const t = useTranslations(lang);
  const storage = useOptimizedStorage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['achievements']);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  // Restore state after hydration
  useEffect(() => {
    setIsHydrated(true);
    const savedCollapsed = storage.getItem('sidebarCollapsed');
    if (savedCollapsed === 'true') {
      setIsDesktopCollapsed(true);
    }

    const savedSections = storage.getItem('sidebarOpenSections');
    if (savedSections) {
      try {
        setOpenSections(JSON.parse(savedSections));
      } catch {
        // Keep default state
      }
    }

    const savedCategories = storage.getItem('sidebarOpenCategories');
    if (savedCategories) {
      try {
        setOpenCategories(JSON.parse(savedCategories));
      } catch {
        // Keep default empty state
      }
    }

    // Close mobile sidebar on hydration (for page reloads on mobile)
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  }, [storage]);

  // Save states
  useEffect(() => {
    if (isHydrated) {
      storage.setBatched('sidebarCollapsed', isDesktopCollapsed.toString());
    }
  }, [isDesktopCollapsed, isHydrated, storage]);

  useEffect(() => {
    if (isHydrated) {
      storage.setBatched('sidebarOpenSections', JSON.stringify(openSections));
    }
  }, [openSections, isHydrated, storage]);

  useEffect(() => {
    if (isHydrated) {
      storage.setBatched('sidebarOpenCategories', JSON.stringify(openCategories));
    }
  }, [openCategories, isHydrated, storage]);

  // Update current path and handle mobile state after Astro page transitions
  useEffect(() => {
    const updatePathAndMobileState = () => {
      setCurrentPath(window.location.pathname);

      // Close mobile sidebar on navigation (important for mobile/tablet)
      if (window.innerWidth < 1024) {
        setIsMobileOpen(false);
      }
    };

    // Set initial path and mobile state
    updatePathAndMobileState();

    // Listen for Astro View Transitions
    document.addEventListener('astro:page-load', updatePathAndMobileState);
    document.addEventListener('astro:after-swap', updatePathAndMobileState);

    // Also listen for popstate (browser back/forward)
    window.addEventListener('popstate', updatePathAndMobileState);

    // Listen for resize events to handle mobile/desktop transitions
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('astro:page-load', updatePathAndMobileState);
      document.removeEventListener('astro:after-swap', updatePathAndMobileState);
      window.removeEventListener('popstate', updatePathAndMobileState);
      window.removeEventListener('resize', handleResize);
    };
  }, [lang]);

  // Listen for mobile sidebar toggle from header
  useEffect(() => {
    const handleToggle = () => {
      setIsMobileOpen(prev => !prev);
    };
    window.addEventListener('toggle-mobile-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-mobile-sidebar', handleToggle);
  }, []);

  // Close mobile sidebar on link click
  const closeMobileSidebar = useCallback(() => {
    // Always close mobile sidebar regardless of hydration state
    // to ensure it works immediately after page navigation
    setIsMobileOpen(false);
  }, []);

  // Collapse all sections and go to home
  const handleLogoClick = () => {
    setOpenSections([]);
    setOpenCategories([]);
    closeMobileSidebar();
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const newSections = prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section];

      // Immediately save to prevent state loss during navigation
      try {
        localStorage.setItem('sidebarOpenSections', JSON.stringify(newSections));
      } catch (error) {
        // Silently fail if localStorage is not available
      }

      return newSections;
    });
  };

  // Fallback: Ensure at least one section is open on desktop
  const ensureSectionOpen = useCallback(() => {
    if (window.innerWidth >= 1024 && openSections.length === 0) {
      const defaultSections = ['achievements'];
      setOpenSections(defaultSections);
      try {
        localStorage.setItem('sidebarOpenSections', JSON.stringify(defaultSections));
      } catch (error) {
        // Silently fail if localStorage is not available
      }
    }
  }, [openSections]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];

      // Immediately save to prevent state loss during navigation
      try {
        localStorage.setItem('sidebarOpenCategories', JSON.stringify(newCategories));
      } catch (error) {
        // Silently fail if localStorage is not available
      }

      return newCategories;
    });
  };

  const certificationsByCategory = groupCertificationsByCategory(certifications);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 h-screen z-40
          w-[280px]
          bg-neutral-100 dark:bg-neutral-900
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'left-0' : '-left-full lg:left-0'}
          ${isDesktopCollapsed ? 'lg:w-[80px] lg:hover:w-[280px]' : ''}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 px-5 flex items-center justify-between">
          <a href={`${APP_CONFIG.basePath}/${lang === 'en' ? '' : lang}`} onClick={handleLogoClick} className="flex items-center gap-3">
            {/* Logo Icon - Certificate Badge */}
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            {/* Logo Text - Hidden when collapsed */}
            <div className={`transition-opacity duration-200 ${isDesktopCollapsed ? 'lg:opacity-0 lg:group-hover:opacity-100' : ''}`}>
              <span className="text-lg font-bold text-neutral-900 dark:text-white">CNative</span>
              <span className="text-lg font-bold text-primary-600">Cert</span>
              <span className="text-lg font-bold text-neutral-900 dark:text-white">Hub</span>
            </div>
          </a>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Menu Area */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden px-4 py-6 sidebar-scroll">
          <nav className="space-y-2">

            {/* Achievement Programs */}
            <SidebarSection
              title={t('sidebar.sections.achievementPaths')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
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
                    onClick={closeMobileSidebar}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
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
            <div className="my-4 mx-3">
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-600/50 to-transparent" />
            </div>

            {/* Certifications */}
            <SidebarSection
              title={t('sidebar.certifications')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
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
                    onLinkClick={closeMobileSidebar}
                  />
                ))}
              </div>
            </SidebarSection>

            {/* Separator */}
            <div className="my-4 mx-3">
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-600/50 to-transparent" />
            </div>

            {/* External Resources */}
            <SidebarSection
              title={t('sidebar.sections.externalResources')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
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
                  onClick={closeMobileSidebar}
                  className="
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
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
