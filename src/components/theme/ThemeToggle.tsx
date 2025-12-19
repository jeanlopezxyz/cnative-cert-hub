import { useSyncExternalStore } from 'react';

// Read theme directly from DOM - this is the source of truth
function getThemeFromDOM(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

// Subscribe to theme changes
function subscribeToTheme(callback: () => void): () => void {
  // Create observer to watch for class changes on <html>
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });

  // Also listen for Astro transitions and storage
  document.addEventListener('astro:page-load', callback);
  document.addEventListener('astro:after-swap', callback);
  window.addEventListener('storage', callback);

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);

  return () => {
    observer.disconnect();
    document.removeEventListener('astro:page-load', callback);
    document.removeEventListener('astro:after-swap', callback);
    window.removeEventListener('storage', callback);
    mediaQuery.removeEventListener('change', callback);
  };
}

export default function ThemeToggle() {
  // Use useSyncExternalStore to read theme from DOM - always in sync
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeFromDOM,
    () => false // Server snapshot
  );

  const handleClick = () => {
    const newTheme = !isDark;

    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    // Apply classes with smooth transition - MutationObserver will trigger re-render
    const html = document.documentElement;
    html.classList.add('theme-transition');
    html.classList.remove('light', 'dark');
    html.classList.add(newTheme ? 'dark' : 'light');

    // Remove transition class after animation completes
    setTimeout(() => {
      html.classList.remove('theme-transition');
    }, 200);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex relative justify-center items-center p-0 w-[37.5px] h-[37.5px] text-neutral-600 dark:text-neutral-400 transition-all duration-200 ease-linear bg-transparent rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg className="w-5 h-5 stroke-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        {isDark ? (
          // Sun icon for light mode - Auxx style
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        ) : (
          // Moon icon for dark mode - Auxx style
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        )}
      </svg>
    </button>
  );
}