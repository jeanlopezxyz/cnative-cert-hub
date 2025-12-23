interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

/**
 * Modern sidebar section with expand/collapse - optimized for mobile
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
            w-full flex items-center justify-center p-3 rounded-xl
            transition-all duration-200
            ${isOpen
              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
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
    <div className="mb-1">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 lg:py-3 rounded-xl
          transition-all duration-200 group
          ${isOpen
            ? 'bg-primary-800 text-white shadow-md'
            : 'text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
          }
        `}
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <div className="flex items-center gap-3">
          <span className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
            ${isOpen
              ? 'bg-white/20 text-white'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white group-hover:bg-primary-200 dark:group-hover:bg-primary-800 group-hover:text-primary-900 dark:group-hover:text-white'
            }
          `}>
            {icon}
          </span>
          <span className="font-semibold text-sm">
            {title}
          </span>
        </div>

        {/* Chevron Arrow */}
        <div className={`
          w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200
          ${isOpen
            ? 'bg-white/20'
            : 'bg-transparent group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700'
          }
        `}>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Section Content - Using grid for smooth animation that handles dynamic content */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="pt-1.5 pl-3 lg:pl-4 space-y-0.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
