'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const particlesVertex = `
  uniform float uTime;
  attribute vec3 aRandomness;
  varying float vLife; // Durée de vie de la particule

  void main() {
    // La particule commence au centre (0,0,0)
    vec3 pos = vec3(0.0);
    
    // Vitesse de base vers l'extérieur (basée sur la position aléatoire initiale)
    vec3 direction = normalize(position); 
    float speed = 3.0 + aRandomness.x * 2.0;

    // Mouvement : Explosion vers l'extérieur + légère dérive sinusoïdale
    pos += direction * speed * uTime;
    pos.x += sin(uTime * 2.0 + aRandomness.y * 10.0) * 0.2;
    pos.y += cos(uTime * 2.0 + aRandomness.z * 10.0) * 0.2;

    // Calcul de la vie : 1 au début, 0 après 3 secondes
    vLife = 1.0 - smoothstep(0.0, 3.0, uTime);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Taille : plus grosse au début, diminue avec le temps
    // Multiplié par (1.0 / -mvPosition.z) pour la perspective
    gl_PointSize = (300.0 * vLife + 50.0) * aRandomness.y * (1.0 / -mvPosition.z);
  }
`;

const particlesFragment = `
  varying float vLife;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  void main() {
    // Calculer la distance au centre du point (pour faire un rond doux)
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);

    // Créer un cercle très doux, style "luciole"
    float alpha = (1.0 - smoothstep(0.0, 0.5, ll)) * vLife;
    
    // Mélange de couleurs (Or/Turquoise) selon la vie
    vec3 finalColor = mix(uColor2, uColor1, vLife);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function ParticlesOrbs() {
  // BEAUCOUP MOINS DE PARTICULES
  const count = 60; 

  const { positions, randomness } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Positions de départ sphériques pour déterminer la direction de l'explosion
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      pos[i * 3 + 0] = Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = Math.cos(phi);
      
      // Valeurs aléatoires pour varier la vitesse et la taille
      rnd[i * 3 + 0] = Math.random();
      rnd[i * 3 + 1] = Math.random();
      rnd[i * 3 + 2] = Math.random();
    }
    return { positions: pos, randomness: rnd };
  }, []);

  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      // On utilise le temps global pour l'animation unique de l'explosion
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: particlesVertex,
    fragmentShader: particlesFragment,
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#fde047") }, // Jaune/Or
      uColor2: { value: new THREE.Color("#22d3ee") }, // Turquoise
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending, // Important pour le côté lumineux
  }), []);

return (
    <points>
      <bufferGeometry>
        {/* Utilisation de args pour le constructeur: [tableau, taille_item] */}
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-aRandomness" 
          args={[randomness, 3]} 
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={matRef} />
    </points>
  );
}