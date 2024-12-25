import { Vector3 } from 'three';

export interface MapLocation {
  id: string;
  name: string;
  position: Vector3;
  students: number;
  universities: number;
}

export interface LocationMarkerProps {
  location: MapLocation;
  onClick: (location: MapLocation) => void;
  isHovered: boolean;
  onHover: (location: MapLocation | null) => void;
}

export interface InfoPanelProps {
  location: MapLocation;
  onClose: () => void;
}