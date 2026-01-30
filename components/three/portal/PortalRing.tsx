// components/three/portal/PortalRing.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PortalRing() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.2
    if (ring2.current) ring2.current.rotation.z -= delta * 0.15
  })

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: "#0f172a",      // Base sombre (gris bleu nuit)
    roughness: 0.2,
    metalness: 0.9,
    emissive: "#06b6d4",   // Glow Cyan
    emissiveIntensity: 2,  // BEAUCOUP plus brillant pour qu'on le voie
    flatShading: true,
  })

  return (
    <group rotation={[0, 0, 0]}>
      <mesh ref={ring1}>
        <torusGeometry args={[3.2, 0.15, 16, 64]} /> {/* Un peu plus épais */}
        <primitive object={ringMaterial} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI, 0]}>
        <torusGeometry args={[2.8, 0.1, 16, 64]} />
        <primitive object={ringMaterial} />
      </mesh>
    </group>
  )
}