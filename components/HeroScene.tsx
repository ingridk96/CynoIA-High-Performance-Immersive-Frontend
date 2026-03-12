'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────── */
/*  GLSL – Classic 3D Perlin Noise (Ian McEwan / Stefan Gustavson)    */
/* ─────────────────────────────────────────────────────────────────── */
const NOISE_GLSL = /* glsl */`
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec3 fade3(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0=floor(P),Pi1=Pi0+1.0;
  Pi0=mod(Pi0,289.0); Pi1=mod(Pi1,289.0);
  vec3 Pf0=fract(P),Pf1=Pf0-1.0;
  vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
  vec4 iy=vec4(Pi0.y,Pi0.y,Pi1.y,Pi1.y);
  vec4 iz0=vec4(Pi0.z),iz1=vec4(Pi1.z);
  vec4 ixy=permute(permute(ix)+iy);
  vec4 ixy0=permute(ixy+iz0),ixy1=permute(ixy+iz1);
  vec4 gx0=ixy0/7.0,gy0=fract(floor(gx0)/7.0)-0.5;
  gx0=fract(gx0);
  vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);
  vec4 sz0=step(gz0,vec4(0.0));
  gx0-=sz0*(step(0.0,gx0)-0.5); gy0-=sz0*(step(0.0,gy0)-0.5);
  vec4 gx1=ixy1/7.0,gy1=fract(floor(gx1)/7.0)-0.5;
  gx1=fract(gx1);
  vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);
  vec4 sz1=step(gz1,vec4(0.0));
  gx1-=sz1*(step(0.0,gx1)-0.5); gy1-=sz1*(step(0.0,gy1)-0.5);
  vec3 g000=vec3(gx0.x,gy0.x,gz0.x),g100=vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010=vec3(gx0.z,gy0.z,gz0.z),g110=vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001=vec3(gx1.x,gy1.x,gz1.x),g101=vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011=vec3(gx1.z,gy1.z,gz1.z),g111=vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;
  vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;
  float n000=dot(g000,Pf0),n100=dot(g100,vec3(Pf1.x,Pf0.y,Pf0.z));
  float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)),n110=dot(g110,vec3(Pf1.x,Pf1.y,Pf0.z));
  float n001=dot(g001,vec3(Pf0.x,Pf0.y,Pf1.z)),n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011=dot(g011,vec3(Pf0.x,Pf1.y,Pf1.z)),n111=dot(g111,Pf1);
  vec3 fxyz=fade3(Pf0);
  vec4 nz=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fxyz.z);
  vec2 nyz=mix(nz.xy,nz.zw,fxyz.y);
  return 2.2*mix(nyz.x,nyz.y,fxyz.x);
}
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Vertex Shader                                                      */
/* ─────────────────────────────────────────────────────────────────── */
const vertexShader = /* glsl */`
${NOISE_GLSL}
uniform float uTime;
uniform float uScrollProgress;
varying vec3  vPosition;
varying float vNoise;

