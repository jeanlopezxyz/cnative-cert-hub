/**
 * shadcn/ui utility functions
 * Combines clsx and tailwind-merge for optimal class name handling
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind classes intelligently
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
