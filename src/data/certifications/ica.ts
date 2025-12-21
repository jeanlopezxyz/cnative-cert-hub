import type { Certification } from '../../types';
import { icaResources } from '../resources/ica';

export const ica: Certification = {
  id: 'ica',
  acronym: 'ICA',
  name: 'Istio Certified Associate',
  description: 'cert.ica.description',
  level: 'intermediate',
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
      name: 'Istio Installation, Upgrade & Configuration',
      weight: 7,
      documentationUrl: 'https://istio.io/latest/docs/setup/',
      topics: [
        { name: 'Using the Istio CLI to install a basic cluster', url: 'https://istio.io/latest/docs/setup/install/istioctl/' },
        { name: 'Customizing the Istio installation with the IstioOperator API', url: 'https://istio.io/latest/docs/setup/install/operator/' },
        { name: 'Using overlays to manage Istio component settings', url: 'https://istio.io/latest/docs/setup/additional-setup/customize-installation/' },
      ],
    },
    {
      name: 'Traffic Management',
      weight: 40,
      documentationUrl: 'https://istio.io/latest/docs/concepts/traffic-management/',
      topics: [
        { name: 'Controlling network traffic flows within a service mesh', url: 'https://istio.io/latest/docs/concepts/traffic-management/' },
        { name: 'Configuring sidecar injection', url: 'https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/' },
        { name: 'Using the Gateway resource to configure ingress and egress traffic', url: 'https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/' },
        { name: 'Understanding how to use ServiceEntry resources for adding entries to internal service registry', url: 'https://istio.io/latest/docs/reference/config/networking/service-entry/' },
        { name: 'Define traffic policies using DestinationRule', url: 'https://istio.io/latest/docs/reference/config/networking/destination-rule/' },
        { name: 'Configure traffic mirroring capabilities', url: 'https://istio.io/latest/docs/tasks/traffic-management/mirroring/' },
      ],
    },
    {
      name: 'Resilience and Fault Injection',
      weight: 20,
      documentationUrl: 'https://istio.io/latest/docs/concepts/traffic-management/#network-resilience-and-testing',
      topics: [
        { name: 'Configuring circuit breakers (with or without outlier detection)', url: 'https://istio.io/latest/docs/tasks/traffic-management/circuit-breaking/' },
        { name: 'Using resilience features', url: 'https://istio.io/latest/docs/concepts/traffic-management/#timeouts' },
        { name: 'Creating fault injection', url: 'https://istio.io/latest/docs/tasks/traffic-management/fault-injection/' },
      ],
    },
    {
      name: 'Securing Workloads',
      weight: 20,
      documentationUrl: 'https://istio.io/latest/docs/concepts/security/',
      topics: [
        { name: 'Understand Istio security features', url: 'https://istio.io/latest/docs/concepts/security/' },
        { name: 'Set up Istio authorization for HTTP/TCP traffic in the mesh', url: 'https://istio.io/latest/docs/tasks/security/authorization/' },
        { name: 'Configure mutual TLS at mesh, namespace, and workload levels', url: 'https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/' },
      ],
    },
    {
      name: 'Advanced Scenarios',
      weight: 13,
      documentationUrl: 'https://istio.io/latest/docs/ops/',
      topics: [
        { name: 'Understand how to onboard non-Kubernetes workloads to the mesh', url: 'https://istio.io/latest/docs/ops/deployment/vm-architecture/' },
        { name: 'Troubleshoot configuration issues', url: 'https://istio.io/latest/docs/ops/diagnostic-tools/' },
      ],
    },
  ],
  resources: icaResources,
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
