// ======================= ParticlesOrbs.tsx =======================
'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// — Particules version "A" : orbes ronds + glow, départ centré, flash => explosion latérale puis fade
const particlesVertex = `
  attribute vec3 aVelocity;
  uniform float uTime;
  uniform float uFlash; // pic court autour du flash
  uniform float uBaseSize;
  varying float vLife;

  void main(){
    // position de départ (proche du centre)
    vec3 pos = position;

    // Léger flottement organique avant/après
    pos.xy += 0.03 * vec2(
      sin(uTime * 0.8 + pos.x * 11.0),
      cos(uTime * 0.9 + pos.y * 13.0)
    );

    // Impulsion d'explosion latérale synchronisée avec le flash
    float burst = uFlash; // déjà un pic court
    pos += aVelocity * (0.8 * burst); // drift doux après le flash

    // Atténuation dans le temps (commence après ~3s)
    vLife = 1.0 - smoothstep(0.0, 3.0, max(0.0, uTime - 3.0));

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    // Taille en pixels avec atténuation par perspective
    gl_PointSize = uBaseSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const particlesFragment = `
  precision mediump float;
  uniform vec3 uColor;
  varying float vLife;

  void main(){
    // Coord du sprite (0..1)
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p) * 2.0; // 0 centre -> 1 bord

    // Disque doux avec halo (double smoothstep pour un beau falloff)
    float core = smoothstep(1.0, 0.0, d);
    float halo = smoothstep(1.2, 0.0, d) * 0.6;
    float alpha = (core + halo) * vLife;

    vec3 col = uColor * (0.8 + 0.2 * (1.0 - d));
    gl_FragColor = vec4(col, alpha);
  }
`;

export function ParticlesOrbs() {
  const count = 48;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // départ très proche du centre (cercle petit)
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 2.0; // compact
      pos[i * 3 + 0] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.6; // ellipse légère
      pos[i * 3 + 2] = 0;

      // vitesse : gauche vs droite (répartition quasi égale)
      const dir = i % 2 === 0 ? -1 : 1; // alternance pour l'équilibre
      vel[i * 3 + 0] = dir * (0.6 + Math.random() * 0.7); // dominant vers x
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.8;      // un peu de vertical
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Matériau custom (glow via gl_PointCoord + blending additif)
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: particlesVertex,
    fragmentShader: particlesFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uFlash: { value: 0 },
      uBaseSize: { value: 1 },
      uColor: { value: new THREE.Color(0.75, 0.95, 1.0) }
    }
  }), []);

  // Animation + synchronisation du flash avec le vortex
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;

    // Pic gaussien court autour de 3.2s (même logique que le portail)
    const tFlash = 3.2;
    const sigma = 0.12;
    const flash = Math.exp(-Math.pow((t - tFlash) / sigma, 2.0));
    material.uniforms.uFlash.value = flash;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aVelocity" args={[velocities, 3]} />
      </bufferGeometry>
      <primitive ref={matRef} object={material} />
    </points>
  );
}