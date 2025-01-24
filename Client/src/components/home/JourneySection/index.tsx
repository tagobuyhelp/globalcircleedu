import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, UserCircle, Calendar, ClipboardCheck, 
  FolderUp, Stamp, Briefcase, Plane, Headphones,
  LayoutGrid, List, ArrowRight 
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { JourneySlider } from './JourneySlider';

const journeySteps = [
  {
    icon: MessageSquare,
    title: 'Initial Inquiry',
    description: 'Submit your details to express interest.',
    color: 'blue',
    link: '/register'
  },
  {
    icon: UserCircle,
    title: 'Create Profile & Select Destination',
    description: 'Build your profile and choose your preferred destination and programs.',
    color: 'indigo',
    link: '/dashboard/user'
  },
  {
    icon: Calendar,
    title: 'Schedule Your Consultation',
    description: 'Book a one-on-one consultation with an expert.',
    color: 'violet',
    link: '/consultation'
  },
  {
    icon: ClipboardCheck,
    title: 'Eligibility Assessment',
    description: 'Our team assesses your eligibility for your chosen path.',
    color: 'purple',
    link: '/assessment'
  },
  {
    icon: FolderUp,
    title: 'Document Preparation',
    description: 'Upload resumes, transcripts, and certifications.',
    color: 'fuchsia',
    link: '/documents'
  },
  {
    icon: Stamp,
    title: 'Visa Assistance',
    description: 'Get comprehensive visa application support.',
    color: 'pink',
    link: '/visa-support'
  },
  {
    icon: Briefcase,
    title: 'Pre-Departure Guidance',
    description: 'Attend sessions to prepare for life abroad.',
    color: 'rose',
    link: '/pre-departure'
  },
  {
    icon: Plane,
    title: 'Post-Landing Assistance',
    description: 'Airport pickup, housing, and local guidance.',
    color: 'emerald',
    link: '/post-landing'
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Stay connected for career advice and networking.',
    color: 'teal',
    link: '/support'
  },
];

export const JourneySection = () => {
  const [view, setView] = useState<'list' | 'grid'>('grid');
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950">
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
            Your Journey With Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in">
            We guide you through every step of your educational journey abroad, 
            ensuring a smooth transition to your dream destination.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/register">
              <Button 
                size="lg" 
                className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 transform hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto group border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 transform hover:scale-105 transition-all duration-300"
              >
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            <Button
              variant={view === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
              className="border-2 transform hover:scale-105 transition-all duration-300"
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
            <Button
              variant={view === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('grid')}
              className="border-2 transform hover:scale-105 transition-all duration-300"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid View
            </Button>
          </div>
        </div>

        <JourneySlider 
          steps={journeySteps} 
          view={view} 
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />

        
      </div>
    </section>
  );
};