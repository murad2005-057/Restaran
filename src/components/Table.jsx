import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const Table = ({ position, status, tableNumber, onClick }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Colors based on status
  const statusColors = {
    available: '#00ff88',
    booked: '#ffcc00',
    occupied: '#ff4444'
  }

  const currentColor = statusColors[status] || '#ffffff'

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + tableNumber) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Table Surface */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => status === 'available' && onClick(tableNumber)}
      >
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshPhysicalMaterial 
          color={hovered && status === 'available' ? '#ffffff' : '#f0f0f0'}
          metalness={0.9}
          roughness={0.1}
          transmission={0.3}
          thickness={0.5}
          emissive={currentColor}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          clearcoat={1}
        />
        
        {/* Table Glow Ring */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.02, 32]} />
          <meshStandardMaterial 
            color={currentColor} 
            emissive={currentColor} 
            emissiveIntensity={1.5} 
            toneMapped={false} 
          />
        </mesh>

        <Text
          position={[0, 0.1, 0]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {tableNumber}
        </Text>
      </mesh>

      {/* Floating Chairs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2
        const radius = 1.2
        return (
          <Float
            key={i}
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
            position={[Math.cos(angle) * radius, -0.2, Math.sin(angle) * radius]}
          >
            <mesh rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.4, 0.05, 0.4]} />
              <meshPhysicalMaterial 
                color="#222" 
                metalness={0.8} 
                roughness={0.2} 
                clearcoat={1}
              />
              <mesh position={[0, 0.2, -0.18]}>
                 <boxGeometry args={[0.4, 0.4, 0.05]} />
                 <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.2} clearcoat={1} />
              </mesh>
            </mesh>
          </Float>
        )
      })}

      {/* Shadows */}
      <ContactShadows 
        position={[0, -0.8, 0]} 
        opacity={0.4} 
        scale={5} 
        blur={2} 
        far={1} 
        color={currentColor}
      />
    </group>
  )
}

export default Table
