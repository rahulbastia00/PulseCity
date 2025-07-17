// src/components/Login.jsx
import React from 'react';
import { Mail, Lock,Chrome, Eye, EyeOff, ArrowRight, MapPin, Camera, TrendingUp,Twitter } from 'lucide-react';

export default function Login({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  isLoading
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-4 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-400 bg-white/30 border-white/50 backdrop-blur placeholder:text-gray-400 shadow-sm ${
              errors.email 
                ? 'border-red-500 bg-red-50 focus:bg-white' 
                : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50/30'
            }`}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Lock className="w-5 h-5" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-4 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-400 bg-white/30 border-white/50 backdrop-blur placeholder:text-gray-400 shadow-sm ${
              errors.password 
                ? 'border-red-500 bg-red-50 focus:bg-white' 
                : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50/30'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus-ring"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember me and forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus-ring"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors focus-ring"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-blue-400 group shadow-lg ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-600 hover:to-purple-800 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Access City Pulse</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </button>


      {/* Social login options */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-white text-gray-700 border border-gray-300 hover:shadow-md hover:border-gray-400 transition-all duration-200 group"
      >
        <Chrome className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-semibold group-hover:text-black">Google</span>
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-white text-gray-700 border border-gray-300 hover:shadow-md hover:border-gray-400 transition-all duration-200 group"
      >
        <Twitter className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-semibold group-hover:text-black">Twitter</span>
      </button>
      </div>
    </form>
  );
}
