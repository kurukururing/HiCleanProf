import { ArrowRight } from 'lucide-react';

export function Button({ 
  children, variant = 'primary', className = '', href, onClick, showArrow = false 
}) {
  const baseStyle = "inline-flex items-center justify-center px-6 min-h-[44px] rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2";
  
  const variants = {
    primary: "bg-ink text-white hover:bg-neutral-800 shadow-sm",
    secondary: "bg-white border border-ink text-ink hover:bg-neutral-50 shadow-sm",
    ghost: "bg-transparent text-ink hover:text-brand-green group",
  };

  const Element = href ? 'a' : 'button';
  const target = href && href.startsWith('http') ? "_blank" : undefined;
  const rel = target ? "noopener noreferrer" : undefined;

  return (
    <Element 
      href={href} 
      onClick={onClick}
      target={target}
      rel={rel}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      <span className={variant === 'ghost' ? "group-hover:underline decoration-brand-green decoration-2 underline-offset-4" : ""}>
        {children}
      </span>
      {showArrow && variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4" />}
    </Element>
  );
}