import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Activity,
  GitBranch,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Server,
  Clock,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Patch Management",
      description:
        "Automated patch deployment with intelligent scheduling and rollback capabilities.",
      link: "/patch-management",
      stats: "98% Success Rate",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Intelligent Alerts",
      description:
        "AI-powered anomaly detection with automated resolution suggestions.",
      link: "/intelligent-alerts",
      stats: "24/7 Monitoring",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Resource Monitor",
      description:
        "Real-time system performance monitoring with predictive analytics.",
      link: "/resource-monitor",
      stats: "Real-time Data",
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Drift Management",
      description:
        "Configuration drift detection with Git-flow style version control.",
      link: "/drift-management",
      stats: "Auto-Resolution",
    },
  ];

  const stats = [
    {
      label: "Devices Managed",
      value: "1,247",
      icon: <Server className="w-6 h-6" />,
    },
    {
      label: "Uptime",
      value: "99.9%",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      label: "Issues Resolved",
      value: "3,842",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      label: "Response Time",
      value: "<30s",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <div className="homepage min-h-screen dotted-background text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-8 tracking-tight">
            AURA
          </h1>
          <p className="text-2xl md:text-3xl mb-6 font-medium">
            Autonomous Unified Resource Agent
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-opacity-90">
            Intelligent IT infrastructure management powered by AI. Automate
            patch management, monitor resources, detect anomalies, and manage
            configuration drift with enterprise-grade reliability.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/patch-management"
              className="group px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              // Start with solid dark blue box
              style={{
                backgroundColor: "#1E3A52",
                color: "#F1EFEC",
                border: "2px solid #1E3A52",
              }}
              // Handle hover: turn transparent with white border
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#F1EFEC";
                e.currentTarget.style.border = "2px solid #F1EFEC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1E3A52";
                e.currentTarget.style.color = "#F1EFEC";
                e.currentTarget.style.border = "2px solid #1E3A52";
              }}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className="px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              // Start with white outline box
              style={{
                backgroundColor: "transparent",
                color: "#F1EFEC",
                border: "2px solid #F1EFEC",
              }}
              // Handle hover: turn solid white with dark text
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F1EFEC";
                e.currentTarget.style.color = "#1E3A52";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#F1EFEC";
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 dotted-background-dense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              Comprehensive IT Management
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Four powerful modules working together to keep your infrastructure
              secure, updated, and performing at its best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative p-8 rounded-2xl card-gradient border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="flex items-start space-x-6">
                  <div
                    className="p-4 rounded-xl group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: "#1a4470" }}
                  >
                    {feature.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                      <div
                        className="px-4 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(212, 201, 190, 0.2)",
                          color: "#D4C9BE",
                          border: "1px solid rgba(212, 201, 190, 0.3)",
                        }}
                      >
                        {feature.stats}
                      </div>
                    </div>

                    <p className="mb-6 leading-relaxed opacity-90">
                      {feature.description}
                    </p>

                    <div className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-all">
                      Explore Module
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-semibold text-primary-foreground">
                All Systems Operational
              </span>
            </div>
            <div className="text-sm text-secondary">
              Last updated: 2 minutes ago
            </div>
          </div>

          <div className="flex items-center space-x-8 text-sm text-secondary">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>42 Patches Applied</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span>3 Alerts Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>1,247 Devices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
