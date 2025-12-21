/**
 * KCA - Kyverno Certified Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const kcaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/kca/',
  github: [
    'https://github.com/kyverno/kyverno',
    'https://github.com/kyverno/policies',
    'https://github.com/cncf/curriculum',
  ],
  practice: [
    {
      title: 'Kyverno Playground',
      url: 'https://kyverno.io/playground/',
      description: 'Online Kyverno policy testing environment',
      isPaid: false,
      type: 'playground',
      difficulty: 'beginner',
    },
    {
      title: 'Nirmata Kyverno Labs',
      url: 'https://nirmata.com/kyverno-learning-path/',
      description: 'Comprehensive Kyverno learning path with hands-on exercises',
      isPaid: false,
      type: 'lab',
      difficulty: 'intermediate',
    },
  ],

  books: [
    {
      title: 'Kubernetes Security and Observability',
      url: 'https://www.oreilly.com/library/view/kubernetes-security-and/9781098107093/',
      author: 'Brendan Creane, Amit Gupta',
      description: 'Kubernetes security including policy engines',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Kubernetes: Up and Running, 3rd Edition',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower, Lachlan Evenson',
      description: 'Comprehensive Kubernetes guide',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Hacking Kubernetes',
      url: 'https://www.oreilly.com/library/view/hacking-kubernetes/9781492081722/',
      author: 'Andrew Martin, Michael Hausenblas',
      description: 'Threat-driven analysis and policy management',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'advanced',
    },
  ],

  courses: [
    {
      title: 'Kyverno Certified Associate (KCA)',
      url: 'https://training.linuxfoundation.org/training/kyverno-certified-associate-kca/',
      author: 'The Linux Foundation',
      description: 'Official KCA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'Introduction to Kyverno',
      url: 'https://kyverno.io/docs/introduction/',
      author: 'Kyverno',
      description: 'Official Kyverno getting started guide',
      isPaid: false,
      duration: 'Self-paced',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'Kubernetes Policy Management with Kyverno',
      url: 'https://nirmata.com/kyverno-learning-path/',
      author: 'Nirmata',
      description: 'Comprehensive Kyverno learning path',
      isPaid: false,
      duration: '10 hours',
      difficulty: 'intermediate',
      rating: 4.6,
    },
  ],

  videos: [
    {
      title: 'Kyverno Tutorial - Kubernetes Policy Management',
      url: 'https://www.youtube.com/watch?v=DREjzfTzNpA',
      author: 'TechWorld with Nana',
      description: 'Complete Kyverno tutorial',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'beginner',
    },
    {
      title: 'Kyverno Deep Dive',
      url: 'https://www.youtube.com/watch?v=YBTqmlcxXWE',
      author: 'CNCF',
      description: 'In-depth look at Kyverno',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'intermediate',
    },
    {
      title: 'Kubernetes Policy with Kyverno',
      url: 'https://www.youtube.com/watch?v=Xy9xLtqeXdI',
      author: 'DevOps Toolkit',
      description: 'Kyverno policies tutorial',
      isPaid: false,
      duration: '30 minutes',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Kyverno Official Documentation',
      url: 'https://kyverno.io/docs/',
      description: 'Complete Kyverno documentation - primary exam reference',
      isPaid: false,
    },
    {
      title: 'Kyverno Policies Library',
      url: 'https://kyverno.io/policies/',
      description: 'Sample Kyverno policies library',
      isPaid: false,
    },
    {
      title: 'Kyverno Writing Policies',
      url: 'https://kyverno.io/docs/writing-policies/',
      description: 'Guide to writing Kyverno policies',
      isPaid: false,
    },
    {
      title: 'Kyverno CLI Documentation',
      url: 'https://kyverno.io/docs/kyverno-cli/',
      description: 'Kyverno CLI usage and commands',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'KCA Exam Study Guide',
      url: 'https://devopscube.com/kca-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive KCA study guide',
      isPaid: false,
    },
    {
      title: 'Kyverno Blog',
      url: 'https://kyverno.io/blog/',
      author: 'Kyverno',
      description: 'Official Kyverno blog',
      isPaid: false,
    },
    {
      title: 'Nirmata Blog - Kyverno',
      url: 'https://nirmata.com/blog/',
      author: 'Nirmata',
      description: 'Kyverno insights and tutorials',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Kyverno Slack',
      url: 'https://kubernetes.slack.com/channels/kyverno',
      description: 'Kyverno channel on Kubernetes Slack',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #kyverno',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with Kyverno channels',
      isPaid: false,
    },
    {
      title: 'Kyverno GitHub Discussions',
      url: 'https://github.com/kyverno/kyverno/discussions',
      description: 'Kyverno community discussions',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Kyverno CLI',
      url: 'https://kyverno.io/docs/kyverno-cli/',
      description: 'Kyverno command-line interface',
      isPaid: false,
    },
    {
      title: 'Kyverno Policy Library',
      url: 'https://github.com/kyverno/policies',
      description: 'Sample policies repository',
      isPaid: false,
    },
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes for Kyverno practice',
      isPaid: false,
    },
  ],
};
