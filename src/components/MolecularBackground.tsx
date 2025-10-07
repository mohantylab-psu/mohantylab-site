import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Individual molecular components
interface FloatingMoleculeProps {
  position: [number, number, number];
  color: string;
  type?: 'sphere' | 'box' | 'torus';
}

const FloatingMolecule = ({ position, color, type = 'sphere' }: FloatingMoleculeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Reduced animation speed for better performance
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1;
    }
  });

  if (type === 'torus') {
    return (
      <Torus
        ref={meshRef}
        position={position}
        args={[0.3, 0.1, 8, 16]}
      >
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    );
  }
  
  if (type === 'box') {
    return (
      <Box
        ref={meshRef}
        position={position}
        args={[0.3, 0.3, 0.3]}
      >
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Box>
    );
  }

  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[0.2]}
    >
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </Sphere>
  );
};

// DNA Helix component
const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame(() => {
    if (groupRef.current) {
      // Reduced rotation speed for better performance
      groupRef.current.rotation.y += 0.002;
    }
  });

  const helixPoints = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 4;
    const x = Math.cos(angle) * 1.5;
    const z = Math.sin(angle) * 1.5;
    const y = i * 0.3 - 3;
    helixPoints.push([x, y, z]);
    helixPoints.push([-x, y, -z]);
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, index) => (
        <Sphere key={index} position={point} args={[0.08]}>
          <meshStandardMaterial 
            color={index % 2 === 0 ? "#3b82f6" : "#06b6d4"} 
            transparent 
            opacity={0.8} 
          />
        </Sphere>
      ))}
    </group>
  );
};

// Main molecular scene component
const MolecularScene = () => {
  const molecules: { position: [number, number, number]; color: string; type: 'sphere' | 'box' | 'torus'; }[] = [
    { position: [-3, 2, -2], color: "#3b82f6", type: "sphere" },
    { position: [3, -1, -1], color: "#06b6d4", type: "box" },
    { position: [-2, -2, 1], color: "#a855f7", type: "torus" },
    { position: [2, 1, 2], color: "#3b82f6", type: "sphere" },
    { position: [0, 3, -3], color: "#06b6d4", type: "sphere" },
    { position: [-1, -3, -2], color: "#a855f7", type: "box" },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      {/* DNA Helix */}
      <DNAHelix />
      
      {/* Floating molecules */}
      {molecules.map((molecule, index) => (
        <FloatingMolecule
          key={index}
          position={molecule.position}
          color={molecule.color}
          type={molecule.type}
        />
      ))}
    </>
  );
};

// Main background component with performance optimization
const MolecularBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.1 }}
        frameloop="demand"
      >
        <MolecularScene />
      </Canvas>
    </div>
  );
};

export default MolecularBackground;
