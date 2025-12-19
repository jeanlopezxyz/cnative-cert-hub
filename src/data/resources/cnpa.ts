/**
 * CNPA - Certified Cloud Native Platform Engineering Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const cnpaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cnpa/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/cncf/tag-app-delivery',
  ],
  practice: [
    'https://killercoda.com/playgrounds/scenario/kubernetes',
  ],

  books: [
    {
      title: 'Platform Engineering on Kubernetes',
      url: 'https://www.manning.com/books/platform-engineering-on-kubernetes',
      author: 'Mauricio Salatino',
      description: 'Building production-ready platforms on Kubernetes',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Kubernetes: Up and Running, 3rd Edition',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower, Lachlan Evenson',
      description: 'Comprehensive Kubernetes guide for platform engineering',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Cloud Native DevOps with Kubernetes, 2nd Edition',
      url: 'https://www.oreilly.com/library/view/cloud-native-devops/9781098116811/',
      author: 'John Arundel, Justin Domingus',
      description: 'Building and scaling platforms in the cloud',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Team Topologies',
      url: 'https://teamtopologies.com/book',
      author: 'Matthew Skelton, Manuel Pais',
      description: 'Organizing teams for fast flow - essential for platform teams',
      isPaid: true,
      format: 'paperback',
      year: 2019,
      difficulty: 'beginner',
    },
  ],

  courses: [
    {
      title: 'Cloud Native Platform Engineer Associate (CNPA)',
      url: 'https://training.linuxfoundation.org/training/cloud-native-platform-engineer-associate-cnpa/',
      author: 'The Linux Foundation',
      description: 'Official CNPA preparation course',
      isPaid: true,
      duration: '20 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'Introduction to Platform Engineering',
      url: 'https://platformengineering.org/blog/what-is-platform-engineering',
      author: 'Platform Engineering Community',
      description: 'Introduction to platform engineering concepts',
      isPaid: false,
      duration: 'Self-paced',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'Kubernetes Administrator (CKA)',
      url: 'https://training.linuxfoundation.org/training/kubernetes-fundamentals/',
      author: 'The Linux Foundation',
      description: 'Foundational Kubernetes skills for platform engineers',
      isPaid: true,
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
  ],

  videos: [
    {
      title: 'What is Platform Engineering?',
      url: 'https://www.youtube.com/watch?v=ghzsBm8vOms',
      author: 'TechWorld with Nana',
      description: 'Introduction to platform engineering',
      isPaid: false,
      duration: '30 minutes',
      difficulty: 'beginner',
    },
    {
      title: 'Platform Engineering on Kubernetes',
      url: 'https://www.youtube.com/watch?v=O1mMVh8MqXk',
      author: 'CNCF',
      description: 'Building platforms on Kubernetes',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'intermediate',
    },
    {
      title: 'Internal Developer Platforms',
      url: 'https://www.youtube.com/watch?v=ZDxzJGlg7Fs',
      author: 'DevOps Toolkit',
      description: 'Building internal developer platforms',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'CNCF TAG App Delivery',
      url: 'https://tag-app-delivery.cncf.io/',
      description: 'Platform engineering resources from CNCF',
      isPaid: false,
    },
    {
      title: 'CNPA Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/CNPA_Curriculum.pdf',
      description: 'Official CNPA exam curriculum',
      isPaid: false,
    },
    {
      title: 'Platform Engineering Maturity Model',
      url: 'https://tag-app-delivery.cncf.io/wgs/platforms/maturity-model/',
      description: 'Platform engineering maturity assessment',
      isPaid: false,
    },
    {
      title: 'Kubernetes Documentation',
      url: 'https://kubernetes.io/docs/',
      description: 'Kubernetes documentation for platform engineers',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CNPA Exam Study Guide',
      url: 'https://devopscube.com/cnpa-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive CNPA study guide',
      isPaid: false,
    },
    {
      title: 'Platform Engineering Blog',
      url: 'https://platformengineering.org/blog',
      author: 'Platform Engineering Community',
      description: 'Platform engineering best practices',
      isPaid: false,
    },
    {
      title: 'Humanitec Blog',
      url: 'https://humanitec.com/blog',
      author: 'Humanitec',
      description: 'Platform engineering insights',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Platform Engineering Slack',
      url: 'https://platformengineering.org/slack',
      description: 'Platform engineering community Slack',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #platform-engineering',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with platform engineering channels',
      isPaid: false,
    },
    {
      title: 'PlatformCon',
      url: 'https://platformcon.com/',
      description: 'Platform engineering conference community',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Backstage',
      url: 'https://backstage.io/',
      description: 'Developer portal framework',
      isPaid: false,
    },
    {
      title: 'Crossplane',
      url: 'https://crossplane.io/',
      description: 'Cloud native infrastructure management',
      isPaid: false,
    },
    {
      title: 'Argo CD',
      url: 'https://argo-cd.readthedocs.io/',
      description: 'GitOps continuous delivery',
      isPaid: false,
    },
    {
      title: 'Kubevela',
      url: 'https://kubevela.io/',
      description: 'Application delivery platform',
      isPaid: false,
    },
  ],
};
