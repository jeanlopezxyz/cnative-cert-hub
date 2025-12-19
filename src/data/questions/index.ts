/**
 * Central Questions Index
 *
 * This file exports all certification questions from a single location.
 * Contributors can add questions to individual certification files
 * and they will be automatically available throughout the application.
 *
 * File Structure:
 * - Each certification has its own question file (e.g., kcna.ts, cka.ts)
 * - Questions follow the Question interface from types/quiz.ts
 * - Questions are organized by exam domain within each file
 *
 * How to add questions:
 * 1. Find the certification file (e.g., src/data/questions/cka.ts)
 * 2. Add your question to the appropriate domain section
 * 3. Use a unique ID following the pattern: {cert-id}-XXX (e.g., cka-001)
 * 4. Include all required fields: id, domain, question, options, correctAnswer, explanation, difficulty
 * 5. Optionally add tags for better organization
 */

import type { Question } from '../../types/quiz';

// Kubestronaut Certifications (Required for Kubestronaut)
export { kcnaQuestions } from './kcna';
export { kcsaQuestions } from './kcsa';
export { ckaQuestions } from './cka';
export { ckadQuestions } from './ckad';
export { cksQuestions } from './cks';

// Additional CNCF Certifications (Required for Golden Kubestronaut)
export { capaQuestions } from './capa';
export { cbaQuestions } from './cba';
export { ccaQuestions } from './cca';
export { cgoaQuestions } from './cgoa';
export { cnpaQuestions } from './cnpa';
export { icaQuestions } from './ica';
export { kcaQuestions } from './kca';
export { otcaQuestions } from './otca';
export { pcaQuestions } from './pca';

// Linux Foundation Certification
export { lfcsQuestions } from './lfcs';

// Import all questions for aggregation
import { kcnaQuestions } from './kcna';
import { kcsaQuestions } from './kcsa';
import { ckaQuestions } from './cka';
import { ckadQuestions } from './ckad';
import { cksQuestions } from './cks';
import { capaQuestions } from './capa';
import { cbaQuestions } from './cba';
import { ccaQuestions } from './cca';
import { cgoaQuestions } from './cgoa';
import { cnpaQuestions } from './cnpa';
import { icaQuestions } from './ica';
import { kcaQuestions } from './kca';
import { otcaQuestions } from './otca';
import { pcaQuestions } from './pca';
import { lfcsQuestions } from './lfcs';

/**
 * Map of certification ID to questions array
 * Use this to get questions for a specific certification
 */
export const questionsByCertification: Record<string, Question[]> = {
  // Kubestronaut certifications
  kcna: kcnaQuestions,
  kcsa: kcsaQuestions,
  cka: ckaQuestions,
  ckad: ckadQuestions,
  cks: cksQuestions,
  // Additional CNCF certifications
  capa: capaQuestions,
  cba: cbaQuestions,
  cca: ccaQuestions,
  cgoa: cgoaQuestions,
  cnpa: cnpaQuestions,
  ica: icaQuestions,
  kca: kcaQuestions,
  otca: otcaQuestions,
  pca: pcaQuestions,
  // Linux Foundation
  lfcs: lfcsQuestions,
};

/**
 * Get questions for a specific certification
 * @param certId - The certification ID (e.g., 'kcna', 'cka')
 * @returns Array of questions for that certification, or empty array if not found
 */
export function getQuestionsByCertification(certId: string): Question[] {
  return questionsByCertification[certId.toLowerCase()] || [];
}

/**
 * Get all questions across all certifications
 * @returns Array of all questions
 */
export function getAllQuestions(): Question[] {
  return Object.values(questionsByCertification).flat();
}

/**
 * Get question count for a specific certification
 * @param certId - The certification ID
 * @returns Number of questions available
 */
export function getQuestionCount(certId: string): number {
  return getQuestionsByCertification(certId).length;
}

/**
 * Get questions filtered by domain
 * @param certId - The certification ID
 * @param domain - The domain name to filter by
 * @returns Array of questions matching the domain
 */
export function getQuestionsByDomain(certId: string, domain: string): Question[] {
  return getQuestionsByCertification(certId).filter(
    (q) => q.domain.toLowerCase() === domain.toLowerCase()
  );
}

/**
 * Get questions filtered by difficulty
 * @param certId - The certification ID
 * @param difficulty - The difficulty level ('easy', 'medium', 'hard')
 * @returns Array of questions matching the difficulty
 */
export function getQuestionsByDifficulty(
  certId: string,
  difficulty: 'easy' | 'medium' | 'hard'
): Question[] {
  return getQuestionsByCertification(certId).filter((q) => q.difficulty === difficulty);
}

/**
 * Get questions filtered by tags
 * @param certId - The certification ID
 * @param tags - Array of tags to filter by (matches any tag)
 * @returns Array of questions matching any of the tags
 */
export function getQuestionsByTags(certId: string, tags: string[]): Question[] {
  const lowerTags = tags.map((t) => t.toLowerCase());
  return getQuestionsByCertification(certId).filter(
    (q) => q.tags?.some((tag) => lowerTags.includes(tag.toLowerCase()))
  );
}
