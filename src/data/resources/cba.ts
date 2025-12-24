/**
 * CBA - Certified Backstage Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const cbaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cba/',
  github: [
    'https://github.com/backstage/backstage',
    'https://github.com/cncf/curriculum',
    'https://github.com/backstage/community',
  ],
  practice: [
    {
      title: 'Backstage Demo',
      url: 'https://demo.backstage.io/',
      description: 'Live Backstage demo instance for hands-on exploration',
      isPaid: false,
      type: 'playground',
      difficulty: 'beginner',
    },
    {
      title: 'Create Backstage App',
      url: 'https://backstage.io/docs/getting-started/create-an-app',
      description: 'Quick start to create and explore a Backstage app locally',
      isPaid: false,
      type: 'lab',
      difficulty: 'beginner',
    },
  ],

  books: [
    {
      title: 'Building Developer Portals with Backstage',
      url: 'https://www.oreilly.com/library/view/building-developer-portals/9781098143633/',
      author: 'André Wanlin',
      description: 'Complete guide to Backstage - essential for CBA exam',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Platform Engineering on Kubernetes',
      url: 'https://www.manning.com/books/platform-engineering-on-kubernetes',
      author: 'Mauricio Salatino',
      description: 'Building platforms including developer portals like Backstage',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Team Topologies',
      url: 'https://teamtopologies.com/book',
      author: 'Matthew Skelton, Manuel Pais',
      description: 'Organizing teams for fast flow - context for platform teams',
      isPaid: true,
      format: 'paperback',
      year: 2019,
      difficulty: 'beginner',
    },
  ],

  courses: [
    {
      title: 'Certified Backstage Associate (CBA)',
      url: 'https://training.linuxfoundation.org/training/certified-backstage-associate-cba/',
      author: 'The Linux Foundation',
      description: 'Official CBA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'Introduction to Backstage',
      url: 'https://roadie.io/backstage-weekly/',
      author: 'Roadie',
      description: 'Backstage tutorials and best practices',
      isPaid: false,
      duration: 'Self-paced',
      difficulty: 'beginner',
      rating: 4.6,
    },
    {
      title: 'Backstage for Beginners',
      url: 'https://www.youtube.com/playlist?list=PLj6h78yzYM2Oq3ZOAZCqhnFT1zqq3j6xP',
      author: 'Spotify Engineering',
      description: 'Getting started with Backstage',
      isPaid: false,
      duration: '5 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
  ],

  videos: [
    {
      title: 'Docker for Beginners',
      url: 'https://kodekloud.com/courses/docker-for-the-absolute-beginner/',
      author: 'KodeKloud',
      description: 'Container fundamentals - prerequisite for CBA',
      isPaid: true,
      duration: '4 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes for Beginners',
      url: 'https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on/',
      author: 'KodeKloud',
      description: 'Kubernetes basics - prerequisite for CBA',
      isPaid: true,
      duration: '6 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Backstage Tutorial - Developer Portal',
      url: 'https://www.youtube.com/watch?v=85TQEpNCaU0',
      author: 'TechWorld with Nana',
      description: 'Complete Backstage tutorial',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Backstage by Spotify - Platform Engineering',
      url: 'https://www.youtube.com/watch?v=BO0xdmD8Pwc',
      author: 'CNCF',
      description: 'Introduction to Backstage and platform engineering',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'beginner',
    },
    {
      title: 'Building Plugins for Backstage',
      url: 'https://www.youtube.com/watch?v=3JNS_Bx8Hzc',
      author: 'Spotify Engineering',
      description: 'Creating custom Backstage plugins',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Backstage Official Documentation',
      url: 'https://backstage.io/docs/',
      description: 'Complete Backstage documentation - primary exam reference',
      isPaid: false,
    },
    {
      title: 'Backstage Software Catalog',
      url: 'https://backstage.io/docs/features/software-catalog/',
      description: 'Understanding the software catalog',
      isPaid: false,
    },
    {
      title: 'Backstage Plugins',
      url: 'https://backstage.io/docs/plugins/',
      description: 'Backstage plugin documentation',
      isPaid: false,
    },
    {
      title: 'Backstage Software Templates',
      url: 'https://backstage.io/docs/features/software-templates/',
      description: 'Creating and using software templates',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CBA Exam Study Guide',
      url: 'https://devopscube.com/cba-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive CBA study guide',
      isPaid: false,
    },
    {
      title: 'Backstage Blog',
      url: 'https://backstage.io/blog/',
      author: 'Backstage',
      description: 'Official Backstage blog',
      isPaid: false,
    },
    {
      title: 'Roadie Backstage Blog',
      url: 'https://roadie.io/blog/',
      author: 'Roadie',
      description: 'Backstage insights and tutorials',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Backstage Discord',
      url: 'https://discord.gg/backstage-687207715902193673',
      description: 'Official Backstage Discord community',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #backstage',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with Backstage channel',
      isPaid: false,
    },
    {
      title: 'Backstage Community',
      url: 'https://github.com/backstage/community',
      description: 'Backstage community resources',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Backstage CLI',
      url: 'https://backstage.io/docs/local-dev/cli-overview/',
      description: 'Backstage command-line interface',
      isPaid: false,
    },
  ],
};
