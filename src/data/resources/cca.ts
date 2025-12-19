/**
 * CCA - Cilium Certified Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const ccaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/cca/',
  github: [
    'https://github.com/cilium/cilium',
    'https://github.com/cncf/curriculum',
    'https://github.com/cilium/cilium-cli',
    'https://github.com/cilium/hubble',
  ],
  practice: [
    'https://kodekloud.com/courses/cilium-certified-associate-cca/',
    'https://killercoda.com/playgrounds/scenario/kubernetes',
    'https://isovalent.com/labs/',
  ],

  books: [
    {
      title: 'Learning eBPF',
      url: 'https://www.oreilly.com/library/view/learning-ebpf/9781098135119/',
      author: 'Liz Rice',
      description: 'Programming the Linux kernel for enhanced observability and security',
      isPaid: true,
      format: 'paperback',
      year: 2023,
      difficulty: 'intermediate',
    },
    {
      title: 'Networking and Kubernetes',
      url: 'https://www.oreilly.com/library/view/networking-and-kubernetes/9781492081647/',
      author: 'James Strong, Vallery Lancey',
      description: 'Guide to Kubernetes networking including CNI plugins',
      isPaid: true,
      format: 'paperback',
      year: 2021,
      difficulty: 'intermediate',
    },
    {
      title: 'Container Security',
      url: 'https://www.oreilly.com/library/view/container-security/9781492056690/',
      author: 'Liz Rice',
      description: 'Container and Kubernetes security fundamentals',
      isPaid: true,
      format: 'paperback',
      year: 2020,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'Cilium Certified Associate (CCA)',
      url: 'https://training.linuxfoundation.org/training/cilium-certified-associate-cca/',
      author: 'The Linux Foundation',
      description: 'Official CCA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'CCA Certification Course',
      url: 'https://kodekloud.com/courses/cilium-certified-associate-cca/',
      author: 'KodeKloud',
      description: 'Complete CCA preparation with hands-on labs',
      isPaid: true,
      duration: '12 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Getting Started with Cilium',
      url: 'https://isovalent.com/labs/getting-started-with-cilium/',
      author: 'Isovalent',
      description: 'Free introductory Cilium labs',
      isPaid: false,
      duration: '4 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Cilium CNI Deep Dive',
      url: 'https://isovalent.com/labs/',
      author: 'Isovalent',
      description: 'Advanced Cilium labs and tutorials',
      isPaid: false,
      duration: '10 hours',
      difficulty: 'intermediate',
      rating: 4.7,
    },
  ],

  videos: [
    {
      title: 'Cilium Introduction and Deep Dive',
      url: 'https://www.youtube.com/watch?v=80OYrzS1dCA',
      author: 'CNCF',
      description: 'Introduction to Cilium and eBPF',
      isPaid: false,
      duration: '1 hour',
      difficulty: 'beginner',
    },
    {
      title: 'eBPF and Cilium Tutorial',
      url: 'https://www.youtube.com/watch?v=bIRwSIwNHC0',
      author: 'Isovalent',
      description: 'Deep dive into eBPF and Cilium',
      isPaid: false,
      duration: '2 hours',
      difficulty: 'intermediate',
    },
    {
      title: 'Kubernetes Networking with Cilium',
      url: 'https://www.youtube.com/watch?v=6CZ_SSTqb4g',
      author: 'TechWorld with Nana',
      description: 'Complete Cilium tutorial for Kubernetes',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Cilium Official Documentation',
      url: 'https://docs.cilium.io/',
      description: 'Complete Cilium documentation - primary exam reference',
      isPaid: false,
    },
    {
      title: 'CCA Exam Curriculum',
      url: 'https://github.com/cncf/curriculum/blob/master/CCA_Curriculum.pdf',
      description: 'Official CCA exam curriculum',
      isPaid: false,
    },
    {
      title: 'Cilium Network Policies',
      url: 'https://docs.cilium.io/en/stable/security/',
      description: 'Cilium network policy documentation',
      isPaid: false,
    },
    {
      title: 'Hubble Documentation',
      url: 'https://docs.cilium.io/en/stable/gettingstarted/hubble/',
      description: 'Cilium observability with Hubble',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'CCA Exam Study Guide',
      url: 'https://devopscube.com/cca-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive CCA study guide',
      isPaid: false,
    },
    {
      title: 'Cilium Blog',
      url: 'https://cilium.io/blog/',
      author: 'Cilium',
      description: 'Official Cilium blog with tutorials',
      isPaid: false,
    },
    {
      title: 'Isovalent Blog',
      url: 'https://isovalent.com/blog/',
      author: 'Isovalent',
      description: 'eBPF and Cilium insights from Isovalent',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'Cilium Slack',
      url: 'https://cilium.io/slack',
      description: 'Official Cilium Slack workspace',
      isPaid: false,
    },
    {
      title: 'CNCF Slack - #cilium',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with Cilium channels',
      isPaid: false,
    },
    {
      title: 'eBPF Community',
      url: 'https://ebpf.io/slack',
      description: 'eBPF community Slack',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Cilium CLI',
      url: 'https://github.com/cilium/cilium-cli',
      description: 'Cilium command-line tool',
      isPaid: false,
    },
    {
      title: 'Hubble',
      url: 'https://github.com/cilium/hubble',
      description: 'Network observability for Cilium',
      isPaid: false,
    },
    {
      title: 'Isovalent Labs',
      url: 'https://isovalent.com/labs/',
      description: 'Free browser-based Cilium labs',
      isPaid: false,
    },
    {
      title: 'Kind with Cilium',
      url: 'https://docs.cilium.io/en/stable/installation/kind/',
      description: 'Local Kubernetes with Cilium',
      isPaid: false,
    },
  ],
};
