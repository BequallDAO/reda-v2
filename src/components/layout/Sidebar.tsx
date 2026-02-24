import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Handshake,
  Mail,
  HardHat,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

const navItems = [
  { path: '/marketing', label: 'Marketing', icon: BarChart3, engine: 'marketing' as const },
  { path: '/sales', label: 'Sales', icon: Handshake, engine: 'sales' as const },
  { path: '/campaigns', label: 'Campaigns', icon: Mail, engine: 'campaigns' as const },
  { path: '/ops', label: 'Operations', icon: HardHat, engine: 'ops' as const },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, setEngine } = useAppStore();

  return (
    <aside
      className={`flex flex-col bg-surface border-r border-border transition-all duration-200 ${
        sidebarCollapsed ? 'w-16' : 'w-[220px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent text-white font-bold text-sm shrink-0">
          R
        </div>
        {!sidebarCollapsed && (
          <div>
            <div className="text-sm font-semibold text-text">REDA</div>
            <div className="text-[10px] text-text2 -mt-0.5">by Bequall</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setEngine(item.engine)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-accent/15 text-accent2'
                  : 'text-text2 hover:bg-surface2 hover:text-text'
              }`
            }
          >
            <item.icon size={18} className="shrink-0" />
            {!sidebarCollapsed && item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-accent/15 text-accent2'
                : 'text-text2 hover:bg-surface2 hover:text-text'
            }`
          }
        >
          <Settings size={18} className="shrink-0" />
          {!sidebarCollapsed && 'Settings'}
        </NavLink>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text2 hover:bg-surface2 hover:text-text w-full transition-colors cursor-pointer"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!sidebarCollapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
