import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

function TechModel() {
  const ref = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF("/models/tech.glb");

  // Center model once
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useFrame(() => {
  if (!ref.current) return;

  const about = document.getElementById("about");
  if (!about) return;

  const rect = about.getBoundingClientRect();
  const vh = window.innerHeight;

  /**
   * VISIBILITY WINDOW
   * - Start AFTER 20% of About enters viewport
   * - End BEFORE last 20% leaves viewport
   */
  const start = vh * 0.7;
  const end = vh * 0.3;

  const isAboutVisible =
    rect.top < end && rect.bottom > start;

  // --- DEFAULT (HIDDEN) ---
  let targetPos = new THREE.Vector3(0, -1.5, -2);
  let targetScale = 0.01;
  let opacity = 0;

  // --- ABOUT ONLY ---
  if (isAboutVisible) {
    targetPos.set(1.6, -0.6, 0); // right side
    targetScale = 1.2;
    opacity = 0.05;
  }

  // Smooth transition
  ref.current.position.lerp(targetPos, 0.08);
  ref.current.scale.lerp(
    new THREE.Vector3(targetScale, targetScale, targetScale),
    0.08
  );

  // Rotate ONLY while visible
  if (isAboutVisible) {
    ref.current.rotation.y += 0.01;
  }

  // Transparency
  ref.current.traverse((obj: any) => {
    if (obj.material) {
      obj.material.transparent = true;
      obj.material.opacity = opacity;
      obj.material.depthWrite = false;
    }
  });
});

  return <primitive ref={ref} object={scene} />;
}

export function ScrollModel() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 25,           // confirmed working layer
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={null}>
          <TechModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/tech.glb");
