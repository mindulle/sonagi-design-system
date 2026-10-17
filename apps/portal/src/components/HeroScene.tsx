import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';

// 프로젝트와 시트 인스턴스는 전역에서 하나만 유지되도록 합니다.
const project = getProject('Sonagi Motion Lab');
const sheet = project.sheet('Hero Scene');

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <SheetProvider sheet={sheet}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffd166" />
          <directionalLight position={[-10, -5, -2]} intensity={1.2} color="#4A90E2" />

          <Environment preset="city" />

          <e.group theatreKey="Abstract Shapes">
            {/* Primary Sonagi Droplet (Rain Blue Surface) */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
              <e.mesh theatreKey="Sonic Droplet" position={[-1.5, 0.4, 0]}>
                <sphereGeometry args={[0.85, 64, 64]} />
                <meshStandardMaterial color="#2563eb" roughness={0.15} metalness={0.4} />
              </e.mesh>
            </Float>

            {/* Amber Gold Seed Core (Dandelion Glow) */}
            <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.8}>
              <e.mesh theatreKey="Golden Seed" position={[1.4, -0.4, -0.8]}>
                <sphereGeometry args={[0.55, 64, 64]} />
                <meshStandardMaterial color="#ffd166" roughness={0.1} metalness={0.7} />
              </e.mesh>
            </Float>

            {/* Deep Obsidian Floating Lens */}
            <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
              <e.mesh theatreKey="Obsidian Lens" position={[0.4, 1.4, -1.8]}>
                <sphereGeometry args={[0.45, 64, 64]} />
                <meshStandardMaterial color="#090d16" roughness={0.05} metalness={0.9} />
              </e.mesh>
            </Float>
          </e.group>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
