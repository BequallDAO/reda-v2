import { AlertTriangle, Check, X } from 'lucide-react';
import type { ScopeItem } from '@/types';

interface ScopeGapMatrixProps {
  items: ScopeItem[];
}

export function ScopeGapMatrix({ items }: ScopeGapMatrixProps) {
  if (items.length === 0) {
    return (
      <div className="text-sm text-text2 text-center py-6">
        No scope items defined yet. Add scope items to track factory-GC alignment.
      </div>
    );
  }

  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text">Scope Gap Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs text-text2 font-medium">Item</th>
              <th className="text-center py-2 text-xs text-text2 font-medium w-24">Factory</th>
              <th className="text-center py-2 text-xs text-text2 font-medium w-24">GC</th>
              <th className="text-center py-2 text-xs text-text2 font-medium w-20">Gap</th>
              <th className="text-left py-2 text-xs text-text2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <>
                <tr key={`cat-${cat}`}>
                  <td colSpan={5} className="pt-3 pb-1 text-xs font-semibold text-accent2 uppercase tracking-wide">{cat}</td>
                </tr>
                {items
                  .filter((i) => i.category === cat)
                  .map((item) => (
                    <tr key={item.id} className={`border-b border-border/50 ${item.gap ? 'bg-red/5' : ''}`}>
                      <td className="py-2 text-text">{item.item}</td>
                      <td className="py-2 text-center">
                        {item.factoryScope ? <Check size={14} className="text-green inline" /> : <X size={14} className="text-text2/50 inline" />}
                      </td>
                      <td className="py-2 text-center">
                        {item.gcScope ? <Check size={14} className="text-green inline" /> : <X size={14} className="text-text2/50 inline" />}
                      </td>
                      <td className="py-2 text-center">
                        {item.gap && <AlertTriangle size={14} className="text-red inline" />}
                      </td>
                      <td className="py-2 text-text2 text-xs">{item.notes}</td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
