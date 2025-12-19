/**
 * Shared color utilities for consistent styling across components
 */

export interface LevelColors {
  bg: string;
  text: string;
  icon: string;
}

/**
 * Color mapping for certification levels - WowDash style
 */
export const LEVEL_COLORS: Record<string, LevelColors> = {
  entry: {
    bg: 'bg-emerald-100 dark:bg-emerald-600/25',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-600',
  },
  intermediate: {
    bg: 'bg-primary-100 dark:bg-primary-600/25',
    text: 'text-primary-600 dark:text-primary-400',
    icon: 'bg-primary-600',
  },
  advanced: {
    bg: 'bg-purple-100 dark:bg-purple-600/25',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'bg-purple-600',
  },
  expert: {
    bg: 'bg-amber-100 dark:bg-amber-600/25',
    text: 'text-amber-600 dark:text-amber-400',
    icon: 'bg-amber-600',
  },
};

/**
 * Get colors for a certification level
 */
export function getLevelColors(level: string): LevelColors {
  return LEVEL_COLORS[level] || LEVEL_COLORS.intermediate;
}
