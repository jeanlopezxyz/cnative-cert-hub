import type { Certification } from '../../types';
import { capaResources } from '../resources/capa';

export const capa: Certification = {
  id: 'capa',
  acronym: 'CAPA',
  name: 'Certified Argo Project Associate',
  description: 'cert.capa.description',
  level: 'entry',
  type: 'multiple-choice',
  duration: 90,
  price: 250,
  requiredFor: ['Golden Kubestronaut'],
  color: 'from-blue-700 to-indigo-800',
  kubernetesVersion: 'Not applicable',
  examAttempts: 2,
  simulatorProvider: 'No simulator - Multiple choice exam',
  simulatorAccess: 'Not applicable - No hands-on simulator provided',
  examFormat: 'Online proctored, multiple-choice test with 60 questions',
  retakePolicy: 'One free retake included with registration cost',
  prerequisites: 'No prerequisites',
  domains: [
    {
      name: 'Argo Workflows',
      weight: 36,
      documentationUrl: 'https://argo-workflows.readthedocs.io/en/stable/',
      topics: [
        { name: 'Understand Argo Workflow Fundamentals', url: 'https://argo-workflows.readthedocs.io/en/stable/workflow-concepts/' },
        { name: 'Generating and Consuming Artifacts', url: 'https://argo-workflows.readthedocs.io/en/stable/walk-through/artifacts/' },
        { name: 'Understand Argo Workflow Templates', url: 'https://argo-workflows.readthedocs.io/en/stable/workflow-templates/' },
        { name: 'Understand the Argo Workflow Spec', url: 'https://argo-workflows.readthedocs.io/en/stable/fields/' },
        { name: 'Work with DAG (Directed-Acyclic Graphs)', url: 'https://argo-workflows.readthedocs.io/en/stable/walk-through/dag/' },
        { name: 'Run Data Processing Jobs with Argo Workflows', url: 'https://argo-workflows.readthedocs.io/en/stable/use-cases/data-processing/' },
      ],
    },
    {
      name: 'ARGO CD',
      weight: 34,
      documentationUrl: 'https://argo-cd.readthedocs.io/en/stable/',
      topics: [
        { name: 'Understand Argo CD Fundamentals', url: 'https://argo-cd.readthedocs.io/en/stable/core_concepts/' },
        { name: 'Synchronize Applications Using Argo CD', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/' },
        { name: 'Use Argo CD Application', url: 'https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/' },
        { name: 'Configure Argo CD with Helm and Kustomize', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/helm/' },
        { name: 'Identify Common Reconciliation Patterns', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/' },
      ],
    },
    {
      name: 'Argo Rollouts',
      weight: 18,
      documentationUrl: 'https://argo-rollouts.readthedocs.io/en/stable/',
      topics: [
        { name: 'Understand Argo Rollouts Fundamentals', url: 'https://argo-rollouts.readthedocs.io/en/stable/concepts/' },
        { name: 'Use Common Progressive Rollout Strategies', url: 'https://argo-rollouts.readthedocs.io/en/stable/features/canary/' },
        { name: 'Describe Analysis Template and AnalysisRun', url: 'https://argo-rollouts.readthedocs.io/en/stable/features/analysis/' },
      ],
    },
    {
      name: 'Argo Events',
      weight: 12,
      documentationUrl: 'https://argoproj.github.io/argo-events/',
      topics: [
        { name: 'Understand Argo Events Fundamentals', url: 'https://argoproj.github.io/argo-events/concepts/architecture/' },
        { name: 'Understand Argo Event Components and Architecture', url: 'https://argoproj.github.io/argo-events/concepts/event_source/' },
      ],
    },
  ],
  resources: capaResources,
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
