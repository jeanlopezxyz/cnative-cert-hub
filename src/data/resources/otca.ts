/**
 * OTCA - OpenTelemetry Certified Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const otcaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/otca/',
  github: [
    'https://github.com/open-telemetry/opentelemetry-specification',
    'https://github.com/open-telemetry/opentelemetry-collector',
    'https://github.com/open-telemetry/opentelemetry-demo',
    'https://github.com/cncf/curriculum',
  ],
  practice: [
    {
      title: 'OpenTelemetry Demo',
      url: 'https://opentelemetry.io/docs/demo/',
      description: 'Complete demo application with OpenTelemetry instrumentation',
      isPaid: false,
      type: 'playground',
      difficulty: 'intermediate',
    },
    {
      title: 'Aspecto OpenTelemetry Bootcamp',
      url: 'https://www.aspecto.io/opentelemetry-bootcamp/',
      description: 'Free interactive OpenTelemetry labs and exercises',
      isPaid: false,
      type: 'lab',
      difficulty: 'beginner',
    },
  ],

  books: [
    {
      title: 'Observability Engineering',
      url: 'https://www.oreilly.com/library/view/observability-engineering/9781492076438/',
      author: 'Charity Majors, Liz Fong-Jones, George Miranda',
      description: 'Achieving production excellence through observability',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Cloud Native Observability with OpenTelemetry',
      url: 'https://www.packtpub.com/product/cloud-native-observability-with-opentelemetry/9781801077705',
      author: 'Alex Boten',
      description: 'Learn to collect, process, and export telemetry data',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Learning OpenTelemetry',
      url: 'https://www.oreilly.com/library/view/learning-opentelemetry/9781098147174/',
      author: 'Ted Young, Austin Parker',
      description: 'Setting up and operating OpenTelemetry for cloud native applications',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'OpenTelemetry Certified Associate (OTCA)',
      url: 'https://training.linuxfoundation.org/training/opentelemetry-certified-associate-otca/',
      author: 'The Linux Foundation',
      description: 'Official OTCA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'Getting Started with OpenTelemetry (LFS148)',
      url: 'https://training.linuxfoundation.org/training/getting-started-with-opentelemetry-lfs148/',
      author: 'The Linux Foundation',
      description: 'Learn to use OpenTelemetry to build and manage unified observability',
      isPaid: false,
      duration: '15-20 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'Getting Started with OpenTelemetry',
      url: 'https://opentelemetry.io/docs/getting-started/',
      author: 'OpenTelemetry',
      description: 'Official getting started guide',
      isPaid: false,
      duration: 'Self-paced',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'OpenTelemetry Bootcamp',
      url: 'https://www.aspecto.io/opentelemetry-bootcamp/',
      author: 'Aspecto',
      description: 'Free OpenTelemetry fundamentals course',
      isPaid: false,
      duration: '8 hours',
      difficulty: 'beginner',
      rating: 4.6,
    },
  ],

  videos: [
    {
      title: 'OpenTelemetry Course - Observability',
      url: 'https://www.youtube.com/watch?v=r8UvWSX3KA8',
      author: 'TechWorld with Nana',
      description: 'Complete OpenTelemetry tutorial',
      isPaid: false,
      duration: '2 hours',
      difficulty: 'beginner',
    },
    {
      title: 'OpenTelemetry Deep Dive',
      url: 'https://www.youtube.com/watch?v=Txe4ji4EDUA',
      author: 'CNCF',
      description: 'In-depth look at OpenTelemetry',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'intermediate',
    },
    {
      title: 'Getting Started with OpenTelemetry Collector',
      url: 'https://www.youtube.com/watch?v=cJdxJKSxMI0',
      author: 'OpenTelemetry',
      description: 'OpenTelemetry Collector tutorial',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'OpenTelemetry Official Documentation',
      url: 'https://opentelemetry.io/docs/',
      description: 'Complete OpenTelemetry documentation - primary exam reference',
      isPaid: false,
    },
    {
      title: 'OpenTelemetry Specification',
      url: 'https://opentelemetry.io/docs/specs/',
      description: 'OpenTelemetry specification documentation',
      isPaid: false,
    },
    {
      title: 'OpenTelemetry Collector',
      url: 'https://opentelemetry.io/docs/collector/',
      description: 'OpenTelemetry Collector documentation',
      isPaid: false,
    },
    {
      title: 'OpenTelemetry Instrumentation',
      url: 'https://opentelemetry.io/docs/instrumentation/',
      description: 'Language-specific instrumentation guides',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'OTCA Exam Study Guide',
      url: 'https://devopscube.com/otca-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive OTCA study guide',
      isPaid: false,
    },
    {
      title: 'OpenTelemetry Blog',
      url: 'https://opentelemetry.io/blog/',
      author: 'OpenTelemetry',
      description: 'Official OpenTelemetry blog',
      isPaid: false,
    },
    {
      title: 'Observability Guide',
      url: 'https://newrelic.com/blog/best-practices/what-is-opentelemetry',
      author: 'New Relic',
      description: 'Introduction to OpenTelemetry',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'OpenTelemetry Slack',
      url: 'https://cloud-native.slack.com/',
      description: 'OpenTelemetry channels on CNCF Slack',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #opentelemetry',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with OpenTelemetry channels',
      isPaid: false,
    },
    {
      title: 'OpenTelemetry GitHub Discussions',
      url: 'https://github.com/open-telemetry/opentelemetry-specification/discussions',
      description: 'OpenTelemetry community discussions',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'OpenTelemetry Collector',
      url: 'https://opentelemetry.io/docs/collector/getting-started/',
      description: 'OpenTelemetry Collector for practice',
      isPaid: false,
    },
    {
      title: 'Jaeger',
      url: 'https://www.jaegertracing.io/',
      description: 'Distributed tracing platform',
      isPaid: false,
    },
    {
      title: 'Grafana',
      url: 'https://grafana.com/',
      description: 'Visualization for OpenTelemetry data',
      isPaid: false,
    },
  ],
};
