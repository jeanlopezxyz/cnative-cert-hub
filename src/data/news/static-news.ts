// Static news data - automatically updated by n8n workflow
// Format: [category, date, source, title, description, url]

export type NewsCategory = 'scholarships' | 'certifications' | 'events' | 'announcements';
export type NewsItem = [NewsCategory, string, string, string, string, string];

export const staticNewsData: NewsItem[
  // === Weekly Update: 2026-01-02 to 2026-01-09 ===
  ['announcements', '2026-01-08', 'CNCF', 'Viettel Joins the Cloud Native Computing Foundation as a Gold Member', 'Viettel to contribute deep telecom and infrastructure expertise and foster open source collaboration.', 'https://www.cncf.io/announcements/2026/01/07/viettel-joins-the-cloud-native-computing-foundation-as-a-gold-member/'],
  ['announcements', '2026-01-07', 'CNCF', 'HolmesGPT: Agentic troubleshooting built for the cloud native era', 'Agentic troubleshooting tool designed to debug production incidents in cloud native environments efficiently.', 'https://www.cncf.io/blog/2026/01/07/holmesgpt-agentic-troubleshooting-built-for-the-cloud-native-era/'],
  ['announcements', '2026-01-06', 'CNCF', 'Using Istio to manage high-traffic services', 'Case study on managing high-traffic SaaS platforms with Istio for real-time traffic control and bot mitigation.', 'https://www.cncf.io/blog/2026/01/06/using-istio-to-manage-high-traffic-services/'],
  ['announcements', '2026-01-05', 'CNCF', 'Deploying Harbor on Kubernetes using Helm', 'Guide to deploying Harbor, a container image registry, on Kubernetes with Helm for security and management.', 'https://www.cncf.io/blog/2026/01/05/deploying-harbor-on-kubernetes-using-helm/'],
] = [
  // Weekly updates will be added here by automation
];
