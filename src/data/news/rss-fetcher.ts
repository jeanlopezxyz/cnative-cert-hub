/**
 * RSS Feed Fetcher
 * Fetches and parses RSS feeds from CNCF, Linux Foundation, and Kubernetes
 * Runs at build time for static site generation
 */

import type { NewsItem, NewsCategory, RSSFeedSource, RawRSSItem, CachedNewsData } from './types';

/**
 * RSS Feed Sources Configuration
 * Focus on official announcements, not technical tutorials
 */
export const RSS_FEEDS: RSSFeedSource[] = [
  {
    id: 'cncf-announcements',
    name: 'CNCF Announcements',
    url: 'https://www.cncf.io/announcements/feed/',
    defaultCategory: 'announcements',
    enabled: true, // Official CNCF news: graduations, new projects, certifications
  },
  {
    id: 'lf-events',
    name: 'LF Events',
    url: 'https://events.linuxfoundation.org/feed/',
    defaultCategory: 'events',
    enabled: true, // KubeCon, Open Source Summit schedules
  },
  {
    id: 'cncf-blog',
    name: 'CNCF Blog',
    url: 'https://www.cncf.io/blog/feed/',
    defaultCategory: 'announcements',
    enabled: false, // Disabled: mostly technical tutorials, not news
  },
  {
    id: 'kubernetes-blog',
    name: 'Kubernetes Blog',
    url: 'https://kubernetes.io/feed.xml',
    defaultCategory: 'announcements',
    enabled: false, // Disabled: too many K8s release details
  },
];

/**
 * Keywords for category detection (order matters - first match wins)
 * Tuned for CNCF Announcements feed content
 */
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  scholarships: [
    'scholarship',
    'dan kohn',
    'travel funding',
    'registration scholarship',
    'need-based',
    'complimentary registration',
  ],
  certifications: [
    'certification',
    'launches cnpe',
    'launches cka',
    'launches ckad',
    'launches cks',
    'launches kcna',
    'launches kcsa',
    'certified kubernetes',
    'kubestronaut',
    'training and certification',
    'exam update',
    'conformance program',
  ],
  events: [
    'kubecon',
    'cloudnativecon',
    'open source summit',
    'schedule for',
    'keynote speaker',
    'registration is open',
    'call for proposals',
  ],
  announcements: [
    // Default: project graduations, new members, releases
    // ArgoCD, Crossplane, Helm, Falco, etc.
  ],
};

/**
 * Detect category based on title and content keywords
 * For scholarships: only check title (to avoid false positives from event announcements)
 * For other categories: check title + description
 */
function detectCategory(title: string, description: string, defaultCategory: NewsCategory): NewsCategory {
  const titleLower = title.toLowerCase();
  const fullText = `${title} ${description}`.toLowerCase();

  // 1. Scholarships: ONLY check title (avoid false positives from KubeCon announcements)
  if (CATEGORY_KEYWORDS.scholarships.some(keyword => titleLower.includes(keyword))) {
    return 'scholarships';
  }

  // 2. Certifications: check full text
  if (CATEGORY_KEYWORDS.certifications.some(keyword => fullText.includes(keyword))) {
    return 'certifications';
  }

  // 3. Events: check full text
  if (CATEGORY_KEYWORDS.events.some(keyword => fullText.includes(keyword))) {
    return 'events';
  }

  return defaultCategory;
}

/**
 * Parse RSS XML to extract items
 */
function parseRSSXML(xml: string): RawRSSItem[] {
  const items: RawRSSItem[] = [];

  // Simple XML parsing for RSS items
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];

  for (const itemXml of itemMatches) {
    const getTagContent = (tag: string): string | undefined => {
      const match = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
      return match ? match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim() : undefined;
    };

    items.push({
      title: getTagContent('title'),
      link: getTagContent('link'),
      pubDate: getTagContent('pubDate'),
      description: getTagContent('description'),
      content: getTagContent('content:encoded') || getTagContent('content'),
      author: getTagContent('author') || getTagContent('dc:creator'),
    });
  }

  return items;
}

/**
 * Generate unique ID from URL
 */
function generateId(url: string): string {
  // Simple hash function for ID generation
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8216;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/&#8221;/gi, '"')
    .replace(/&#8211;/gi, '–')
    .replace(/&#8212;/gi, '—')
    .replace(/&#(\d+);/gi, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/**
 * Strip HTML tags and decode entities
 * Handles double-encoded content from RSS feeds
 */
function stripHtml(html: string): string {
  let result = html;

  // First pass: decode entities (handles double-encoded HTML like &lt;p&gt;)
  result = decodeHtmlEntities(result);

  // Second pass: remove HTML tags
  result = result.replace(/<[^>]*>/g, ' ');

  // Third pass: decode any remaining entities (in case of double encoding)
  result = decodeHtmlEntities(result);

  // Fourth pass: strip any remaining tags
  result = result.replace(/<[^>]*>/g, ' ');

  // Clean up whitespace
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

/**
 * Truncate description to max length
 */
function truncateDescription(text: string, maxLength: number = 200): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Fetch and parse a single RSS feed
 */
async function fetchFeed(source: RSSFeedSource, timeout: number = 10000): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'CNCertHub/1.0 (RSS Feed Reader)',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xml = await response.text();
    const rawItems = parseRSSXML(xml);

    return rawItems
      .filter(item => item.title && item.link)
      .map(item => {
        const description = item.description || '';
        const content = item.content || '';
        const title = stripHtml(item.title || '');
        // Use full content for category detection (scholarships info is often in full article)
        const fullText = `${description} ${content}`;

        return {
          id: generateId(item.link!),
          title,
          description: truncateDescription(description || content),
          url: item.link!,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: source.name,
          sourceUrl: source.url.replace(/\/feed\/?$/, '').replace(/\/feed\.xml$/, ''),
          category: detectCategory(title, fullText, source.defaultCategory),
          author: item.author ? stripHtml(item.author) : undefined,
        };
      });
  } catch (error) {
    console.error(`Failed to fetch ${source.name}:`, error);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch all news from configured RSS feeds
 * This runs at build time in Astro frontmatter
 */
export async function fetchAllNews(): Promise<CachedNewsData> {
  const enabledFeeds = RSS_FEEDS.filter(feed => feed.enabled);
  const errors: string[] = [];

  const results = await Promise.allSettled(enabledFeeds.map(feed => fetchFeed(feed)));

  const items: NewsItem[] = [];
  const sources: string[] = [];

  results.forEach((result, index) => {
    const feed = enabledFeeds[index];
    if (result.status === 'fulfilled') {
      items.push(...result.value);
      if (result.value.length > 0) {
        sources.push(feed.name);
      }
    } else {
      errors.push(`${feed.name}: ${result.reason}`);
    }
  });

  // Sort by publish date (newest first)
  items.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  // Deduplicate by URL
  const seen = new Set<string>();
  const uniqueItems = items.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });

  return {
    items: uniqueItems.slice(0, 50), // Get up to 50 most recent items
    fetchedAt: new Date(),
    sources,
    errors,
  };
}

/**
 * Get fallback news data when feeds are unavailable
 */
export function getFallbackNewsData(): CachedNewsData {
  return {
    items: [],
    fetchedAt: new Date(),
    sources: [],
    errors: ['Unable to fetch news feeds. Please try again later.'],
  };
}
