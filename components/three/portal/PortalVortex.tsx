// ======================= PortalVortex.tsx ======================= =======================
'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial } from 'three';
import { portalVertexShader, portalFragmentShader, portalShaderUniforms } from './PortalShader';

export function PortalVortex() {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;

    const elapsed = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = elapsed;

    // Portail visible ~3.5s
    const progress = Math.min(1, elapsed / 3.5);
    materialRef.current.uniforms.uProgress.value = progress;

    // Flash d'impact (pic gaussien court)
    const tFlash = 3.2;
    const sigma = 0.12;
    const flash = Math.exp(-Math.pow((elapsed - tFlash) / sigma, 2.0));
    materialRef.current.uniforms.uFlash.value = flash;
  });

  return (
    <mesh>
      <planeGeometry args={[4, 4, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={portalVertexShader}
        fragmentShader={portalFragmentShader}
        uniforms={portalShaderUniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}