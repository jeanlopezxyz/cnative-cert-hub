/**
 * PCA - Prometheus Certified Associate
 * Study Resources - Updated December 2024
 */

import type { CertificationResources } from '../../types';

export const pcaResources: CertificationResources = {
  official: 'https://www.cncf.io/training/certification/pca/',
  github: [
    'https://github.com/cncf/curriculum',
    'https://github.com/prometheus/prometheus',
    'https://github.com/prometheus/alertmanager',
    'https://github.com/moabukar/Prometheus-Certified-Associate-PCA',
  ],
  practice: [
    {
      title: 'Prometheus Playground',
      url: 'https://killercoda.com/playgrounds/scenario/prometheus',
      description: 'Browser-based Prometheus environment for hands-on practice',
      isPaid: false,
      type: 'playground',
      difficulty: 'beginner',
    },
    {
      title: 'KodeKloud PCA Labs',
      url: 'https://kodekloud.com/courses/prometheus-certified-associate-pca/',
      description: 'Interactive PCA practice labs with hands-on exercises',
      isPaid: true,
      type: 'lab',
      difficulty: 'intermediate',
    },
  ],

  books: [
    {
      title: 'Prometheus: Up & Running, 2nd Edition',
      url: 'https://www.oreilly.com/library/view/prometheus-up/9781098131135/',
      author: 'Julien Pivotto, Brian Brazil',
      description: 'Complete guide to Prometheus - essential for PCA exam',
      isPaid: true,
      format: 'paperback',
      year: 2023,
      difficulty: 'intermediate',
    },
    {
      title: 'Cloud Native Monitoring with Prometheus',
      url: 'https://www.packtpub.com/product/cloud-native-monitoring-with-prometheus/9781803246246',
      author: 'Steve Gajjar',
      description: 'End-to-end monitoring with Prometheus and Grafana',
      isPaid: true,
      format: 'paperback',
      year: 2023,
      difficulty: 'intermediate',
    },
    {
      title: 'PromQL for Humans',
      url: 'https://leanpub.com/promqlforhumans',
      author: 'Julius Volz',
      description: 'Master PromQL query language for Prometheus',
      isPaid: true,
      format: 'pdf',
      year: 2023,
      difficulty: 'intermediate',
    },
    {
      title: 'Observability Engineering',
      url: 'https://www.oreilly.com/library/view/observability-engineering/9781492076438/',
      author: 'Charity Majors, Liz Fong-Jones, George Miranda',
      description: 'Observability concepts including metrics and monitoring',
      isPaid: true,
      format: 'paperback',
      year: 2022,
      difficulty: 'intermediate',
    },
  ],

  courses: [
    {
      title: 'Prometheus Certified Associate (PCA)',
      url: 'https://training.linuxfoundation.org/training/prometheus-certified-associate-pca/',
      author: 'The Linux Foundation',
      description: 'Official PCA preparation course',
      isPaid: true,
      duration: '15 hours',
      difficulty: 'intermediate',
      rating: 4.8,
    },
    {
      title: 'PCA Certification Course',
      url: 'https://kodekloud.com/courses/prometheus-certified-associate-pca/',
      author: 'KodeKloud',
      description: 'Complete PCA preparation with hands-on labs',
      isPaid: true,
      duration: '12 hours',
      difficulty: 'intermediate',
      rating: 4.9,
    },
    {
      title: 'Monitoring Kubernetes with Prometheus (LFS241)',
      url: 'https://training.linuxfoundation.org/training/monitoring-kubernetes-with-prometheus-lfs241/',
      author: 'The Linux Foundation',
      description: 'Comprehensive Prometheus monitoring course',
      isPaid: true,
      duration: '20 hours',
      difficulty: 'intermediate',
      rating: 4.7,
    },
  ],

  videos: [
    {
      title: 'Docker for Beginners',
      url: 'https://kodekloud.com/courses/docker-for-the-absolute-beginner/',
      author: 'KodeKloud',
      description: 'Container fundamentals - prerequisite for PCA',
      isPaid: true,
      duration: '4 hours',
      difficulty: 'beginner',
    },
    {
      title: 'Kubernetes for Beginners',
      url: 'https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on/',
      author: 'KodeKloud',
      description: 'Kubernetes basics - prerequisite for PCA',
      isPaid: true,
      duration: '6 hours',
      difficulty: 'beginner',
    },
    {
      title: 'PCA Certification Course',
      url: 'https://kodekloud.com/courses/prometheus-certified-associate-pca/',
      author: 'KodeKloud',
      description: 'Complete PCA preparation with hands-on Prometheus labs',
      isPaid: true,
      duration: '12 hours',
      difficulty: 'intermediate',
    },
    {
      title: 'Prometheus Full Course',
      url: 'https://www.youtube.com/watch?v=h4Sl21AKiDg',
      author: 'TechWorld with Nana',
      description: 'Complete Prometheus tutorial for beginners',
      isPaid: false,
      duration: '3 hours',
      difficulty: 'beginner',
    },
    {
      title: 'PCA Exam Preparation',
      url: 'https://www.youtube.com/watch?v=bYoB4dpxN9g',
      author: 'That DevOps Guy',
      description: 'PCA exam tips and preparation guide',
      isPaid: false,
      duration: '2 hours',
      difficulty: 'intermediate',
    },
    {
      title: 'Prometheus and Grafana Tutorial',
      url: 'https://www.youtube.com/watch?v=9TJx7QTrTyo',
      author: 'DevOps Toolkit',
      description: 'Complete monitoring stack tutorial',
      isPaid: false,
      duration: '1.5 hours',
      difficulty: 'intermediate',
    },
  ],

  documentation: [
    {
      title: 'Prometheus Official Documentation',
      url: 'https://prometheus.io/docs/',
      description: 'Complete Prometheus documentation - primary exam reference',
      isPaid: false,
    },
    {
      title: 'PromQL Documentation',
      url: 'https://prometheus.io/docs/prometheus/latest/querying/basics/',
      description: 'PromQL query language documentation',
      isPaid: false,
    },
    {
      title: 'Alertmanager Documentation',
      url: 'https://prometheus.io/docs/alerting/latest/alertmanager/',
      description: 'Prometheus Alertmanager documentation',
      isPaid: false,
    },
    {
      title: 'Prometheus Best Practices',
      url: 'https://prometheus.io/docs/practices/',
      description: 'Instrumentation and naming best practices',
      isPaid: false,
    },
  ],

  blogs: [
    {
      title: 'PCA Exam Study Guide',
      url: 'https://devopscube.com/pca-exam-guide/',
      author: 'DevOpsCube',
      description: 'Comprehensive PCA study guide',
      isPaid: false,
    },
    {
      title: 'Prometheus Best Practices',
      url: 'https://prometheus.io/docs/practices/',
      author: 'Prometheus',
      description: 'Official Prometheus best practices',
      isPaid: false,
    },
    {
      title: 'How to Pass PCA Exam',
      url: 'https://kodekloud.com/blog/pca-exam-tips/',
      author: 'KodeKloud',
      description: 'Tips for passing the PCA exam',
      isPaid: false,
    },
  ],

  communities: [
    {
      title: 'CNCF Slack - #prometheus',
      url: 'https://slack.cncf.io/',
      description: 'CNCF Slack with Prometheus channels',
      isPaid: false,
    },
    {
      title: 'Prometheus Mailing List',
      url: 'https://groups.google.com/g/prometheus-users',
      description: 'Prometheus users mailing list',
      isPaid: false,
    },
    {
      title: 'r/PrometheusMonitoring Reddit',
      url: 'https://www.reddit.com/r/PrometheusMonitoring/',
      description: 'Prometheus community on Reddit',
      isPaid: false,
    },
  ],

  tools: [
    {
      title: 'Prometheus',
      url: 'https://prometheus.io/download/',
      description: 'Install Prometheus locally for practice',
      isPaid: false,
    },
    {
      title: 'Grafana',
      url: 'https://grafana.com/grafana/download',
      description: 'Visualization platform for Prometheus metrics',
      isPaid: false,
    },
    {
      title: 'PromLens',
      url: 'https://promlens.com/',
      description: 'PromQL query builder and analyzer',
      isPaid: false,
    },
  ],
};
