import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import MarketingPage from '@/pages/MarketingPage';
import SalesPage from '@/pages/SalesPage';
import CampaignsPage from '@/pages/CampaignsPage';
import OpsPage from '@/pages/OpsPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/marketing" replace />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/marketing/:accountId" element={<MarketingPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/sales/new" element={<SalesPage />} />
        <Route path="/sales/:dealId" element={<SalesPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:campaignId" element={<CampaignsPage />} />
        <Route path="/ops" element={<OpsPage />} />
        <Route path="/ops/:projectId" element={<OpsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
