import React, { useState } from 'react';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import { GitBranch, GitCommitVertical as GitCommit, GitMerge, Shield, AlertTriangle, CheckCircle, Clock, RotateCcw, Bot, User, ArrowRight, Circle, RefreshCw, Settings, HardDrive, FileText, Eye } from 'lucide-react';

const DriftManagement = () => {
  const { showToast, ToastContainer } = useToast();
  const [selectedEvent, setSelectedEvent] = useState('DFT-001');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [driftFlowData, setDriftFlowData] = useState([
    {
      id: 'DFT-001',
      device: 'WS-Marketing-01',
      application: 'Adobe Photoshop',
      type: 'Configuration Drift',
      severity: 'high',
      timestamp: '2024-01-15 14:32:15',
      description: 'Config file modified: preferences.xml',
      originalVersion: 'v24.1.0-stable',
      driftedVersion: 'v24.1.0-modified',
      restoredVersion: 'v24.1.0-stable',
      aiAction: 'Auto-restored from backup',
      status: 'resolved',
      trigger: 'automatic',
      flowSteps: [
        { type: 'original', version: 'v24.1.0-stable', timestamp: '14:30:00', status: 'stable' },
        { type: 'drift', version: 'v24.1.0-modified', timestamp: '14:32:15', status: 'detected' },
        { type: 'restore', version: 'v24.1.0-stable', timestamp: '14:32:45', status: 'resolved' }
      ]
    },
    {
      id: 'DFT-002',
      device: 'SRV-Database-01',
      application: 'MySQL Server',
      type: 'File Deletion',
      severity: 'critical',
      timestamp: '2024-01-15 13:45:22',
      description: 'Critical file deleted: my.cnf',
      originalVersion: 'v8.0.35-original',
      driftedVersion: 'missing',
      restoredVersion: null,
      aiAction: 'Pending manual review',
      status: 'pending',
      trigger: 'manual',
      flowSteps: [
        { type: 'original', version: 'v8.0.35-original', timestamp: '13:40:00', status: 'stable' },
        { type: 'drift', version: 'missing', timestamp: '13:45:22', status: 'critical' },
        { type: 'pending', version: 'awaiting action', timestamp: '13:45:30', status: 'pending' }
      ]
    },
    {
      id: 'DFT-003',
      device: 'WS-Finance-03',
      application: 'QuickBooks',
      type: 'Binary Modification',
      severity: 'medium',
      timestamp: '2024-01-15 12:18:07',
      description: 'Executable checksum mismatch',
      originalVersion: 'v2023.2.1-original',
      driftedVersion: 'v2023.2.1-modified',
      restoredVersion: 'v2023.2.1-original',
      aiAction: 'Quarantined and restored',
      status: 'resolved',
      trigger: 'automatic',
      flowSteps: [
        { type: 'original', version: 'v2023.2.1-original', timestamp: '12:15:00', status: 'stable' },
        { type: 'drift', version: 'v2023.2.1-modified', timestamp: '12:18:07', status: 'detected' },
        { type: 'quarantine', version: 'quarantined', timestamp: '12:18:15', status: 'quarantined' },
        { type: 'restore', version: 'v2023.2.1-original', timestamp: '12:18:30', status: 'resolved' }
      ]
    }
  ]);

  const driftStats = {
    totalEvents: driftFlowData.length,
    resolvedEvents: driftFlowData.filter(d => d.status === 'resolved').length,
    pendingEvents: driftFlowData.filter(d => d.status === 'pending').length,
    criticalEvents: driftFlowData.filter(d => d.severity === 'critical').length,
    autoResolved: 89,
    manualActions: 11
  };

  const handleRefresh = () => {
    showToast('Refreshing drift events...', 'info');
    setTimeout(() => {
      showToast('Drift events refreshed', 'success');
    }, 1000);
  };

  const handleBulkRestore = () => {
    const pendingEvents = driftFlowData.filter(event => event.status === 'pending');
    if (pendingEvents.length === 0) {
      showToast('No pending events to restore', 'info');
      return;
    }
    
    setShowRestoreModal(true);
  };

  const confirmBulkRestore = () => {
    const pendingEvents = driftFlowData.filter(event => event.status === 'pending');
    showToast(`Restoring ${pendingEvents.length} events...`, 'info');
    
    pendingEvents.forEach((event, index) => {
      setTimeout(() => {
        setDriftFlowData(prev => prev.map(e => 
          e.id === event.id ? { 
            ...e, 
            status: 'resolved',
            restoredVersion: e.originalVersion,
            flowSteps: [
              ...e.flowSteps,
              { type: 'restore', version: e.originalVersion, timestamp: new Date().toLocaleTimeString(), status: 'resolved' }
            ]
          } : e
        ));
        showToast(`${event.id} restored successfully`, 'success');
      }, (index + 1) * 1000);
    });
    
    setShowRestoreModal(false);
  };

  const handleRestoreEvent = (eventId) => {
    const event = driftFlowData.find(e => e.id === eventId);
    if (!event) return;
    
    showToast(`Restoring ${eventId}...`, 'info');
    
    setTimeout(() => {
      setDriftFlowData(prev => prev.map(e => 
        e.id === eventId ? { 
          ...e, 
          status: 'resolved',
          restoredVersion: e.originalVersion,
          flowSteps: [
            ...e.flowSteps,
            { type: 'restore', version: e.originalVersion, timestamp: new Date().toLocaleTimeString(), status: 'resolved' }
          ]
        } : e
      ));
      showToast(`${eventId} restored successfully`, 'success');
    }, 2000);
  };

  const handleInvestigateEvent = (eventId) => {
    showToast(`Opening investigation for ${eventId}`, 'info');
    // In a real app, this would open a detailed investigation view
  };

  const handleExportFlow = () => {
    const report = {
      timestamp: new Date().toISOString(),
      events: driftFlowData,
      statistics: driftStats
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drift-flow-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Drift flow exported successfully', 'success');
  };

  const handleBackupNow = () => {
    showToast('Creating backup snapshots...', 'info');
    setTimeout(() => {
      showToast('Backup completed for all monitored configurations', 'success');
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFlowStepColor = (type, status) => {
    switch (type) {
      case 'original': return '#10b981'; // green
      case 'drift': return status === 'critical' ? '#ef4444' : '#f59e0b'; // red or amber
      case 'quarantine': return '#8b5cf6'; // purple
      case 'restore': return '#10b981'; // green
      case 'pending': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };

  const getFlowStepIcon = (type) => {
    switch (type) {
      case 'original': return <GitCommit className="w-4 h-4" />;
      case 'drift': return <AlertTriangle className="w-4 h-4" />;
      case 'quarantine': return <Shield className="w-4 h-4" />;
      case 'restore': return <RotateCcw className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const GitFlowVisualization = ({ event }) => {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-lg" style={{ color: '#123458' }}>
            {event.id} - Version Flow
          </h4>
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5" style={{ color: '#123458' }} />
            <span className="text-sm font-medium" style={{ color: '#123458' }}>
              {event.application}
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Main flow line */}
          <div 
            className="absolute left-6 top-8 bottom-0 w-0.5" 
            style={{ backgroundColor: '#D4C9BE' }}
          ></div>

          {/* Flow steps */}
          <div className="space-y-6">
            {event.flowSteps.map((step, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                {/* Flow node */}
                <div 
                  className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4"
                  style={{ 
                    backgroundColor: getFlowStepColor(step.type, step.status),
                    borderColor: '#F1EFEC'
                  }}
                >
                  <div className="text-white">
                    {getFlowStepIcon(step.type)}
                  </div>
                </div>

                {/* Step details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium capitalize" style={{ color: '#123458' }}>
                        {step.type === 'original' ? 'Original State' : 
                         step.type === 'drift' ? 'Drift Detected' :
                         step.type === 'quarantine' ? 'Quarantined' :
                         step.type === 'restore' ? 'Auto-Restored' :
                         'Pending Action'}
                      </h5>
                      <p className="text-sm opacity-60" style={{ color: '#123458' }}>
                        {step.timestamp}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(step.status)}`}>
                        {step.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: '#F1EFEC', borderColor: '#D4C9BE' }}>
                    <div className="flex items-center space-x-2">
                      <GitCommit className="w-4 h-4 opacity-60" style={{ color: '#123458' }} />
                      <span className="font-mono text-sm" style={{ color: '#123458' }}>
                        {step.version}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Branch indicator for drift */}
                {step.type === 'drift' && (
                  <div className="absolute left-12 top-6">
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-0.5" 
                        style={{ backgroundColor: getFlowStepColor(step.type, step.status) }}
                      ></div>
                      <ArrowRight 
                        className="w-4 h-4" 
                        style={{ color: getFlowStepColor(step.type, step.status) }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2 pt-4 border-t" style={{ borderColor: '#D4C9BE' }}>
          {event.status === 'pending' ? (
            <>
              <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
                <RotateCcw className="w-4 h-4 inline mr-1" />
                Restore
              </button>
              <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Eye className="w-4 h-4 inline mr-1" />
                Investigate
              </button>
            </>
          ) : (
            <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
              <Eye className="w-4 h-4 inline mr-1" />
              View Details
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#123458' }}>
              Drift Management
            </h1>
            <p className="mt-2 opacity-70" style={{ color: '#123458' }}>
              Git-flow style configuration drift detection and version control
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
              onClick={handleRefresh}
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
              <Settings className="w-4 h-4 inline mr-2" />
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Total Events</p>
              <p className="text-2xl font-bold" style={{ color: '#123458' }}>{driftStats.totalEvents}</p>
            </div>
            <GitBranch className="w-6 h-6 opacity-60" style={{ color: '#123458' }} />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Resolved</p>
              <p className="text-2xl font-bold text-green-600">{driftStats.resolvedEvents}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{driftStats.pendingEvents}</p>
            </div>
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Critical</p>
              <p className="text-2xl font-bold text-red-600">{driftStats.criticalEvents}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Auto-Resolved</p>
              <p className="text-2xl font-bold text-blue-600">{driftStats.autoResolved}%</p>
            </div>
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Manual Actions</p>
              <p className="text-2xl font-bold text-purple-600">{driftStats.manualActions}%</p>
            </div>
            <User className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drift Events List */}
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Drift Events</h3>
            </div>
          </div>

          <div className="divide-y" style={{ divideColor: '#D4C9BE' }}>
            {driftFlowData.map((event) => (
              <div 
                key={event.id} 
                className={`p-4 cursor-pointer transition-colors ${selectedEvent === event.id ? 'bg-opacity-50' : 'hover:bg-opacity-25'}`}
                onClick={() => showToast('Merge functionality coming soon', 'info')}
                onClick={() => showToast('Branch creation functionality coming soon', 'info')}
                onClick={() => setShowConfigModal(true)}
                onClick={handleBackupNow}
                onClick={handleExportFlow}
                style={{ backgroundColor: selectedEvent === event.id ? '#F1EFEC' : 'transparent' }}
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium" style={{ color: '#123458' }}>{event.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                      {event.trigger === 'automatic' ? <Bot className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4 text-purple-600" />}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <div className="text-sm" style={{ color: '#123458' }}>
                    <div className="font-medium">{event.device} - {event.application}</div>
                    <div className="text-xs opacity-60">{event.type}: {event.description}</div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <GitCommit className="w-3 h-3 opacity-60" />
                      <span className="opacity-60">From:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-1 rounded">{event.originalVersion}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 opacity-40" />
                    <div className="flex items-center space-x-1">
                      <span className="opacity-60">To:</span>
                      <span className={`font-mono px-1 rounded ${event.driftedVersion === 'missing' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {event.driftedVersion}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs opacity-50" style={{ color: '#123458' }}>
                    {event.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Git Flow Visualization */}
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Version Flow Visualization</h3>
          </div>
          
          {selectedEvent && (
            <GitFlowVisualization 
              event={driftFlowData.find(e => e.id === selectedEvent)} 
            />
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Quick Actions</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
                onClick={handleBulkRestore}
                <RotateCcw className="w-4 h-4" />
                <span>Bulk Restore</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <GitMerge className="w-4 h-4" />
                <span>Merge Changes</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <GitBranch className="w-4 h-4" />
                <span>Create Branch</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Settings className="w-4 h-4" />
                <span>Configure Rules</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <HardDrive className="w-4 h-4" />
                <span>Backup Now</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <FileText className="w-4 h-4" />
                <span>Export Flow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Drift Management Configuration"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#123458' }}>
              Monitoring Sensitivity
            </label>
            <select className="w-full p-2 border rounded-lg" style={{ borderColor: '#D4C9BE' }}>
              <option>High - Detect all changes</option>
              <option>Medium - Ignore minor changes</option>
              <option>Low - Only critical changes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#123458' }}>
              Auto-Restore Policy
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm" style={{ color: '#123458' }}>Auto-restore configuration files</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm" style={{ color: '#123458' }}>Auto-restore binary files</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm" style={{ color: '#123458' }}>Create backup before restore</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#D4C9BE', color: '#123458' }}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setShowConfigModal(false);
                showToast('Drift management configuration saved', 'success');
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#123458', color: '#F1EFEC' }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Bulk Restore Confirmation Modal */}
      <Modal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        title="Bulk Restore Confirmation"
      >
        <div className="space-y-4">
          <p style={{ color: '#123458' }}>
            Are you sure you want to restore all pending drift events? This will:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: '#123458' }}>
            <li>Restore {driftFlowData.filter(d => d.status === 'pending').length} configurations to their original state</li>
            <li>Create backup snapshots before restoration</li>
            <li>Generate detailed restoration logs</li>
          </ul>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              onClick={() => setShowRestoreModal(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#D4C9BE', color: '#123458' }}
            >
              Cancel
            </button>
            <button 
              onClick={confirmBulkRestore}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#123458', color: '#F1EFEC' }}
            >
              Restore All
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DriftManagement;