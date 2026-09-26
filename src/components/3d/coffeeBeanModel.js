import * as THREE from 'three';

let cachedGeometryPromise = null;

/**
 * Loads and returns the authentic coffee bean BufferGeometry from the binary buffer.
 * Caches the promise to ensure single network request and single memory allocation.
 */
export function getCoffeeBeanGeometry() {
  if (cachedGeometryPromise) {
    return cachedGeometryPromise;
  }

  cachedGeometryPromise = (async () => {
    try {
      const res = await fetch('/models/coffee-bean-data.bin');
      if (!res.ok) throw new Error('Failed to load binary coffee bean model');
      const buffer = await res.arrayBuffer();

      const dv = new DataView(buffer);
      const vertexCount = dv.getUint32(0, true);

      const posOffset = 4;
      const normOffset = 4 + vertexCount * 3 * 4;
      const colOffset = 4 + vertexCount * 3 * 4 + vertexCount * 3 * 4;

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

      return geo;
    } catch (err) {
      cachedGeometryPromise = null;
      throw err;
    }
  })();

  return cachedGeometryPromise;
}

/**
 * Creates custom photorealistic splat shader material for the coffee bean points.
 */
export function createSplatMaterial({
  pointScale = 36.0,
  ambient = 0.52,
  opacityMultiplier = 1.0,
} = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uPointScale: { value: pointScale },
      uLightDir: { value: new THREE.Vector3(0.55, 0.85, 0.65).normalize() },
      uLightColor: { value: new THREE.Color('#FFF5E6') },
      uAmbient: { value: ambient },
      uOpacityMultiplier: { value: opacityMultiplier },
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
      uniform float uOpacityMultiplier;

      void main() {
        // Soft circular disc
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;
        float alpha = smoothstep(0.5, 0.35, dist) * uOpacityMultiplier;

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
}
