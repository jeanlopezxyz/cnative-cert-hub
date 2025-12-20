/**
 * Central Resources Index
 *
 * This file exports all certification resources from a single location.
 * Contributors can add resources to individual certification files
 * and they will be automatically available throughout the application.
 *
 * File Structure:
 * - Each certification has its own resource file (e.g., kcna.ts, cka.ts)
 * - Resources follow the CertificationResources interface from types/index.ts
 * - Resources are organized by category (books, courses, videos, etc.)
 * - Linux Foundation free courses are available in lf-free-courses.ts
 *
 * How to add resources:
 * 1. Find the certification file (e.g., src/data/resources/cka.ts)
 * 2. Add your resource to the appropriate category
 * 3. Include all required fields for the resource type
 * 4. Verify URLs are valid and accessible
 */

import type { CertificationResources } from '../../types';

// Linux Foundation Free Courses
export {
  lfFreeCourses,
  getCoursesByTopicArea,
  getCoursesForCertification,
  searchCourses,
  type LFFreeCourse,
  type LFTopicArea,
} from './lf-free-courses';

// Kubestronaut Certifications
export { kcnaResources } from './kcna';
export { kcsaResources } from './kcsa';
export { ckaResources } from './cka';
export { ckadResources } from './ckad';
export { cksResources } from './cks';

// Additional CNCF Certifications
export { capaResources } from './capa';
export { cbaResources } from './cba';
export { ccaResources } from './cca';
export { cgoaResources } from './cgoa';
export { cnpaResources } from './cnpa';
export { cnpeResources } from './cnpe';
export { icaResources } from './ica';
export { kcaResources } from './kca';
export { otcaResources } from './otca';
export { pcaResources } from './pca';

// Linux Foundation Certification
export { lfcsResources } from './lfcs';

// Import all resources for aggregation
import { kcnaResources } from './kcna';
import { kcsaResources } from './kcsa';
import { ckaResources } from './cka';
import { ckadResources } from './ckad';
import { cksResources } from './cks';
import { capaResources } from './capa';
import { cbaResources } from './cba';
import { ccaResources } from './cca';
import { cgoaResources } from './cgoa';
import { cnpaResources } from './cnpa';
import { cnpeResources } from './cnpe';
import { icaResources } from './ica';
import { kcaResources } from './kca';
import { otcaResources } from './otca';
import { pcaResources } from './pca';
import { lfcsResources } from './lfcs';

/**
 * Map of certification ID to resources
 * Use this to get resources for a specific certification
 */
export const resourcesByCertification: Record<string, CertificationResources> = {
  // Kubestronaut certifications
  kcna: kcnaResources,
  kcsa: kcsaResources,
  cka: ckaResources,
  ckad: ckadResources,
  cks: cksResources,
  // Additional CNCF certifications
  capa: capaResources,
  cba: cbaResources,
  cca: ccaResources,
  cgoa: cgoaResources,
  cnpa: cnpaResources,
  cnpe: cnpeResources,
  ica: icaResources,
  kca: kcaResources,
  otca: otcaResources,
  pca: pcaResources,
  // Linux Foundation
  lfcs: lfcsResources,
};

/**
 * Get resources for a specific certification
 * @param certId - The certification ID (e.g., 'kcna', 'cka')
 * @returns Resources for that certification, or undefined if not found
 */
export function getResourcesByCertification(certId: string): CertificationResources | undefined {
  return resourcesByCertification[certId.toLowerCase()];
}

/**
 * Get count of resources by type for a certification
 * @param certId - The certification ID
 * @returns Object with counts for each resource type
 */
export function getResourceCounts(certId: string): Record<string, number> {
  const resources = getResourcesByCertification(certId);
  if (!resources) return {};

  return {
    books: resources.books?.length || 0,
    courses: resources.courses?.length || 0,
    videos: resources.videos?.length || 0,
    documentation: resources.documentation?.length || 0,
    blogs: resources.blogs?.length || 0,
    communities: resources.communities?.length || 0,
    tools: resources.tools?.length || 0,
    github: resources.github?.length || 0,
    practice: resources.practice?.length || 0,
  };
}

/**
 * Get total resource count for a certification
 * @param certId - The certification ID
 * @returns Total number of resources
 */
export function getTotalResourceCount(certId: string): number {
  const counts = getResourceCounts(certId);
  return Object.values(counts).reduce((sum, count) => sum + count, 0);
}
