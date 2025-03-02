import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';

const testimonialSlides = [
  {
    title: "Student Success Stories",
    subtitle: "Hear from Our Students",
    description: "Discover how our students achieved their dreams of studying abroad"
  },
  {
    title: "Professional Achievements",
    subtitle: "Career Transformations",
    description: "Learn about the successful career journeys of our alumni"
  },
  {
    title: "Global Impact",
    subtitle: "Making a Difference",
    description: "See how our community is creating positive change worldwide"
  }
];

const testimonials = [
  {
    name: "Dr. Sannidhya Acharyya",
    role: "Diploma Holder",
    testimonial: "The guidance and mentorship I received were exceptional. It played a crucial role in shaping my career path.",
    rating: 5,
    image: "https://res.cloudinary.com/dttifrbaa/image/upload/v1737982665/GCE/hpityuuoraryqocxnfel.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example1"
  },
  {
    name: "Dr. Sandipan Roy",
    role: "Medical Professional",
    testimonial: "Their support helped me navigate the complexities of medical education. I am grateful for their invaluable assistance.",
    rating: 5,
    image: "https://res.cloudinary.com/dttifrbaa/image/upload/v1737983073/GCE/sm7r1syjp04at8r99w8z.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example2"
  },
  {
    name: "Dr. Kaushlendra Pradip Singh",
    role: "M.B.B.S. Graduate",
    testimonial: "From admission guidance to career counseling, their expert team ensured I was on the right track every step of the way.",
    rating: 5,
    image: "https://res.cloudinary.com/dttifrbaa/image/upload/v1737982659/GCE/jiyxarajc25feo5kw2ue.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example3"
  },
  {
    name: "Dr. Anjali Narayanaswami",
    role: "Healthcare Specialist",
    testimonial: "The personalized approach and dedication of the team made all the difference in my academic and professional journey.",
    rating: 5,
    image: "https://res.cloudinary.com/dttifrbaa/image/upload/v1737982882/GCE/dbqpcourrptixtrggip3.jpg"
  },
  {
    name: "Dr. Sarika Rana",
    role: "Medical Consultant",
    testimonial: "Their expertise in career planning and academic guidance helped me achieve my goals efficiently and confidently.",
    rating: 5,
    image: "https://res.cloudinary.com/dttifrbaa/image/upload/v1737983271/GCE/whmscmm0muhh81mpykt1.jpg"
  },
  {
    name: "Tushar Tripathi",
    role: "Aspiring Medical Student",
    testimonial: "Thanks to their professional insights and structured approach, I was able to secure my admission with ease.",
    rating: 5,
    image: "https://res.cloudinary.com/dttifrbaa/image/upload/v1737982750/GCE/esnraw8dqtsxgsn3azxn.jpg"
  }
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
        setCurrentSlide((current) => (current + 1) % testimonialSlides.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
    setCurrentSlide((current) =>
      current === 0 ? testimonialSlides.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
    setCurrentSlide((current) => (current + 1) % testimonialSlides.length);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000)',
          transform: 'translateZ(0)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="relative h-32">
            {testimonialSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {slide.title}
                  <span className="block text-[#f37021] text-2xl mt-2">
                    {slide.subtitle}
                  </span>
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonialSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-[#f37021]' 
                    : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <TestimonialCard
                    {...testimonial}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-[#f37021]' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};