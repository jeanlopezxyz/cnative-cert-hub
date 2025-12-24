/**
 * KCNA - Kubernetes and Cloud Native Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const kcnaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/kcna/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/moabukar/KCNA-Kubernetes-and-Cloud-Native-Associate',
    'https://github.com/walidshaari/Kubernetes-and-Cloud-Native-Associate',
    'https://github.com/James-Quigley/KCNA-Study-Guide',
  ],
  practice: [
    {
      title: 'Killercoda - Kubernetes Playground',
      url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
      description: 'Free browser-based Kubernetes environment for practice',
      isPaid: false,
      type: 'playground',
      difficulty: 'beginner',
    },
    {
      title: 'KodeKloud KCNA Course Labs',
      url: 'https://kodekloud.com/courses/kubernetes-and-cloud-native-associate-kcna/',
      description: 'Interactive KCNA practice labs with hands-on exercises',
      isPaid: true,
      type: 'lab',
      difficulty: 'beginner',
    },
  ],

  books: [
    {
      title: 'Kubernetes: Up and Running, 3rd Edition',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower, Lachlan Evenson',
      description: 'Dive into Kubernetes - the industry standard for container orchestration',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'beginner',
    },
    {
      title: 'The KCNA Book',
      url: 'https://leanpub.com/thekcnabook',
      author: 'Nigel Poulton',
      description: 'Focused preparation for the KCNA exam with practical examples',
      isPaid: true,
      format: 'pdf',
      year: 2024,
      difficulty: 'beginner',
    },
    {
      title: 'Cloud Native DevOps with Kubernetes, 2nd Edition',
      url: 'https://www.oreilly.com/library/view/cloud-native-devops/9781098116811/',
      author: 'John Arundel, Justin Domingus',
      description: 'Build, deploy, and scale modern applications in the cloud',
      isPaid: true,
      format: 'pdf',
      year: 2024,
      difficulty: 'beginner',
    },
  ],

  courses: [
    {
      title: 'Kubernetes and Cloud Native Associate (KCNA) - Official',
      url: 'https://training.linuxfoundation.org/training/kubernetes-and-cloud-native-associate-kcna/',
      author: 'The Linux Foundation',
      description: 'Official KCNA preparation course from Linux Foundation',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Introduction to Kubernetes (LFS158)',
      url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes',
      author: 'The Linux Foundation',
      description: 'Free comprehensive introduction to Kubernetes concepts and architecture',
      isPaid: false,
      duration: '16 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Introduction to Cloud Infrastructure Technologies (LFS151)',
      url: 'https://training.linuxfoundation.org/training/introduction-to-cloud-infrastructure-technologies/',
      author: 'The Linux Foundation',
      description: 'Introduction to cloud technologies, containers, and Kubernetes',
      isPaid: false,
      duration: '12 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'KCNA Certification Course',
      url: 'https://kodekloud.com/courses/kubernetes-and-cloud-native-associate-kcna/',
      author: 'KodeKloud',
      description: 'Complete KCNA preparation with hands-on labs',
      isPaid: true,
      duration: '10 hours',
      difficulty: 'beginner',
      rating: 4.9,
    },
  ],

  videos: [
    {
      title: 'Docker for Beginners',
      url: 'https://kodekloud.com/courses/docker-for-the-absolute-beginner/',
      author: 'KodeKloud',
      description: 'Container fundamentals - essential prerequisite for KCNA',
      isPaid: true,
      duration: '4 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes for Beginners',
      url: 'https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on/',
      author: 'KodeKloud',
      description: 'Kubernetes basics with hands-on labs - prerequisite for KCNA',
      isPaid: true,
      duration: '6 hours',
      difficulty: 'beginner',
    },
    {
      title: 'KCNA Certification Course',
      url: 'https://kodekloud.com/courses/kubernetes-and-cloud-native-associate-kcna/',
      author: 'KodeKloud',
      description: 'Complete KCNA preparation with hands-on labs',
      isPaid: true,
      duration: '10 hours',
      difficulty: 'beginner',
    },
    {
      title: 'KCNA Full Course - Kubernetes and Cloud Native Associate',
      url: 'https://www.youtube.com/watch?v=AplluksKvzI',
      author: 'FreeCodeCamp',
      description: 'Complete free KCNA course covering all exam domains',
      isPaid: false,
      duration: '14 hours',
      difficulty: 'beginner',
    },
    {
      title: 'KCNA Crash Course 2024',
      url: 'https://www.youtube.com/watch?v=iGkFHB1kFZ0',
      author: 'TechWorld with Nana',
      description: 'Quick comprehensive KCNA preparation guide',
      isPaid: false,
      duration: '3 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes Tutorial for Beginners',
      url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
      author: 'TechWorld with Nana',
      description: 'Full Kubernetes course for beginners',
      isPaid: false,
      duration: '4 hours',
      difficulty: 'beginner',
    },
  ],

  documentation: [
    {
      title: 'Kubernetes Official Documentation',
      url: 'https://kubernetes.io/docs/',
      description: 'Complete Kubernetes documentation - your primary reference',
      isPaid: false,
    },
    {
      title: 'Kubernetes Concepts',
      url: 'https://kubernetes.io/docs/concepts/',
      description: 'Core Kubernetes concepts and architecture',
      isPaid: false,
    },
    {
      title: 'Kubernetes Tasks',
      url: 'https://kubernetes.io/docs/tasks/',
      description: 'Step-by-step guides for common operations',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'KCNA Exam Study Guide',
      url: 'https://kodekloud.com/blog/kcna-exam-guide/',
      author: 'KodeKloud',
      description: 'Detailed study guide with tips and resources',
      isPaid: false,
    },
    {
      title: 'KCNA Certification Guide 2024',
      url: 'https://devopscube.com/kcna-certification-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive guide with study plan and resources',
      isPaid: false,
    },
    {
      title: 'CNCF Official Blog',
      url: 'https://www.cncf.io/blog/',
      author: 'CNCF',
      description: 'Latest news and updates from the Cloud Native ecosystem',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'CNCF Slack',
      url: 'https://slack.cncf.io/',
      description: 'Official CNCF community with channels dedicated to certifications',
      isPaid: false,
    },
    {
      title: 'Kubernetes Slack',
      url: 'https://slack.k8s.io/',
      description: 'Official Kubernetes community Slack workspace',
      isPaid: false,
    },
    {
      title: 'r/kubernetes Reddit',
      url: 'https://www.reddit.com/r/kubernetes/',
      description: 'Active Kubernetes community with KCNA discussions',
      isPaid: false,
    },
    {
      title: 'Kubernetes Forum',
      url: 'https://discuss.kubernetes.io/',
      description: 'Official Kubernetes discussion forum',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes cluster for learning and development',
      isPaid: false,
    },
    {
      title: 'Kind (Kubernetes in Docker)',
      url: 'https://kind.sigs.k8s.io/',
      description: 'Run local Kubernetes clusters using Docker containers',
      isPaid: false,
    },
    {
      title: 'K9s - Kubernetes CLI',
      url: 'https://k9scli.io/',
      description: 'Terminal UI for managing Kubernetes clusters',
      isPaid: false,
    },
  ],
};
