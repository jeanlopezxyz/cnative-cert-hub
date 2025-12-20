/**
 * CKAD - Certified Kubernetes Application Developer
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const ckadResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/ckad/',
  github: [
    'https://github.com/dgkanatsios/CKAD-exercises',
    'https://github.com/kodekloudhub/certified-kubernetes-application-developer-course',
    'https://github.com/bmuschko/ckad-prep',
    'https://github.com/ahmetb/kubernetes-network-policy-recipes',
    'https://github.com/lucassha/CKAD-resources',
  ],
  practice: [
    {
      title: 'Killer.sh CKAD Simulator',
      url: 'https://killer.sh/',
      description: 'Official CKAD exam simulator included with registration',
      isPaid: true,
      isOfficial: true,
      type: 'simulator',
      difficulty: 'intermediate',
    },
    {
      title: 'Killercoda CKAD Scenarios',
      url: 'https://killercoda.com/killer-shell-ckad',
      description: 'Free browser-based CKAD practice scenarios',
      isPaid: false,
      type: 'scenario',
      difficulty: 'intermediate',
    },
    {
      title: 'KodeKloud CKAD Labs',
      url: 'https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/',
      description: 'Interactive CKAD practice labs with hands-on exercises',
      isPaid: true,
      type: 'lab',
      difficulty: 'intermediate',
    },
  ],

  books: [
    {
      title: 'Kubernetes: Up and Running, 3rd Edition',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower, Lachlan Evenson',
      description: 'Comprehensive guide to Kubernetes for developers',
      isPaid: true,
      format: 'paperback',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'Certified Kubernetes Application Developer (CKAD) Study Guide',
      url: 'https://www.oreilly.com/library/view/certified-kubernetes-application/9781098107215/',
      author: 'Benjamin Muschko',
      description: 'In-depth study guide specifically for the CKAD exam',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Cloud Native DevOps with Kubernetes, 2nd Edition',
      url: 'https://www.oreilly.com/library/view/cloud-native-devops/9781098116811/',
      author: 'John Arundel, Justin Domingus',
      description: 'Building, deploying, and scaling modern applications',
      isPaid: true,
      format: 'ebook',
      year: 2024,
      difficulty: 'intermediate',
    },
    {
      title: 'The Kubernetes Book - 2024 Edition',
      url: 'https://leanpub.com/thekubernetesbook',
      author: 'Nigel Poulton',
      description: 'Clear Kubernetes concepts with hands-on examples',
      isPaid: true,
      format: 'pdf',
      year: 2024,
      difficulty: 'beginner',
    },
  ],

  courses: [
    {
      title: 'CKAD with Practice Tests',
      url: 'https://www.udemy.com/course/certified-kubernetes-application-developer/',
      author: 'Mumshad Mannambeth (KodeKloud)',
      description: 'Complete CKAD preparation with hands-on labs and practice tests',
      isPaid: true,
      duration: '10 hours',
      difficulty: 'intermediate',
      rating: 4.7,
    },
    {
      title: 'Kubernetes for Developers (LFD259)',
      url: 'https://training.linuxfoundation.org/training/kubernetes-for-developers/',
      author: 'The Linux Foundation',
      description: 'Official Linux Foundation course for CKAD preparation',
      isPaid: true,
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Introduction to Kubernetes (LFS158)',
      url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes',
      author: 'The Linux Foundation',
      description: 'Free foundational course - prerequisite for CKAD',
      isPaid: false,
      duration: '16 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'CKAD Certification Course - KodeKloud',
      url: 'https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/',
      author: 'KodeKloud',
      description: 'Interactive CKAD course with built-in labs',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
  ],

  videos: [
    {
      title: 'CKAD Full Course',
      url: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
      author: 'TechWorld with Nana',
      description: 'Complete CKAD preparation covering all exam topics',
      isPaid: false,
      duration: '4 hours',
      difficulty: 'intermediate',
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
    {
      title: 'CKAD Exam Tips and Practice',
      url: 'https://www.youtube.com/watch?v=DoT8vmkXBLE',
      author: 'That DevOps Guy',
      description: 'CKAD exam tips and live practice session',
      isPaid: false,
      duration: '2 hours',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Kubernetes Official Documentation',
      url: 'https://kubernetes.io/docs/',
      description: 'Official Kubernetes docs - your primary exam reference',
      isPaid: false,
    },
    {
      title: 'CKAD Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/CKAD_Curriculum.pdf',
      description: 'Official CKAD exam curriculum and objectives',
      isPaid: false,
    },
    {
      title: 'kubectl Cheat Sheet',
      url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/',
      description: 'Essential kubectl commands for the exam',
      isPaid: false,
    },
    {
      title: 'Kubernetes API Reference',
      url: 'https://kubernetes.io/docs/reference/kubernetes-api/',
      description: 'Complete Kubernetes API reference',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CKAD Exam Study Guide',
      url: 'https://devopscube.com/ckad-exam-study-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive CKAD study guide with resources',
      isPaid: false,
    },
    {
      title: 'How to Pass CKAD Exam',
      url: 'https://kodekloud.com/blog/how-to-pass-ckad-exam/',
      author: 'KodeKloud',
      description: 'Tips and strategies for passing CKAD',
      isPaid: false,
    },
    {
      title: 'CKAD Exam Tips',
      url: 'https://medium.com/bb-tutorials-and-thoughts/practice-enough-with-these-questions-for-the-ckad-exam-2f42d1228552',
      author: 'BB Tutorials',
      description: 'Practice questions and exam tips',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Kubernetes Slack',
      url: 'https://slack.k8s.io/',
      description: 'Official Kubernetes Slack with #ckad-exam-prep channel',
      isPaid: false,
    },
    {
      title: 'CNCF Slack',
      url: 'https://slack.cncf.io/',
      description: 'CNCF community with certification channels',
      isPaid: false,
    },
    {
      title: 'r/kubernetes Reddit',
      url: 'https://www.reddit.com/r/kubernetes/',
      description: 'Active community for CKAD discussions',
      isPaid: false,
    },
    {
      title: 'KodeKloud Community',
      url: 'https://kodekloud.com/community/',
      description: 'Student community for CKAD preparation',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'K9s',
      url: 'https://k9scli.io/',
      description: 'Terminal UI for Kubernetes cluster management',
      isPaid: false,
    },
    {
      title: 'kubectl Aliases',
      url: 'https://github.com/ahmetb/kubectl-aliases',
      description: 'Speed up your kubectl workflow with aliases',
      isPaid: false,
    },
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Local Kubernetes for development and practice',
      isPaid: false,
    },
  ],
};
