/**
 * CAPA - Certified Argo Project Associate
 * Study Resources
 */

import type { CertificationResources } from '../../types';

export const capaResources: CertificationResources = {
  official: 'https://training.linuxfoundation.org/certification/certified-argo-project-associate-capa/',
  github: [
    'https://github.com/argoproj/argo-cd',
    'https://github.com/argoproj/argo-workflows',
    'https://github.com/cncf/curriculum',
  ],
  practice: ['https://killercoda.com/argoproj/courses'],
  books: [],
  courses: [],
  videos: [],
  documentation: [
    {
      title: 'Argo CD Documentation',
      url: 'https://argo-cd.readthedocs.io/',
      description: 'Official Argo CD documentation',
      isPaid: false,
    },
  ],
  communities: [],
  tools: [],
};
