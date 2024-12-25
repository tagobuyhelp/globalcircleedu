import React from 'react';
import { Sphere, Html } from '@react-three/drei';
import { LocationMarkerProps } from '../types';

export const LocationMarker3D: React.FC<LocationMarkerProps> = ({
  location,
  onClick,
  isHovered,
  onHover,
}) => {
  return (
    <group
      position={location.position}
      onClick={() => onClick(location)}
      onPointerOver={() => onHover(location)}
      onPointerOut={() => onHover(null)}
    >
      {/* Marker */}
      <Sphere args={[0.05, 16, 16]}>
        <meshPhongMaterial
          color={isHovered ? '#60A5FA' : '#3B82F6'}
          emissive={isHovered ? '#60A5FA' : '#3B82F6'}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </Sphere>

      {/* Always visible tooltip */}
      <Html
        center
        style={{
          transition: 'all 0.2s ease',
          opacity: isHovered ? 1 : 0.8,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-2 text-sm whitespace-nowrap">
          <p className="font-semibold">{location.name}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {location.students.toLocaleString()} Students
          </p>
        </div>
      </Html>

      {/* Connection line */}
      <mesh>
        <cylinderGeometry args={[0.002, 0.002, 0.3, 8]} />
        <meshBasicMaterial color="#3B82F6" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};