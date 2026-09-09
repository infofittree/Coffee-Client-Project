import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

// Custom shader material for authentic photorealistic coffee bean point splats
const createSplatMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uPointScale: { value: 36.0 },
      uLightDir: { value: new THREE.Vector3(0.55, 0.85, 0.65).normalize() },
      uLightColor: { value: new THREE.Color('#FFF5E6') },
      uAmbient: { value: 0.52 },
    },
    vertexShader: `
      attribute vec3 color;
      varying vec3 vColor;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      uniform float uPointScale;

      void main() {
        vColor = color;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
        // Distance-based size attenuation
        gl_PointSize = uPointScale * (1.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      uniform vec3 uLightDir;
      uniform vec3 uLightColor;
      uniform float uAmbient;

      void main() {
        // Soft circular disc
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;
        float alpha = smoothstep(0.5, 0.35, dist);

        vec3 N = normalize(vNormal);
        vec3 L = normalize(uLightDir);
        vec3 L2 = normalize(vec3(-0.6, 0.3, 0.75));
        vec3 V = normalize(vViewPosition);
        vec3 H = normalize(L + V);

        // Key + fill lighting with authentic scanned color
        float diff1 = max(dot(N, L), 0.0);
        float diff2 = max(dot(N, L2), 0.0);
        vec3 diffuse = vColor * (uAmbient + diff1 * 0.65 * uLightColor + diff2 * 0.35 * vec3(0.95, 0.85, 0.75));

        // Specular roast shine (oily coffee bean highlight)
        float spec = pow(max(dot(N, H), 0.0), 22.0);
        vec3 specular = vec3(0.95, 0.85, 0.65) * spec * 0.3;

        gl_FragColor = vec4(diffuse + specular, alpha);
      }
    `,
    transparent: true,
    depthWrite: true,
  });
};

export default function ScrollCoffeeBean() {
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [geometry, setGeometry] = useState(null);

  // Load the authentic 3D coffee bean model from binary buffer
  useEffect(() => {
    let active = true;

    async function loadModel() {
      try {
        const res = await fetch('/models/coffee-bean-data.bin');
        if (!res.ok) throw new Error('Failed to load binary model');
        const buffer = await res.arrayBuffer();

        const dv = new DataView(buffer);
        const vertexCount = dv.getUint32(0, true);

        const posOffset = 4;
        const normOffset = 4 + (vertexCount * 3 * 4);
        const colOffset = 4 + (vertexCount * 3 * 4) + (vertexCount * 3 * 4);

        const positions = new Float32Array(buffer, posOffset, vertexCount * 3);
        const normals = new Float32Array(buffer, normOffset, vertexCount * 3);
        const rawColors = new Uint8Array(buffer, colOffset, vertexCount * 3);

        const colors = new Float32Array(vertexCount * 3);
        for (let i = 0; i < vertexCount * 3; i++) {
          colors[i] = rawColors[i] / 255.0;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        if (active) setGeometry(geo);
      } catch {
        // Silent fallback — geometry stays null, component renders nothing
      }
    }

    loadModel();

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

  const material = useMemo(() => createSplatMaterial(), []);

  useEffect(() => {
    return () => {
      if (geometry) geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = scrollRef.current;
    const time = state.clock.elapsedTime;

    // Full 360° scroll-driven rotation + ambient floating rotation
    groupRef.current.rotation.y = scroll * 0.0035 + time * 0.22;
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
