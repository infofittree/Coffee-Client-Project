import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SmallBean({ position, speed, rotationSpeed }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.x = time * rotationSpeed;
    ref.current.rotation.y = time * rotationSpeed * 0.7;
    ref.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.ellipse(0, 0, 0.12, 0.18, 0, Math.PI * 2, false, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 4,
      curveSegments: 12,
    });
    geo.center();
    return geo;
  }, []);

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshStandardMaterial
        color="#4E342E"
        roughness={0.5}
        metalness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function FloatingBeansParticles({ count = 12 }) {
  const beans = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ],
      speed: 0.3 + Math.random() * 0.5,
      rotationSpeed: 0.2 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <group>
      {beans.map((bean) => (
        <SmallBean key={bean.id} {...bean} />
      ))}
    </group>
  );
}
