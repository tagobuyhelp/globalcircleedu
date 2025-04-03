import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeLayout } from '../components/layout/HomeLayout';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { GlobalPresenceSection } from '../components/home/GlobalPresenceSection';
import { StudyDestinationsSection } from '../components/home/StudyDestinationsSection';
import { CreditTransferSection } from '../components/home/CreditTransferSection';
import { DegreePrograms } from '../components/home/DegreePrograms';

export const Home = () => {
  return (
    <HomeLayout>
      <Helmet>
        <title>Global Circle Edu - Study Abroad</title>
        <meta name="description" content="Access world-class education and career opportunities across the globe. Start your international journey today." />
      </Helmet>

      <main>
        <HeroSection />
        <DegreePrograms />
        <ServicesSection />
        <CreditTransferSection />
        <StudyDestinationsSection />
        <TestimonialsSection />
        <GlobalPresenceSection />
      </main>
    </HomeLayout>
  );
};