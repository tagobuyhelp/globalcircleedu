import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Earth } from './components/Earth';
import { LocationMarker3D } from './components/LocationMarker3D';
import { InfoPanel } from '../map/components/InfoPanel';
import { locations } from './data/locations';
import type { MapLocation } from './types';

export const WorldMap3D = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);

  return (
    <div className="relative w-full aspect-[2/1] bg-gray-900 rounded-xl overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[100, 10, -50]} intensity={1} />
          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} />
          
          <Earth />
          
          {locations.map((location) => (
            <LocationMarker3D
              key={location.id}
              location={location}
              onClick={setSelectedLocation}
              isHovered={hoveredLocation?.id === location.id}
              onHover={setHoveredLocation}
            />
          ))}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={4}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>

      {selectedLocation && (
        <InfoPanel
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
};