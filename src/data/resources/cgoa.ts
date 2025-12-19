/**
 * CGOA - Certified GitOps Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const cgoaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cgoa/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/argoproj/argo-cd',
    'https://github.com/fluxcd/flux2',
    'https://github.com/open-gitops/documents',
  ],
  practice: [
    'https://kodekloud.com/courses/certified-gitops-associate-cgoa/',
    'https://killercoda.com/argoproj/courses',
  ],

  books: [
    {
      title: 'GitOps and Kubernetes',
      url: 'https://www.manning.com/books/gitops-and-kubernetes',
      author: 'Billy Yuen, Alexander Matyushentsev, Todd Ekenstam, Jesse Suen',
      description: 'Continuous deployment with Argo CD, Jenkins X, and Flux',
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
      description: 'Comprehensive Kubernetes guide with GitOps chapters',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'Certified GitOps Associate (CGOA)',
      url: 'https://training.linuxfoundation.org/training/certified-gitops-associate-cgoa/',
      author: 'The Linux Foundation',
      description: 'Official CGOA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'CGOA Certification Course',
      url: 'https://kodekloud.com/courses/certified-gitops-associate-cgoa/',
      author: 'KodeKloud',
      description: 'Complete CGOA preparation with hands-on labs',
      isPaid: true,
      duration: '12 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Introduction to GitOps (LFS169)',
      url: 'https://training.linuxfoundation.org/training/introduction-to-gitops-lfs169/',
      author: 'The Linux Foundation',
      description: 'Free introduction to GitOps principles',
      isPaid: false,
      duration: '10 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'GitOps with Argo CD',
      url: 'https://codefresh.io/learn/argo-cd/',
      author: 'Codefresh',
      description: 'Free Argo CD and GitOps course',
      isPaid: false,
      duration: '8 hours',
      difficulty: 'beginner',
      rating: 4.6,
    },
  ],

  videos: [
    {
      title: 'GitOps with ArgoCD Full Course',
      url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs',
      author: 'TechWorld with Nana',
      description: 'Complete GitOps and Argo CD tutorial',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Flux CD Tutorial',
      url: 'https://www.youtube.com/watch?v=R6OeIgb7lUI',
      author: 'DevOps Toolkit',
      description: 'GitOps with Flux CD tutorial',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'intermediate',
    },
    {
      title: 'GitOps Principles Explained',
      url: 'https://www.youtube.com/watch?v=f5EpcWp0THw',
      author: 'CNCF',
      description: 'Understanding GitOps principles',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'beginner',
    },
  ],

  documentation: [
    {
      title: 'OpenGitOps',
      url: 'https://opengitops.dev/',
      description: 'OpenGitOps principles and specifications',
      isPaid: false,
    },
    {
      title: 'CGOA Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/CGOA_Curriculum.pdf',
      description: 'Official CGOA exam curriculum',
      isPaid: false,
    },
    {
      title: 'Argo CD Documentation',
      url: 'https://argo-cd.readthedocs.io/',
      description: 'Official Argo CD documentation',
      isPaid: false,
    },
    {
      title: 'Flux Documentation',
      url: 'https://fluxcd.io/docs/',
      description: 'Official Flux CD documentation',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CGOA Exam Study Guide',
      url: 'https://devopscube.com/cgoa-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive CGOA study guide',
      isPaid: false,
    },
    {
      title: 'GitOps Best Practices',
      url: 'https://www.weave.works/blog/gitops-best-practices',
      author: 'Weaveworks',
      description: 'GitOps implementation best practices',
      isPaid: false,
    },
    {
      title: 'Argo CD Blog',
      url: 'https://blog.argoproj.io/',
      author: 'Argo Project',
      description: 'Latest updates from Argo project',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'CNCF Slack - #gitops',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with GitOps channels',
      isPaid: false,
    },
    {
      title: 'Argo Project Slack',
      url: 'https://argoproj.github.io/community/join-slack/',
      description: 'Argo project Slack community',
      isPaid: false,
    },
    {
      title: 'Flux Slack',
      url: 'https://slack.cncf.io/',
      description: 'Flux community on CNCF Slack',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Argo CD',
      url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/',
      description: 'Declarative GitOps CD for Kubernetes',
      isPaid: false,
    },
    {
      title: 'Flux',
      url: 'https://fluxcd.io/docs/get-started/',
      description: 'GitOps toolkit for Kubernetes',
      isPaid: false,
    },
    {
      title: 'Killercoda Argo Scenarios',
      url: 'https://killercoda.com/argoproj/courses',
      description: 'Interactive Argo CD scenarios',
      isPaid: false,
    },
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes for GitOps practice',
      isPaid: false,
    },
  ],
};
