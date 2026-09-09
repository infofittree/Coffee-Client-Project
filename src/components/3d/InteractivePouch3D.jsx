import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';

// Generates a dynamic canvas texture for the 3D coffee pouch matching the brand packaging
function createPouchTexture(product) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background base
  ctx.fillStyle = product.colorSecondary || '#1F1012';
  ctx.fillRect(0, 0, 1024, 1024);

  // Top header banner (Dark brown with gold trim)
  ctx.fillStyle = '#1A0F11';
  ctx.fillRect(0, 0, 1024, 160);
  ctx.fillStyle = '#D6A265';
  ctx.fillRect(0, 155, 1024, 6);

  // Top banner text: Coffee with Difference.....
  ctx.fillStyle = '#D6A265';
  ctx.font = 'italic 28px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('☕  Coffee with Difference.....  ☕', 512, 100);

  // Variant color main band (Upper-middle body)
  const isWhitePouch = product.id === 'roasted-coffee-beans';
  if (isWhitePouch) {
    ctx.fillStyle = '#F8F8F8';
    ctx.fillRect(0, 160, 1024, 864);
  } else {
    // Gradient matching the specific pouch
    const grad = ctx.createLinearGradient(0, 160, 0, 680);
    grad.addColorStop(0, product.colorPrimary);
    grad.addColorStop(1, product.colorSecondary || product.colorPrimary);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 160, 1024, 520);

    // Dark brown bottom half
    ctx.fillStyle = '#1F1012';
    ctx.fillRect(0, 680, 1024, 344);
    ctx.fillStyle = '#D6A265';
    ctx.fillRect(0, 680, 1024, 4);
  }

  // Logo Shield badge
  ctx.save();
  ctx.beginPath();
  const lx = 332, ly = 200, lw = 360, lh = 190;
  ctx.roundRect(lx, ly, lw, lh, 30);
  ctx.fillStyle = '#2A0E14';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#D4A373';
  ctx.stroke();

  // "SINCE 1984" badge in logo
  ctx.beginPath();
  ctx.ellipse(512, 215, 60, 22, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#D4A373';
  ctx.fill();
  ctx.fillStyle = '#1F1012';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SINCE 1984', 512, 221);

  // "BROWN"
  ctx.fillStyle = '#FFDA27';
  ctx.font = '900 68px Arial Black, sans-serif';
  ctx.fillText('BROWN', 505, 295);
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('®', 670, 260);

  // "LABEL COFFEE"
  ctx.font = '900 38px Arial Black, sans-serif';
  ctx.fillText('LABEL COFFEE', 512, 348);
  ctx.restore();

  // Product Title Text
  if (isWhitePouch) {
    ctx.fillStyle = '#2A0E14';
    ctx.font = '900 48px Arial Black, sans-serif';
    ctx.fillText('ROASTED', 512, 450);
    ctx.fillText('COFFEE BEANS', 512, 510);
    ctx.font = 'bold 26px Inter, sans-serif';
    ctx.fillStyle = '#5C3D2E';
    ctx.fillText('(ARABICA & ROBUSTA)', 512, 555);

    // Expertise tagline
    ctx.font = '19px Inter, sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText('Our expertise in coffee brings you the finest quality', 512, 630);
    ctx.fillText('Sourced, Selected and Roasted to Perfection.', 512, 660);
  } else {
    // Kafee Pudi
    ctx.fillStyle = '#1F1012';
    ctx.font = '700 62px Georgia, serif';
    ctx.fillText('Kafee Pudi', 512, 450);

    // Steaming Cup Graphic representation
    ctx.fillStyle = '#FFFDF9';
    ctx.beginPath();
    ctx.arc(512, 560, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D6A265';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#3E1A00';
    ctx.beginPath();
    ctx.arc(512, 560, 38, 0, Math.PI * 2);
    ctx.fill();

    // Variant Title
    ctx.fillStyle = product.colorPrimary;
    ctx.font = '900 44px Arial Black, sans-serif';
    ctx.fillText(product.variant.toUpperCase(), 512, 750);

    ctx.fillStyle = '#D6A265';
    ctx.font = 'italic 26px Georgia, serif';
    ctx.fillText("Ground 'N' Filter Coffee", 512, 795);
  }

  // Bottom seal dots/cups pattern
  ctx.fillStyle = '#D6A265';
  ctx.font = '20px sans-serif';
  ctx.fillText('☕  🫘  ☕  🫘  ☕  🫘  ☕  🫘  ☕', 512, 970);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function InteractivePouch3D({ activeProduct }) {
  const pouchRef = useRef();

  // Dynamic texture created for selected product
  const texture = useMemo(() => createPouchTexture(activeProduct), [activeProduct]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  useFrame((state, delta) => {
    if (!pouchRef.current) return;
    // Gentle natural idle breathing rotation
    pouchRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#D6A265" />
      <spotLight position={[0, 5, 4]} angle={0.6} penumbra={0.8} intensity={1} color="#FFF5E4" />

      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={pouchRef} position={[0, 0.1, 0]}>
          {/* Main Standup Pouch Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 3.4, 0.7, 32, 32, 16]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.45}
              metalness={0.12}
            />
          </mesh>

          {/* Top Zipper / Seal Ridge */}
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[2.24, 0.22, 0.12]} />
            <meshStandardMaterial
              color="#2A1418"
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>

          {/* Tear notch left */}
          <mesh position={[-1.12, 1.68, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.08, 0.14]} />
            <meshStandardMaterial color="#1F1012" />
          </mesh>

          {/* Tear notch right */}
          <mesh position={[1.12, 1.68, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.08, 0.14]} />
            <meshStandardMaterial color="#1F1012" />
          </mesh>

          {/* Gusset Bottom Stand */}
          <mesh position={[0, -1.72, 0]}>
            <cylinderGeometry args={[0.9, 1.05, 0.12, 32]} />
            <meshStandardMaterial
              color="#1F1012"
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        </group>
      </Float>

      <ContactShadows position={[0, -2.1, 0]} opacity={0.6} scale={6} blur={2.2} far={4} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
    </group>
  );
}
