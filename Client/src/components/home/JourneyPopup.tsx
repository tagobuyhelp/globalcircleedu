import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, ArrowRight, GraduationCap, Briefcase, 
  ChevronLeft, Mail, Phone, User, Globe, Lock
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { CountryCodeSelect } from '../ui/CountryCodeSelect';
import { authApi } from '../../services/auth/authApi';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const JourneyPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<'Student' | 'Worker' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenJourneyPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenJourneyPopup', 'true');
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedType) {
      toast.error('Please select your path');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.countryCode + formData.phone,
        role: 'visitor'
      });

      // Log the user in automatically
      const { user, token } = await authApi.login({
        email: formData.email,
        password: formData.password
      });

      setAuth(user, token);
      toast.success('Registration successful!');
      navigate('/dashboard/visitor/profile');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors",
                    currentStep === step
                      ? "bg-[#004e9a] text-white"
                      : currentStep > step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={cn(
                      "w-12 h-0.5 mx-2",
                      currentStep > step
                        ? "bg-green-500"
                        : "bg-gray-200"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Start Your Journey Today
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Choose your path and let us guide you towards your international goals
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setSelectedType('Student')}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all duration-200",
                    selectedType === 'Student'
                      ? "border-[#004e9a] bg-[#004e9a]/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-[#004e9a]/50"
                  )}
                >
                  <GraduationCap className={cn(
                    "w-8 h-8 mx-auto mb-3 transition-colors",
                    selectedType === 'Student' ? "text-[#004e9a]" : "text-gray-400"
                  )} />
                  <h3 className="font-medium">Student</h3>
                  <p className="text-sm text-gray-500 mt-1">Study Abroad</p>
                </button>

                <button
                  onClick={() => setSelectedType('Worker')}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all duration-200",
                    selectedType === 'Worker'
                      ? "border-[#f37021] bg-[#f37021]/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-[#f37021]/50"
                  )}
                >
                  <Briefcase className={cn(
                    "w-8 h-8 mx-auto mb-3 transition-colors",
                    selectedType === 'Worker' ? "text-[#f37021]" : "text-gray-400"
                  )} />
                  <h3 className="font-medium">Worker</h3>
                  <p className="text-sm text-gray-500 mt-1">Work Abroad</p>
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-32">
                      <CountryCodeSelect
                        value={formData.countryCode}
                        onChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                      />
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Create Password
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span>Show password</span>
                </label>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#004e9a] to-[#f37021] group"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
            )}
            {currentStep < 3 && (
              <Button
                onClick={handleNext}
                className={cn(
                  "ml-auto flex items-center",
                  selectedType === 'Student' ? "bg-[#004e9a]" : "bg-[#f37021]"
                )}
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};