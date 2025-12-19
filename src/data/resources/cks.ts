/**
 * CKS - Certified Kubernetes Security Specialist
 * Study Resources
 *
 * How to contribute:
 * 1. Add new resources to the appropriate category
 * 2. Follow the resource interface for each type
 * 3. Include all required fields
 * 4. Verify URLs are valid and accessible
 */

import type { CertificationResources } from '../../types';

export const cksResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cks/',
  github: [
    'https://github.com/walidshaari/Certified-Kubernetes-Security-Specialist',
    'https://github.com/kodekloudhub/certified-kubernetes-security-specialist-cks-course',
  ],
  practice: [
    'https://killer.sh',
    'https://kodekloud.com/courses/certified-kubernetes-security-specialist-cks/',
    'https://killercoda.com/killer-shell-cks',
  ],
  books: [],
  courses: [],
  videos: [],
  documentation: [
    {
      title: 'Kubernetes Security Documentation',
      url: 'https://kubernetes.io/docs/concepts/security/',
      description: 'Official Kubernetes security documentation',
      isPaid: false,
    },
  ],
  communities: [],
  tools: [],
};
