// components/three/portal/PortalFlash.tsx
'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PortalFlash() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [visible, setVisible] = useState(true)
  
  // Matériau blanc/doré très intense
  const material = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial({
    color: new THREE.Color("#fffde7"),
    transparent: true,
    opacity: 1,
    depthWrite: false,
  })).current

  useFrame((state, delta) => {
    if (!meshRef.current || !visible) return
    const elapsed = state.clock.elapsedTime

    // 1. Le flash apparaît
    if (elapsed < 1.2) {
      // Il grandit vite
      const scale = 1 + elapsed * 8
      meshRef.current.scale.set(scale, scale, scale)
      
      // Il disparaît progressivement
      if (elapsed > 0.2) {
         material.opacity = THREE.MathUtils.lerp(material.opacity, 0, delta * 3)
      }
    } else {
      // 2. On le cache pour économiser les ressources
      setVisible(false)
    }
  })

  if (!visible) return null

  return (
    <mesh ref={meshRef} position={[0, 0, 0.1]}> {/* Devant le vortex */}
      <sphereGeometry args={[0.5, 32, 32]} />
      <primitive object={material} />
    </mesh>
  )
}