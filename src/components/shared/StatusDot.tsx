interface StatusDotProps {
  status: 'active' | 'pending' | 'blocked' | 'complete' | 'warning';
  size?: 'sm' | 'md';
}

const statusColors: Record<string, string> = {
  active: 'bg-green',
  pending: 'bg-yellow',
  blocked: 'bg-red',
  complete: 'bg-accent',
  warning: 'bg-orange',
};

export function StatusDot({ status, size = 'sm' }: StatusDotProps) {
  return (
    <span
      className={`inline-block rounded-full ${statusColors[status]} ${
        size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5'
      }`}
    />
  );
}
