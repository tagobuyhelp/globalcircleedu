import React, { useState } from 'react';
import { WorldMapSVG } from './components/WorldMapSVG';
import { LocationTooltip } from './components/LocationTooltip';
import { locations } from './data/locations';
import type { MapLocation } from './types';

export const WorldMapAdvanced = () => {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);

  return (
    <div className="relative w-full aspect-[2/1] bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      {/* SVG Map Container */}
      <div className="absolute inset-0">
        <WorldMapSVG 
          locations={locations}
          onHoverLocation={setHoveredLocation}
          hoveredLocation={hoveredLocation}
        />
      </div>

      {/* Location Tooltips */}
      {hoveredLocation && (
        <LocationTooltip location={hoveredLocation} />
      )}
    </div>
  );
};