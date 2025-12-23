/**
 * Animation timing and delay constants
 */

export const ANIMATION_DELAYS = {
  // Stagger delays for lists (reduced for snappier feel)
  cardStagger: 30,
  domainStagger: 60,
  sectionStagger: 100,

  // Transition durations (faster for better responsiveness)
  fast: 150,
  normal: 200,
  slow: 300,
  verySlow: 400,

  // Specific animations
  cardFlip: 600,
  progressBar: 400,
} as const;

export const ANIMATION_EASING = {
  default: 'ease-in-out',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
