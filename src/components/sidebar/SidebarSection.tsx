interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

/**
 * WowDash-style sidebar section with expand/collapse
 */
export default function SidebarSection({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  isCollapsed = false,
}: SidebarSectionProps) {

  // Collapsed mode - icon only
  if (isCollapsed) {
    return (
      <div className="mb-1">
        <button
          onClick={onToggle}
          className={`
            w-full flex items-center justify-center p-3 rounded-lg
            transition-all duration-200
            ${isOpen
              ? 'bg-primary-600 text-white'
              : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600'
            }
          `}
          aria-expanded={isOpen}
          aria-label={title}
          title={title}
        >
          {icon}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-2">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-3 py-3 rounded-lg
          transition-all duration-200 group
          ${isOpen
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }
        `}
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <div className="flex items-center gap-3">
          <span className={`transition-colors ${isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'}`}>
            {icon}
          </span>
          <span className="font-medium text-sm">
            {title}
          </span>
        </div>

        {/* Chevron Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Section Content - Using grid for smooth animation that handles dynamic content */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pl-4 space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
