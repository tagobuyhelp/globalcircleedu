import React, { useState, useEffect } from 'react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000',
    title: 'Study Abroad'
  },
  {
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2000',
    title: 'Campus Life'
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000',
    title: 'Global Opportunities'
  }
];

export const BackgroundSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75" />
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};