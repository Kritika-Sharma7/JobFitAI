import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles that respond to time
function FloatingParticles({ count = 100 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = (particle.time += speed);
      
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      const s = Math.cos(t) * 0.3 + 0.5;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
        roughness={0.5}
        metalness={0.8}
      />
    </instancedMesh>
  );
}

// Animated gradient sphere
function GradientSphere({ position = [0, 0, 0], scale = 1 }) {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

// Glowing ring
function GlowingRing({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.getElapsedTime() * 0.3;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={mesh} position={position} rotation={rotation}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Data flow lines
function DataFlowLines() {
  const lines = useRef();
  
  const linePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 40;
      const startY = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20 - 10;
      positions.push(
        new THREE.Vector3(x, startY, z),
        new THREE.Vector3(x, startY + 5 + Math.random() * 10, z)
      );
    }
    return positions;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(linePositions);
    return geo;
  }, [linePositions]);

  return (
    <lineSegments ref={lines} geometry={geometry}>
      <lineBasicMaterial 
        color="#06b6d4" 
        transparent 
        opacity={0.3}
        linewidth={1}
      />
    </lineSegments>
  );
}

// Neural network nodes
function NeuralNetwork({ count = 30 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 - 5
      ));
    }
    return pts;
  }, [count]);

  return (
    <group>
      {points.map((point, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.5}>
          <mesh position={point}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Main scene component
function Scene({ variant = 'default' }) {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Floating particles */}
      <FloatingParticles count={variant === 'landing' ? 150 : 80} />
      
      {/* Decorative elements based on variant */}
      {variant === 'landing' && (
        <>
          <GradientSphere position={[-8, 3, -5]} scale={2} />
          <GradientSphere position={[10, -4, -8]} scale={1.5} />
          <GlowingRing position={[0, 0, -15]} />
          <GlowingRing position={[8, 5, -12]} rotation={[Math.PI / 4, 0, 0]} />
        </>
      )}
      
      {variant === 'dashboard' && (
        <>
          <NeuralNetwork count={40} />
          <DataFlowLines />
        </>
      )}
      
      {variant === 'analysis' && (
        <>
          <GradientSphere position={[0, 0, -10]} scale={3} />
          <NeuralNetwork count={25} />
        </>
      )}

      {variant === 'auth' && (
        <>
          <GradientSphere position={[5, 0, -8]} scale={2} />
          <FloatingParticles count={50} />
        </>
      )}
    </>
  );
}

// Main export component
export default function ThreeBackground({ 
  variant = 'default',
  className = '' 
}) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900/80 pointer-events-none" />
    </div>
  );
}
