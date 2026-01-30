// components/three/portal/PortalShader.tsx
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export const PortalMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color('#10b981') }, // Émeraude
    uColorEnd: { value: new THREE.Color('#06b6d4') },   // Turquoise
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    // Fonction de bruit simple
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Centrer les UVs
      vec2 displacedUv = vUv + snoise(vec2(vUv.x * 4.0, vUv.y * 4.0 + uTime * 0.2)) * 0.05;
      vec2 centeredUv = displacedUv - 0.5;
      
      // Coordonnées polaires
      float distance = length(centeredUv);
      float angle = atan(centeredUv.y, centeredUv.x);
      
      // Effet vortex (tourbillon)
      float strength = 20.0; // Intensité de la rotation
      float angleOffset = (1.0 / distance) * 0.2 + uTime * 0.5;
      angle += angleOffset * strength;

      // Création du motif
      float noise = snoise(vec2(
        cos(angle) * 2.0 + uTime * 0.5, 
        sin(angle) * 2.0 + uTime * 0.5
      ));

      // Masque circulaire (trou noir au centre + fondu sur les bords)
      float alpha = 1.0 - smoothstep(0.4, 0.5, distance);
      float centerHole = smoothstep(0.05, 0.2, distance);
      
      // Mélange des couleurs basé sur le bruit
      vec3 color = mix(uColorStart, uColorEnd, noise + 0.5);
      
      // Ajout d'un "glow" blanc au centre du tunnel
      color += vec3(1.0) * smoothstep(0.1, 0.0, distance - 0.1) * 0.5;

      gl_FragColor = vec4(color, alpha * centerHole);
    }
  `
}