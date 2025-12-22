import { useEffect } from 'react';

// Get the base path from the current URL or use default
const getBasePath = () => {
  if (typeof window === 'undefined') return '/cnative-cert-hub';
  // Extract base path from current location
  const pathParts = window.location.pathname.split('/');
  if (pathParts[1] === 'cnative-cert-hub') {
    return '/cnative-cert-hub';
  }
  return '';
};

export const InstantNavigation: React.FC = () => {
  useEffect(() => {
    const basePath = getBasePath();
    const prefetchedUrls = new Set<string>();

    // Preload navigation links on hover
    const handleLinkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href && link.hostname === window.location.hostname) {
        // Skip if already prefetched
        if (prefetchedUrls.has(link.href)) return;
        prefetchedUrls.add(link.href);

        // Use requestIdleCallback for non-blocking prefetch
        const prefetch = () => {
          const linkElement = document.createElement('link');
          linkElement.rel = 'prefetch';
          linkElement.href = link.href;
          linkElement.as = 'document';
          document.head.appendChild(linkElement);
        };

        if ('requestIdleCallback' in window) {
          requestIdleCallback(prefetch, { timeout: 2000 });
        } else {
          setTimeout(prefetch, 100);
        }
      }
    };

    // Add hover listeners to all links
    document.addEventListener('mouseover', handleLinkHover, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, []);

  return null;
};

export default InstantNavigation;