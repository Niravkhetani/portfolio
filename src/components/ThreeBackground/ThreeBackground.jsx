import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef();

  // Generate random points in a sphere
  const positions = useMemo(() => {
    const count = 2500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.04;
      ref.current.rotation.y -= delta * 0.06;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4a843"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function FloatingRing() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={[2.5, 0, -2]}>
      <torusGeometry args={[1.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#d4a843" transparent opacity={0.25} />
    </mesh>
  );
}

function FloatingRing2() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.4;
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={[-2.5, 0.5, -3]}>
      <torusGeometry args={[0.8, 0.012, 16, 80]} />
      <meshBasicMaterial color="#f0c060" transparent opacity={0.18} />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <StarField />
        <FloatingRing />
        <FloatingRing2 />
      </Canvas>
    </div>
  );
}
