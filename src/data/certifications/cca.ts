import type { Certification } from '../../types';
import { ccaResources } from '../resources/cca';

export const cca: Certification = {
  id: 'cca',
  acronym: 'CCA',
  name: 'Cilium Certified Associate',
  description: 'cert.cca.description',
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
      name: 'Architecture',
      weight: 20,
      documentationUrl: 'https://docs.cilium.io/en/stable/overview/component-overview/',
      topics: [
        { name: 'Understand the Role of Cilium in Kubernetes Environments', url: 'https://docs.cilium.io/en/stable/overview/intro/' },
        { name: 'Cilium Architecture', url: 'https://docs.cilium.io/en/stable/overview/component-overview/' },
        { name: 'IP Address Management (IPAM) with Cilium', url: 'https://docs.cilium.io/en/stable/network/concepts/ipam/' },
        { name: 'Cilium Component Roles', url: 'https://docs.cilium.io/en/stable/overview/component-overview/' },
        { name: 'Datapath Models', url: 'https://docs.cilium.io/en/stable/network/concepts/routing/' },
      ],
    },
    {
      name: 'Network Policy',
      weight: 18,
      documentationUrl: 'https://docs.cilium.io/en/stable/security/policy/',
      topics: [
        { name: 'Interpret Cilium Network Polices and Intent', url: 'https://docs.cilium.io/en/stable/security/policy/' },
        { name: "Understand Cilium's Identity-based Network Security Model", url: 'https://docs.cilium.io/en/stable/security/policy/language/#identity-based' },
        { name: 'Policy Enforcement Modes', url: 'https://docs.cilium.io/en/stable/security/policy/intro/#policy-enforcement-modes' },
        { name: 'Policy Rule Structure', url: 'https://docs.cilium.io/en/stable/security/policy/language/' },
        { name: 'Kubernetes Network Policies versus Cilium Network Policies', url: 'https://docs.cilium.io/en/stable/security/policy/kubernetes/' },
      ],
    },
    {
      name: 'Service Mesh',
      weight: 16,
      documentationUrl: 'https://docs.cilium.io/en/stable/network/servicemesh/',
      topics: [
        { name: 'Know How to use Ingress or Gateway API for Ingress Routing', url: 'https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/' },
        { name: 'Service Mesh Use Cases', url: 'https://docs.cilium.io/en/stable/network/servicemesh/' },
        { name: 'Understand the Benefits of Gateway API over Ingress', url: 'https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/' },
        { name: 'Encrypting Traffic in Transit with Cilium', url: 'https://docs.cilium.io/en/stable/security/network/encryption/' },
        { name: 'Sidecar-based versus Sidecarless Architectures', url: 'https://docs.cilium.io/en/stable/network/servicemesh/' },
      ],
    },
    {
      name: 'Network Observability',
      weight: 10,
      documentationUrl: 'https://docs.cilium.io/en/stable/observability/',
      topics: [
        { name: 'Understand the Observability Capabilities of Hubble', url: 'https://docs.cilium.io/en/stable/observability/hubble/' },
        { name: 'Enabling Layer 7 Protocol Visibility', url: 'https://docs.cilium.io/en/stable/observability/visibility/' },
        { name: 'Know How to Use Hubble from the Command Line or the Hubble UI', url: 'https://docs.cilium.io/en/stable/observability/hubble/setup/' },
      ],
    },
    {
      name: 'Installation and Configuration',
      weight: 10,
      documentationUrl: 'https://docs.cilium.io/en/stable/gettingstarted/',
      topics: [
        { name: 'Know How to Use Cilium CLI to Query and Modify the Configuration', url: 'https://docs.cilium.io/en/stable/cmdref/cilium/' },
        { name: 'Using Cilium CLI to Install Cilium, Run Connectivity Tests, and Monitor its Status', url: 'https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/' },
      ],
    },
    {
      name: 'Cluster Mesh',
      weight: 10,
      documentationUrl: 'https://docs.cilium.io/en/stable/network/clustermesh/',
      topics: [
        { name: 'Understand the Benefits of Cluster Mesh for Multi-cluster Connectivity', url: 'https://docs.cilium.io/en/stable/network/clustermesh/' },
        { name: 'Achieve Service Discovery and Load Balancing Across Clusters with Cluster Mesh', url: 'https://docs.cilium.io/en/stable/network/clustermesh/services/' },
      ],
    },
    {
      name: 'eBPF',
      weight: 10,
      documentationUrl: 'https://docs.cilium.io/en/stable/bpf/',
      topics: [
        { name: 'Understand the Role of eBPF in Cilium', url: 'https://docs.cilium.io/en/stable/bpf/' },
        { name: 'eBPF Key Benefits', url: 'https://ebpf.io/what-is-ebpf/' },
        { name: 'eBPF-based Platforms versus IPtables-based Platforms', url: 'https://docs.cilium.io/en/stable/network/concepts/routing/#id2' },
      ],
    },
    {
      name: 'BGP and External Networking',
      weight: 6,
      documentationUrl: 'https://docs.cilium.io/en/stable/network/bgp/',
      topics: [
        { name: 'Egress Connectivity Requirements', url: 'https://docs.cilium.io/en/stable/network/egress-gateway/' },
        { name: 'Understand Options to Connect Cilium-managed Clusters with External Networks', url: 'https://docs.cilium.io/en/stable/network/bgp/' },
      ],
    },
  ],
  resources: ccaResources,
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
