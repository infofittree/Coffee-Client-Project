import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { getCoffeeBeanGeometry, createSplatMaterial } from './coffeeBeanModel';

function SingleFloatingBean({
  geometry,
  material,
  position,
  scale,
  rotationSpeed,
  floatSpeed,
  initialRotation,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;

    // Organic tumbling rotation
    ref.current.rotation.x = initialRotation[0] + time * rotationSpeed[0];
    ref.current.rotation.y = initialRotation[1] + time * rotationSpeed[1];
    ref.current.rotation.z = initialRotation[2] + time * rotationSpeed[2];

    // Gentle vertical floating motion
    ref.current.position.y = position[1] + Math.sin(time * floatSpeed + initialRotation[0]) * 0.22;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

export default function FloatingBeansParticles({ count = 8 }) {
  const [geometry, setGeometry] = useState(null);

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

  // Softened point material specifically tuned for atmospheric background depth
  const material = useMemo(
    () =>
      createSplatMaterial({
        pointScale: 26.0,
        ambient: 0.65,
        opacityMultiplier: 0.85,
      }),
    []
  );

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  // Pre-generate stable positions, scales, and rotation parameters for each bean
  const beans = useMemo(() => {
    const predefinedPositions = [
      [-1.35, 1.05, -0.6],
      [1.30, 0.95, -0.8],
      [-1.20, -1.0, -0.5],
      [1.25, -0.9, -0.7],
      [-0.75, 1.35, -1.1],
      [0.85, -1.30, -0.9],
      [-1.45, 0.1, -0.9],
      [1.40, 0.2, -0.8],
    ];

    return Array.from({ length: Math.min(count, predefinedPositions.length) }, (_, i) => {
      const pos = predefinedPositions[i];
      return {
        id: i,
        position: pos,
        scale: 0.42 + (i % 3) * 0.08, // Scales between 0.42 and 0.58
        floatSpeed: 0.6 + (i % 4) * 0.15,
        rotationSpeed: [
          0.18 + (i % 3) * 0.08,
          0.24 + (i % 4) * 0.06,
          0.12 + (i % 2) * 0.05,
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
          {...bean}
        />
      ))}
    </group>
  );
}
