/**
 * KCSA - Kubernetes and Cloud Security Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const kcsaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/kcsa/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/moabukar/Kubernetes-and-Cloud-Security-Associate-KCSA',
    'https://github.com/ahmetb/kubernetes-network-policy-recipes',
  ],
  practice: [
    'https://kodekloud.com/courses/kubernetes-and-cloud-security-associate-kcsa/',
    'https://killercoda.com/playgrounds/scenario/kubernetes',
  ],

  books: [
    {
      title: 'Kubernetes Security and Observability',
      url: 'https://www.oreilly.com/library/view/kubernetes-security-and/9781098107093/',
      author: 'Brendan Creane, Amit Gupta',
      description: 'Comprehensive guide to Kubernetes security',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Container Security',
      url: 'https://www.oreilly.com/library/view/container-security/9781492056690/',
      author: 'Liz Rice',
      description: 'Fundamental concepts for securing containers',
      isPaid: true,
      format: 'paperback',
      year: 2020,
      difficulty: 'intermediate',
    },
    {
      title: 'Kubernetes: Up and Running, 3rd Edition',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower, Lachlan Evenson',
      description: 'Comprehensive Kubernetes guide with security fundamentals',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'beginner',
    },
  ],

  courses: [
    {
      title: 'Kubernetes and Cloud Security Associate (KCSA)',
      url: 'https://training.linuxfoundation.org/training/kubernetes-and-cloud-security-associate-kcsa/',
      author: 'The Linux Foundation',
      description: 'Official KCSA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'KCSA Certification Course',
      url: 'https://kodekloud.com/courses/kubernetes-and-cloud-security-associate-kcsa/',
      author: 'KodeKloud',
      description: 'Complete KCSA preparation with practice tests',
      isPaid: true,
      duration: '12 hours',
      difficulty: 'beginner',
      rating: 4.9,
    },
    {
      title: 'Introduction to Kubernetes (LFS158)',
      url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes',
      author: 'The Linux Foundation',
      description: 'Free foundational Kubernetes course',
      isPaid: false,
      duration: '16 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Kubernetes Security Fundamentals',
      url: 'https://www.pluralsight.com/courses/kubernetes-security-fundamentals',
      author: 'Pluralsight',
      description: 'Security fundamentals for Kubernetes',
      isPaid: true,
      duration: '4 hours',
      difficulty: 'beginner',
      rating: 4.6,
    },
  ],

  videos: [
    {
      title: 'KCSA Full Course 2024',
      url: 'https://www.youtube.com/watch?v=Rq6n_MNkH1A',
      author: 'TechWorld with Nana',
      description: 'Complete KCSA preparation course',
      isPaid: false,
      duration: '3 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes Security Basics',
      url: 'https://www.youtube.com/watch?v=oBf5lrmquYI',
      author: 'Google Cloud Tech',
      description: 'Introduction to Kubernetes security',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'beginner',
    },
    {
      title: 'Cloud Native Security Fundamentals',
      url: 'https://www.youtube.com/watch?v=mTKBLpCLqPc',
      author: 'CNCF',
      description: 'Cloud native security concepts and best practices',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'beginner',
    },
  ],

  documentation: [
    {
      title: 'Kubernetes Security Overview',
      url: 'https://kubernetes.io/docs/concepts/security/overview/',
      description: 'Official Kubernetes security overview',
      isPaid: false,
    },
    {
      title: 'KCSA Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/KCSA_Curriculum.pdf',
      description: 'Official KCSA exam curriculum',
      isPaid: false,
    },
    {
      title: 'Pod Security Standards',
      url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/',
      description: 'Understanding pod security policies',
      isPaid: false,
    },
    {
      title: 'CNCF Cloud Native Security Whitepaper',
      url: 'https://github.com/cncf/tag-security/tree/main/security-whitepaper',
      description: 'CNCF security whitepaper and best practices',
      isPaid: false,
    },
    {
      title: 'Cloud Native Glossary',
      url: 'https://glossary.cncf.io/',
      description: 'Cloud Native terminology including security terms',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'KCSA Exam Study Guide',
      url: 'https://kodekloud.com/blog/kcsa-exam-guide/',
      author: 'KodeKloud',
      description: 'Comprehensive KCSA study guide',
      isPaid: false,
    },
    {
      title: 'Kubernetes Security Best Practices',
      url: 'https://sysdig.com/learn-cloud-native/kubernetes-security/',
      author: 'Sysdig',
      description: 'Essential Kubernetes security practices',
      isPaid: false,
    },
    {
      title: 'CNCF Blog - Security',
      url: 'https://www.cncf.io/blog/',
      author: 'CNCF',
      description: 'Latest cloud native security news',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'CNCF Slack',
      url: 'https://slack.cncf.io/',
      description: 'Official CNCF community with security channels',
      isPaid: false,
    },
    {
      title: 'Kubernetes Slack',
      url: 'https://slack.k8s.io/',
      description: 'Official Kubernetes Slack workspace',
      isPaid: false,
    },
    {
      title: 'r/kubernetes Reddit',
      url: 'https://www.reddit.com/r/kubernetes/',
      description: 'Active community for Kubernetes security discussions',
      isPaid: false,
    },
    {
      title: 'CNCF TAG Security',
      url: 'https://github.com/cncf/tag-security',
      description: 'CNCF Security Technical Advisory Group',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Killercoda Kubernetes Playground',
      url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
      description: 'Free browser-based Kubernetes environment',
      isPaid: false,
    },
    {
      title: 'Trivy',
      url: 'https://trivy.dev/',
      description: 'Container vulnerability scanner',
      isPaid: false,
    },
    {
      title: 'Falco',
      url: 'https://falco.org/',
      description: 'Cloud native runtime security',
      isPaid: false,
    },
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes for learning',
      isPaid: false,
    },
    {
      title: 'kube-bench',
      url: 'https://github.com/aquasecurity/kube-bench',
      description: 'CIS Kubernetes Benchmark tool',
      isPaid: false,
    },
  ],
};
