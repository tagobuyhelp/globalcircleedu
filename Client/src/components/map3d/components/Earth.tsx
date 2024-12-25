import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshPhongMaterial
        map={new THREE.TextureLoader().load('/earth-texture.jpg')}
        bumpMap={new THREE.TextureLoader().load('/earth-bump.jpg')}
        bumpScale={0.05}
        specularMap={new THREE.TextureLoader().load('/earth-specular.jpg')}
        specular={new THREE.Color('grey')}
        shininess={10}
      />
    </Sphere>
  );
};