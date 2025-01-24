import React from 'react';
import { LocationMarkerProps } from '../types';
import { LocationTooltip } from './LocationTooltip';

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  location,
  isAnimating,
  onHover,
  onClick,
  isHovered,
}) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        left: `${((location.coordinates[1] + 180) * 100) / 360}%`,
        top: `${((90 - location.coordinates[0]) * 100) / 180}%`,
      }}
      onMouseEnter={() => onHover(location)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(location)}
    >
      <div className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 ${
        isAnimating ? 'animate-ping' : ''
      } bg-blue-500/30 rounded-full`} />
      
      <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full" />

      {isHovered && <LocationTooltip location={location} />}
    </div>
  );
};