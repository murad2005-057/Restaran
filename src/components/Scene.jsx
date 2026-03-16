import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Stars, 
  Grid,
  Float
} from '@react-three/drei'
import Table from './Table'

const Scene = ({ tables, onTableClick }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={5}
          maxDistance={25}
        />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        
        {/* Environment */}
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <color attach="background" args={['#0a0a0c']} />

        {/* Floor Grid */}
        <Grid 
          infiniteGrid 
          fadeDistance={50} 
          fadeStrength={5} 
          cellSize={1} 
          sectionSize={5} 
          sectionColor="#222" 
          cellColor="#111" 
          position={[0, -0.85, 0]} 
        />

        <group position={[0, 0, 0]}>
          {tables.map((table) => (
            <Table
              key={table.id}
              position={table.position}
              status={table.status}
              tableNumber={table.table_number}
              onClick={onTableClick}
            />
          ))}
        </group>

        {/* Decorative Floating Central Piece */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[0, 4, 0]}>
           <mesh>
              <torusKnotGeometry args={[1, 0.3, 128, 16]} />
              <meshPhysicalMaterial 
                color="#00ff88" 
                emissive="#00ff88" 
                emissiveIntensity={0.5} 
                metalness={1} 
                roughness={0} 
                transmission={0.5}
                thickness={1}
              />
           </mesh>
        </Float>

      </Canvas>
    </div>
  )
}

export default Scene
