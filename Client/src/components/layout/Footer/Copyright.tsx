import React from 'react';

export const Copyright = () => {
  return (
    <div className="text-center md:text-right text-sm text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} Global Circle Edu. 
        <span className="hidden md:inline"> All rights reserved.</span>
      </p>
    </div>
  );
};