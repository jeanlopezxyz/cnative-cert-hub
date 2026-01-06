/**
 * RSS Feed Fetcher
 * Fetches and parses RSS feeds from CNCF, Linux Foundation, and Kubernetes
 * Runs at build time for static site generation
 */

import type { NewsItem, NewsCategory, RSSFeedSource, RawRSSItem, CachedNewsData } from './types';

/**
 * RSS Feed Sources Configuration
 */
export const RSS_FEEDS: RSSFeedSource[] = [
  {
    id: 'cncf-blog',
    name: 'CNCF Blog',
    url: 'https://www.cncf.io/blog/feed/',
    defaultCategory: 'announcements',
    enabled: true,
  },
  {
    id: 'cncf-announcements',
    name: 'CNCF Announcements',
    url: 'https://www.cncf.io/announcements/feed/',
    defaultCategory: 'announcements',
    enabled: true,
  },
  {
    id: 'lf-events',
    name: 'LF Events',
    url: 'https://events.linuxfoundation.org/feed/',
    defaultCategory: 'events',
    enabled: true,
  },
  {
    id: 'kubernetes-blog',
    name: 'Kubernetes Blog',
    url: 'https://kubernetes.io/feed.xml',
    defaultCategory: 'announcements', // K8s releases and features are announcements
    enabled: true,
  },
];

/**
 * Keywords for category detection (order matters - first match wins)
 * Be specific to avoid false positives
 */
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  events: [
    'kubecon',
    'cloudnativecon',
    'open source summit',
    'ossummit',
    'wasmcon',
    'cfp',
    'call for proposals',
    'call for papers',
    'keynote speaker',
    'schedule for',
    'registration is open',
    'contribfest',
    'sustainability month',
    'community day',
    'kcd ',
    'co-locating',
  ],
  scholarships: [
    'scholarship',
    'dan kohn',
    'free certification',
    'mentorship program',
    'mentorship flywheel',
    'diversity program',
  ],
  certifications: [
    'certification exam',
    'certified kubernetes',
    'cka exam',
    'ckad exam',
    'cks exam',
    'kcna exam',
    'kcsa exam',
    'lfcs exam',
    'kubestronaut',
    'proctored exam',
    'linux foundation training',
  ],
  announcements: [
    // Default category - most news falls here
    // Kubernetes releases, CNCF project updates, technical articles
  ],
};

/**
 * Detect category based on title and content keywords
 */
function detectCategory(title: string, description: string, defaultCategory: NewsCategory): NewsCategory {
  const text = `${title} ${description}`.toLowerCase();

  // Check in priority order (events > scholarships > certifications > announcements)
  // Events first because KubeCon/CFP keywords are very specific
  const categoryOrder: NewsCategory[] = ['events', 'scholarships', 'certifications', 'announcements'];

  for (const category of categoryOrder) {
    const keywords = CATEGORY_KEYWORDS[category];
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
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
        const description = item.description || item.content || '';
        const title = stripHtml(item.title || '');

        return {
          id: generateId(item.link!),
          title,
          description: truncateDescription(description),
          url: item.link!,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: source.name,
          sourceUrl: source.url.replace(/\/feed\/?$/, '').replace(/\/feed\.xml$/, ''),
          category: detectCategory(title, description, source.defaultCategory),
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

  // Filter to last 60 days for relevance
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const recentItems = uniqueItems.filter(item => item.publishedAt >= sixtyDaysAgo);

  return {
    items: recentItems.slice(0, 30), // Limit to 30 most recent from last 60 days
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
