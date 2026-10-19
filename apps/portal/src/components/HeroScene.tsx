import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';

// Theatre.js 전역 프로젝트 및 시트 인스턴스
const project = getProject('Sonagi Motion Lab');
const sheet = project.sheet('Hero Scene');

// 3D 글리프 모델 사전 로드
useGLTF.preload('/models/test_droplet.glb');

interface HeroSceneProps {
  scrollProgress?: number;
}

/**
 * 💧 Sonic Droplet & Glass Paperweight (Room 01 Exhibit A)
 * Crown Glass IOR 1.52 물방울 셰이더 및 절차적 지오메트리
 */
function SonicGlassDroplet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const gltf = useGLTF('/models/test_droplet.glb') as any;
  const geometry = gltf.nodes?.WaterDroplet?.geometry;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <e.mesh
      ref={meshRef}
      theatreKey="Sonic Droplet"
      position={[-1.3, 0.35, 0]}
      scale={1.35}
    >
      {geometry ? (
        <primitive object={geometry} attach="geometry" />
      ) : (
        <sphereGeometry args={[0.9, 64, 64]} />
      )}
      <MeshTransmissionMaterial
        backside
        samples={10}
        resolution={512}
        transmission={1}
        roughness={0.06}
        thickness={1.4}
        ior={1.52} // Crown Glass / Pure Rainwater Refraction Index
        chromaticAberration={0.08} // Prism optical dispersion
        distortion={0.14}
        distortionScale={0.3}
        temporalDistortion={0.08}
        attenuationColor="#38bdf8" // Rain Blue core
        attenuationDistance={2.2}
        color="#f0f9ff"
      />
    </e.mesh>
  );
}

/**
 * 🌼 Golden Seed Core (Dandelion Soul)
 * 황금빛 민들레 코어 및 내부 투과 조명
 */
function GoldenSeedCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <e.group ref={groupRef} theatreKey="Golden Seed" position={[1.35, -0.35, -0.6]}>
        {/* Core Amber Sphere */}
        <mesh>
          <sphereGeometry args={[0.55, 64, 64]} />
          <meshStandardMaterial
            color="#ffd166"
            roughness={0.12}
            metalness={0.85}
            emissive="#ffd166"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Inner Warm Point Light radiating through the glass */}
        <pointLight color="#ffd166" intensity={2.8} distance={4.5} />

        {/* Orbiting Dandelion Spores */}
        <mesh position={[0.75, 0.4, 0.2]} scale={0.08}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ffe494" emissive="#ffd166" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-0.6, -0.5, 0.3]} scale={0.06}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ffe494" emissive="#ffd166" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.2, -0.6, -0.4]} scale={0.05}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ffe494" emissive="#ffd166" emissiveIntensity={0.6} />
        </mesh>
      </e.group>
    </Float>
  );
}

/**
 * 🛡️ Obsidian Fortress Lens (Sonagi Architecture)
 * 2px 법치와 견고한 요새를 상징하는 딥 옵시디언 렌즈
 */
function ObsidianShieldLens() {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <e.group theatreKey="Obsidian Lens" position={[0.3, 1.35, -1.6]}>
        <mesh>
          <sphereGeometry args={[0.48, 64, 64]} />
          <meshStandardMaterial
            color="#070a12"
            roughness={0.08}
            metalness={0.95}
          />
        </mesh>

        {/* Outer 2px Reticle Wireframe Accent */}
        <group ref={ringRef}>
          <lineSegments>
            <edgesGeometry args={[new THREE.RingGeometry(0.65, 0.68, 32)]} />
            <lineBasicMaterial color="#4A90E2" transparent opacity={0.4} />
          </lineSegments>
        </group>
      </e.group>
    </Float>
  );
}

/**
 * 🎥 Smooth Interactive Camera & Theatre.js Timeline Scrub Rig
 */
function CameraMotionRig({ scrollProgress }: { scrollProgress?: number }) {
  useEffect(() => {
    if (typeof scrollProgress === 'number') {
      const targetPos = Math.max(0, Math.min(4.5, scrollProgress * 4.5));
      sheet.sequence.position = targetPos;
      return;
    }

    // 전역 스크롤 시 Theatre.js 타임라인 (0s ~ 4.5s) 부드러운 스크럽 동기화
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        sheet.sequence.position = p * 4.5;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress]);

  useFrame((state) => {
    // 부드러운 마우스 패럴랙스 궤적 (The 60-30-10 OKLCH Balance)
    const targetX = state.pointer.x * 0.75;
    const targetY = state.pointer.y * 0.45;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          preserveDrawingBuffer: true,
          alpha: true,
          powerPreference: 'high-performance',
          antialias: true,
        }}
      >
        <SheetProvider sheet={sheet}>
          <ambientLight intensity={0.5} />
          {/* 황금빛 민들레 태양광 (Key Light) */}
          <directionalLight position={[8, 10, 6]} intensity={1.8} color="#ffd166" />
          {/* 소나기 빗줄기 림라이트 (Fill Light) */}
          <directionalLight position={[-10, -6, -3]} intensity={1.4} color="#4A90E2" />

          <Environment preset="city" />

          {/* 🌟 빗방울 파티클 & 민들레 홀씨 부유 미립자 */}
          <Sparkles count={45} scale={8} size={2.5} speed={0.4} opacity={0.6} color="#7dd3fc" />
          <Sparkles count={25} scale={5} size={3.2} speed={0.25} opacity={0.5} color="#ffd166" />

          <e.group theatreKey="Abstract Shapes">
            <Suspense
              fallback={
                <mesh position={[-1.3, 0.35, 0]} scale={1.35}>
                  <sphereGeometry args={[0.9, 48, 48]} />
                  <meshStandardMaterial color="#4A90E2" roughness={0.1} metalness={0.3} />
                </mesh>
              }
            >
              <SonicGlassDroplet />
            </Suspense>

            <GoldenSeedCore />
            <ObsidianShieldLens />
          </e.group>

          <CameraMotionRig scrollProgress={scrollProgress} />
        </SheetProvider>
      </Canvas>
    </div>
  );
}

