interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-surface rounded-lg border border-border ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  );
}
