import { Canvas } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';

// 프로젝트와 시트 인스턴스는 전역에서 하나만 유지되도록 합니다.
const project = getProject('Sonagi Motion Lab');
const sheet = project.sheet('Hero Scene');

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        {/* Theatre.js SheetProvider로 씬을 감싸서 하위 요소들을 애니메이션 가능하게 만듭니다. */}
        <SheetProvider sheet={sheet}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          
          {/* Environment로 주변 환경광(반사)을 더해 유리 재질이 돋보이게 합니다. */}
          <Environment preset="city" />

          {/* e.group은 Theatre.js에서 제어할 수 있는 그룹입니다. */}
          <e.group theatreKey="Abstract Shapes">
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <e.mesh theatreKey="Sphere 1" position={[-1.5, 0.5, 0]}>
                <sphereGeometry args={[0.8, 64, 64]} />
                {/* 물방울 같은 유리/투명한 질감을 내기 위한 R3F Material */}
                <MeshTransmissionMaterial 
                  backside
                  samples={4}
                  thickness={0.5}
                  chromaticAberration={0.5}
                  anisotropy={0.1}
                  distortion={0.2}
                  distortionScale={0.5}
                  temporalDistortion={0.1}
                  transmission={1}
                  roughness={0.1}
                  color="#c084fc"
                />
              </e.mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
              <e.mesh theatreKey="Sphere 2" position={[1.2, -0.5, -1]}>
                <sphereGeometry args={[0.6, 64, 64]} />
                <MeshTransmissionMaterial 
                  backside
                  samples={4}
                  thickness={0.2}
                  chromaticAberration={0.3}
                  transmission={0.9}
                  roughness={0.2}
                  color="#a78bfa"
                />
              </e.mesh>
            </Float>
            
            <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
              <e.mesh theatreKey="Sphere 3" position={[0.5, 1.5, -2]}>
                <sphereGeometry args={[0.4, 64, 64]} />
                <MeshTransmissionMaterial 
                  transmission={0.9}
                  roughness={0.1}
                  color="#e879f9"
                />
              </e.mesh>
            </Float>
          </e.group>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
