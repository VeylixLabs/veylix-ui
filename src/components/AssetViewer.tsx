import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, Html } from '@react-three/drei';
import { cn } from '../utils/cn';

export interface AssetViewerProps {
  /**
   * The URL of the 3D model (.glb or .gltf format).
   * Can be an IPFS gateway URL or a standard HTTP endpoint.
   */
  url: string;
  /**
   * Additional class names for the container.
   */
  className?: string;
  /**
   * Whether to auto-rotate the model. Defaults to true.
   */
  autoRotate?: boolean;
}

// A sub-component to load and render the actual GLTF model
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

// Fallback loader while the 3D model is downloading
function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-[#AA62F5] animate-ping" />
        <span className="text-white font-mono text-sm tracking-wider">LOADING_MESH</span>
      </div>
    </Html>
  );
}

export function AssetViewer({ url, className, autoRotate = true }: AssetViewerProps) {
  return (
    <div className={cn("w-full h-[400px] bg-[#050505] rounded-xl overflow-hidden border border-white/10 relative", className)}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          {/* Default Lighting Setup */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#AA62F5" />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#d8b4fe" />
          
          <Environment preset="city" />

          {/* The Model */}
          <Model url={url} />

          {/* Controls */}
          <OrbitControls 
            autoRotate={autoRotate} 
            autoRotateSpeed={2}
            enableZoom={true} 
            enablePan={false} 
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
