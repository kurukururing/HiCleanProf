export function StatCard({ value, unit, description, source, isLast }) {
  return (
    <div className={`flex flex-col md:items-start group transition-all duration-300 ${!isLast ? 'border-b md:border-b-0 md:border-r border-neutral-200 pb-6 md:pb-0 md:pr-8' : ''}`}>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-5xl md:text-6xl font-bold font-heading text-ink tracking-tight group-hover:text-brand-green transition-colors duration-300">
          {value}
        </span>
        <span className="text-lg font-semibold text-neutral-400">{unit}</span>
      </div>
      <p className="text-sm md:text-base text-neutral-800 font-medium mb-1 leading-snug">{description}</p>
      <p className="text-xs text-neutral-400 mt-auto pt-2">{source}</p>
    </div>
  );
}