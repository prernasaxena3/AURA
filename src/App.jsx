import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatchManagement from './pages/PatchManagement';
import IntelligentAlerts from './pages/IntelligentAlerts';
import ResourceMonitor from './pages/ResourceMonitor';
import DriftManagement from './pages/DriftManagement';


function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1EFEC' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patch-management" element={<PatchManagement />} />
        <Route path="/intelligent-alerts" element={<IntelligentAlerts />} />
        <Route path="/resource-monitor" element={<ResourceMonitor />} />
        <Route path="/drift-management" element={<DriftManagement />} />
      </Routes>
    </div>
  );
}

export default App;
