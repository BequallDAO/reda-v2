import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAppStore } from '@/stores/appStore';

export function AppLayout() {
  const { actionRailCollapsed } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Outlet context={{ actionRailCollapsed }} />
        </div>
      </div>
    </div>
  );
}
