import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, User, Lock, Phone, UserCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { CountryCodeSelect } from '../ui/CountryCodeSelect';
import { useRegister } from '../../hooks/useRegister';

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  visitorType?: 'Student' | 'Worker';
}

export const RegisterForm = () => {
  const { register: registerUser, isLoading, error } = useRegister();
  const [showPassword, setShowPassword] = React.useState(false);
  const [countryCode, setCountryCode] = useState('+971');
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    const fullPhone = `${countryCode}${data.phone}`;
    try {
      await registerUser({
        ...data,
        phone: fullPhone,
        // Only include visitorType if role is visitor
        ...(data.role === 'visitor' && { visitorType: data.visitorType })
      });
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-3 rounded-md text-sm shadow-sm">
          {error.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name', { required: 'Full name is required' })}
            className="appearance-none block w-full pl-11 pr-4 py-3 rounded-lg text-base border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="appearance-none block w-full pl-11 pr-4 py-3 rounded-lg text-base border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Phone Number
        </label>
        <div className="flex gap-3">
          <div className="w-32 flex-shrink-0">
            <CountryCodeSelect
              value={countryCode}
              onChange={setCountryCode}
              error={errors.phone?.message}
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{9,10}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              placeholder="555 555 5555"
              className="appearance-none block w-full pl-11 pr-4 py-3 rounded-lg text-base border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>
        </div>
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            className="appearance-none block w-full pl-11 pr-12 py-3 rounded-lg text-base border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          I want to
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserCircle className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="role"
            {...register('role', { required: 'Please select your role' })}
            className="appearance-none block w-full pl-11 pr-4 py-3 rounded-lg text-base border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          >
            <option value="">Select an option</option>
            <option value="visitor">Study & Work Abroad</option>
            <option value="agent">Become an Agent</option>
          </select>
        </div>
        {errors.role && (
          <p className="mt-1.5 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {selectedRole === 'visitor' && (
        <div>
          <label htmlFor="visitorType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Visitor Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCircle className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="visitorType"
              {...register('visitorType', { required: 'Please select visitor type' })}
              className="appearance-none block w-full pl-11 pr-4 py-3 rounded-lg text-base border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            >
              <option value="">Select visitor type</option>
              <option value="Student">Student</option>
              <option value="Worker">Worker</option>
            </select>
          </div>
          {errors.visitorType && (
            <p className="mt-1.5 text-sm text-red-600">{errors.visitorType.message}</p>
          )}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full py-3 text-base font-medium rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </div>

      <div className="text-sm text-center pt-2">
        <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
        <Link to="/login" className="font-medium text-[#004e9a] hover:text-[#003d7a] transition-colors">
          Sign in
        </Link>
      </div>
    </form>
  );
};