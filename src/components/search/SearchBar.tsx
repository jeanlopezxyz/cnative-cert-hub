import { useState, useRef, useEffect, useCallback } from 'react';
import { certifications } from '../../data/certifications';
import { CERTIFICATION_CATEGORIES } from '../../config/sidebar.config';
import { useTranslations } from '../../i18n/utils';
import type { Certification } from '../../types';
import { APP_CONFIG } from '../../constants';
import { sanitizeSearchQuery, searchRateLimiter } from '../../utils/security';
import { logger } from '../../utils/logger';

interface SearchBarProps {
  lang: 'en' | 'es' | 'pt';
}

interface SearchSuggestion {
  type: 'certification';
  id: string;
  title: string;
  description: string;
  url: string;
  score: number;
  matchType: 'exact' | 'partial' | 'fuzzy' | 'semantic';
  category?: string;
  level?: string;
  tags?: string[];
}

export default function SearchBar({ lang }: SearchBarProps) {
  const t = useTranslations(lang);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const prevQueryRef = useRef<string>('');

  // Fix autoCapitalize attribute on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('autocapitalize', 'off');
      inputRef.current.setAttribute('autocorrect', 'off');
    }
    if (desktopInputRef.current) {
      desktopInputRef.current.setAttribute('autocapitalize', 'off');
      desktopInputRef.current.setAttribute('autocorrect', 'off');
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSuggestions([]);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Advanced fuzzy search and scoring algorithm
  const calculateFuzzyScore = useCallback((text: string, query: string): number => {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Exact match gets highest score
    if (textLower === queryLower) return 100;
    if (textLower.includes(queryLower)) return 80;
    
    // Calculate fuzzy match score
    let score = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        score += (queryLower.length - queryIndex) * 2; // Earlier matches get higher scores
        queryIndex++;
      }
    }
    
    // Bonus for word boundary matches
    const words = textLower.split(/\s+/);
    words.forEach(word => {
      if (word.startsWith(queryLower)) score += 15;
      if (word.includes(queryLower)) score += 5;
    });
    
    // Acronym matching bonus
    const acronym = text.split(/\s+/).map(word => word[0]).join('').toLowerCase();
    if (acronym.includes(queryLower)) score += 20;
    
    return Math.min(score, 95); // Cap at 95 to keep exact matches highest
  }, []);

  // Semantic keyword mapping for better search
  const getSemanticKeywords = useCallback((query: string): string[] => {
    const semanticMap: Record<string, string[]> = {
      // Kubernetes terms
      'k8s': ['kubernetes', 'container', 'orchestration', 'cka', 'ckad', 'cks'],
      'kubernetes': ['k8s', 'container', 'orchestration', 'pods', 'cka', 'ckad', 'cks'],
      'container': ['kubernetes', 'docker', 'k8s', 'orchestration'],
      'admin': ['cka', 'administrator', 'cluster', 'management'],
      'developer': ['ckad', 'application', 'deployment', 'development'],
      'security': ['cks', 'secure', 'protection', 'hardening', 'kyverno'],
      
      // Technologies
      'prometheus': ['monitoring', 'metrics', 'observability', 'pca'],
      'istio': ['service mesh', 'networking', 'microservices', 'ica'],
      'argo': ['gitops', 'cd', 'continuous deployment', 'capa'],
      'cilium': ['networking', 'ebpf', 'cni', 'cca'],
      'backstage': ['platform', 'developer portal', 'cba'],
      'opentelemetry': ['observability', 'tracing', 'monitoring', 'otca'],
      
      // Concepts
      'beginner': ['entry', 'basic', 'fundamental', 'kcna'],
      'advanced': ['expert', 'professional', 'complex'],
      'intermediate': ['moderate', 'standard'],
      'exam': ['test', 'certification', 'assessment'],
      'practice': ['hands-on', 'lab', 'exercise', 'training'],
      'study': ['learn', 'preparation', 'guide', 'material'],
    };

    const keywords = [query.toLowerCase()];
    Object.entries(semanticMap).forEach(([key, values]) => {
      if (query.toLowerCase().includes(key) || values.some(v => query.toLowerCase().includes(v))) {
        keywords.push(...values);
      }
    });
    
    return [...new Set(keywords)];
  }, []);

  // Real-time search suggestions generator with progressive matching
  const generateSuggestions = useCallback((searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery || searchQuery.length < 1) return [];
    
    // Progressive threshold based on query length
    const getThreshold = (queryLength: number) => {
      if (queryLength === 1) return 40; // Higher threshold for single chars
      if (queryLength === 2) return 25; // Medium threshold for 2 chars
      return 15; // Lower threshold for longer queries
    };
    
    const threshold = getThreshold(searchQuery.length);

    const results: SearchSuggestion[] = [];
    const query = searchQuery.toLowerCase().trim();
    const basePath = APP_CONFIG.basePath || '';
    const langPath = lang === 'en' ? '' : `/${lang}`;
    const semanticKeywords = getSemanticKeywords(query);

    // Search certifications with advanced scoring
    certifications.forEach((cert: Certification) => {
      let maxScore = 0;
      let matchType: 'exact' | 'partial' | 'fuzzy' | 'semantic' = 'fuzzy';
      
      // Score different fields with weights
      const scores = {
        acronym: calculateFuzzyScore(cert.acronym, query) * 3, // Acronym gets highest weight
        name: calculateFuzzyScore(cert.name, query) * 2.5,
        description: calculateFuzzyScore(cert.description, query) * 1.5,
        level: calculateFuzzyScore(cert.level, query) * 2,
        domains: Math.max(
          ...cert.domains.map(d =>
            Math.max(
              calculateFuzzyScore(d.name, query) * 2,
              ...d.topics.map(t => calculateFuzzyScore(typeof t === 'string' ? t : t.name, query))
            )
          )
        )
      };

      maxScore = Math.max(...Object.values(scores));

      // Semantic matching bonus
      semanticKeywords.forEach(keyword => {
        if (keyword !== query) {
          const semanticScore = Math.max(
            calculateFuzzyScore(cert.acronym, keyword) * 0.8,
            calculateFuzzyScore(cert.name, keyword) * 0.7,
            calculateFuzzyScore(cert.level, keyword) * 0.6
          );
          if (semanticScore > 10) {
            maxScore = Math.max(maxScore, semanticScore);
            matchType = 'semantic';
          }
        }
      });

      // Determine match type
      if (cert.acronym.toLowerCase() === query || cert.name.toLowerCase().includes(query)) {
        matchType = 'exact';
      } else if (cert.acronym.toLowerCase().includes(query) || cert.name.toLowerCase().includes(query)) {
        matchType = 'partial';
      }

      if (maxScore > threshold) { // Dynamic threshold based on query length
        const categoryObj = CERTIFICATION_CATEGORIES.find(cat => 
          cat.certificationIds.includes(cert.id)
        );
        const categoryKey = categoryObj?.key || '';
        const categoryName = categoryObj ? t(categoryObj.name) : '';

        // Translate description if it's a translation key
        const description = cert.description.startsWith('cert.') 
          ? t(cert.description) 
          : cert.description;

        results.push({
          type: 'certification',
          id: cert.id,
          title: `${cert.acronym} - ${cert.name}`,
          description: description,
          url: `${basePath}${langPath}/certifications/${cert.id}`,
          score: maxScore,
          matchType,
          category: categoryName,
          level: cert.level,
          tags: [cert.level, categoryKey, cert.type]
        });
      }
    });

    // Only search certifications - no categories, achievements, or tips

    // Sort by score (descending) and limit results
    return results
      .sort((a, b) => {
        // Primary sort: by score
        if (b.score !== a.score) return b.score - a.score;
        
        // Secondary sort: by match type priority
        const matchTypePriority = { exact: 4, partial: 3, semantic: 2, fuzzy: 1 };
        const aPriority = matchTypePriority[a.matchType];
        const bPriority = matchTypePriority[b.matchType];
        if (bPriority !== aPriority) return bPriority - aPriority;
        
        // All results are certifications now, so no type priority needed
        return 0;
      })
      .slice(0, 5); // Limit to 5 results
  }, [lang, t, calculateFuzzyScore, getSemanticKeywords]);

  // Real-time search with debouncing for better performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        const newSuggestions = generateSuggestions(query);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
      // Only reset focusedIndex when query actually changes
      if (prevQueryRef.current !== query) {
        setFocusedIndex(-1);
        prevQueryRef.current = query;
      }
    }, 150); // Small debounce for real-time feel

    return () => clearTimeout(timeoutId);
  }, [query, generateSuggestions]);

  // Scroll focused suggestion into view
  useEffect(() => {
    if (focusedIndex >= 0 && suggestionsRef.current) {
      const focusedElement = suggestionsRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Apply security validation but maintain original functionality
    if (!searchRateLimiter.isAllowed('search-input')) {
      logger.warn('Search rate limit exceeded');
      return;
    }
    
    const sanitizedValue = sanitizeSearchQuery(rawValue);
    setQuery(sanitizedValue);
    
    // Immediate update for single character to show instant feedback
    if (sanitizedValue.length === 1 || sanitizedValue.length === 0) {
      if (sanitizedValue.trim()) {
        setSuggestions(generateSuggestions(sanitizedValue));
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape always closes the search
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsFocused(false);
      setSuggestions([]);
      setFocusedIndex(-1);
      setIsExpanded(false);
      setQuery('');
      inputRef.current?.blur();
      desktopInputRef.current?.blur();
      return;
    }

    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex(prev => {
          const next = prev < suggestions.length - 1 ? prev + 1 : 0;
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex(prev => {
          const next = prev > 0 ? prev - 1 : suggestions.length - 1;
          return next;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && suggestions[focusedIndex]) {
          window.location.pathname = suggestions[focusedIndex].url;
        }
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    // Use window.location.pathname to navigate properly in GitHub Pages
    window.location.pathname = suggestion.url;
  };

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim() || query.length < 2) return text;

    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-0.5 rounded">
            {part}
          </mark>
        ) : part
      );
    } catch {
      return text;
    }
  };

  return (
    <>
      {/* Mobile Search Button - WowDash Style */}
      <button
        onClick={() => {
          setIsExpanded(true);
          // Use requestAnimationFrame to focus immediately after render
          // This maintains the user gesture context for mobile keyboards
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          });
        }}
        className="sm:hidden inline-flex items-center justify-center w-[37.5px] h-[37.5px] text-neutral-600 dark:text-neutral-400 bg-transparent rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
        aria-label={t('aria.search')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>

      {/* Expanded Search for Mobile / Normal Search for Desktop */}
      <div 
        className={`${isExpanded ? 'fixed inset-0 bg-black/50 z-50 sm:relative sm:inset-auto sm:bg-transparent' : 'hidden sm:block'} sm:relative sm:w-full sm:max-w-md sm:mx-auto`}
        ref={containerRef}
      >
        {/* Mobile Search Header - WowDash Style */}
        {isExpanded && (
          <div className="sm:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
            <div className="h-full flex items-center px-3 gap-2">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setQuery('');
                  setSuggestions([]);
                }}
                className="inline-flex items-center justify-center w-10 h-10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                aria-label={t('aria.closeSearch')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <div className="flex-1 relative">
                {/* Search Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>

                {/* Clear button when there's text */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 z-10"
                    type="button"
                    aria-label={t('aria.clearSearch')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Mobile Search Input - WowDash Style */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                  placeholder={t('search.placeholder')}
                  className="w-full h-10 pl-9 pr-9 rounded-lg text-sm border outline-none transition-all duration-200 bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  aria-label={t('aria.search')}
                  autoComplete="off"
                  autoFocus={isExpanded}
                  enterKeyHint="search"
                  inputMode="search"
                  spellCheck={false}
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Search - WowDash Style */}
        <div className={`${isExpanded ? 'hidden' : 'hidden sm:block'} relative w-full`}>
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Clear button when there's text */}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                desktopInputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 z-10 transition-colors"
              type="button"
              aria-label={t('aria.clearSearch')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Desktop Search Input - WowDash Style - Bigger */}
          <input
            ref={desktopInputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            placeholder={t('search.placeholder')}
            className="w-full h-11 pl-12 pr-12 text-sm text-neutral-700 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
            aria-label={t('aria.search')}
            autoComplete="off"
            spellCheck={false}
            suppressHydrationWarning
          />
        </div>

        {/* Search Suggestions - Modern Card Style */}
        {(isFocused || suggestions.length > 0) && suggestions.length > 0 && (
          <div className={`${isExpanded ? 'fixed top-16 left-3 right-3 mt-3' : 'absolute left-0 right-0 top-full mt-3'} bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-xl shadow-neutral-200/50 dark:shadow-black/30 overflow-hidden z-50`}>
            {/* Header */}
            <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                {t('search.results')} ({suggestions.length})
              </p>
            </div>

            <div ref={suggestionsRef} className="p-2 max-h-80 overflow-y-auto" style={{ listStyle: 'none' }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.type}-${suggestion.id}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSuggestionClick(suggestion); }}
                  role="button"
                  tabIndex={0}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 group cursor-pointer mb-1 last:mb-0 ${
                    index === focusedIndex
                      ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Certification Icon Badge */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      index === focusedIndex
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-500'
                    } transition-colors`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <div className={`text-base font-semibold truncate ${
                        index === focusedIndex
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                      }`}>
                        {highlightMatch(suggestion.title, query)}
                      </div>

                      {/* Tags/Meta info */}
                      {(suggestion.level || suggestion.category) && (
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          {suggestion.level && (
                            <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full ${
                              suggestion.level === 'entry'
                                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                                : suggestion.level === 'intermediate'
                                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                                  : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400'
                            }`}>
                              {t(`certifications.level.${suggestion.level}`)}
                            </span>
                          )}
                          {suggestion.category && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full">
                              {suggestion.category}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Arrow icon */}
                    <div className={`flex-shrink-0 ${
                      index === focusedIndex
                        ? 'text-primary-500 opacity-100'
                        : 'text-neutral-400 opacity-0 group-hover:opacity-100'
                    } transition-all duration-200`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backdrop for mobile */}
        {isFocused && suggestions.length > 0 && !isExpanded && (
          <div
            role="button"
            tabIndex={0}
            aria-label={t('aria.closeSearch')}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-20 lg:hidden"
            onClick={() => {
              setIsFocused(false);
              setSuggestions([]);
              setFocusedIndex(-1);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsFocused(false);
                setSuggestions([]);
                setFocusedIndex(-1);
              }
              if (e.key === 'Escape') {
                setIsFocused(false);
                setSuggestions([]);
                setFocusedIndex(-1);
              }
            }}
          />
        )}
      </div>
    </>
  );
}
