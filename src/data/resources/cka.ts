/**
 * CKA - Certified Kubernetes Administrator
 * Study Resources
 *
 * How to contribute:
 * 1. Add new resources to the appropriate category
 * 2. Follow the resource interface for each type
 * 3. Include all required fields
 * 4. Verify URLs are valid and accessible
 */

import type { CertificationResources } from '../../types';

export const ckaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cka/',
  github: [
    'https://github.com/walidshaari/Kubernetes-Certified-Administrator',
    'https://github.com/kodekloudhub/certified-kubernetes-administrator-course',
    'https://github.com/dgkanatsios/CKAD-exercises',
  ],
  practice: [
    'https://killer.sh',
    'https://kodekloud.com/courses/certified-kubernetes-administrator-cka/',
    'https://killercoda.com/killer-shell-cka',
  ],

  // ============================================
  // BOOKS
  // ============================================
  books: [
    {
      title: 'Kubernetes Up & Running',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781492046523/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower',
      description: 'Comprehensive guide to deploying and managing Kubernetes clusters',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
    {
      title: 'The Kubernetes Book',
      url: 'https://leanpub.com/thekubernetesbook',
      author: 'Nigel Poulton',
      description: 'Clear and simple explanation of Kubernetes concepts and hands-on examples',
      isPaid: true,
      format: 'pdf',
      year: 2023,
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes in Action',
      url: 'https://www.manning.com/books/kubernetes-in-action-second-edition',
      author: 'Marko Lukša',
      description: 'Deep dive into Kubernetes internals with practical examples',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'advanced',
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
      description: 'Foundational course covering Kubernetes basics and architecture',
      isPaid: false,
      duration: '16 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Kubernetes Fundamentals (LFS258)',
      url: 'https://training.linuxfoundation.org/training/kubernetes-fundamentals/',
      author: 'The Linux Foundation',
      description: 'Comprehensive paid course specifically designed for CKA preparation',
      isPaid: true,
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'CKA Certification Course',
      url: 'https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/',
      author: 'Mumshad Mannambeth',
      description: 'Complete CKA preparation with hands-on labs and practice tests',
      isPaid: true,
      duration: '17.5 hours',
      difficulty: 'intermediate',
      rating: 4.7,
    },
  ],

  // ============================================
  // VIDEOS
  // ============================================
  videos: [
    {
      title: 'Kubernetes Tutorial for Beginners',
      url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
      author: 'TechWorld with Nana',
      description: 'Complete Kubernetes course in 4 hours',
      isPaid: false,
      duration: '4 hours',
      difficulty: 'beginner',
    },
  ],

  // ============================================
  // DOCUMENTATION
  // ============================================
  documentation: [
    {
      title: 'Kubernetes Official Documentation',
      url: 'https://kubernetes.io/docs/',
      description: 'Official Kubernetes documentation - your primary reference',
      isPaid: false,
    },
    {
      title: 'kubectl Cheat Sheet',
      url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/',
      description: 'Essential kubectl commands for the exam',
      isPaid: false,
    },
  ],

  // ============================================
  // COMMUNITIES
  // ============================================
  communities: [
    {
      title: 'Kubernetes Slack',
      url: 'https://slack.k8s.io/',
      description: 'Official Kubernetes Slack community with 100k+ members',
      isPaid: false,
    },
    {
      title: 'r/kubernetes Reddit',
      url: 'https://www.reddit.com/r/kubernetes/',
      description: 'Active Reddit community for Kubernetes discussions',
      isPaid: false,
    },
  ],
};
