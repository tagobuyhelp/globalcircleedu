import React, { useState, useEffect } from 'react';

const collaborations = [
  {
    name: 'Moscow State University',
    logo: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737982665/GCE/msu.png',
    link: 'https://www.msu.ru/en/',
    country: 'Russia'
  },
  {
    name: 'Saint Petersburg State University',
    logo: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737982665/GCE/spbu.png',
    link: 'https://english.spbu.ru/',
    country: 'Russia'
  },
  {
    name: 'Novosibirsk State University',
    logo: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737982665/GCE/nsu.png',
    link: 'https://www.nsu.ru/n/',
    country: 'Russia'
  },
  {
    name: 'RUDN University',
    logo: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737982665/GCE/rudn.png',
    link: 'http://www.rudn.ru/en',
    country: 'Russia'
  },
  {
    name: 'Kazan Federal University',
    logo: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1737982665/GCE/kfu.png',
    link: 'https://kpfu.ru/eng',
    country: 'Russia'
  }
];

export const CollaborationsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = {
    mobile: 2,
    desktop: 4
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => 
        (prev + 1) % Math.ceil(collaborations.length / itemsPerPage.desktop)
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const CollaborationCard = ({ collab }: { collab: typeof collaborations[0] }) => (
    <a
      href={collab.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-[3/2] relative overflow-hidden rounded-lg mb-4">
          <img
            src={collab.logo}
            alt={collab.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#004e9a] transition-colors">
            {collab.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {collab.country}
          </p>
        </div>
      </div>
    </a>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Our Global Partners
            <span className="block text-[#f37021] text-2xl mt-2">
              Leading Educational Institutions
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We collaborate with prestigious universities worldwide to provide you with the best educational opportunities
          </p>
        </div>

        {/* Mobile View (2 columns) */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {collaborations.slice(0, 4).map((collab) => (
            <CollaborationCard key={collab.name} collab={collab} />
          ))}
        </div>

        {/* Desktop View (4 columns) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {collaborations.slice(
            currentPage * itemsPerPage.desktop,
            (currentPage + 1) * itemsPerPage.desktop
          ).map((collab) => (
            <CollaborationCard key={collab.name} collab={collab} />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(Math.ceil(collaborations.length / itemsPerPage.desktop))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? 'w-8 bg-[#004e9a]' 
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};