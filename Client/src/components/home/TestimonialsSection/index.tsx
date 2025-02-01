import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from our successful students who have achieved their dreams
            of studying abroad through Global Circle Edu.
          </p>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};