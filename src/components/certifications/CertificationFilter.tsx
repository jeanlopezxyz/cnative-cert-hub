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
      activeClasses: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-500/25',
      inactiveClasses: 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700',
    },
    {
      value: 'entry',
      label: t('certifications.filter.entry'),
      activeClasses: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25',
      inactiveClasses: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/40',
    },
    {
      value: 'intermediate',
      label: t('certifications.filter.intermediate'),
      activeClasses: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25',
      inactiveClasses: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/40',
    },
    {
      value: 'advanced',
      label: t('certifications.filter.advanced'),
      activeClasses: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25',
      inactiveClasses: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800/40',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map(({ value, label, activeClasses, inactiveClasses }) => (
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
  );
}
