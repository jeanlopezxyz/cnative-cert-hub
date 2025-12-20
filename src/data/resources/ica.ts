/**
 * ICA - Istio Certified Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const icaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/ica/',
  github: [
    'https://github.com/istio/istio',
    'https://github.com/cncf/curriculum',
    'https://github.com/istio/istio.io',
    'https://github.com/tetratelabs/istio-weekly',
  ],
  practice: [
    {
      title: 'Tetrate Academy Labs',
      url: 'https://academy.tetrate.io/courses/istio-fundamentals',
      description: 'Free interactive Istio labs from Tetrate',
      isPaid: false,
      type: 'lab',
      difficulty: 'beginner',
    },
    {
      title: 'KodeKloud ICA Labs',
      url: 'https://kodekloud.com/courses/istio-certified-associate-ica/',
      description: 'Interactive ICA practice labs with hands-on exercises',
      isPaid: true,
      type: 'lab',
      difficulty: 'intermediate',
    },
  ],

  books: [
    {
      title: 'Istio in Action',
      url: 'https://www.manning.com/books/istio-in-action',
      author: 'Christian Posta, Rinor Maloku',
      description: 'Comprehensive guide to Istio service mesh',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Getting Started with Istio Service Mesh, 2nd Edition',
      url: 'https://www.oreilly.com/library/view/getting-started-with/9781803232805/',
      author: 'Rahul Sharma, Avinash Singh',
      description: 'Practical guide to managing microservices with Istio',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'beginner',
    },
    {
      title: 'Service Mesh Patterns',
      url: 'https://www.oreilly.com/library/view/service-mesh-patterns/9781492086444/',
      author: 'Lee Calcote, Nic Jackson',
      description: 'Service mesh implementation patterns and best practices',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'Istio Certified Associate (ICA)',
      url: 'https://training.linuxfoundation.org/training/istio-certified-associate-ica/',
      author: 'The Linux Foundation',
      description: 'Official ICA preparation course',
      isPaid: true,
      duration: '20 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'ICA Certification Course',
      url: 'https://kodekloud.com/courses/istio-certified-associate-ica/',
      author: 'KodeKloud',
      description: 'Complete ICA preparation with hands-on labs',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Introduction to Istio (LFS144)',
      url: 'https://training.linuxfoundation.org/training/introduction-to-istio-lfs144/',
      author: 'The Linux Foundation',
      description: 'Learn how to monitor, connect, and secure microservices using Istio',
      isPaid: false,
      duration: '15-20 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'Istio Fundamentals',
      url: 'https://academy.tetrate.io/courses/istio-fundamentals',
      author: 'Tetrate Academy',
      description: 'Free Istio fundamentals course from Tetrate',
      isPaid: false,
      duration: '8 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'Certified Istio Administrator',
      url: 'https://academy.tetrate.io/courses/certified-istio-administrator',
      author: 'Tetrate Academy',
      description: 'Advanced Istio administration course',
      isPaid: true,
      duration: '20 hours',
      difficulty: 'advanced',
      rating: 4.8,
    },
  ],

  videos: [
    {
      title: 'Istio Service Mesh Full Course',
      url: 'https://www.youtube.com/watch?v=16fgzklcF7Y',
      author: 'TechWorld with Nana',
      description: 'Complete Istio course for beginners',
      isPaid: false,
      duration: '3 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Istio Tutorial for Kubernetes',
      url: 'https://www.youtube.com/watch?v=voAyroDb6xk',
      author: 'IBM Technology',
      description: 'Introduction to Istio service mesh',
      isPaid: false,
      duration: '30 minutes',
      difficulty: 'beginner',
    },
    {
      title: 'ICA Exam Preparation',
      url: 'https://www.youtube.com/watch?v=nJCpZ5KHm8k',
      author: 'Solo.io',
      description: 'ICA exam tips and study guide',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Istio Official Documentation',
      url: 'https://istio.io/latest/docs/',
      description: 'Complete Istio documentation - primary exam reference',
      isPaid: false,
    },
    {
      title: 'ICA Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/ICA_Curriculum.pdf',
      description: 'Official ICA exam curriculum',
      isPaid: false,
    },
    {
      title: 'Istio Setup Guide',
      url: 'https://istio.io/latest/docs/setup/',
      description: 'Istio installation and setup documentation',
      isPaid: false,
    },
    {
      title: 'Traffic Management',
      url: 'https://istio.io/latest/docs/concepts/traffic-management/',
      description: 'Istio traffic management concepts',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'ICA Exam Study Guide',
      url: 'https://devopscube.com/ica-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive ICA study guide',
      isPaid: false,
    },
    {
      title: 'Istio Blog',
      url: 'https://istio.io/latest/blog/',
      author: 'Istio',
      description: 'Official Istio blog with tutorials',
      isPaid: false,
    },
    {
      title: 'Tetrate Blog - Istio',
      url: 'https://tetrate.io/blog/',
      author: 'Tetrate',
      description: 'Istio insights from Tetrate',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Istio Slack',
      url: 'https://slack.istio.io/',
      description: 'Official Istio Slack workspace',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #istio',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with Istio channels',
      isPaid: false,
    },
    {
      title: 'Istio Discuss Forum',
      url: 'https://discuss.istio.io/',
      description: 'Istio community discussion forum',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Istio',
      url: 'https://istio.io/latest/docs/setup/getting-started/',
      description: 'Install Istio for local practice',
      isPaid: false,
    },
    {
      title: 'Kiali',
      url: 'https://kiali.io/',
      description: 'Istio service mesh observability dashboard',
      isPaid: false,
    },
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes for Istio practice',
      isPaid: false,
    },
    {
      title: 'Kind',
      url: 'https://kind.sigs.k8s.io/',
      description: 'Kubernetes in Docker for local clusters',
      isPaid: false,
    },
  ],
};
