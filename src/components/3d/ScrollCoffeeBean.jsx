import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { getCoffeeBeanGeometry, createSplatMaterial } from './coffeeBeanModel';

export default function ScrollCoffeeBean() {
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [geometry, setGeometry] = useState(null);

  // Load the authentic 3D coffee bean model from shared singleton cache
  useEffect(() => {
    let active = true;

    getCoffeeBeanGeometry()
      .then((geo) => {
        if (active) setGeometry(geo);
      })
      .catch(() => {
        // Fallback silently if asset cannot be fetched
      });

    let scrollTicking = false;
    let mouseTicking = false;

    const handleScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollRef.current = window.scrollY;
          scrollTicking = false;
        });
      }
    };
    const handleMouse = (e) => {
      if (!mouseTicking) {
        mouseTicking = true;
        requestAnimationFrame(() => {
          mouseRef.current = {
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
          };
          mouseTicking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });

    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const material = useMemo(() => createSplatMaterial({ pointScale: 36.0 }), []);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = scrollRef.current;
    const time = state.clock.elapsedTime;

    // Full 360° rotation speed increased by 20%:
    // Ambient continuous spin: 0.22 * 1.2 = 0.264
    // Scroll-driven spin: 0.0035 * 1.2 = 0.0042
    groupRef.current.rotation.y = scroll * 0.0042 + time * 0.264;
    groupRef.current.rotation.x = 0.2 + Math.sin(scroll * 0.001) * 0.35 + mouseRef.current.y * 0.18;
    groupRef.current.rotation.z = Math.cos(time * 0.4) * 0.07 + mouseRef.current.x * 0.12;

    // Gentle breathing float
    groupRef.current.position.y = Math.sin(time * 0.9) * 0.12;
  });

  if (!geometry) {
    return null; // Silent load while buffer streams in
  }

  return (
    <group>
      {/* Studio Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFF8F0" />
      <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#FFE5B4" />

      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.25}>
        <group ref={groupRef} scale={2.4}>
          <points geometry={geometry} material={material} />
        </group>
      </Float>
    </group>
  );
}
