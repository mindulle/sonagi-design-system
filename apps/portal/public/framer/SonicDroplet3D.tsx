import React, { useEffect, useRef } from "react";
import { addPropertyControls, ControlType } from "framer";
// @ts-ignore
import * as THREE from "https://esm.sh/three@0.170.0";

interface SonicDroplet3DProps {
  ior?: number;
  transmission?: number;
  roughness?: number;
  dispersion?: number;
  coreColor?: string;
  rainColor?: string;
  particleCount?: number;
  enableParallax?: boolean;
}

/**
 * 💧 SonicDroplet3D (Mindulle Studio Official Framer Code Component)
 *
 * 소나기 디자인 거버넌스 헌법을 준수하는 3D 유리 문진 물방울 컴포넌트입니다.
 * - Crown Glass 굴절률(IOR 1.52) & 광학 색수차 분산(Dispersion)
 * - 황금빛 민들레 코어 투과광 & 부유 홀씨 파티클
 * - 옵시디언 렌즈 & 2px 블루 레티클 와이어프레임
 * - Framer 캔버스 네이티브 Property Controls 지원
 */
export default function SonicDroplet3D({
  ior = 1.52,
  transmission = 1.0,
  roughness = 0.06,
  dispersion = 0.08,
  coreColor = "#ffd166",
  rainColor = "#38bdf8",
  particleCount = 50,
  enableParallax = true,
}: SonicDroplet3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keySunLight = new THREE.DirectionalLight(new THREE.Color(coreColor), 1.9);
    keySunLight.position.set(8, 10, 6);
    scene.add(keySunLight);

    const rimBlueLight = new THREE.DirectionalLight(new THREE.Color(rainColor), 1.5);
    rimBlueLight.position.set(-10, -6, -3);
    scene.add(rimBlueLight);

    // 3. Central Glass Sonic Droplet (MeshPhysicalMaterial)
    const dropletGroup = new THREE.Group();
    dropletGroup.position.set(0, 0.45, -0.8);
    scene.add(dropletGroup);

    const dropletGeometry = new THREE.IcosahedronGeometry(0.95, 12);
    // Subtle droplet tapering along Y axis
    const pos = dropletGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const factor = 1.0 - (y + 0.95) * 0.12;
      pos.setX(i, pos.getX(i) * factor);
      pos.setZ(i, pos.getZ(i) * factor);
    }
    dropletGeometry.computeVertexNormals();

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f0f9ff"),
      transmission: transmission,
      opacity: 1.0,
      transparent: true,
      roughness: roughness,
      ior: ior,
      thickness: 1.4,
      dispersion: dispersion,
      attenuationColor: new THREE.Color(rainColor),
      attenuationDistance: 2.2,
      reflectivity: 0.5,
    });

    const glassMesh = new THREE.Mesh(dropletGeometry, glassMaterial);
    glassMesh.position.set(-1.05, 0.35, 0);
    dropletGroup.add(glassMesh);

    // 4. Golden Seed Core (Dandelion Glow - Positioned higher to clear text)
    const seedGroup = new THREE.Group();
    seedGroup.position.set(1.15, -0.05, -0.5);
    dropletGroup.add(seedGroup);

    const seedGeometry = new THREE.SphereGeometry(0.55, 48, 48);
    const seedMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(coreColor),
      roughness: 0.12,
      metalness: 0.85,
      emissive: new THREE.Color(coreColor),
      emissiveIntensity: 0.3,
    });
    const seedMesh = new THREE.Mesh(seedGeometry, seedMaterial);
    seedGroup.add(seedMesh);

    // Core Point Light illuminating through the glass
    const seedLight = new THREE.PointLight(new THREE.Color(coreColor), 2.8, 4.5);
    seedGroup.add(seedLight);

    // Orbiting Dandelion Spores
    const sporeGeom = new THREE.SphereGeometry(0.06, 16, 16);
    const sporeMat = new THREE.MeshStandardMaterial({
      color: 0xffe494,
      emissive: new THREE.Color(coreColor),
      emissiveIntensity: 0.6,
    });
    const spores: THREE.Mesh[] = [];
    const sporeOffsets = [
      [0.75, 0.4, 0.2],
      [-0.6, -0.5, 0.3],
      [0.2, -0.6, -0.4],
    ];
    sporeOffsets.forEach(([ox, oy, oz]) => {
      const spore = new THREE.Mesh(sporeGeom, sporeMat);
      spore.position.set(ox, oy, oz);
      seedGroup.add(spore);
      spores.push(spore);
    });

    // 5. Obsidian Shield Lens
    const obsidianGroup = new THREE.Group();
    obsidianGroup.position.set(0.3, 1.35, -1.6);
    dropletGroup.add(obsidianGroup);

    const obsidianMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0x070a12,
        roughness: 0.08,
        metalness: 0.95,
      })
    );
    obsidianGroup.add(obsidianMesh);

    // 2px Reticle Wireframe Accent Ring
    const ringGeom = new THREE.RingGeometry(0.65, 0.68, 32);
    const ringWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(ringGeom),
      new THREE.LineBasicMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.4 })
    );
    obsidianGroup.add(ringWire);

    // 6. Floating Particles (Rain & Dandelion Spores)
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(rainColor),
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 7. Interactive Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableParallax) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 0.75;
      targetY = ny * 0.45;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle internal rotations
      glassMesh.rotation.y = elapsed * 0.15;
      seedGroup.rotation.y = elapsed * 0.25;
      seedGroup.rotation.z = Math.sin(elapsed * 0.3) * 0.1;
      ringWire.rotation.x = elapsed * 0.2;
      ringWire.rotation.y = elapsed * 0.3;
      particleSystem.rotation.y = elapsed * 0.03;

      // Smooth camera parallax lerp
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dropletGeometry.dispose();
      glassMaterial.dispose();
      seedGeometry.dispose();
      seedMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [ior, transmission, roughness, dispersion, coreColor, rainColor, particleCount, enableParallax]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    />
  );
}

// 🎛️ Framer UI Native Property Controls
addPropertyControls(SonicDroplet3D, {
  ior: {
    type: ControlType.Number,
    title: "Refraction (IOR)",
    defaultValue: 1.52,
    min: 1.0,
    max: 2.5,
    step: 0.01,
    description: "Crown Glass: 1.52 / Water: 1.33 / Diamond: 2.42",
  },
  transmission: {
    type: ControlType.Number,
    title: "Transmission",
    defaultValue: 1.0,
    min: 0.0,
    max: 1.0,
    step: 0.05,
    description: "1.0 = Pure Crystal Clear Glass",
  },
  roughness: {
    type: ControlType.Number,
    title: "Roughness",
    defaultValue: 0.06,
    min: 0.0,
    max: 1.0,
    step: 0.01,
  },
  dispersion: {
    type: ControlType.Number,
    title: "Dispersion",
    defaultValue: 0.08,
    min: 0.0,
    max: 0.5,
    step: 0.01,
    description: "Prismatic color separation on edges",
  },
  coreColor: {
    type: ControlType.Color,
    title: "Core Glow",
    defaultValue: "#ffd166",
  },
  rainColor: {
    type: ControlType.Color,
    title: "Rain Hue",
    defaultValue: "#38bdf8",
  },
  particleCount: {
    type: ControlType.Number,
    title: "Particles",
    defaultValue: 50,
    min: 0,
    max: 200,
    step: 5,
  },
  enableParallax: {
    type: ControlType.Boolean,
    title: "Mouse Parallax",
    defaultValue: true,
  },
});
