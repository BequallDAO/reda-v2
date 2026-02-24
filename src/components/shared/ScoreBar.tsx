interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
}

function getBarColor(value: number): string {
  if (value >= 80) return 'bg-green';
  if (value >= 60) return 'bg-accent';
  if (value >= 40) return 'bg-yellow';
  return 'bg-red';
}

export function ScoreBar({ label, value, max = 100 }: ScoreBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-text2">{label}</span>
        <span className="text-text font-medium">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface2">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(value)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
