// src/components/Signup.jsx
import React from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2, Shield, Users } from 'lucide-react';

const Signup = ({ formData, errors, handleInputChange, handleSubmit, showPassword, setShowPassword, isLoading }) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          First Name
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <User className="w-5 h-5" />
          </div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-4 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-400 bg-white/30 border-white/50 backdrop-blur placeholder:text-gray-400 shadow-sm ${
              errors.firstName 
                ? 'border-red-500 bg-red-50 focus:bg-white' 
                : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50/30'
            }`}
            placeholder="John"
          />
        </div>
        {errors.firstName && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Last Name
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <User className="w-5 h-5" />
          </div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-4 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-400 bg-white/30 border-white/50 backdrop-blur placeholder:text-gray-400 shadow-sm ${
              errors.lastName 
                ? 'border-red-500 bg-red-50 focus:bg-white' 
                : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50/30'
            }`}
            placeholder="Doe"
          />
        </div>
        {errors.lastName && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.lastName}
          </p>
        )}
      </div>
    </div>

    {/* Email field */}
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

    {/* Password field */}
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

    {/* Confirm Password field */}
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Confirm Password
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Lock className="w-5 h-5" />
        </div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`w-full pl-10 pr-4 py-4 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-400 bg-white/30 border-white/50 backdrop-blur placeholder:text-gray-400 shadow-sm ${
            errors.confirmPassword 
              ? 'border-red-500 bg-red-50 focus:bg-white' 
              : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50/30'
          }`}
          placeholder="••••••••"
        />
      </div>
      {errors.confirmPassword && (
        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {errors.confirmPassword}
        </p>
      )}
    </div>

    {/* Role selection */}
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        I am a...
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Building2 className="w-5 h-5" />
        </div>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-4 border border-white/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 focus-ring bg-white/30 backdrop-blur shadow-sm"
        >
          <option value="citizen">Citizen - Report issues and stay informed</option>
          <option value="reporter">Reporter - Professional news and event coverage</option>
          <option value="official">City Official - Manage and respond to reports</option>
        </select>
      </div>
    </div>


    {/* Submit button */}
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 focus:ring-2 focus:ring-blue-400 group shadow-lg ${
        isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <span>Join City Pulse</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </div>
    </button>



  </form>
);

export default Signup;
