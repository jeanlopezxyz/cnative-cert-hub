/**
 * KCNA - Kubernetes and Cloud Native Associate
 * Study Resources
 *
 * How to contribute:
 * 1. Add new resources to the appropriate category
 * 2. Follow the resource interface for each type
 * 3. Include all required fields
 * 4. Verify URLs are valid and accessible
 *
 * Resource Categories:
 * - books: Physical or digital books
 * - courses: Online courses (free or paid)
 * - videos: YouTube videos, playlists, webinars
 * - documentation: Official docs and references
 * - blogs: Blog posts and articles
 * - communities: Slack, Discord, Reddit, forums
 * - tools: Practice tools and simulators
 */

import type { CertificationResources } from '../../types';

export const kcnaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/kcna/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/moabukar/KCNA-Kubernetes-and-Cloud-Native-Associate',
    'https://github.com/walidshaari/Kubernetes-and-Cloud-Native-Associate',
  ],
  practice: [
    'https://kodekloud.com/courses/kubernetes-and-cloud-native-associate-kcna/',
    'https://learn.acloud.guru/course/kubernetes-and-cloud-native-essentials',
  ],

  // ============================================
  // BOOKS
  // ============================================
  books: [
    {
      title: 'Kubernetes: Up and Running',
      url: 'https://www.oreilly.com/library/view/kubernetes-up-and/9781492046523/',
      author: 'Brendan Burns, Joe Beda, Kelsey Hightower',
      description: 'Guía completa para implementar y gestionar clústeres de Kubernetes',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'beginner',
    },
    {
      title: 'Cloud Native DevOps with Kubernetes',
      url: 'https://www.oreilly.com/library/view/cloud-native-devops/9781492040750/',
      author: 'John Arundel, Justin Domingus',
      description: 'Construcción, implementación y escalado de aplicaciones modernas en la nube',
      isPaid: true,
      format: 'pdf',
      year: 2022,
      difficulty: 'beginner',
    },
    {
      title: 'The KCNA Book',
      url: 'https://leanpub.com/thekcnabook',
      author: 'Nigel Poulton',
      description: 'Preparación específica para el examen KCNA con ejemplos prácticos',
      isPaid: true,
      format: 'pdf',
      year: 2023,
      difficulty: 'beginner',
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
      description: 'Comprehensive introduction to Kubernetes concepts, architecture, and deployment',
      isPaid: false,
      duration: '16 hours',
      difficulty: 'beginner',
      rating: 4.8,
    },
    {
      title: 'Introduction to Cloud Infrastructure Technologies (LFS151)',
      url: 'https://training.linuxfoundation.org/training/introduction-to-cloud-infrastructure-technologies/',
      author: 'The Linux Foundation',
      description: 'Comprehensive introduction to cloud technologies, containers, and Kubernetes',
      isPaid: false,
      duration: '12 hours',
      difficulty: 'beginner',
      rating: 4.7,
    },
    {
      title: 'Introduction to Kubernetes on Edge with K3s (LFS156x)',
      url: 'https://training.linuxfoundation.org/training/introduction-to-kubernetes-on-edge-with-k3s-lfs156x/',
      author: 'The Linux Foundation',
      description: 'Course on edge computing with Kubernetes and K3s',
      isPaid: false,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.6,
    },
  ],

  // ============================================
  // VIDEOS
  // ============================================
  videos: [
    {
      title: 'KCNA Course - Full Course',
      url: 'https://www.youtube.com/watch?v=AplluksKvzI',
      author: 'FreeCodeCamp',
      description: 'Curso completo de KCNA gratuito',
      isPaid: false,
      duration: '14 horas',
      difficulty: 'beginner',
    },
    {
      title: 'Cloud Native Fundamentals',
      url: 'https://www.youtube.com/watch?v=OOXJhauP5Dg',
      author: 'Saiyam Pathak',
      description: 'Fundamentos de Cloud Native y Kubernetes',
      isPaid: false,
      duration: '2 horas',
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes Basics for KCNA',
      url: 'https://www.youtube.com/playlist?list=PL2We04F3Y_43dAehLMT5GxJhtk3mJtkl5',
      author: 'Kunal Kushwaha',
      description: 'Serie de videos sobre conceptos básicos de Kubernetes',
      isPaid: false,
      duration: '10 horas',
      difficulty: 'beginner',
    },
  ],

  // ============================================
  // DOCUMENTATION
  // ============================================
  documentation: [
    {
      title: 'Documentación Oficial de Kubernetes',
      url: 'https://kubernetes.io/docs/',
      description: 'Documentación completa de Kubernetes - tu referencia principal',
      isPaid: false,
    },
    {
      title: 'CNCF Landscape',
      url: 'https://landscape.cncf.io/',
      description: 'Mapa interactivo del ecosistema Cloud Native',
      isPaid: false,
    },
    {
      title: 'Cloud Native Glossary',
      url: 'https://glossary.cncf.io/',
      description: 'Glosario de términos Cloud Native en múltiples idiomas',
      isPaid: false,
    },
  ],

  // ============================================
  // BLOGS
  // ============================================
  blogs: [
    {
      title: 'KCNA Exam Study Guide',
      url: 'https://kodekloud.com/blog/kcna-exam-guide/',
      author: 'KodeKloud',
      description: 'Guía detallada de estudio con tips y recursos',
      isPaid: false,
    },
    {
      title: 'How I Passed the KCNA Exam',
      url: 'https://medium.com/@javedalam0/how-i-passed-the-kcna-exam-5c94d6a4f5e2',
      author: 'Javed Alam',
      description: 'Experiencia personal y consejos para aprobar el KCNA',
      isPaid: false,
    },
  ],

  // ============================================
  // COMMUNITIES
  // ============================================
  communities: [
    {
      title: 'CNCF Slack',
      url: 'https://slack.cncf.io/',
      description: 'Comunidad oficial de CNCF con canales dedicados a certificaciones',
      isPaid: false,
    },
    {
      title: 'r/kubernetes Reddit',
      url: 'https://www.reddit.com/r/kubernetes/',
      description: 'Comunidad activa de Kubernetes con discusiones sobre KCNA',
      isPaid: false,
    },
    {
      title: 'Kubernetes Forum',
      url: 'https://discuss.kubernetes.io/',
      description: 'Foro oficial de Kubernetes para preguntas y discusiones',
      isPaid: false,
    },
  ],

  // ============================================
  // TOOLS
  // ============================================
  tools: [
    {
      title: 'Minikube',
      url: 'https://minikube.sigs.k8s.io/',
      description: 'Kubernetes local para aprendizaje y desarrollo',
      isPaid: false,
    },
    {
      title: 'Katacoda Kubernetes Playground',
      url: 'https://www.katacoda.com/courses/kubernetes/playground',
      description: 'Entorno de Kubernetes en el navegador sin instalación',
      isPaid: false,
    },
    {
      title: 'K9s - Kubernetes CLI',
      url: 'https://k9scli.io/',
      description: 'Terminal UI para gestionar clústeres de Kubernetes',
      isPaid: false,
    },
  ],
};
