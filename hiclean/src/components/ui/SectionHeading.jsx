export function SectionHeading({ label, title, description, className = '' }) {
  return (
    <div className={`flex flex-col items-center text-center md:items-start md:text-left mb-10 md:mb-14 ${className}`}>
      {label && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 mb-4">
          <span className="w-2 h-2 rounded-full bg-brand-green"></span>
          {label}
        </div>
      )}
      <h2 className="text-[28px] md:text-[40px] font-bold text-ink leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-neutral-600 max-w-2xl line-clamp-3">
          {description}
        </p>
      )}
    </div>
  );
}