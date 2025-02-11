import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeLayout } from '../components/layout/HomeLayout';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TeamSection } from '../components/home/TeamSection';
import { JourneySection } from '../components/home/JourneySection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { GlobalPresenceSection } from '../components/home/GlobalPresenceSection';
import { StudyDestinationsSection } from '../components/home/StudyDestinationsSection';

export const Home = () => {
  return (
    <HomeLayout>
      <Helmet>
        <title>Global Circle Edu - Study Abroad</title>
        <meta name="description" content="Access world-class education and career opportunities across the globe. Start your international journey today." />
      </Helmet>

      <main>
        <HeroSection />
        <FeaturedSection />
        <ServicesSection />
        <StudyDestinationsSection />
        <TeamSection />
        <JourneySection />
        <TestimonialsSection />
        <GlobalPresenceSection />
      </main>
    </HomeLayout>
  );
};