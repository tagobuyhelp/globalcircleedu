import React, { useState } from 'react';
import { X, FileText, School, GraduationCap, Calendar, Globe2, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

interface CreditTransferModalProps {
  onClose: () => void;
}

export const CreditTransferModal: React.FC<CreditTransferModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Current Education
    currentInstitution: '',
    currentProgram: '',
    currentLevel: '',
    completedCredits: '',
    startDate: '',
    country: '',
    
    // Target Education
    targetInstitution: '',
    targetProgram: '',
    targetLevel: '',
    
    // Personal Details
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create email content
      const emailSubject = `Credit Transfer Request from ${formData.name}`;
      const emailBody = `
New Credit Transfer Request

Personal Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Current Education:
----------------
Institution: ${formData.currentInstitution}
Program: ${formData.currentProgram}
Level: ${formData.currentLevel}
Completed Credits: ${formData.completedCredits}
Start Date: ${formData.startDate}
Country: ${formData.country}

Target Education:
---------------
Institution: ${formData.targetInstitution}
Program: ${formData.targetProgram}
Level: ${formData.targetLevel}
      `.trim();

      // Create mailto link with pre-filled data
      const mailtoLink = `mailto:info@globalcircleedu.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Also send confirmation email to student
      const studentMailtoLink = `mailto:${formData.email}?subject=Credit Transfer Request Confirmation&body=Thank you for submitting your credit transfer request. Our team will review your application and contact you shortly.`;
      
      // Open in new tab after a short delay
      setTimeout(() => {
        window.open(studentMailtoLink, '_blank');
      }, 1000);

      toast.success('Credit transfer request initiated successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Progress Steps */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors",
                    step === s
                      ? "bg-[#004e9a] text-white"
                      : step > s
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={cn(
                      "w-8 sm:w-12 h-0.5 mx-2",
                      step > s
                        ? "bg-green-500"
                        : "bg-gray-200"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
                  <School className="w-6 h-6 mr-2 text-[#004e9a]" />
                  Current Education
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Institution</label>
                    <input
                      type="text"
                      value={formData.currentInstitution}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentInstitution: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Program/Course</label>
                    <input
                      type="text"
                      value={formData.currentProgram}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentProgram: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Education Level</label>
                    <select
                      value={formData.currentLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentLevel: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Associate">Associate's Degree</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Completed Credits</label>
                    <input
                      type="number"
                      value={formData.completedCredits}
                      onChange={(e) => setFormData(prev => ({ ...prev, completedCredits: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-[#004e9a]" />
                  Target Education
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Institution</label>
                    <input
                      type="text"
                      value={formData.targetInstitution}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetInstitution: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Program</label>
                    <input
                      type="text"
                      value={formData.targetProgram}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetProgram: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Level</label>
                    <select
                      value={formData.targetLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetLevel: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Associate">Associate's Degree</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
                  <Globe2 className="w-6 h-6 mr-2 text-[#004e9a]" />
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#004e9a] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#004e9a] to-[#f37021] flex items-center justify-center mt-6"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                >
                  Back
                </Button>
              )}
              {step < 3 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};