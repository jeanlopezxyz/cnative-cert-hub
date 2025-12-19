/**
 * KCNA - Kubernetes and Cloud Native Associate
 * Practice Questions
 *
 * How to contribute:
 * 1. Add new questions following the Question interface
 * 2. Use unique IDs: kcna-XXX (e.g., kcna-006, kcna-007)
 * 3. Match domain names exactly with exam domains
 * 4. Provide clear explanations for each answer
 * 5. Tag questions for better organization
 *
 * Exam Domains:
 * - Kubernetes Fundamentals (46%)
 * - Container Orchestration (22%)
 * - Cloud Native Architecture (16%)
 * - Cloud Native Observability (8%)
 * - Cloud Native Application Delivery (8%)
 */

import type { Question } from '../../types/quiz';

export const kcnaQuestions: Question[] = [
  // ============================================
  // DOMAIN: Kubernetes Fundamentals (46%)
  // ============================================
  {
    id: 'kcna-001',
    domain: 'Kubernetes Fundamentals',
    question: 'What is the primary purpose of Kubernetes?',
    options: [
      'To create virtual machines',
      'To orchestrate and manage containerized applications',
      'To build container images',
      'To monitor network traffic',
    ],
    correctAnswer: 1,
    explanation:
      'Kubernetes is a container orchestration platform that automates the deployment, scaling, and management of containerized applications.',
    difficulty: 'easy',
    tags: ['basics', 'containers', 'orchestration'],
  },
  {
    id: 'kcna-002',
    domain: 'Kubernetes Fundamentals',
    question: 'Which component is responsible for storing cluster state in Kubernetes?',
    options: [
      'kube-apiserver',
      'etcd',
      'kube-controller-manager',
      'kube-scheduler',
    ],
    correctAnswer: 1,
    explanation:
      'etcd is a distributed key-value store that serves as the backing store for all cluster data in Kubernetes.',
    difficulty: 'medium',
    tags: ['etcd', 'cluster-state', 'components'],
  },
  {
    id: 'kcna-005',
    domain: 'Kubernetes Fundamentals',
    question: 'What is kubectl?',
    options: [
      'A Kubernetes dashboard',
      'A container runtime',
      'The command-line tool for interacting with Kubernetes',
      'A monitoring tool',
    ],
    correctAnswer: 2,
    explanation:
      'kubectl is the command-line interface (CLI) tool that allows users to run commands against Kubernetes clusters.',
    difficulty: 'easy',
    tags: ['kubectl', 'cli', 'api'],
  },

  // ============================================
  // DOMAIN: Container Orchestration (22%)
  // ============================================
  {
    id: 'kcna-003',
    domain: 'Container Orchestration',
    question: 'What is a Pod in Kubernetes?',
    options: [
      'A collection of containers that share storage and network',
      'A single container running in isolation',
      'A virtual machine running containers',
      'A network interface for containers',
    ],
    correctAnswer: 0,
    explanation:
      'A Pod is the smallest deployable unit in Kubernetes and consists of one or more containers that share storage, network, and a specification for how to run the containers.',
    difficulty: 'easy',
    tags: ['pods', 'containers', 'workloads'],
  },

  // ============================================
  // DOMAIN: Cloud Native Architecture (16%)
  // ============================================
  {
    id: 'kcna-004',
    domain: 'Cloud Native Architecture',
    question: 'Which of the following is a principle of cloud native applications?',
    options: [
      'Monolithic architecture',
      'Manual scaling',
      'Microservices architecture',
      'Single deployment environment',
    ],
    correctAnswer: 2,
    explanation:
      'Cloud native applications are typically built using microservices architecture, which allows for independent scaling, deployment, and maintenance of application components.',
    difficulty: 'medium',
    tags: ['cloud-native', 'microservices', 'architecture'],
  },

  // ============================================
  // DOMAIN: Cloud Native Observability (8%)
  // ============================================
  // TODO: Add questions for this domain

  // ============================================
  // DOMAIN: Cloud Native Application Delivery (8%)
  // ============================================
  // TODO: Add questions for this domain
];
