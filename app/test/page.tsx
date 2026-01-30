// app/portal-test/page.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { PortalVortex } from '@/components/three/portal/PortalVortex';
import { PortalRing } from '@/components/three/portal/PortalRing';
import { PortalFlash } from '@/components/three/portal/PortalFlash';
import { ParticlesOrbs } from '@/components/three/portal/ParticlesOrbs';

export default function Page() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* Ajout de bloom/postprocessing plus tard si besoin, pour l'instant brut */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#000']} />
        
        {/* Lumière indispensable pour voir les anneaux en 3D */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#22d3ee" />
        <pointLight position={[-10, -10, 5]} intensity={1} color="#10b981" />

        <group>
            {/* Ordre d'affichage (du fond vers l'avant) */}
            <PortalVortex />    {/* Le tunnel */}
            <PortalRing />      {/* La structure */}
            <ParticlesOrbs />   {/* Les lucioles */}
            <PortalFlash />     {/* L'explosion au chargement */}
        </group>
      </Canvas>
    </div>
  );
}