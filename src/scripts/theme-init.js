// Theme initialization script - Dark mode only
(function() {
  'use strict';

  // Always apply dark theme
  function applyDarkTheme() {
    try {
      // Force dark theme always
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');

      // Set dark theme CSS custom properties
      const root = document.documentElement;
      const themeVars = {
        '--bg-primary': '#0a0b1e',
        '--text-primary': '#f8fafc',
        '--bg-secondary': '#141328',
        '--bg-tertiary': '#1e1b3a',
        '--border': '#334155'
      };

      // Apply all theme variables at once
      Object.entries(themeVars).forEach(([prop, value]) => {
        root.style.setProperty(prop, value);
      });

      // Save dark theme preference
      localStorage.setItem('theme', 'dark');

      // Show content after theme is applied
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.add('visible');
        });
      });

    } catch (error) {
      console.error('Theme initialization failed:', error);
      // Fallback: show content immediately
      document.documentElement.classList.add('visible');
    }
  }

  // Apply dark theme immediately
  applyDarkTheme();
})();

/*
 * Light theme support commented out - dark mode only
 *
 * To re-enable light theme:
 * 1. Uncomment ThemeToggleAstro in Layout.astro
 * 2. Restore the original theme-init.js logic with savedTheme check
 */