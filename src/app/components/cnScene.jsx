'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls, Environment, AsciiRenderer} from '@react-three/drei';
import CNModel from './CNModel';

export default function CNScene() {
    return (
        <Canvas camera={{ position: [-15, -20, 0], fov: 20 }}>
            <AsciiRenderer invert={false} bgColor={"transparent"} fgColor={"black"} resolution={0.25}/>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />

            <CNModel scale={[0.2, 0.2, 0.2]} position={[0, -29.4, 0]} />

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                // Constrain vertical rotation for upward viewing angle
                minPolarAngle={Math.PI / 1.2} // 30 degrees from top (steeper upward angle)
                maxPolarAngle={Math.PI / 1.2} // About 80 degrees from top

                // Set target to look up at the top of the tower
                target={[0, -2, 0]}
                // Auto-rotate for a nice effect (optional)
                autoRotate={true}
                autoRotateSpeed={2}
                // Damping for smoother controls
                enableDamping={true}
                dampingFactor={0.05}
            />
            <Environment preset="sunset" />
        </Canvas>
    );
}