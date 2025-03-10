import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <img 
        src="/logo.png" 
        alt="Global Circle Edu" 
        className="h-12 w-[200px]"
      />
    </Link>
  );
};