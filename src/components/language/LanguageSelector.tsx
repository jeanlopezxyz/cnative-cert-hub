import { useState, useRef, useEffect } from 'react';
import { languages } from '../../i18n/ui';
import { useTranslations } from '../../i18n/utils';

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const t = useTranslations(currentLang as 'en' | 'es' | 'pt');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    // Remove base path if exists
    if (segments[0] === 'cncf-certification-hub') {
      segments.shift();
    }

    // Remove current language if it exists
    if (segments[0] && Object.keys(languages).includes(segments[0])) {
      segments.shift();
    }

    // Build new path with base
    let newPath = '/cncf-certification-hub';
    if (lang !== 'en') {
      newPath += '/' + lang;
    }
    if (segments.length > 0) {
      newPath += '/' + segments.join('/');
    }

    // Add trailing slash for index pages
    if (segments.length === 0 || segments[0] === '') {
      newPath += '/';
    }

    window.location.href = newPath;
  };

  const langCodes: Record<string, string> = {
    en: 'EN',
    es: 'ES',
    pt: 'PT',
  };

  const langNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };

  return (
    <div className="relative flex items-center h-16" ref={dropdownRef}>
      {/* Auxx-style Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center p-0 w-[37.5px] h-[37.5px] text-neutral-600 dark:text-neutral-400 transition-all duration-200 ease-linear bg-transparent rounded-md dropdown-toggle hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label={t('aria.selectLanguage')}
      >
        <span className="text-xs font-bold">{langCodes[currentLang]}</span>
      </button>

      {/* Auxx-style Dropdown */}
      {isOpen && (
        <div className="absolute z-50 p-4 ltr:text-left rtl:text-right bg-white dark:bg-neutral-800 rounded-md shadow-lg dark:shadow-neutral-900/50 top-full mt-1 right-0 min-w-[10rem] flex flex-col gap-3 border border-neutral-200 dark:border-neutral-600">
          {Object.entries(languages).map(([lang, _name]) => {
            const isActive = currentLang === lang;
            return (
              <button
                key={lang}
                onClick={() => {
                  handleLanguageChange(lang);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 group/items transition-all duration-200 ease-linear text-left"
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-600/30'
                    : 'bg-neutral-100 dark:bg-neutral-700'
                }`}>
                  <span className={`text-[10px] font-bold ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}>{langCodes[lang]}</span>
                </div>
                <span className={`font-medium text-sm transition-all duration-200 ease-linear ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400 group-hover/items:text-primary-500'
                }`}>{langNames[lang]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}