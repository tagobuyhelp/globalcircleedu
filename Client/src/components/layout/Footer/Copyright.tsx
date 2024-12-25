import React from 'react';

export const Copyright = () => {
  return (
    <div className="mt-12 pt-8 border-t border-blue-800 text-center text-blue-200">
      <p>&copy; {new Date().getFullYear()} Global Circle Edu. All rights reserved.</p>
    </div>
  );
};