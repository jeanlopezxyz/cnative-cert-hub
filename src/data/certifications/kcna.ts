import type { Certification } from '../../types';
import { kcnaQuestions } from '../questions/kcna';
import { kcnaResources } from '../resources/kcna';

export const kcna: Certification = {
  id: 'kcna',
  acronym: 'KCNA',
  name: 'Kubernetes and Cloud Native Associate',
  description: 'cert.kcna.description',
  level: 'entry',
  type: 'multiple-choice',
  duration: 90,
  price: 250,
  requiredFor: ['Kubestronaut', 'Golden Kubestronaut'],
  color: 'from-blue-600 to-blue-800',
  kubernetesVersion: 'Not applicable',
  examAttempts: 2,
  simulatorProvider: 'No simulator - Multiple choice exam',
  simulatorAccess: 'Not applicable - No hands-on simulator provided',
  examFormat: 'Online proctored, multiple-choice test with 60 questions',
  retakePolicy: 'One free retake included with registration cost',
  prerequisites: 'No prerequisites',
  domains: [
    {
      name: 'Kubernetes Fundamentals',
      weight: 46,
      documentationUrl: 'https://kubernetes.io/docs/concepts/',
      topics: [
        {
          name: 'Kubernetes Resources',
          url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/',
        },
        {
          name: 'Kubernetes Architecture',
          url: 'https://kubernetes.io/docs/concepts/architecture/',
        },
        {
          name: 'Kubernetes API',
          url: 'https://kubernetes.io/docs/concepts/overview/kubernetes-api/',
        },
        {
          name: 'Containers',
          url: 'https://kubernetes.io/docs/concepts/containers/',
        },
        {
          name: 'Scheduling',
          url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/',
        },
      ],
    },
    {
      name: 'Container Orchestration',
      weight: 22,
      documentationUrl: 'https://kubernetes.io/docs/concepts/workloads/',
      topics: [
        {
          name: 'Container Orchestration Fundamentals',
          url: 'https://kubernetes.io/docs/concepts/workloads/',
        },
        {
          name: 'Runtime',
          url: 'https://kubernetes.io/docs/setup/production-environment/container-runtimes/',
        },
        {
          name: 'Security',
          url: 'https://kubernetes.io/docs/concepts/security/',
        },
        {
          name: 'Networking',
          url: 'https://kubernetes.io/docs/concepts/services-networking/',
        },
        {
          name: 'Service Mesh',
          url: 'https://kubernetes.io/docs/concepts/services-networking/service/',
        },
        {
          name: 'Storage',
          url: 'https://kubernetes.io/docs/concepts/storage/',
        },
      ],
    },
    {
      name: 'Cloud Native Architecture',
      weight: 16,
      documentationUrl: 'https://glossary.cncf.io/cloud-native-tech/',
      topics: [
        {
          name: 'Autoscaling',
          url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/',
        },
        {
          name: 'Serverless',
          url: 'https://www.cncf.io/whitepapers/serverless-overview/',
        },
        {
          name: 'Community and Governance',
          url: 'https://kubernetes.io/community/',
        },
        {
          name: 'Roles and Personas',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/',
        },
        {
          name: 'Open Standards',
          url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/',
        },
      ],
    },
    {
      name: 'Cloud Native Observability',
      weight: 8,
      documentationUrl: 'https://opentelemetry.io/docs/',
      topics: [
        {
          name: 'Telemetry & Observability',
          url: 'https://kubernetes.io/docs/concepts/cluster-administration/system-logs/',
        },
        {
          name: 'Prometheus',
          url: 'https://prometheus.io/docs/introduction/overview/',
        },
        {
          name: 'Cost Management',
          url: 'https://kubernetes.io/docs/concepts/policy/resource-quotas/',
        },
      ],
    },
    {
      name: 'Cloud Native Application Delivery',
      weight: 8,
      documentationUrl: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/',
      topics: [
        {
          name: 'Application Delivery Fundamentals',
          url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/',
        },
        {
          name: 'GitOps',
          url: 'https://opengitops.dev/',
        },
        {
          name: 'CI/CD',
          url: 'https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/',
        },
      ],
    },
  ],
  resources: kcnaResources,
  questions: kcnaQuestions,
  studyTimeWeeks: 4,
  passingScore: 75,
  validity: 3,
};
