import React, { useState } from "react";
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
  Activity,
  Info,
  Download,
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

const IntelligentAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState("ALT-001");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState(null);
  const [showAutoResolveModal, setShowAutoResolveModal] = useState(false);
  const [showSecurityScanModal, setShowSecurityScanModal] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-001",
      type: "Anomaly Detection",
      title: "Unusual CPU Usage Pattern",
      device: "SRV-Web-01",
      application: "Apache HTTP Server",
      severity: "high",
      timestamp: "2024-01-15 14:32:15",
      description: "CPU usage spiked to 95% for 15+ minutes",
      aiSolution: "Restart Apache service and enable connection throttling",
      possibleCauses: [
        "DDoS attack",
        "Memory leak in application",
        "Insufficient resources",
      ],
      metrics: { cpu: "95%", memory: "78%", connections: "2,847" },
      status: "active",
      autoResolvable: true,
    },
    {
      id: "ALT-002",
      type: "Drift Detection",
      title: "Configuration File Modified",
      device: "WS-Finance-03",
      application: "QuickBooks Desktop",
      severity: "medium",
      timestamp: "2024-01-15 13:45:22",
      description: "User preferences file changed unexpectedly",
      aiSolution: "Restore from backup and implement file monitoring",
      possibleCauses: [
        "User modification",
        "Software update",
        "Malware activity",
      ],
      metrics: {
        fileSize: "2.3KB → 4.1KB",
        checksum: "Changed",
        permissions: "Modified",
      },
      status: "investigating",
      autoResolvable: true,
    },
    {
      id: "ALT-003",
      type: "Patch Failure",
      title: "Security Update Failed",
      device: "WS-Marketing-05",
      application: "Windows Update",
      severity: "critical",
      timestamp: "2024-01-15 12:18:07",
      description: "KB5034441 security update failed to install",
      aiSolution: "Clear Windows Update cache and retry installation",
      possibleCauses: [
        "Corrupted update files",
        "Insufficient disk space",
        "Service conflicts",
      ],
      metrics: {
        errorCode: "0x80070643",
        diskSpace: "2.1GB free",
        attempts: "3",
      },
      status: "failed",
      autoResolvable: false,
    },
    {
      id: "ALT-004",
      type: "Rollback Required",
      title: "Application Crash After Update",
      device: "WS-Design-02",
      application: "Adobe Creative Suite",
      severity: "high",
      timestamp: "2024-01-15 11:30:45",
      description: "Photoshop crashes on startup after recent update",
      aiSolution:
        "Rollback to previous version and schedule maintenance window",
      possibleCauses: [
        "Plugin incompatibility",
        "Corrupted installation",
        "System requirements",
      ],
      metrics: { crashCount: "12", uptime: "0 minutes", version: "v24.1.1" },
      status: "resolved",
      autoResolvable: true,
    },
  ]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleAutoResolveAll = () => {
    const resolvableAlerts = alerts.filter(
      (a) => a.autoResolvable && a.status === "active"
    );
    if (resolvableAlerts.length === 0) {
      showToast("No alerts available for auto-resolution", "info");
      return;
    }

    showToast(`Auto-resolving ${resolvableAlerts.length} alerts...`, "info");
    setTimeout(() => {
      setAlerts(
        alerts.map((alert) =>
          alert.autoResolvable && alert.status === "active"
            ? { ...alert, status: "resolved" }
            : alert
        )
      );
      showToast("Alerts auto-resolved successfully", "success");
    }, 2000);
  };

  const handleAutoResolveAlert = () => {
    const alert = alerts.find((a) => a.id === selectedAlert);
    if (!alert || !alert.autoResolvable) {
      showToast("This alert cannot be auto-resolved", "warning");
      return;
    }
    setShowAutoResolveModal(true);
  };

  const confirmAutoResolve = () => {
    setShowAutoResolveModal(false);
    showToast("Auto-resolving 1 alerts...", "info");
    setTimeout(() => {
      setAlerts(
        alerts.map((alert) =>
          alert.id === selectedAlert ? { ...alert, status: "resolved" } : alert
        )
      );
      showToast("Alert auto-resolved successfully", "success");
    }, 2000);
  };

  const handleInvestigateAlert = () => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === selectedAlert && alert.status === "active"
          ? { ...alert, status: "investigating" }
          : alert
      )
    );
    showToast("Alert marked as investigating", "info");
  };

  const handleDismissResolved = () => {
    const resolvedCount = alerts.filter((a) => a.status === "resolved").length;
    if (resolvedCount === 0) {
      showToast("No resolved alerts to dismiss", "info");
      return;
    }
    setAlerts(alerts.filter((a) => a.status !== "resolved"));
    showToast(`${resolvedCount} resolved alerts dismissed`, "success");
  };

  const handleSecurityScan = () => {
    setShowSecurityScanModal(true);
  };

  const confirmSecurityScan = () => {
    setShowSecurityScanModal(false);
    showToast("Initiating comprehensive security scan...", "info");
    setTimeout(() => {
      showToast("Security scan completed successfully", "success");
    }, 3000);
  };

  const handleExportReport = () => {
    const csvContent = [
      ["AURA Intelligent Alerts Report"],
      ["Generated:", new Date().toLocaleString()],
      [""],
      [
        "Alert ID",
        "Type",
        "Title",
        "Device",
        "Severity",
        "Status",
        "Timestamp",
      ],
      ...alerts.map((a) => [
        a.id,
        a.type,
        a.title,
        a.device,
        a.severity,
        a.status,
        a.timestamp,
      ]),
      [""],
      ["Summary"],
      ["Total Alerts", alerts.length],
      ["Active", alerts.filter((a) => a.status === "active").length],
      [
        "Investigating",
        alerts.filter((a) => a.status === "investigating").length,
      ],
      ["Resolved", alerts.filter((a) => a.status === "resolved").length],
      ["Critical", alerts.filter((a) => a.severity === "critical").length],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `intelligent-alerts-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Report exported successfully", "success");
  };

  const alertStats = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter((a) => a.status === "active").length,
    resolvedToday: alerts.filter((a) => a.status === "resolved").length,
    criticalAlerts: alerts.filter((a) => a.severity === "critical").length,
    autoResolved: 89,
    avgResolutionTime: "4.2m",
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200";
      case "investigating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Anomaly Detection":
        return <TrendingUp className="w-4 h-4" />;
      case "Drift Detection":
        return <Shield className="w-4 h-4" />;
      case "Patch Failure":
        return <AlertTriangle className="w-4 h-4" />;
      case "Rollback Required":
        return <RotateCcw className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const selectedAlertData = alerts.find((alert) => alert.id === selectedAlert);

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
                Intelligent Alerts
              </h1>
              <p className="mt-2 text-gray-600">
                AI-powered anomaly detection and automated resolution
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
                onClick={handleAutoResolveAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
              >
                <Bot className="w-4 h-4 inline mr-2" />
                Auto-Resolve
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Alerts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {alertStats.totalAlerts}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-red-600">
                  {alertStats.activeAlerts}
                </p>
              </div>
              <Activity className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Resolved Today
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {alertStats.resolvedToday}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {alertStats.criticalAlerts}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Auto-Resolved
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {alertStats.autoResolved}%
                </p>
              </div>
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Avg Resolution
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {alertStats.avgResolutionTime}
                </p>
              </div>
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Alerts
                </h3>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Filter
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedAlert === alert.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedAlert(alert.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {alert.id}
                        </span>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {getTypeIcon(alert.type)}
                          <span>{alert.severity}</span>
                        </div>
                        {alert.autoResolvable && (
                          <Bot className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          alert.status
                        )}`}
                      >
                        {alert.status}
                      </span>
                    </div>

                    <div>
                      <div className="font-medium mb-1 text-gray-900">
                        {alert.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {alert.device} - {alert.application}
                      </div>
                      <div className="text-sm text-gray-600">
                        {alert.type}: {alert.description}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
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
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedAlertData.id} - Details
                    </h3>
                    <div className="flex space-x-2">
                      {selectedAlertData.autoResolvable &&
                        selectedAlertData.status === "active" && (
                          <button
                            onClick={handleAutoResolveAlert}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                          >
                            <Bot className="w-4 h-4 inline mr-1" />
                            Auto-Resolve
                          </button>
                        )}
                      <button
                        onClick={handleInvestigateAlert}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300"
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Investigate
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">
                      AI Suggested Solution
                    </h4>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Bot className="w-5 h-5 mt-0.5 text-blue-600" />
                        <p className="text-sm text-gray-900">
                          {selectedAlertData.aiSolution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">
                      Possible Causes
                    </h4>
                    <ul className="space-y-1">
                      {selectedAlertData.possibleCauses.map((cause, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-sm text-gray-900"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">
                      Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedAlertData.metrics).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="p-2 bg-gray-50 rounded border border-gray-200"
                          >
                            <div className="text-xs text-gray-600 capitalize">
                              {key}
                            </div>
                            <div className="font-medium text-gray-900">
                              {value}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Insights Panel */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold flex items-center space-x-2 text-gray-900">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span>AI Insights</span>
                </h3>
              </div>

              <div className="p-4 space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-gray-900">
                    Pattern Detection
                  </h4>
                  <p className="text-sm text-gray-700">
                    Similar CPU spikes detected on 3 other web servers in the
                    last 24 hours. Possible coordinated attack or infrastructure
                    issue.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-gray-900">
                    Proactive Recommendation
                  </h4>
                  <p className="text-sm text-gray-700">
                    Consider implementing auto-scaling policies and DDoS
                    protection to prevent similar incidents.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-gray-900">
                    Risk Assessment
                  </h4>
                  <p className="text-sm text-gray-700">
                    Medium risk of service disruption. Immediate action
                    recommended to prevent cascading failures.
                  </p>
                </div>
              </div>
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
                  onClick={handleAutoResolveAll}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
                >
                  <Bot className="w-4 h-4" />
                  <span>Auto-Resolve All</span>
                </button>
                <button
                  onClick={handleDismissResolved}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <X className="w-4 h-4" />
                  <span>Dismiss Resolved</span>
                </button>
                <button
                  onClick={handleSecurityScan}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <Shield className="w-4 h-4" />
                  <span>Security Scan</span>
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

      {/* Auto-Resolve Confirmation Modal */}
      <Modal
        isOpen={showAutoResolveModal}
        onClose={() => setShowAutoResolveModal(false)}
        title="Auto-Resolve Alert"
      >
        <div className="space-y-4">
          <p className="text-gray-900">
            Are you sure you want to auto-resolve this alert? The AI will:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-900">
            <li>Execute the suggested solution</li>
            <li>Monitor the results</li>
            <li>Create a detailed resolution log</li>
          </ul>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowAutoResolveModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmAutoResolve}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Auto-Resolve
            </button>
          </div>
        </div>
      </Modal>

      {/* Security Scan Modal */}
      <Modal
        isOpen={showSecurityScanModal}
        onClose={() => setShowSecurityScanModal(false)}
        title="Security Scan"
      >
        <div className="space-y-4">
          <p className="text-gray-900">
            Run a comprehensive security scan across all managed devices?
          </p>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-3 text-blue-900">
              Scan will include:
            </h4>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Vulnerability assessment</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Malware detection</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Configuration compliance</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Network security analysis</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowSecurityScanModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmSecurityScan}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Start Scan
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

export default IntelligentAlerts;
