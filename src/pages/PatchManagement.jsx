import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  Filter,
  RefreshCw,
  Server,
  Activity,
  User
} from 'lucide-react';

const PatchManagement = () => {
  const [selectedDevice, setSelectedDevice] = useState('WS-Marketing-01');

  const devices = [
    {
      id: 'WS-Marketing-01',
      name: 'Marketing Workstation 01',
      status: 'healthy',
      patches: 12,
      lastUpdate: '2024-01-15 14:30',
      os: 'Windows 11',
      progress: 100
    },
    {
      id: 'SRV-Database-01',
      name: 'Database Server 01',
      status: 'updating',
      patches: 8,
      lastUpdate: '2024-01-15 15:45',
      os: 'Ubuntu 22.04',
      progress: 65
    }
  ];

  const activityLog = [
    {
      id: 1,
      action: 'Patch deployment completed',
      device: 'WS-Marketing-01',
      timestamp: '2024-01-15 14:30:15',
      status: 'success',
      user: 'System'
    },
    {
      id: 2,
      action: 'Security update in progress',
      device: 'SRV-Database-01',
      timestamp: '2024-01-15 15:45:22',
      status: 'in-progress',
      user: 'Admin'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'updating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'updating': return <Clock className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#123458' }}>
              Patch Management
            </h1>
            <p className="mt-2 opacity-70" style={{ color: '#123458' }}>
              Automated patch deployment and system updates
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Total Devices</p>
              <p className="text-2xl font-bold" style={{ color: '#123458' }}>247</p>
            </div>
            <Server className="w-6 h-6 opacity-60" style={{ color: '#123458' }} />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Up to Date</p>
              <p className="text-2xl font-bold text-green-600">234</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Updating</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Needs Attention</p>
              <p className="text-2xl font-bold text-yellow-600">5</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Management */}
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Device Management</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded text-sm" style={{ backgroundColor: '#F1EFEC', color: '#123458' }}>
                  <Filter className="w-4 h-4 inline mr-1" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y" style={{ divideColor: '#D4C9BE' }}>
            {devices.map((device) => (
              <div 
                key={device.id}
                className={`p-4 cursor-pointer transition-colors ${selectedDevice === device.id ? 'bg-opacity-50' : 'hover:bg-opacity-25'}`}
                style={{ backgroundColor: selectedDevice === device.id ? '#F1EFEC' : 'transparent' }}
                onClick={() => setSelectedDevice(device.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(device.status)}`}>
                        {getStatusIcon(device.status)}
                        <span>{device.status}</span>
                      </div>
                      <span className="font-medium" style={{ color: '#123458' }}>{device.name}</span>
                    </div>
                    <span className="text-sm opacity-60" style={{ color: '#123458' }}>{device.os}</span>
                  </div>

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="opacity-60" style={{ color: '#123458' }}>Patches Available:</span>
                      <span style={{ color: '#123458' }}>{device.patches}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60" style={{ color: '#123458' }}>Last Update:</span>
                      <span style={{ color: '#123458' }}>{device.lastUpdate}</span>
                    </div>
                  </div>

                  {device.status === 'updating' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#123458' }}>Progress</span>
                        <span style={{ color: '#123458' }}>{device.progress}%</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: '#F1EFEC' }}>
                        <div 
                          className="h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            backgroundColor: '#123458',
                            width: `${device.progress}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Recent Activity</h3>
          </div>

          <div className="divide-y" style={{ divideColor: '#D4C9BE' }}>
            {activityLog.map((activity) => (
              <div key={activity.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${activity.status === 'success' ? 'bg-green-100' : activity.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : activity.status === 'in-progress' ? (
                      <Activity className="w-4 h-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium" style={{ color: '#123458' }}>{activity.action}</p>
                      <div className="flex items-center space-x-1 text-xs opacity-60" style={{ color: '#123458' }}>
                        <User className="w-3 h-3" />
                        <span>{activity.user}</span>
                      </div>
                    </div>
                    <p className="text-sm opacity-60" style={{ color: '#123458' }}>{activity.device}</p>
                    <p className="text-xs opacity-50 mt-1" style={{ color: '#123458' }}>{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
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
                <Play className="w-4 h-4" />
                <span>Deploy All</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Pause className="w-4 h-4" />
                <span>Pause Updates</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <RotateCcw className="w-4 h-4" />
                <span>Rollback</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchManagement;