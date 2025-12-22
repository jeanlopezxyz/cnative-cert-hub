import type { CertificationLevel } from '../../types';

interface CertificationFilterProps {
  currentFilter: CertificationLevel | 'all';
  onFilterChange: (filter: CertificationLevel | 'all') => void;
  t: (key: string) => string;
}

interface FilterOption {
  value: CertificationLevel | 'all';
  label: string;
  activeClasses: string;
  inactiveClasses: string;
}

export default function CertificationFilter({
  currentFilter,
  onFilterChange,
  t,
}: CertificationFilterProps) {
  const filters: FilterOption[] = [
    {
      value: 'all',
      label: t('certifications.filter.all'),
      activeClasses: 'bg-neutral-700 dark:bg-neutral-600 text-white shadow-lg shadow-neutral-500/25',
      inactiveClasses: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700',
    },
    {
      value: 'entry',
      label: t('certifications.filter.entry'),
      activeClasses: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25',
      inactiveClasses: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-800/40',
    },
    {
      value: 'intermediate',
      label: t('certifications.filter.intermediate'),
      activeClasses: 'bg-blue-600 text-white shadow-lg shadow-blue-500/25',
      inactiveClasses: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/40',
    },
    {
      value: 'advanced',
      label: t('certifications.filter.advanced'),
      activeClasses: 'bg-violet-600 text-white shadow-lg shadow-violet-500/25',
      inactiveClasses: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-800/40',
    },
  ];

  const allFilter = filters[0];
  const levelFilters = filters.slice(1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8">
      {/* All Levels - own row on mobile, centered */}
      <div className="flex justify-center w-full sm:w-auto">
        <button
          onClick={() => onFilterChange(allFilter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentFilter === allFilter.value ? allFilter.activeClasses : allFilter.inactiveClasses
          }`}
        >
          {allFilter.label}
        </button>
      </div>

      {/* Level filters - second row on mobile, centered */}
      <div className="flex justify-center gap-2 w-full sm:w-auto">
        {levelFilters.map(({ value, label, activeClasses, inactiveClasses }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentFilter === value ? activeClasses : inactiveClasses
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
