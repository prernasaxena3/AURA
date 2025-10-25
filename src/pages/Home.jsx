import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Activity, 
  GitBranch,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Server,
  Clock
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Patch Management',
      description: 'Automated patch deployment with intelligent scheduling and rollback capabilities.',
      link: '/patch-management',
      stats: '98% Success Rate'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Intelligent Alerts',
      description: 'AI-powered anomaly detection with automated resolution suggestions.',
      link: '/intelligent-alerts',
      stats: '24/7 Monitoring'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Resource Monitor',
      description: 'Real-time system performance monitoring with predictive analytics.',
      link: '/resource-monitor',
      stats: 'Real-time Data'
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: 'Drift Management',
      description: 'Configuration drift detection with Git-flow style version control.',
      link: '/drift-management',
      stats: 'Auto-Resolution'
    }
  ];

  const stats = [
    { label: 'Devices Managed', value: '1,247', icon: <Server className="w-6 h-6" /> },
    { label: 'Uptime', value: '99.9%', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Issues Resolved', value: '3,842', icon: <CheckCircle className="w-6 h-6" /> },
    { label: 'Response Time', value: '<30s', icon: <Clock className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full" style={{ backgroundColor: '#123458' }}>
                <Shield className="w-16 h-16" style={{ color: '#F1EFEC' }} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#123458' }}>
              AURA
            </h1>
            
            <p className="text-xl md:text-2xl mb-4" style={{ color: '#123458' }}>
              Autonomous Unified Resource Agent
            </p>
            
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-80" style={{ color: '#123458' }}>
              Intelligent IT infrastructure management powered by AI. Automate patch management, 
              monitor resources, detect anomalies, and manage configuration drift with enterprise-grade reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/patch-management"
                className="px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: '#123458', color: '#F1EFEC' }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
              <button
                className="px-8 py-3 rounded-lg font-semibold text-lg border-2 transition-all hover:shadow-lg"
                style={{ 
                  borderColor: '#123458', 
                  color: '#123458',
                  backgroundColor: 'transparent'
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: '#F1EFEC' }}>
                    <div style={{ color: '#123458' }}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#123458' }}>
                  {stat.value}
                </div>
                <div className="text-sm opacity-70" style={{ color: '#123458' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#123458' }}>
              Comprehensive IT Management
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto" style={{ color: '#123458' }}>
              Four powerful modules working together to keep your infrastructure secure, 
              updated, and performing at its best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-8 rounded-xl shadow-sm transition-all hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: '#123458' }}>
                    <div style={{ color: '#F1EFEC' }}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold" style={{ color: '#123458' }}>
                        {feature.title}
                      </h3>
                      <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F1EFEC', color: '#123458' }}>
                        {feature.stats}
                      </div>
                    </div>
                    
                    <p className="opacity-80 mb-4" style={{ color: '#123458' }}>
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform" style={{ color: '#123458' }}>
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
      <div className="py-8" style={{ backgroundColor: '#123458' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="font-medium" style={{ color: '#F1EFEC' }}>
                  All Systems Operational
                </span>
              </div>
              <div className="text-sm opacity-75" style={{ color: '#D4C9BE' }}>
                Last updated: 2 minutes ago
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm" style={{ color: '#D4C9BE' }}>
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
    </div>
  );
};

export default Home;