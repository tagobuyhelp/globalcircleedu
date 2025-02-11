import React, { useState, useEffect } from 'react';

export const slides = [
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000',
    title: 'Study Abroad',
    subtitle: 'Transform your future with world-class education',
    description: 'Access prestigious universities and comprehensive support for your international education journey'
  },
  {
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2000',
    title: 'Career Growth',
    subtitle: 'Launch your international career',
    description: 'Find exciting job opportunities and professional development across the globe'
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000',
    title: 'Global Network',
    subtitle: 'Join a worldwide community',
    description: 'Connect with students, professionals, and institutions from around the world'
  }
];

interface BackgroundSliderProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export const BackgroundSlider: React.FC<BackgroundSliderProps> = ({
  currentSlide,
  onSlideChange
}) => {
  useEffect(() => {
    const timer = setInterval(() => {
      onSlideChange((currentSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, onSlideChange]);

  return (
    <div className="absolute inset-0 z-0">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Multi-layer gradient overlay for better text contrast and visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#004e9a]/95 via-[#004e9a]/85 to-[#f37021]/75" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-[#f37021]' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};