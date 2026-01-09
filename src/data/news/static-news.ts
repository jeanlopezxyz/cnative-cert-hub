/**
 * Static News Data
 * Supplementary news items added by n8n automation
 * Format matches NewsItem interface from types.ts
 */

import type { NewsItem } from './types';

// Static news entries - automation adds new items at MARKER below
export const staticNewsData: NewsItem[] = [
  // === Weekly Update: 2026-01-02 to 2026-01-09 ===
  {
    id: 'news-20260108-1',
    title: 'Viettel Joins the Cloud Native Computing Foundation as a Gold Member',
    description: 'Viettel to contribute deep telecom and infrastructure expertise and foster open source collaboration to the CNCF community.',
    url: 'https://www.cncf.io/announcements/2026/01/07/viettel-joins-the-cloud-native-computing-foundation-as-a-gold-member/',
    publishedAt: new Date('2026-01-08'),
    source: 'CNCF',
    sourceUrl: 'https://www.cncf.io',
    category: 'announcements',
  },
  {
    id: 'news-20260107-2',
    title: 'HolmesGPT: Agentic troubleshooting built for the cloud native era',
    description: 'Introduces an agentic troubleshooting tool designed specifically for the cloud native era to address critical operational challenges.',
    url: 'https://www.cncf.io/blog/2026/01/07/holmesgpt-agentic-troubleshooting-built-for-the-cloud-native-era/',
    publishedAt: new Date('2026-01-07'),
    source: 'CNCF',
    sourceUrl: 'https://www.cncf.io',
    category: 'announcements',
  },
  {
    id: 'news-20260106-3',
    title: 'Using Istio to manage high-traffic services',
    description: 'Advanced use case of Istio for managing high-traffic services with real-time traffic control and bot mitigation in scalable architectures.',
    url: 'https://www.cncf.io/blog/2026/01/06/using-istio-to-manage-high-traffic-services/',
    publishedAt: new Date('2026-01-06'),
    source: 'CNCF',
    sourceUrl: 'https://www.cncf.io',
    category: 'announcements',
  },
  {
    id: 'news-20260105-4',
    title: 'Deploying Harbor on Kubernetes using Helm',
    description: 'Practical guide for deploying Harbor with Helm on Kubernetes, covering essential security and container registry management aspects.',
    url: 'https://www.cncf.io/blog/2026/01/05/deploying-harbor-on-kubernetes-using-helm/',
    publishedAt: new Date('2026-01-05'),
    source: 'CNCF',
    sourceUrl: 'https://www.cncf.io',
    category: 'announcements',
  },
  // __NEWS_MARKER__ - Do not remove this line, automation inserts here
];
