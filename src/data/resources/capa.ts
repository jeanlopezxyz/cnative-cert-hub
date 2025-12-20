/**
 * CAPA - Certified Argo Project Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const capaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/capa/',
  github: [
    'https://github.com/argoproj/argo-cd',
    'https://github.com/argoproj/argo-workflows',
    'https://github.com/argoproj/argo-rollouts',
    'https://github.com/argoproj/argo-events',
    'https://github.com/cncf/curriculum',
  ],
  practice: [
    {
      title: 'Killercoda Argo Scenarios',
      url: 'https://killercoda.com/argoproj/courses',
      description: 'Interactive Argo project scenarios for hands-on practice',
      isPaid: false,
      type: 'scenario',
      difficulty: 'intermediate',
    },
    {
      title: 'KodeKloud CAPA Labs',
      url: 'https://kodekloud.com/courses/certified-argo-project-associate-capa/',
      description: 'Interactive CAPA practice labs with hands-on exercises',
      isPaid: true,
      type: 'lab',
      difficulty: 'intermediate',
    },
  ],

  books: [
    {
      title: 'GitOps and Kubernetes',
      url: 'https://www.manning.com/books/gitops-and-kubernetes',
      author: 'Billy Yuen, Alexander Matyushentsev, Todd Ekenstam, Jesse Suen',
      description: 'Continuous deployment with Argo CD',
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
      title: 'Argo Workflows: The Definitive Guide',
      url: 'https://www.packtpub.com/product/argo-workflows-the-definitive-guide/9781804614112',
      author: 'Pavan Kumar',
      description: 'Workflow automation on Kubernetes',
      isPaid: true,
      format: 'paperback',
      year: 2023,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'Certified Argo Project Associate (CAPA)',
      url: 'https://training.linuxfoundation.org/training/certified-argo-project-associate-capa/',
      author: 'The Linux Foundation',
      description: 'Official CAPA preparation course',
      isPaid: true,
      duration: '20 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'CAPA Certification Course',
      url: 'https://kodekloud.com/courses/certified-argo-project-associate-capa/',
      author: 'KodeKloud',
      description: 'Complete CAPA preparation with hands-on labs',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Argo CD Course',
      url: 'https://codefresh.io/learn/argo-cd/',
      author: 'Codefresh',
      description: 'Free Argo CD fundamentals',
      isPaid: false,
      duration: '8 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'Argo Workflows Course',
      url: 'https://codefresh.io/learn/argo-workflows/',
      author: 'Codefresh',
      description: 'Free Argo Workflows fundamentals',
      isPaid: false,
      duration: '6 hours',
      difficulty: 'beginner',
      rating: 4.6,
    },
  ],

  videos: [
    {
      title: 'Argo CD Full Course',
      url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs',
      author: 'TechWorld with Nana',
      description: 'Complete Argo CD tutorial',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Argo Workflows Tutorial',
      url: 'https://www.youtube.com/watch?v=UMaivwrAyTA',
      author: 'DevOps Toolkit',
      description: 'Getting started with Argo Workflows',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'intermediate',
    },
    {
      title: 'Argo Rollouts for Progressive Delivery',
      url: 'https://www.youtube.com/watch?v=hIL0E2gLkf8',
      author: 'CNCF',
      description: 'Blue-green and canary deployments',
      isPaid: false,
      duration: '45 minutes',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Argo CD Documentation',
      url: 'https://argo-cd.readthedocs.io/',
      description: 'Official Argo CD documentation',
      isPaid: false,
    },
    {
      title: 'CAPA Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/CAPA_Curriculum.pdf',
      description: 'Official CAPA exam curriculum',
      isPaid: false,
    },
    {
      title: 'Argo Workflows Documentation',
      url: 'https://argo-workflows.readthedocs.io/',
      description: 'Official Argo Workflows documentation',
      isPaid: false,
    },
    {
      title: 'Argo Rollouts Documentation',
      url: 'https://argo-rollouts.readthedocs.io/',
      description: 'Official Argo Rollouts documentation',
      isPaid: false,
    },
    {
      title: 'Argo Events Documentation',
      url: 'https://argoproj.github.io/argo-events/',
      description: 'Official Argo Events documentation',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CAPA Exam Study Guide',
      url: 'https://devopscube.com/capa-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive CAPA study guide',
      isPaid: false,
    },
    {
      title: 'Argo Project Blog',
      url: 'https://blog.argoproj.io/',
      author: 'Argo Project',
      description: 'Official Argo project blog',
      isPaid: false,
    },
    {
      title: 'Codefresh Blog - Argo',
      url: 'https://codefresh.io/blog/',
      author: 'Codefresh',
      description: 'Argo insights and tutorials',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Argo Project Slack',
      url: 'https://argoproj.github.io/community/join-slack/',
      description: 'Official Argo Slack community',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #argo',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with Argo channels',
      isPaid: false,
    },
    {
      title: 'Argo GitHub Discussions',
      url: 'https://github.com/argoproj/argo-cd/discussions',
      description: 'Argo CD community discussions',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Argo CD CLI',
      url: 'https://argo-cd.readthedocs.io/en/stable/cli_installation/',
      description: 'Argo CD command-line interface',
      isPaid: false,
    },
    {
      title: 'Argo CLI',
      url: 'https://github.com/argoproj/argo-workflows/releases',
      description: 'Argo Workflows CLI',
      isPaid: false,
    },
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes for Argo practice',
      isPaid: false,
    },
  ],
};
