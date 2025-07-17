import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Camera, 
  TrendingUp, 
  Globe, 
  Users, 
  Shield, 
  Zap, 
  AlertTriangle,
  Play,
  Mic,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowLeft,
  Star,
  MessageSquare,
  Video,
  Bell,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { circles,shapes,dots } from '../utils/AnimationShapes';

const Dashboard = () => {
  const [floatingElements, setFloatingElements] = useState([]);
  const [geometricShapes, setGeometricShapes] = useState([]);
  const [particles, setParticles] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { number: "47", label: "Active Reports", icon: MessageSquare, color: "text-blue-600" },
    { number: "12", label: "Alerts", icon: AlertTriangle, color: "text-red-600" },
    { number: "8", label: "Predictions", icon: TrendingUp, color: "text-purple-600" },
    { number: "24/7", label: "Live Monitoring", icon: Clock, color: "text-green-600" }
  ];

  const recentReports = [
    { id: 1, type: "Traffic", location: "MG Road", status: "Active", time: "2 min ago", severity: "High" },
    { id: 2, type: "Civic", location: "Koramangala", status: "Resolved", time: "15 min ago", severity: "Medium" },
    { id: 3, type: "Emergency", location: "Indiranagar", status: "Active", time: "1 hour ago", severity: "Critical" },
    { id: 4, type: "Infrastructure", location: "Whitefield", status: "In Progress", time: "2 hours ago", severity: "Low" }
  ];

  const predictions = [
    { type: "Traffic", probability: "85%", location: "Airport Road", time: "30 min" },
    { type: "Weather", probability: "72%", location: "City Center", time: "1 hour" },
    { type: "Civic", probability: "68%", location: "Electronic City", time: "2 hours" }
  ];

  useEffect(() => {
    setFloatingElements(circles);
    setGeometricShapes(shapes);
    setParticles(dots);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation 
        floatingElements={floatingElements} 
        geometricShapes={geometricShapes} 
        particles={particles} 
      />

      {/* Navigation */}
      <nav className="relative z-20 fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-atlassian rounded-lg">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">City Pulse</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-atlassian rounded-full flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">City Dashboard</h1>
              <p className="text-gray-600">Real-time monitoring and insights</p>
            </div>
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                  <div className="p-3 bg-gradient-atlassian rounded-xl">
                    <stat.icon className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 mb-8">
            {['overview', 'reports', 'predictions', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-atlassian text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content based on active tab */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Map Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Live City Map</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Live Updates</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive City Map</h4>
                    <p className="text-gray-600">Real-time event visualization with AI-powered insights</p>
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              {activeTab === 'reports' && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{report.type}</div>
                            <div className="text-sm text-gray-600">{report.location}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            report.severity === 'Critical' ? 'text-red-600' :
                            report.severity === 'High' ? 'text-orange-600' :
                            report.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {report.severity}
                          </div>
                          <div className="text-xs text-gray-500">{report.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Predictions */}
              {activeTab === 'predictions' && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Predictions</h3>
                  <div className="space-y-4">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{prediction.type}</div>
                            <div className="text-sm text-gray-600">{prediction.location}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{prediction.probability}</div>
                          <div className="text-xs text-gray-500">in {prediction.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 bg-gradient-atlassian text-white rounded-xl hover:shadow-lg transition-all">
                    <Camera className="w-5 h-5" />
                    <span>Report Issue</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
                    <Mic className="w-5 h-5" />
                    <span>Voice Report</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
                    <BarChart3 className="w-5 h-5" />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>

              {/* Live Streams */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Streams</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Traffic Update</div>
                      <div className="text-sm text-gray-600">MG Road Junction</div>
                    </div>
                    <Play className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Weather Alert</div>
                      <div className="text-sm text-gray-600">City Center</div>
                    </div>
                    <Play className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Fusion</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Models</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Predictions</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 