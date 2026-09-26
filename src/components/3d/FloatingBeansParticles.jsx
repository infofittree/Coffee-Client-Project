import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { getCoffeeBeanGeometry, createSplatMaterial } from './coffeeBeanModel';

function SingleFloatingBean({
  geometry,
  material,
  basePosition,
  scale,
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
  initialRotation,
  scrollParallaxSpeed,
  scrollTracker,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const scrollY = scrollTracker?.current || 0;

    // Organic tumbling rotation across all 3 axes
    ref.current.rotation.x = initialRotation[0] + time * rotationSpeed[0];
    ref.current.rotation.y = initialRotation[1] + time * rotationSpeed[1];
    ref.current.rotation.z = initialRotation[2] + time * rotationSpeed[2];

    // Compute vertical position with scroll parallax and continuous soft wraparound
    // Viewport height in 3D units at z=0 with fov=45, distance=6 is ~5.0 units (-2.8 to +2.8)
    const viewHeight = 5.6;
    const halfH = viewHeight / 2;
    const scrollOffset = scrollY * scrollParallaxSpeed;
    const rawY = basePosition[1] + Math.sin(time * floatSpeed + initialRotation[0]) * floatAmplitude - scrollOffset;
    
    // Smooth wraparound in range [-halfH, +halfH]
    const wrappedY = ((((rawY + halfH) % viewHeight) + viewHeight) % viewHeight) - halfH;

    ref.current.position.y = wrappedY;
  });

  return (
    <group ref={ref} position={basePosition} scale={scale}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

export default function FloatingBeansParticles({ count = 14 }) {
  const [geometry, setGeometry] = useState(null);
  const scrollRef = useRef(0);

  // Track window scroll with passive listener
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    getCoffeeBeanGeometry()
      .then((geo) => {
        if (active) setGeometry(geo);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  // Point material tuned for crisp, authentic roast presence across dark and light sections
  const material = useMemo(
    () =>
      createSplatMaterial({
        pointScale: 28.0,
        ambient: 0.72,
        opacityMultiplier: 0.92,
      }),
    []
  );

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  // Predefined full-viewport positions covering outer screen margins and Hero depth
  const beans = useMemo(() => {
    const fullPageCoordinates = [
      // Left Outer Screen Gutter (pure margin framing)
      { pos: [-4.6, 2.1, -1.0], scale: 0.32 },
      { pos: [-4.4, 0.8, -0.8], scale: 0.34 },
      { pos: [-4.6, -0.5, -1.1], scale: 0.30 },
      { pos: [-4.3, -1.8, -0.9], scale: 0.34 },
      { pos: [-4.5, 1.4, -1.3], scale: 0.28 },
      { pos: [-4.4, -1.1, -1.2], scale: 0.30 },

      // Right Outer Screen Gutter (pure margin framing)
      { pos: [4.6, 2.1, -1.0], scale: 0.34 },
      { pos: [4.4, 0.7, -0.8], scale: 0.36 },
      { pos: [4.6, -0.6, -1.1], scale: 0.32 },
      { pos: [4.3, -1.8, -0.9], scale: 0.34 },
      { pos: [4.5, 1.5, -1.3], scale: 0.28 },
      { pos: [4.4, -1.2, -1.2], scale: 0.30 },

      // Atmospheric Depth on the right side around the Hero 3D bean
      { pos: [2.6, 0.3, -1.8], scale: 0.32 },
      { pos: [2.3, -0.9, -2.0], scale: 0.28 },
    ];

    return Array.from({ length: Math.min(count, fullPageCoordinates.length) }, (_, i) => {
      const config = fullPageCoordinates[i];
      return {
        id: i,
        basePosition: config.pos,
        scale: config.scale,
        floatSpeed: 0.5 + (i % 4) * 0.12,
        floatAmplitude: 0.18 + (i % 3) * 0.06,
        scrollParallaxSpeed: 0.0018 + (i % 5) * 0.0006, // subtle parallax rate per layer depth
        rotationSpeed: [
          0.18 + (i % 3) * 0.07,
          0.22 + (i % 4) * 0.06,
          0.14 + (i % 2) * 0.05,
        ],
        initialRotation: [
          (i * 1.3) % Math.PI,
          (i * 2.1) % (Math.PI * 2),
          (i * 0.9) % Math.PI,
        ],
      };
    });
  }, [count]);

  if (!geometry) return null;

  return (
    <group>
      {beans.map((bean) => (
        <SingleFloatingBean
          key={bean.id}
          geometry={geometry}
          material={material}
          scrollTracker={scrollRef}
          {...bean}
        />
      ))}
    </group>
  );
}
