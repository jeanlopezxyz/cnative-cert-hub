/**
 * CBA - Certified Backstage Associate
 * Study Resources
 */

import type { CertificationResources } from '../../types';

export const cbaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cba/',
  github: ['https://github.com/backstage/backstage', 'https://github.com/cncf/curriculum'],
  practice: ['https://demo.backstage.io/'],
  books: [],
  courses: [],
  videos: [],
  documentation: [
    {
      title: 'Backstage Documentation',
      url: 'https://backstage.io/docs/',
      description: 'Official Backstage documentation',
      isPaid: false,
    },
  ],
  communities: [],
  tools: [],
};
