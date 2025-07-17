// src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import BackgroundAnimation from '../components/BackgroundAnimation';
import AuthLottiePanel from '../components/auth/AuthLottiePanel';
import { Zap, Shield, Users, Globe, ArrowLeft, CheckCircle, MapPin, Camera, TrendingUp } from 'lucide-react';
import { circles,shapes,dots } from '../utils/AnimationShapes';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    firstName: '', 
    lastName: '', 
    role: 'citizen' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [floatingElements, setFloatingElements] = useState([]);
  const [geometricShapes, setGeometricShapes] = useState([]);
  const [particles, setParticles] = useState([]);

  const features = [
    { icon: Globe, title: "Data Fusion", description: "Real-time synthesis of traffic, civic issues, and social media" },
    { icon: Camera, title: "Citizen Reporting", description: "AI-powered image analysis and geo-tagging" },
    { icon: TrendingUp, title: "Predictive Alerts", description: "Forecast traffic, civic issues, and emergencies" },
    { icon: MapPin, title: "Live Dashboard", description: "Interactive map-based city pulse monitoring" }
  ];

  useEffect(() => {
    setFloatingElements(circles);
    setGeometricShapes(shapes);
    setParticles(dots);

    // Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = 'First name required';
      if (!formData.lastName) newErrors.lastName = 'Last name required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 2000));
      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <BackgroundAnimation 
        floatingElements={floatingElements} 
        geometricShapes={geometricShapes} 
        particles={particles} 
      />
      
      {/* Back to Home Button */}
      <Link 
        to="/"
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 shadow-2xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center min-h-[600px]">
          
          {/* Left side - Hero content */}
          <div className="hidden lg:block animate-slide-in-left">
            <AuthLottiePanel />
          </div>

          {/* Right side - Auth form */}
          <div className="flex items-center justify-center animate-slide-in-right min-h-[500px] bg-transparent">
            <div className="w-full max-w-md p-10 bg-transparent">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Zap className="text-white w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-bold text-blue-800">City Pulse</h1>
                </div>
                <p className="text-blue-700 font-medium">
                  {isLogin ? 'Welcome back! Sign in to your account' : 'Join the community! Create your account'}
                </p>
              </div>

              {isLogin ? (
                <Login 
                  {...{ formData, errors, handleInputChange, handleSubmit, showPassword, setShowPassword, isLoading }} 
                />
              ) : (
                <Signup 
                  {...{ formData, errors, handleInputChange, handleSubmit, showPassword, setShowPassword, isLoading }} 
                />
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-blue-700">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    className="ml-2 px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition-colors focus-ring shadow-sm"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>SSL Encrypted</span>
                  <span>•</span>
                  <span>GDPR Compliant</span>
                  <span>•</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button for mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-20">
        <button 
          className="p-4 bg-gradient-atlassian rounded-full shadow-atlassian-lg text-white hover:scale-105 transition-transform focus-ring"
          onClick={() => setIsLogin(!isLogin)}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Auth;
