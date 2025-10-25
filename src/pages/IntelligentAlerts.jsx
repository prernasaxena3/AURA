import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Bot,
  User,
  Zap,
  Shield,
  HardDrive,
  RotateCcw,
  Eye,
  X,
  RefreshCw,
  Filter,
  TrendingUp,
  Activity
} from 'lucide-react';

const IntelligentAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState('ALT-001');

  const alerts = [
    {
      id: 'ALT-001',
      type: 'Anomaly Detection',
      title: 'Unusual CPU Usage Pattern',
      device: 'SRV-Web-01',
      application: 'Apache HTTP Server',
      severity: 'high',
      timestamp: '2024-01-15 14:32:15',
      description: 'CPU usage spiked to 95% for 15+ minutes',
      aiSolution: 'Restart Apache service and enable connection throttling',
      possibleCauses: ['DDoS attack', 'Memory leak in application', 'Insufficient resources'],
      metrics: { cpu: '95%', memory: '78%', connections: '2,847' },
      status: 'active',
      autoResolvable: true
    },
    {
      id: 'ALT-002',
      type: 'Drift Detection',
      title: 'Configuration File Modified',
      device: 'WS-Finance-03',
      application: 'QuickBooks Desktop',
      severity: 'medium',
      timestamp: '2024-01-15 13:45:22',
      description: 'User preferences file changed unexpectedly',
      aiSolution: 'Restore from backup and implement file monitoring',
      possibleCauses: ['User modification', 'Software update', 'Malware activity'],
      metrics: { fileSize: '2.3KB → 4.1KB', checksum: 'Changed', permissions: 'Modified' },
      status: 'investigating',
      autoResolvable: true
    },
    {
      id: 'ALT-003',
      type: 'Patch Failure',
      title: 'Security Update Failed',
      device: 'WS-Marketing-05',
      application: 'Windows Update',
      severity: 'critical',
      timestamp: '2024-01-15 12:18:07',
      description: 'KB5034441 security update failed to install',
      aiSolution: 'Clear Windows Update cache and retry installation',
      possibleCauses: ['Corrupted update files', 'Insufficient disk space', 'Service conflicts'],
      metrics: { errorCode: '0x80070643', diskSpace: '2.1GB free', attempts: '3' },
      status: 'failed',
      autoResolvable: false
    },
    {
      id: 'ALT-004',
      type: 'Rollback Required',
      title: 'Application Crash After Update',
      device: 'WS-Design-02',
      application: 'Adobe Creative Suite',
      severity: 'high',
      timestamp: '2024-01-15 11:30:45',
      description: 'Photoshop crashes on startup after recent update',
      aiSolution: 'Rollback to previous version and schedule maintenance window',
      possibleCauses: ['Plugin incompatibility', 'Corrupted installation', 'System requirements'],
      metrics: { crashCount: '12', uptime: '0 minutes', version: 'v24.1.1' },
      status: 'resolved',
      autoResolvable: true
    }
  ];

  const alertStats = {
    totalAlerts: 47,
    activeAlerts: 12,
    resolvedToday: 28,
    criticalAlerts: 3,
    autoResolved: 89,
    avgResolutionTime: '4.2m'
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
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Anomaly Detection': return <TrendingUp className="w-4 h-4" />;
      case 'Drift Detection': return <Shield className="w-4 h-4" />;
      case 'Patch Failure': return <AlertTriangle className="w-4 h-4" />;
      case 'Rollback Required': return <RotateCcw className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const selectedAlertData = alerts.find(alert => alert.id === selectedAlert);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#123458' }}>
              Intelligent Alerts
            </h1>
            <p className="mt-2 opacity-70" style={{ color: '#123458' }}>
              AI-powered anomaly detection and automated resolution
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
              <Bot className="w-4 h-4 inline mr-2" />
              Auto-Resolve
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Total Alerts</p>
              <p className="text-2xl font-bold" style={{ color: '#123458' }}>{alertStats.totalAlerts}</p>
            </div>
            <AlertTriangle className="w-6 h-6 opacity-60" style={{ color: '#123458' }} />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Active</p>
              <p className="text-2xl font-bold text-red-600">{alertStats.activeAlerts}</p>
            </div>
            <Activity className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">{alertStats.resolvedToday}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Critical</p>
              <p className="text-2xl font-bold text-red-600">{alertStats.criticalAlerts}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Auto-Resolved</p>
              <p className="text-2xl font-bold text-blue-600">{alertStats.autoResolved}%</p>
            </div>
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Avg Resolution</p>
              <p className="text-2xl font-bold text-purple-600">{alertStats.avgResolutionTime}</p>
            </div>
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts List */}
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Active Alerts</h3>
              <button className="px-3 py-1 rounded text-sm" style={{ backgroundColor: '#F1EFEC', color: '#123458' }}>
                <Filter className="w-4 h-4 inline mr-1" />
                Filter
              </button>
            </div>
          </div>

          <div className="divide-y" style={{ divideColor: '#D4C9BE' }}>
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 cursor-pointer transition-colors ${selectedAlert === alert.id ? 'bg-opacity-50' : 'hover:bg-opacity-25'}`}
                style={{ backgroundColor: selectedAlert === alert.id ? '#F1EFEC' : 'transparent' }}
                onClick={() => setSelectedAlert(alert.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium" style={{ color: '#123458' }}>{alert.id}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getSeverityColor(alert.severity)}`}>
                        {getTypeIcon(alert.type)}
                        <span>{alert.severity}</span>
                      </div>
                      {alert.autoResolvable && <Bot className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1" style={{ color: '#123458' }}>{alert.title}</div>
                    <div className="text-sm opacity-60" style={{ color: '#123458' }}>
                      {alert.device} - {alert.application}
                    </div>
                    <div className="text-sm opacity-60" style={{ color: '#123458' }}>
                      {alert.type}: {alert.description}
                    </div>
                  </div>

                  <div className="text-xs opacity-50" style={{ color: '#123458' }}>
                    {alert.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Details & AI Insights */}
        <div className="space-y-6">
          {/* Alert Details */}
          {selectedAlertData && (
            <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>
                    {selectedAlertData.id} - Details
                  </h3>
                  <div className="flex space-x-2">
                    {selectedAlertData.autoResolvable && (
                      <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
                        <Bot className="w-4 h-4 inline mr-1" />
                        Auto-Resolve
                      </button>
                    )}
                    <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                      <Eye className="w-4 h-4 inline mr-1" />
                      Investigate
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#123458' }}>AI Suggested Solution</h4>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F1EFEC' }}>
                    <div className="flex items-start space-x-2">
                      <Bot className="w-5 h-5 mt-0.5 text-blue-600" />
                      <p className="text-sm" style={{ color: '#123458' }}>
                        {selectedAlertData.aiSolution}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#123458' }}>Possible Causes</h4>
                  <ul className="space-y-1">
                    {selectedAlertData.possibleCauses.map((cause, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm" style={{ color: '#123458' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#123458' }}></div>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#123458' }}>Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedAlertData.metrics).map(([key, value]) => (
                      <div key={key} className="p-2 rounded border" style={{ backgroundColor: '#F1EFEC', borderColor: '#D4C9BE' }}>
                        <div className="text-xs opacity-60 capitalize" style={{ color: '#123458' }}>{key}</div>
                        <div className="font-medium" style={{ color: '#123458' }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights Panel */}
          <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
              <h3 className="text-lg font-semibold flex items-center space-x-2" style={{ color: '#123458' }}>
                <Bot className="w-5 h-5 text-blue-600" />
                <span>AI Insights</span>
              </h3>
            </div>

            <div className="p-4 space-y-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F1EFEC' }}>
                <h4 className="font-medium mb-2" style={{ color: '#123458' }}>Pattern Detection</h4>
                <p className="text-sm opacity-80" style={{ color: '#123458' }}>
                  Similar CPU spikes detected on 3 other web servers in the last 24 hours. 
                  Possible coordinated attack or infrastructure issue.
                </p>
              </div>

              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F1EFEC' }}>
                <h4 className="font-medium mb-2" style={{ color: '#123458' }}>Proactive Recommendation</h4>
                <p className="text-sm opacity-80" style={{ color: '#123458' }}>
                  Consider implementing auto-scaling policies and DDoS protection 
                  to prevent similar incidents.
                </p>
              </div>

              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F1EFEC' }}>
                <h4 className="font-medium mb-2" style={{ color: '#123458' }}>Risk Assessment</h4>
                <p className="text-sm opacity-80" style={{ color: '#123458' }}>
                  Medium risk of service disruption. Immediate action recommended 
                  to prevent cascading failures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Quick Actions</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
                <Bot className="w-4 h-4" />
                <span>Auto-Resolve All</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <X className="w-4 h-4" />
                <span>Dismiss Resolved</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Shield className="w-4 h-4" />
                <span>Security Scan</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <HardDrive className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentAlerts;