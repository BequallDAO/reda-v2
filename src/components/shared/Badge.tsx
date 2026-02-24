interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'orange';
  size?: 'sm' | 'md';
}

const variantClasses: Record<string, string> = {
  default: 'bg-surface2 text-text2',
  green: 'bg-green/15 text-green',
  yellow: 'bg-yellow/15 text-yellow',
  red: 'bg-red/15 text-red',
  blue: 'bg-blue/15 text-blue',
  purple: 'bg-purple/15 text-purple',
  orange: 'bg-orange/15 text-orange',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      }`}
    >
      {children}
    </span>
  );
}
