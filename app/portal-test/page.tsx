// ======================= page.tsx ======================= =======================
'use client';

import { Canvas } from '@react-three/fiber';
import { PortalVortex } from '@/components/three/portal/PortalVortex';
import { ParticlesOrbs } from '@/components/three/portal/ParticlesOrbs';

export default function Page() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <PortalVortex />
        <ParticlesOrbs />
      </Canvas>
    </div>
  );
}
