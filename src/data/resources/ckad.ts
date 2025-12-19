/**
 * CKAD - Certified Kubernetes Application Developer
 * Study Resources
 *
 * How to contribute:
 * 1. Add new resources to the appropriate category
 * 2. Follow the resource interface for each type
 * 3. Include all required fields
 * 4. Verify URLs are valid and accessible
 */

import type { CertificationResources } from '../../types';

export const ckadResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/ckad/',
  github: [
    'https://github.com/dgkanatsios/CKAD-exercises',
    'https://github.com/kodekloudhub/certified-kubernetes-application-developer-course',
    'https://github.com/bmuschko/ckad-prep',
    'https://github.com/cncf/curriculum',
    'https://github.com/ahmetb/kubernetes-network-policy-recipes',
  ],
  practice: [
    'https://killer.sh',
    'https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/',
    'https://killercoda.com/killer-shell-ckad',
  ],

  // ============================================
  // BOOKS
  // ============================================
  books: [
    {
      title: 'Kubernetes Up & Running',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower',
      description: 'Dive into the future of infrastructure with this comprehensive guide to Kubernetes',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'Cloud Native DevOps with Kubernetes',
      url: 'https://www.oreilly.com/library/view/cloud-native-devops/9781492040750/',
      author: 'John Arundel, Justin Domingus',
      description: 'Building, deploying, and scaling modern applications in the cloud',
      isPaid: true,
      format: 'ebook',
      year: 2022,
      difficulty: 'intermediate',
    },
  ],

  // ============================================
  // COURSES
  // ============================================
  courses: [
    {
      title: 'Introduction to Kubernetes (LFS158)',
      url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes',
      author: 'The Linux Foundation',
      description: 'Essential prerequisite for CKAD preparation',
      isPaid: false,
      duration: '16 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Kubernetes for Developers (LFD259)',
      url: 'https://training.linuxfoundation.org/training/kubernetes-for-developers/',
      author: 'The Linux Foundation',
      description: 'Comprehensive paid course specifically designed for CKAD preparation',
      isPaid: true,
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'CKAD Certification Course',
      url: 'https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/',
      author: 'Mumshad Mannambeth',
      description: 'Complete CKAD preparation with hands-on labs and practice tests',
      isPaid: true,
      duration: '8 hours',
      difficulty: 'intermediate',
      rating: 4.6,
    },
  ],

  // ============================================
  // VIDEOS
  // ============================================
  videos: [
    {
      title: 'CKAD Full Course Tutorial',
      url: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
      author: 'TechWorld with Nana',
      description: 'Complete CKAD preparation course covering all exam topics',
      isPaid: false,
      duration: '4 hours',
      difficulty: 'intermediate',
    },
  ],

  // ============================================
  // DOCUMENTATION
  // ============================================
  documentation: [
    {
      title: 'Kubernetes Official Documentation',
      url: 'https://kubernetes.io/docs/',
      description: 'Official Kubernetes documentation - essential reference for the exam',
      isPaid: false,
    },
    {
      title: 'Kubectl Reference',
      url: 'https://kubernetes.io/docs/reference/kubectl/',
      description: 'Complete kubectl command reference',
      isPaid: false,
    },
  ],

  // ============================================
  // COMMUNITIES
  // ============================================
  communities: [
    {
      title: 'Kubernetes Slack - #ckad-exam-prep',
      url: 'https://kubernetes.slack.com/channels/ckad-exam-prep',
      description: 'Community channel for CKAD exam preparation and discussion',
      isPaid: false,
    },
    {
      title: 'Reddit r/kubernetes',
      url: 'https://reddit.com/r/kubernetes',
      description: 'Active community for Kubernetes discussions and CKAD help',
      isPaid: false,
    },
  ],

  // ============================================
  // TOOLS
  // ============================================
  tools: [
    {
      title: 'K9s',
      url: 'https://k9scli.io/',
      description: 'Terminal UI to interact with your Kubernetes clusters',
      isPaid: false,
    },
    {
      title: 'Kubectl Aliases',
      url: 'https://github.com/ahmetb/kubectl-aliases',
      description: 'Useful kubectl aliases to speed up your workflow',
      isPaid: false,
    },
  ],
};
