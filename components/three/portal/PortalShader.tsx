// ======================= PortalShader.tsx =======================
export const portalVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const portalFragmentShader = `
uniform float uTime;
uniform float uProgress;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform float uFlash; // flash d'impact

varying vec2 vUv;

vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec2 mod289(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec3 permute(vec3 x){ return mod289((x*34.0+1.0)*x); }

float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;

    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
    m=m*m*m*m;

    vec3 x=2.*fract(p*C.www)-1.;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;

    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.y=a0.y*x12.x+h.y*x12.y;
    g.z=a0.z*x12.z+h.z*x12.w;

    return 130.*dot(m,g);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);

    float open = smoothstep(0.0, 1.0, uProgress);
    float bloom = smoothstep(0.2, 0.7, uProgress);

    float swirlStrength = mix(6.0, -2.0, open);
    float speed = mix(0.4, 3.5, bloom);

    float angle = speed * uTime + swirlStrength * r;
    float cs = cos(angle);
    float sn = sin(angle);
    mat2 rot = mat2(cs, -sn, sn, cs);

    vec2 p = rot * uv * (1.0 + open * 0.4);

    float n = snoise(p * 3.0 + vec2(uTime*0.8, uTime*0.4));
    float n2 = snoise(p * 6.0 - vec2(uTime*0.3, uTime*0.9));

    float energy = n * 0.6 + n2 * 0.3;

    vec3 color = mix(uColor1, uColor2, energy * 0.5 + bloom);

    float core = smoothstep(0.5 - bloom * 0.4, 0.0, r);
    color += core * (0.6 + bloom);

    float flash = uFlash * smoothstep(0.2, 0.0, r);
    color += vec3(flash);

    float alpha = smoothstep(1.0, 0.4, r);
    alpha *= (1.0 - open);

    gl_FragColor = vec4(color, alpha);
}
`;

export const portalShaderUniforms = {
  uTime: { value: 0 },
  uProgress: { value: 0 },
  uFlash: { value: 0 },
  uColor1: { value: [0.1, 0.7, 0.9] },
  uColor2: { value: [0.0, 0.5, 0.8] }
};