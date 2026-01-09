// Static news data - automatically updated by n8n workflow
// Format: [category, date, source, title, description, url]

export type NewsCategory = 'scholarships' | 'certifications' | 'events' | 'announcements';
export type NewsItem = [NewsCategory, string, string, string, string, string];

export const staticNewsData: NewsItem[] = [
  // Weekly updates will be added here by automation
];
