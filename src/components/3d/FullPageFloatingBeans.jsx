import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingBeansParticles from './FloatingBeansParticles';

export default function FullPageFloatingBeans() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FFF8F0" />
        <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#FFE5B4" />
        <Suspense fallback={null}>
          <FloatingBeansParticles count={14} />
        </Suspense>
      </Canvas>
    </div>
  );
}