void main() {
  vec3 pos = position;

  float amplitude = 0.14 + uScrollProgress * 0.42;
  float n1 = cnoise(pos * 0.75 + uTime * 0.18);
  float n2 = cnoise(pos * 1.60 + uTime * 0.10) * 0.35;
  float breath = sin(uTime * 0.50) * 0.045;
  float disp = (n1 + n2 + breath) * amplitude;

  pos += normal * disp;
  vPosition = pos;
  vNoise    = n1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Fragment Shader                                                    */
/* ─────────────────────────────────────────────────────────────────── */
const fragmentShader = /* glsl */`
uniform float uTime;
varying vec3  vPosition;
varying float vNoise;

void main() {
  float t = clamp((vPosition.y + 1.8) / 3.6, 0.0, 1.0);

  vec3 violet    = vec3(0.541, 0.169, 0.886);
  vec3 eBlue     = vec3(0.118, 0.565, 1.000);
  vec3 eCyan     = vec3(0.000, 0.831, 1.000);

  vec3 col = mix(violet, mix(eBlue, eCyan, t * t), t);

  float pulse = 0.85 + 0.40 * vNoise + 0.18 * sin(uTime * 1.4 + vPosition.x * 4.0 + vPosition.z * 2.5);
  col *= pulse;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Africa outline – approximate coordinates in Three.js space         */
/*  Mapped from lon/lat: x=(lon-17)/37*1.7  y=(lat-1)/38*1.8          */
/* ─────────────────────────────────────────────────────────────────── */
const AFRICA_PTS: [number, number][] = [
  [-1.053, 1.652],  /* Morocco NW           */
  [-0.804, 1.692],  /* Morocco N coast       */
  [-0.331, 1.719],  /* Tunisia N             */
  [-0.184, 1.511],  /* Libya coast           */
  [ 0.180, 1.488],  /* Libya mid             */
  [ 0.368, 1.445],  /* Egypt W               */
  [ 0.620, 1.435],  /* Egypt N               */
  [ 0.712, 1.421],  /* Egypt NE              */
  [ 0.781, 1.279],  /* Red Sea N             */
  [ 0.965, 1.018],  /* Eritrea coast         */
  [ 1.218, 0.497],  /* Djibouti              */
  [ 1.516, 0.511],  /* Somalia N             */
  [ 1.580, 0.507],  /* Horn of Africa tip    */
  [ 1.263, 0.024],  /* Somalia SE            */
  [ 1.080,-0.554],  /* Tanzania coast        */
  [ 1.089,-0.734],  /* Mozambique N          */
  [ 0.850,-0.862],  /* Mozambique coast      */
  [ 0.836,-1.080],  /* Mozambique S          */
  [ 0.730,-1.302],  /* South Africa N        */
  [ 0.597,-1.516],  /* KwaZulu-Natal         */
  [ 0.437,-1.649],  /* South Africa SE       */
  [ 0.069,-1.682],  /* Cape (southernmost)   */
  [-0.028,-1.435],  /* Cape W coast          */
  [-0.230,-1.421],  /* Namibia S             */
  [-0.244,-0.876],  /* Namibia coast         */
  [-0.225,-0.308],  /* Angola N              */
  [-0.381,-0.024],  /* Congo/Gabon equator   */
  [-0.381, 0.157],  /* Cameroon coast        */
  [-0.551, 0.157],  /* Nigeria delta         */
  [-0.630, 0.260],  /* Nigeria W             */
  [-0.827, 0.218],  /* Ghana coast           */
  [-1.024, 0.166],  /* Ivory Coast           */
  [-1.130, 0.161],  /* Liberia               */
  [-1.273, 0.161],  /* Liberia W             */
  [-1.392, 0.360],  /* Sierra Leone          */
  [-1.475, 0.464],  /* Guinea                */
  [-1.585, 0.649],  /* Cap-Vert (westernmost)*/
  [-1.553, 0.924],  /* Mauritania            */
  [-1.383, 1.269],  /* Morocco S             */
  [-1.195, 1.374],  /* Morocco W coast       */
];

/* ─────────────────────────────────────────────────────────────────── */
/*  FluidCore – wireframe Africa continent with Perlin noise deform   */
/* ─────────────────────────────────────────────────────────────────── */
function FluidCore() {
  const linesRef = useRef<THREE.LineSegments>(null!);
  const mouse    = useRef({ x: 0, y: 0 });
  const scroll   = useRef(0);

  /* Build geometry + material once */
  const { wireGeo, mat } = useMemo(() => {
    /* Build THREE.Shape from Africa outline coordinates */
    const shape = new THREE.Shape();
    shape.moveTo(AFRICA_PTS[0][0], AFRICA_PTS[0][1]);
    for (let i = 1; i < AFRICA_PTS.length; i++) {
      shape.lineTo(AFRICA_PTS[i][0], AFRICA_PTS[i][1]);
    }
    shape.closePath();

    const base    = new THREE.ExtrudeGeometry(shape, {
      depth:          0.28,
      bevelEnabled:   true,
      bevelThickness: 0.05,
      bevelSize:      0.04,
      bevelSegments:  3,
    });
    const wireGeo = new THREE.EdgesGeometry(base, 12);
    base.dispose();

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:           { value: 0 },
        uScrollProgress: { value: 0 },
      },
      transparent: true,
    });
    return { wireGeo, mat };
  }, []);

  /* Mouse + scroll listeners */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    window.addEventListener('mousemove', onMove,   { passive: true });
    window.addEventListener('scroll',   onScroll,  { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll',   onScroll);
    };
  }, []);

  /* Animation loop */
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const ln = linesRef.current;
    if (!ln) return;

    mat.uniforms.uTime.value           = t;
    mat.uniforms.uScrollProgress.value = scroll.current;

    /* Smooth mouse tilt */
    ln.rotation.x += (mouse.current.y * 0.15 - ln.rotation.x) * 0.04;
    ln.rotation.y += (mouse.current.x * 0.20 + t * 0.035 - ln.rotation.y) * 0.04;
  });

  return <lineSegments ref={linesRef} geometry={wireGeo} material={mat} scale={[1.5, 1.5, 1.5]} />;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Scene export                                                       */
/* ─────────────────────────────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <FluidCore />
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.05}
            luminanceSmoothing={0.85}
            radius={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
