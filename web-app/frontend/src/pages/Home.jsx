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
  MessageSquare,
} from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [geometricShapes, setGeometricShapes] = useState([]);
  const [particles, setParticles] = useState([]);

  const features = [
    {
      icon: Globe,
      title: "Data Fusion",
      description: "Real-time synthesis of traffic, civic issues, and social media into actionable insights",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Camera,
      title: "Citizen Reporting",
      description: "Multimodal reporting with AI-powered image analysis and geo-tagging",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Predictive Alerts",
      description: "AI-powered forecasting for traffic, civic issues, and emergency situations",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Live Dashboard",
      description: "Interactive map-based visualization with real-time city pulse monitoring",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Citizens", icon: Users },
    { number: "200+", label: "Daily Reports", icon: MessageSquare },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Live Monitoring", icon: Clock }
  ];

  const uniqueFeatures = [
    {
      icon: Play,
      title: "Live Video Streaming",
      description: "Go live from nearby events and share real-time ground truth",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Journey Planner",
      description: "AI-optimized routes avoiding traffic and civic issues",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Mic,
      title: "Voice Reporting",
      description: "Report incidents using voice commands and speech-to-text",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    // Initialize background animations
    const circles = Array.from({ length: 20 }, (_, i) => ({ 
      id: i, 
      left: Math.random() * 100, 
      top: Math.random() * 100, 
      delay: Math.random() * 4, 
      duration: 8 + Math.random() * 4, 
      size: 6 + Math.random() * 12, 
      opacity: 0.1 + Math.random() * 0.3 
    }));
    const shapes = Array.from({ length: 12 }, (_, i) => ({ 
      id: i, 
      left: Math.random() * 100, 
      top: Math.random() * 100, 
      delay: Math.random() * 3, 
      duration: 12 + Math.random() * 6, 
      size: 20 + Math.random() * 40, 
      rotation: Math.random() * 360, 
      shape: ['square', 'triangle', 'hexagon'][Math.floor(Math.random() * 3)] 
    }));
    const dots = Array.from({ length: 60 }, (_, i) => ({ 
      id: i, 
      left: Math.random() * 100, 
      top: Math.random() * 100, 
      delay: Math.random() * 6, 
      duration: 15 + Math.random() * 10, 
      size: 1 + Math.random() * 3, 
      opacity: 0.2 + Math.random() * 0.4 
    }));
    setFloatingElements(circles);
    setGeometricShapes(shapes);
    setParticles(dots);

    // Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    // Trigger animations on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setIsVisible(true); // Show immediately for demo

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [features.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation 
        floatingElements={floatingElements} 
        geometricShapes={geometricShapes} 
        particles={particles} 
      />


      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                The Living City
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Transform scattered city data into intelligent insights. Experience real-time monitoring, 
                predictive alerts, and citizen-powered reporting for a smarter, more connected community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth" className="bg-gradient-atlassian text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                  Explore Dashboard
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/80 rounded-2xl backdrop-blur-sm shadow-lg">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gradient-atlassian rounded-xl">
                      <stat.icon className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Intelligent City Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform transforms how cities collect, analyze, and respond to real-time data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Showcase */}
            <div className="relative h-96 bg-white/80 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 p-8 transition-all duration-700 ${
                    index === currentFeature 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg`}>
                      <feature.icon className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    index === currentFeature 
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl`}>
                      <feature.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of citizen engagement with our cutting-edge capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real-Time City Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor your city's pulse with our interactive, AI-powered dashboard
            </p>
          </div>

          <div className="relative">
            {/* Mock Dashboard */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gray-900 p-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-white text-sm">City Pulse Dashboard</span>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="font-semibold">Active Alerts</span>
                    </div>
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-blue-100">Traffic & Civic Issues</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6" />
                      <span className="font-semibold">Citizen Reports</span>
                    </div>
                    <div className="text-3xl font-bold">47</div>
                    <div className="text-green-100">Today's Reports</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6" />
                      <span className="font-semibold">Predictions</span>
                    </div>
                    <div className="text-3xl font-bold">8</div>
                    <div className="text-purple-100">AI Forecasts</div>
                  </div>
                </div>
                
                {/* Mock Map */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 h-96 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-cyan-100/20"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive City Map</h3>
                      <p className="text-gray-600">Real-time event visualization with AI-powered insights</p>
                    </div>
                  </div>
                  {/* Mock Map Markers */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-atlassian rounded-3xl p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your City?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of citizens and officials building smarter, more connected communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all">
                Start Free Trial
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-atlassian rounded-lg">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold">City Pulse</span>
              </div>
              <p className="text-gray-400">
                Transforming cities through intelligent data fusion and citizen engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Data Fusion</li>
                <li>Citizen Reporting</li>
                <li>Predictive Alerts</li>
                <li>Live Dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 City Pulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 