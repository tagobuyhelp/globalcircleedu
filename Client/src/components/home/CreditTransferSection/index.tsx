import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, FileCheck, Clock, DollarSign, 
  BookOpen, School, CheckCircle, FileText,
  Laptop, GraduationCap, HelpCircle, Plus
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { cn } from '../../../utils/cn';
import { CreditTransferModal } from '../CreditTransferModal';

export const CreditTransferSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('credit-transfer-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % process.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: FileCheck,
      title: 'Flexibility',
      description: 'Transfer credits from both online and offline courses',
      color: '[#004e9a]',
      bgColor: '[#004e9a]/10'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Avoid repeating classes you have already completed',
      color: '[#f37021]',
      bgColor: '[#f37021]/10'
    },
    {
      icon: DollarSign,
      title: 'Cost Effective',
      description: 'Reduce tuition costs by transferring existing credits',
      color: '[#faa61a]',
      bgColor: '[#faa61a]/10'
    }
  ];

  const process = [
    {
      icon: FileText,
      title: 'Verify Eligibility',
      description: 'Check if your courses qualify for transfer',
      color: '[#004e9a]',
      bgColor: '[#004e9a]/10'
    },
    {
      icon: School,
      title: 'Submit Transcripts',
      description: 'Provide academic records from previous institutions',
      color: '[#f37021]',
      bgColor: '[#f37021]/10'
    },
    {
      icon: CheckCircle,
      title: 'Get Confirmation',
      description: 'Receive approval for transferred credits',
      color: '[#faa61a]',
      bgColor: '[#faa61a]/10'
    }
  ];

  const faqs = [
    {
      q: "Can I transfer credits from an online course to an offline degree program?",
      a: "Yes, credits from accredited online courses can often be transferred to traditional degree programs. Our team will help evaluate your online credits and guide you through the transfer process to ensure maximum credit acceptance."
    },
    {
      q: "How do I check if my online course is eligible for credit transfer?",
      a: "Contact our team with your course details for a quick eligibility check. We'll review the accreditation status, course content, and credit equivalency to determine transferability."
    },
    {
      q: "Do all universities accept online course credits for transfer?",
      a: "Acceptance varies by institution. We maintain partnerships with numerous universities and understand their specific requirements, helping you make informed decisions about credit transfers."
    },
    {
      q: "How many credits can I transfer from my previous study?",
      a: "The number of transferable credits depends on the institution and program requirements. We'll help you maximize your transfer credits while ensuring compliance with academic policies."
    }
  ];

  return (
    <section id="credit-transfer-section" className="py-20 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=2000)',
          transform: 'translateZ(0)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/95 via-[#004e9a]/85 to-[#f37021]/90 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-4xl font-bold mb-4 text-white animate-gradient",
            isVisible && "animate-fade-in"
          )}>
            Credit Transfer Service
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in">
            Transfer your academic credits seamlessly between online and offline programs
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white/10 backdrop-blur-sm p-6 rounded-xl",
                "hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1",
                "border border-white/20",
                isVisible && "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-12 h-12 bg-${benefit.bgColor} rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110`}>
                <benefit.icon className={`w-6 h-6 text-${benefit.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
              <p className="text-white/80">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">How Credit Transfer Works</h3>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "text-center transition-all duration-500",
                    activeStep === index ? "scale-105" : "scale-100 opacity-70"
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="relative">
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors",
                      `bg-${step.bgColor}`
                    )}>
                      <step.icon className={`w-8 h-8 text-${step.color}`} />
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-[calc(50%+2rem)] right-0 h-0.5 bg-white/20 -translate-y-1/2" />
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-white">{step.title}</h4>
                  <p className="text-white/80">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <div className="flex items-center justify-center mb-8">
            <HelpCircle className="w-8 h-8 text-[#f37021] mr-3" />
            <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200",
                    "hover:bg-white/5",
                    expandedFaq === index && "bg-white/10"
                  )}
                >
                  <h4 className="font-medium text-white pr-8">{faq.q}</h4>
                  <Plus className={cn(
                    "w-5 h-5 text-white transition-transform",
                    expandedFaq === index && "rotate-45"
                  )} />
                </button>
                <div className={cn(
                  "transition-all duration-300 ease-in-out bg-white/5",
                  expandedFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <p className="p-4 text-white/80">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden bg-[#004e9a] rounded-2xl p-12 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.2]" />
          <div className="relative text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transfer Your Credits?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get started with your credit transfer process today. Our team is here to help you every step of the way.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-[#004e9a] hover:bg-gray-100 group transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowModal(true)}
            >
              Start Transfer Process
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Credit Transfer Modal */}
      {showModal && <CreditTransferModal onClose={() => setShowModal(false)} />}
    </section>
  );
};