// src/components/Sidebar.jsx
import {
    Shield,
    MapPin,
    AlertTriangle,
    MessageSquare,
    Activity,
    Users,
    FileText,
    Calendar,
    Settings,
    X,
    User,
    ChevronDown,
    LogOut,
} from 'lucide-react';

import BackgroundAnimation from './BackgroundAnimation';
import { useState , useEffect} from 'react';
import { dots,shapes,circles } from '../utils/AnimationShapes';
const Sidebar = ({ sidebarOpen, setSidebarOpen, profileDropdownOpen, setProfileDropdownOpen }) => {
    const sidebarItems = [
        { icon: Shield, label: "Dashboard", active: true, badge: null },
        { icon: MapPin, label: "Live Map", active: false, badge: "12" },
        { icon: AlertTriangle, label: "Alerts", active: false, badge: "5" },
        { icon: MessageSquare, label: "Reports", active: false, badge: null },
        { icon: Activity, label: "Analytics", active: false, badge: null },
        { icon: Users, label: "Community", active: false, badge: "new" },
        { icon: FileText, label: "Documents", active: false, badge: null },
        { icon: Calendar, label: "Events", active: false, badge: "3" },
        { icon: Settings, label: "Settings", active: false, badge: null },
    ];
    const [floatingElements, setFloatingElements] = useState([]);
    const [geometricShapes, setGeometricShapes] = useState([]);
    const [particles, setParticles] = useState([]);
    useEffect(() => {
        setFloatingElements(circles);
        setGeometricShapes(shapes);
        setParticles(dots);
    }, []);

    return (
        <>

            <BackgroundAnimation
                floatingElements={floatingElements}
                geometricShapes={geometricShapes}
                particles={particles}
            />

            {/* Sidebar Overlay - Only for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Profile Section */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">John Doe</h3>
                                <p className="text-sm text-gray-600">City Administrator</p>
                            </div>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {profileDropdownOpen && (
                            <div className="mt-4 space-y-2">
                                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                                    <User className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">Profile</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                                    <Settings className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">Settings</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-6 overflow-y-auto">
                        <div className="space-y-2">
                            {sidebarItems.map((item, index) => (
                                <button
                                    key={index}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${item.active
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gray-50 hover:translate-x-2'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`} />
                                    <span className="font-medium flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.active
                                            ? 'bg-white/20 text-white'
                                            : item.badge === 'new'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;