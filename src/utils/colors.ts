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
    bg: 'bg-emerald-50 dark:bg-emerald-600/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-600',
  },
  intermediate: {
    bg: 'bg-blue-50 dark:bg-blue-600/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'bg-blue-600',
  },
  advanced: {
    bg: 'bg-violet-50 dark:bg-violet-600/20',
    text: 'text-violet-600 dark:text-violet-400',
    icon: 'bg-violet-600',
  },
  expert: {
    bg: 'bg-amber-50 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    icon: 'bg-amber-500',
  },
};

/**
 * Get colors for a certification level
 */
export function getLevelColors(level: string): LevelColors {
  return LEVEL_COLORS[level] || LEVEL_COLORS.intermediate;
}
