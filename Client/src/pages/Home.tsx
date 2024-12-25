import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeLayout } from '../components/layout/HomeLayout';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { JourneySection } from '../components/home/JourneySection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { GlobalPresenceSection } from '../components/home/GlobalPresenceSection';

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
        <JourneySection />
        <TestimonialsSection />
        <GlobalPresenceSection />
      </main>
    </HomeLayout>
  );
};