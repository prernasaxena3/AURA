import React, { useState } from "react";
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
  User,
  X,
  Info,
} from "lucide-react";

// Toast Notification Component
const Toast = ({ message, type = "info", onClose }) => {
  const bgColors = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
  };

  const iconColors = {
    info: "text-blue-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg ${bgColors[type]} animate-slide-in`}
    >
      <div className={iconColors[type]}>{icons[type]}</div>
      <span className="ml-3 text-sm font-medium text-gray-900">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizeClasses[size]} rounded-xl shadow-xl transition-all bg-white`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

const PatchManagement = () => {
  const [selectedDevice, setSelectedDevice] = useState("WS-Marketing-01");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [devices, setDevices] = useState([
    {
      id: "WS-Marketing-01",
      name: "Marketing Workstation 01",
      status: "healthy",
      patches: 12,
      lastUpdate: "2024-01-15 14:30",
      os: "Windows 11",
      progress: 100,
    },
    {
      id: "SRV-Database-01",
      name: "Database Server 01",
      status: "updating",
      patches: 8,
      lastUpdate: "2024-01-15 15:45",
      os: "Ubuntu 22.04",
      progress: 65,
    },
    {
      id: "WS-Dev-01",
      name: "Development Workstation",
      status: "critical",
      patches: 15,
      lastUpdate: "2024-01-14 09:22",
      os: "Windows 11",
      progress: 0,
    },
  ]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing device data...", "info");
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Device data refreshed successfully", "success");
    }, 1000);
  };

  const handleConfigure = () => {
    setShowConfigModal(true);
  };

  const handleDeployAll = () => {
    setShowDeployModal(true);
  };

  const handlePauseUpdates = () => {
    setDevices(
      devices.map((device) =>
        device.status === "updating" ? { ...device, status: "paused" } : device
      )
    );
    showToast("Updates paused for all devices", "warning");
  };

  const handleRollback = () => {
    const updatingDevice = devices.find(
      (d) => d.status === "updating" || d.status === "paused"
    );
    if (updatingDevice) {
      setDevices(
        devices.map((device) =>
          device.id === updatingDevice.id
            ? { ...device, status: "rolling-back", progress: 0 }
            : device
        )
      );
      showToast(`Rolling back ${updatingDevice.name}...`, "info");

      // Simulate rollback progress
      setTimeout(() => {
        setDevices(
          devices.map((device) =>
            device.id === updatingDevice.id
              ? { ...device, status: "healthy", progress: 100 }
              : device
          )
        );
        showToast("Rollback completed successfully", "success");
      }, 2000);
    } else {
      showToast("No active updates to rollback", "info");
    }
  };

  const handleExportReport = () => {
    // Create Excel-style CSV
    const csvContent = [
      ["AURA Patch Management Report"],
      ["Generated:", new Date().toLocaleString()],
      [""],
      ["Device Name", "Status", "OS", "Patches Available", "Last Update"],
      ...devices.map((d) => [d.name, d.status, d.os, d.patches, d.lastUpdate]),
      [""],
      ["Summary"],
      ["Total Devices", devices.length],
      ["Healthy", devices.filter((d) => d.status === "healthy").length],
      ["Updating", devices.filter((d) => d.status === "updating").length],
      ["Critical", devices.filter((d) => d.status === "critical").length],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patch-management-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Report exported successfully", "success");
  };

  const activityLog = [
    {
      id: 1,
      action: "Patch deployment completed",
      device: "WS-Marketing-01",
      timestamp: "2024-01-15 14:30:15",
      status: "success",
      user: "System",
    },
    {
      id: 2,
      action: "Security update in progress",
      device: "SRV-Database-01",
      timestamp: "2024-01-15 15:45:22",
      status: "in-progress",
      user: "Admin",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "updating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "paused":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "rolling-back":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4" />;
      case "updating":
        return <Clock className="w-4 h-4" />;
      case "paused":
        return <Pause className="w-4 h-4" />;
      case "rolling-back":
        return <RotateCcw className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "error":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  const healthyCount = devices.filter((d) => d.status === "healthy").length;
  const updatingCount = devices.filter((d) => d.status === "updating").length;
  const criticalCount = devices.filter((d) => d.status === "critical").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Patch Management
              </h1>
              <p className="mt-2 text-gray-600">
                Automated patch deployment and system updates
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 inline mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
              <button
                onClick={handleConfigure}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Devices
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {devices.length}
                </p>
              </div>
              <Server className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Up to Date</p>
                <p className="text-2xl font-bold text-green-600">
                  {healthyCount}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Updating</p>
                <p className="text-2xl font-bold text-blue-600">
                  {updatingCount}
                </p>
              </div>
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Needs Attention
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {criticalCount}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Management */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Device Management
                </h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm border border-gray-300">
                    <option>All Devices</option>
                    <option>Healthy</option>
                    <option>Updating</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedDevice === device.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(
                            device.status
                          )}`}
                        >
                          {getStatusIcon(device.status)}
                          <span>{device.status}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {device.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{device.os}</span>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Patches Available:
                        </span>
                        <span className="text-gray-900">{device.patches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Update:</span>
                        <span className="text-gray-900">
                          {device.lastUpdate}
                        </span>
                      </div>
                    </div>

                    {(device.status === "updating" ||
                      device.status === "rolling-back") && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-900">
                            {device.status === "rolling-back"
                              ? "Rolling Back"
                              : "Progress"}
                          </span>
                          <span className="text-gray-900">
                            {device.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              device.status === "rolling-back"
                                ? "bg-purple-600"
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${device.progress}%` }}
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
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {activityLog.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-100"
                          : activity.status === "in-progress"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {activity.status === "success" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : activity.status === "in-progress" ? (
                        <Activity className="w-4 h-4 text-blue-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-gray-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <User className="w-3 h-3" />
                          <span>{activity.user}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{activity.device}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={handleDeployAll}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
                >
                  <Play className="w-4 h-4" />
                  <span>Deploy All</span>
                </button>
                <button
                  onClick={handlePauseUpdates}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Updates</span>
                </button>
                <button
                  onClick={handleRollback}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rollback</span>
                </button>
                <button
                  onClick={handleExportReport}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
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
        title="Patch Management Configuration"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Auto-deployment Schedule
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>Daily at 2:00 AM</option>
              <option>Weekly on Sunday</option>
              <option>Manual only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Rollback Policy
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-900">
                  Auto-rollback on failure
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-900">
                  Create restore point before update
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowConfigModal(false);
                showToast("Configuration saved successfully", "success");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Deploy Confirmation Modal */}
      <Modal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        title="Confirm Deployment"
      >
        <div className="space-y-4">
          <p className="text-gray-900">
            Are you sure you want to deploy patches to all devices? This action
            will:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-900">
            <li>
              Update {devices.filter((d) => d.patches > 0).length} devices
            </li>
            <li>May cause temporary service interruptions</li>
            <li>Create automatic restore points</li>
          </ul>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowDeployModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowDeployModal(false);
                showToast("Deploying patches to all devices...", "info");
                setTimeout(() => {
                  showToast(
                    "Patch deployment initiated successfully",
                    "success"
                  );
                }, 1500);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Deploy All
            </button>
          </div>
        </div>
      </Modal>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PatchManagement;
