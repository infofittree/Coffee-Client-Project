import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Environment } from '@react-three/drei';

function CupGeometry() {
  return useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.5, 0));
    points.push(new THREE.Vector2(0.5, 0.05));
    points.push(new THREE.Vector2(0.48, 0.1));
    points.push(new THREE.Vector2(0.55, 0.5));
    points.push(new THREE.Vector2(0.65, 0.9));
    points.push(new THREE.Vector2(0.7, 1.1));
    points.push(new THREE.Vector2(0.72, 1.15));
    points.push(new THREE.Vector2(0.7, 1.2));
    points.push(new THREE.Vector2(0.65, 1.15));
    points.push(new THREE.Vector2(0.6, 0.9));
    points.push(new THREE.Vector2(0.5, 0.5));
    points.push(new THREE.Vector2(0.44, 0.1));
    points.push(new THREE.Vector2(0.45, 0.05));

    return new THREE.LatheGeometry(points, 48);
  }, []);
}

function SteamParticles() {
  const particlesRef = useRef();
  const count = 40;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = Math.random() * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += 0.008;
      posArray[i * 3] += Math.sin(time + i) * 0.001;
      posArray[i * 3 + 2] += Math.cos(time + i * 0.7) * 0.001;

      if (posArray[i * 3 + 1] > 2) {
        posArray[i * 3] = (Math.random() - 0.5) * 0.3;
        posArray[i * 3 + 1] = 0;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={[0, 1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFFDF9"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function SteamingCup3D() {
  const cupRef = useRef();
  const cupGeometry = CupGeometry();

  useFrame((state) => {
    if (!cupRef.current) return;
    const time = state.clock.elapsedTime;
    cupRef.current.rotation.y = time * 0.2;
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight position={[3, 5, 3]} angle={0.5} penumbra={0.8} intensity={1.2} color="#FFE4B5" />
      <spotLight position={[-2, 3, 4]} angle={0.6} penumbra={1} intensity={0.5} color="#D6A265" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={cupRef} scale={1.2}>
          <mesh geometry={cupGeometry}>
            <meshStandardMaterial color="#F5F0E8" roughness={0.3} metalness={0.05} envMapIntensity={0.5} />
          </mesh>

          <mesh position={[0.75, 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.04, 8, 24, Math.PI]} />
            <meshStandardMaterial color="#F5F0E8" roughness={0.3} metalness={0.05} />
          </mesh>

          <mesh position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.58, 48]} />
            <meshStandardMaterial color="#3E1A00" roughness={0.1} metalness={0.2} envMapIntensity={1} />
          </mesh>

          <mesh position={[0, 1.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.58, 48]} />
            <meshStandardMaterial color="#8B5E3C" roughness={0.2} metalness={0.1} transparent opacity={0.7} />
          </mesh>

          <SteamParticles />
        </group>
      </Float>

      <Environment preset="apartment" />
    </group>
  );
}
