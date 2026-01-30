// components/three/portal/PortalVortex.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PortalMaterial } from './PortalShader' // Assure-toi que ce fichier existe toujours !

export function PortalVortex() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={[0, 0, -0.1]}> {/* Légèrement en arrière pour ne pas cacher les anneaux */}
      <planeGeometry args={[8, 8, 32, 32]} /> {/* Assez grand pour remplir l'écran */}
      <shaderMaterial
        ref={materialRef}
        args={[PortalMaterial]}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  )
}