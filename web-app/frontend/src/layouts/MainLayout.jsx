// src/layouts/MainLayout.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu,Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        profileDropdownOpen={profileDropdownOpen}
        setProfileDropdownOpen={setProfileDropdownOpen}
      />

      {/* Main Content */}
      <div className="lg:pl-80">
        {/* Navigation */}
        <nav className="relative z-20 fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-gray-900">City Pulse</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;