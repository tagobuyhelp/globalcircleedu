import React from 'react';
import { MapLocation } from '../types';
import { worldMapData } from '../data/worldMapData';

interface WorldMapSVGProps {
  locations: MapLocation[];
  onHoverLocation: (location: MapLocation | null) => void;
  hoveredLocation: MapLocation | null;
}

export const WorldMapSVG: React.FC<WorldMapSVGProps> = ({
  locations,
  onHoverLocation,
  hoveredLocation,
}) => {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full"
      style={{ backgroundColor: 'rgb(243 243 243)' }}
    >
      {/* Background Grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="white"
            strokeWidth="0.1"
            opacity="0.1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Map Paths */}
      <g>
        {worldMapData.map((country) => (
          <path
            key={country.id}
            d={country.path}
            fill={country.color}
            stroke="white"
            strokeWidth="0.5"
            opacity={country.color.includes('20') ? 0.2 : 0.8}
          >
            <title>{country.name}</title>
          </path>
        ))}
      </g>

      {/* Location Markers */}
      {locations.map((location) => (
        <g
          key={location.id}
          transform={`translate(${location.coordinates[0]}, ${location.coordinates[1]})`}
          onMouseEnter={() => onHoverLocation(location)}
          onMouseLeave={() => onHoverLocation(null)}
          className="cursor-pointer"
        >
          {/* Animated Ping Effect */}
          <circle
            r="8"
            className="fill-white/30 animate-ping"
          />
          
          {/* Marker Pin */}
          <circle
            r="4"
            className={`fill-white ${
              hoveredLocation?.id === location.id ? 'stroke-white' : 'stroke-white/50'
            }`}
            strokeWidth="2"
          />
          
          {/* Connection Line */}
          <line
            x1="0"
            y1="0"
            x2="30"
            y2="-30"
            className={`stroke-white ${
              hoveredLocation?.id === location.id ? 'opacity-100' : 'opacity-50'
            }`}
            strokeWidth="1"
          />

          {/* Label Box */}
          <rect
            x="30"
            y="-45"
            width="120"
            height="30"
            rx="4"
            className={`fill-blue-900 ${
              hoveredLocation?.id === location.id ? 'opacity-100' : 'opacity-75'
            }`}
          />

          {/* Label Text */}
          <text
            x="40"
            y="-25"
            className="fill-white text-xs font-medium"
          >
            {location.name}
          </text>
        </g>
      ))}
    </svg>
  );
};