/**
 * OTCA - OpenTelemetry Certified Associate
 * Study Resources
 */

import type { CertificationResources } from '../../types';

export const otcaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/otca/',
  github: [
    'https://github.com/open-telemetry/opentelemetry-specification',
    'https://github.com/open-telemetry/opentelemetry-collector',
    'https://github.com/cncf/curriculum',
  ],
  practice: ['https://killercoda.com/opentelemetry'],
  books: [],
  courses: [],
  videos: [],
  documentation: [
    {
      title: 'OpenTelemetry Documentation',
      url: 'https://opentelemetry.io/docs/',
      description: 'Official OpenTelemetry documentation',
      isPaid: false,
    },
  ],
  communities: [],
  tools: [],
};
