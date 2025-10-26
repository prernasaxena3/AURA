import React, { useState, useEffect } from "react";
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
  Clock,
  Info,
  X,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: <CheckCircle className="w-5 h-5" />,
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: <AlertTriangle className="w-5 h-5" />,
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: <AlertTriangle className="w-5 h-5" />,
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <Info className="w-5 h-5" />,
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg min-w-80 ${styles.bg} ${styles.border} ${styles.text}`}
    >
      <div className="flex-shrink-0">{styles.icon}</div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 flex-shrink-0 rounded-md p-1.5 hover:bg-opacity-20 hover:bg-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Modal Components
const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [format, setFormat] = useState("json");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl shadow-xl bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Export Metrics
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Choose the format for exporting resource metrics:
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setFormat("json")}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  format === "json"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-900">JSON Format</div>
                <div className="text-sm text-gray-600">
                  Complete data with metadata
                </div>
              </button>
              <button
                onClick={() => setFormat("csv")}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  format === "csv"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-900">CSV Format</div>
                <div className="text-sm text-gray-600">
                  Spreadsheet compatible
                </div>
              </button>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => onExport(format)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigureAlertsModal = ({ isOpen, onClose, onSave }) => {
  const [thresholds, setThresholds] = useState({
    cpu: 80,
    memory: 85,
    disk: 90,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl shadow-xl bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Configure Alert Thresholds
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                CPU Usage Alert Threshold (%)
              </label>
              <input
                type="number"
                value={thresholds.cpu}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    cpu: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Memory Usage Alert Threshold (%)
              </label>
              <input
                type="number"
                value={thresholds.memory}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    memory: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Disk Usage Alert Threshold (%)
              </label>
              <input
                type="number"
                value={thresholds.disk}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    disk: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="0"
                max="100"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(thresholds)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthCheckModal = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && !isRunning) {
      setIsRunning(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl shadow-xl bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Running health check on all devices...
            </h3>
            {progress === 100 && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-gray-900">{progress}%</span>
              </div>
              <div className="w-full rounded-full h-3 bg-gray-200">
                <div
                  className="h-3 rounded-full transition-all duration-300 bg-blue-600"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            {progress === 100 && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    Health check completed successfully
                  </span>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  All systems are operating within normal parameters.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceMonitor = () => {
  const [selectedDevice, setSelectedDevice] = useState(
    "Marketing Workstation 01"
  );
  const [timeRange, setTimeRange] = useState("Last 5 minutes");
  const [realTimeData, setRealTimeData] = useState([]);
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);

  const devices = [
    {
      id: 1,
      name: "Marketing Workstation 01",
      status: "healthy",
      cpu: 45,
      memory: 67,
      uptime: "15d 4h 32m",
    },
    {
      id: 2,
      name: "Database Server 01",
      status: "updating",
      cpu: 78,
      memory: 89,
      uptime: "8d 12h 15m",
    },
    {
      id: 3,
      name: "Development Workstation",
      status: "critical",
      cpu: 92,
      memory: 95,
      uptime: "2d 6h 45m",
    },
  ];

  // Generate real-time data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const data = [];
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 10000);
        data.push({
          time: time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          cpu: Math.floor(Math.random() * 40) + 30,
          memory: Math.floor(Math.random() * 30) + 50,
          disk: Math.floor(Math.random() * 20) + 20,
          network: Math.floor(Math.random() * 50) + 25,
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

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing metrics...", "info");
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Metrics refreshed successfully", "success");
    }, 2000);
  };

  const handleExport = (format) => {
    const data = {
      timestamp: new Date().toISOString(),
      devices,
      metrics: realTimeData,
    };

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `metrics-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // CSV export
      const csvContent = realTimeData
        .map(
          (row) =>
            `${row.time},${row.cpu},${row.memory},${row.disk},${row.network}`
        )
        .join("\n");
      const blob = new Blob([`Time,CPU,Memory,Disk,Network\n${csvContent}`], {
        type: "text/csv",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `metrics-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    setShowExportModal(false);
    showToast("Metrics exported successfully", "success");
  };

  const handleSaveAlerts = (thresholds) => {
    setShowAlertsModal(false);
    showToast("Alert thresholds updated successfully", "success");
  };

  const selectedDeviceData = devices.find((d) => d.name === selectedDevice);

  const MetricChart = ({ title, dataKey, color, icon, unit = "%" }) => (
    <div className="rounded-xl shadow-sm bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div style={{ color }}>{icon}</div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="text-2xl font-bold" style={{ color }}>
            {selectedDeviceData
              ? selectedDeviceData[dataKey.toLowerCase()] || 0
              : 0}
            {unit}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey.toLowerCase()}
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />

      <ConfigureAlertsModal
        isOpen={showAlertsModal}
        onClose={() => setShowAlertsModal(false)}
        onSave={handleSaveAlerts}
      />

      <HealthCheckModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Resource Monitor
            </h1>
            <p className="mt-2 text-gray-600">
              Real-time system performance monitoring and analytics
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>Last 5 minutes</option>
              <option>Last 1 hour</option>
              <option>Last 24 hours</option>
            </select>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 inline mr-2 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Server className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-green-600">1</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Warning</p>
              <p className="text-2xl font-bold text-yellow-600">0</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Avg CPU</p>
              <p className="text-2xl font-bold text-blue-600">72%</p>
            </div>
            <Cpu className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Avg Memory</p>
              <p className="text-2xl font-bold text-purple-600">84%</p>
            </div>
            <MemoryStick className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Devices List */}
        <div className="rounded-xl shadow-sm bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Devices</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {devices.map((device) => (
              <div
                key={device.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedDevice === device.name
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDevice(device.name)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-gray-900">
                      {device.name}
                    </span>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        device.status === "healthy"
                          ? "bg-green-100 text-green-800"
                          : device.status === "updating"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {device.status}
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>CPU</span>
                      <span
                        className={
                          device.cpu > 90 ? "text-red-600 font-medium" : ""
                        }
                      >
                        {device.cpu}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory</span>
                      <span
                        className={
                          device.memory > 90 ? "text-red-600 font-medium" : ""
                        }
                      >
                        {device.memory}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span>{device.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricChart
            title="CPU Usage"
            dataKey="cpu"
            color="#3b82f6"
            icon={<Cpu className="w-5 h-5" />}
          />
          <MetricChart
            title="Memory Usage"
            dataKey="memory"
            color="#8b5cf6"
            icon={<MemoryStick className="w-5 h-5" />}
          />
          <MetricChart
            title="Disk Usage"
            dataKey="disk"
            color="#10b981"
            icon={<HardDrive className="w-5 h-5" />}
          />
          <MetricChart
            title="Network Usage"
            dataKey="network"
            color="#f59e0b"
            icon={<Wifi className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <div className="rounded-xl shadow-sm bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh All</span>
              </button>
              <button
                onClick={() => setShowAlertsModal(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Configure Alerts</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Metrics</span>
              </button>
              <button
                onClick={() => setShowHealthModal(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
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
