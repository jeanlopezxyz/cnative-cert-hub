/**
 * Theme utility - Single source of truth for theme management
 */

export type Theme = 'dark' | 'light';

/**
 * Get theme from localStorage or system preference
 */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get current theme from DOM
 */
export function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Check if current theme is dark
 */
export function isDarkTheme(): boolean {
  return getCurrentTheme() === 'dark';
}

/**
 * Save theme to localStorage
 */
export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // localStorage not available
  }
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
}

/**
 * Toggle theme and save preference
 */
export function toggleTheme(): Theme {
  const newTheme: Theme = isDarkTheme() ? 'light' : 'dark';
  saveTheme(newTheme);
  applyTheme(newTheme);
  return newTheme;
}
