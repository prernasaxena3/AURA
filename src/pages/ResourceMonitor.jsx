import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  Wifi,
  Monitor,
  Server,
  RefreshCw,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ResourceMonitor = () => {
  const [selectedDevice, setSelectedDevice] = useState('SRV-Web-01');
  const [timeRange, setTimeRange] = useState('5m');
  const [realTimeData, setRealTimeData] = useState([]);

  // Generate real-time data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const data = [];
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 10000);
        data.push({
          time: time.toLocaleTimeString(),
          cpu: Math.floor(Math.random() * 40) + 30,
          memory: Math.floor(Math.random() * 30) + 50,
          disk: Math.floor(Math.random() * 20) + 20,
          network: Math.floor(Math.random() * 50) + 25,
          gpu: Math.floor(Math.random() * 60) + 20
        });
      }
      return data;
    };

    setRealTimeData(generateData());
    const interval = setInterval(() => {
      setRealTimeData(generateData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const devices = [
    {
      id: 'SRV-Web-01',
      name: 'Web Server 01',
      status: 'healthy',
      cpu: 45,
      memory: 67,
      disk: 34,
      network: 78,
      gpu: 23,
      uptime: '15d 4h 32m'
    },
    {
      id: 'SRV-DB-01',
      name: 'Database Server 01',
      status: 'warning',
      cpu: 78,
      memory: 89,
      disk: 67,
      network: 45,
      gpu: 12,
      uptime: '8d 12h 15m'
    },
    {
      id: 'WS-DEV-01',
      name: 'Development Workstation',
      status: 'critical',
      cpu: 92,
      memory: 95,
      disk: 89,
      network: 34,
      gpu: 87,
      uptime: '2d 6h 45m'
    }
  ];

  const systemStats = {
    totalDevices: 247,
    healthyDevices: 234,
    warningDevices: 8,
    criticalDevices: 5,
    avgCpuUsage: 45,
    avgMemoryUsage: 67
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getUsageColor = (usage) => {
    if (usage >= 90) return '#ef4444'; // red
    if (usage >= 70) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  const selectedDeviceData = devices.find(device => device.id === selectedDevice);

  const MetricChart = ({ title, data, dataKey, color, icon, unit = '%' }) => (
    <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div style={{ color: color }}>{icon}</div>
            <h3 className="font-semibold" style={{ color: '#123458' }}>{title}</h3>
          </div>
          <div className="text-2xl font-bold" style={{ color: color }}>
            {selectedDeviceData ? selectedDeviceData[dataKey.toLowerCase()] : 0}{unit}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realTimeData}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#123458' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#123458' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #D4C9BE',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey.toLowerCase()} 
                stroke={color} 
                strokeWidth={2}
                dot={false}
                fill={color}
                fillOpacity={0.1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#123458' }}>
              Resource Monitor
            </h1>
            <p className="mt-2 opacity-70" style={{ color: '#123458' }}>
              Real-time system performance monitoring and analytics
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <select 
              className="px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: '#D4C9BE', backgroundColor: '#F1EFEC' }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="5m">Last 5 minutes</option>
              <option value="1h">Last 1 hour</option>
              <option value="24h">Last 24 hours</option>
            </select>
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Total Devices</p>
              <p className="text-2xl font-bold" style={{ color: '#123458' }}>{systemStats.totalDevices}</p>
            </div>
            <Server className="w-6 h-6 opacity-60" style={{ color: '#123458' }} />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Healthy</p>
              <p className="text-2xl font-bold text-green-600">{systemStats.healthyDevices}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Warning</p>
              <p className="text-2xl font-bold text-yellow-600">{systemStats.warningDevices}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Critical</p>
              <p className="text-2xl font-bold text-red-600">{systemStats.criticalDevices}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Avg CPU</p>
              <p className="text-2xl font-bold text-blue-600">{systemStats.avgCpuUsage}%</p>
            </div>
            <Cpu className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-60" style={{ color: '#123458' }}>Avg Memory</p>
              <p className="text-2xl font-bold text-purple-600">{systemStats.avgMemoryUsage}%</p>
            </div>
            <MemoryStick className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Device List */}
        <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Devices</h3>
          </div>

          <div className="divide-y" style={{ divideColor: '#D4C9BE' }}>
            {devices.map((device) => (
              <div 
                key={device.id}
                className={`p-4 cursor-pointer transition-colors ${selectedDevice === device.id ? 'bg-opacity-50' : 'hover:bg-opacity-25'}`}
                style={{ backgroundColor: selectedDevice === device.id ? '#F1EFEC' : 'transparent' }}
                onClick={() => setSelectedDevice(device.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm" style={{ color: '#123458' }}>{device.name}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(device.status)}`}>
                      {getStatusIcon(device.status)}
                      <span>{device.status}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="opacity-60" style={{ color: '#123458' }}>CPU</span>
                      <span style={{ color: getUsageColor(device.cpu) }}>{device.cpu}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="opacity-60" style={{ color: '#123458' }}>Memory</span>
                      <span style={{ color: getUsageColor(device.memory) }}>{device.memory}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="opacity-60" style={{ color: '#123458' }}>Uptime</span>
                      <span style={{ color: '#123458' }}>{device.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Charts */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricChart 
            title="CPU Usage" 
            data={realTimeData} 
            dataKey="cpu" 
            color="#3b82f6" 
            icon={<Cpu className="w-5 h-5" />}
          />
          
          <MetricChart 
            title="Memory Usage" 
            data={realTimeData} 
            dataKey="memory" 
            color="#8b5cf6" 
            icon={<MemoryStick className="w-5 h-5" />}
          />
          
          <MetricChart 
            title="Disk Usage" 
            data={realTimeData} 
            dataKey="disk" 
            color="#10b981" 
            icon={<HardDrive className="w-5 h-5" />}
          />
          
          <MetricChart 
            title="Network Usage" 
            data={realTimeData} 
            dataKey="network" 
            color="#f59e0b" 
            icon={<Wifi className="w-5 h-5" />}
          />
          
          <MetricChart 
            title="GPU Usage" 
            data={realTimeData} 
            dataKey="gpu" 
            color="#ef4444" 
            icon={<Monitor className="w-5 h-5" />}
          />
          
          <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5" style={{ color: '#123458' }} />
                <h3 className="font-semibold" style={{ color: '#123458' }}>System Health</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
                  <div className="text-sm opacity-60" style={{ color: '#123458' }}>Overall Health Score</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#123458' }}>Performance</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#123458' }}>Availability</span>
                    <span className="text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#123458' }}>Response Time</span>
                    <span className="text-green-600">100ms</span>
                  </div>
                </div>
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
                <RefreshCw className="w-4 h-4" />
                <span>Refresh All</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Settings className="w-4 h-4" />
                <span>Configure Alerts</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Download className="w-4 h-4" />
                <span>Export Metrics</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#D4C9BE', color: '#123458' }}>
                <Activity className="w-4 h-4" />
                <span>Health Check</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default ResourceMonitor;