/**
 * CNPE - Certified Cloud Native Platform Engineer
 * Study Resources - Updated December 2024
 *
 * NOTE: This certification will be required for Golden Kubestronaut
 * after March 1, 2026. It is currently optional.
 */

import type { CertificationResources } from '../../types';

export const cnpeResources: CertificationResources = {
  official: 'https://training.linuxfoundation.org/certification/certified-cloud-native-platform-engineer-cnpe/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/cncf/tag-app-delivery',
    'https://github.com/argoproj/argo-cd',
    'https://github.com/crossplane/crossplane',
  ],
  practice: [
    {
      title: 'Killer.sh CNPE Simulator',
      url: 'https://killer.sh/',
      description: 'Official CNPE exam simulator included with registration',
      isPaid: true,
      isOfficial: true,
      type: 'simulator',
      difficulty: 'advanced',
    },
    {
      title: 'Killercoda Platform Engineering Scenarios',
      url: 'https://killercoda.com/',
      description: 'Free interactive platform engineering scenarios',
      isPaid: false,
      type: 'scenario',
      difficulty: 'intermediate',
    },
    {
      title: 'Argo CD Playground',
      url: 'https://killercoda.com/argoproj/course/argo-cd-basics',
      description: 'Interactive Argo CD scenarios for GitOps practice',
      isPaid: false,
      type: 'scenario',
      difficulty: 'intermediate',
    },
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
      difficulty: 'advanced',
    },
    {
      title: 'GitOps and Kubernetes',
      url: 'https://www.manning.com/books/gitops-and-kubernetes',
      author: 'Billy Yuen, Alexander Matyushentsev, Todd Ekenstam, Jesse Suen',
      description: 'Continuous deployment with Argo CD - essential for CNPE',
      isPaid: true,
      format: 'paperback',
      year: 2021,
      difficulty: 'intermediate',
    },
    {
      title: 'Learning Argo CD',
      url: 'https://www.oreilly.com/library/view/learning-argo-cd/9781803233321/',
      author: 'Liviu Costea',
      description: 'Declarative GitOps CD for Kubernetes',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Kubernetes: Up and Running, 3rd Edition',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower, Lachlan Evenson',
      description: 'Foundational Kubernetes knowledge for platform engineers',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Crossplane: The Cloud Native Control Plane',
      url: 'https://www.oreilly.com/library/view/crossplane-the-cloud/9781098152376/',
      author: 'Viktor Farcic',
      description: 'Infrastructure provisioning with Crossplane',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'advanced',
    },
  ],

  courses: [
    {
      title: 'Platform Engineering on Kubernetes (LFS256)',
      url: 'https://training.linuxfoundation.org/training/platform-engineering-on-kubernetes-lfs256/',
      author: 'The Linux Foundation',
      description: 'Official advanced course for CNPE preparation',
      isPaid: true,
      duration: '30 hours',
      difficulty: 'advanced',
      rating: 4.8,
    },
    {
      title: 'GitOps with Argo CD (LFS269)',
      url: 'https://training.linuxfoundation.org/training/gitops-with-argo-cd-lfs269/',
      author: 'The Linux Foundation',
      description: 'GitOps fundamentals with Argo CD',
      isPaid: true,
      duration: '20 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Crossplane Fundamentals',
      url: 'https://www.upbound.io/learn',
      author: 'Upbound',
      description: 'Free Crossplane training from the creators',
      isPaid: false,
      duration: '10 hours',
      difficulty: 'intermediate',
      rating: 4.7,
    },
    {
      title: 'Argo CD Course',
      url: 'https://codefresh.io/learn/argo-cd/',
      author: 'Codefresh',
      description: 'Free comprehensive Argo CD course',
      isPaid: false,
      duration: '8 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
  ],

  videos: [
    {
      title: 'Platform Engineering Deep Dive',
      url: 'https://www.youtube.com/watch?v=ghzsBm8vOms',
      author: 'TechWorld with Nana',
      description: 'Complete platform engineering overview',
      isPaid: false,
      duration: '2 hours',
      difficulty: 'intermediate',
    },
    {
      title: 'Crossplane Tutorial',
      url: 'https://www.youtube.com/watch?v=n8KjVmuHm7A',
      author: 'DevOps Toolkit',
      description: 'Comprehensive Crossplane deep dive',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'advanced',
    },
    {
      title: 'Argo CD Full Course',
      url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs',
      author: 'TechWorld with Nana',
      description: 'Complete Argo CD tutorial',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'intermediate',
    },
    {
      title: 'Building Internal Developer Platforms',
      url: 'https://www.youtube.com/watch?v=ZDxzJGlg7Fs',
      author: 'DevOps Toolkit',
      description: 'IDP architecture and implementation',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'advanced',
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
      title: 'Platform Engineering Maturity Model',
      url: 'https://tag-app-delivery.cncf.io/wgs/platforms/maturity-model/',
      description: 'Official CNCF platform maturity model',
      isPaid: false,
    },
    {
      title: 'Argo CD Documentation',
      url: 'https://argo-cd.readthedocs.io/',
      description: 'Complete Argo CD documentation',
      isPaid: false,
    },
    {
      title: 'Crossplane Documentation',
      url: 'https://crossplane.io/docs/',
      description: 'Crossplane official documentation',
      isPaid: false,
    },
    {
      title: 'Backstage Documentation',
      url: 'https://backstage.io/docs/',
      description: 'Developer portal documentation',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CNPE Exam Experience',
      url: 'https://medium.com/@michatomczak_38795/how-i-passed-the-cloud-native-platform-engineer-cnpe-exam-and-what-you-can-learn-from-my-attempt-69f30f3d1458',
      author: 'Michał Tomczak',
      description: 'First-hand CNPE exam experience and tips',
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
      description: 'Internal Developer Platform insights',
      isPaid: false,
    },
    {
      title: 'Codefresh Blog - GitOps',
      url: 'https://codefresh.io/blog/',
      author: 'Codefresh',
      description: 'GitOps and Argo insights',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Platform Engineering Slack',
      url: 'https://platformengineering.org/slack',
      description: 'Active platform engineering community',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #platform-engineering',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack platform engineering channels',
      isPaid: false,
    },
    {
      title: 'Argo Project Slack',
      url: 'https://argoproj.github.io/community/join-slack/',
      description: 'Argo CD community support',
      isPaid: false,
    },
    {
      title: 'Crossplane Slack',
      url: 'https://slack.crossplane.io/',
      description: 'Crossplane community',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Argo CD',
      url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/',
      description: 'GitOps continuous delivery for Kubernetes',
      isPaid: false,
    },
    {
      title: 'Crossplane',
      url: 'https://crossplane.io/docs/getting-started/',
      description: 'Cloud native infrastructure management',
      isPaid: false,
    },
    {
      title: 'Backstage',
      url: 'https://backstage.io/docs/getting-started/',
      description: 'Developer portal framework',
      isPaid: false,
    },
    {
      title: 'Kind (Kubernetes in Docker)',
      url: 'https://kind.sigs.k8s.io/',
      description: 'Local Kubernetes clusters for practice',
      isPaid: false,
    },
  ],
};
