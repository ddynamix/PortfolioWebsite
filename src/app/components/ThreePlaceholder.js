'use client'; // Mark this as a Client Component

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, useGLTF } from '@react-three/drei';

export default function ThreePlaceholder() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Box args={[2, 2, 2]} position={[0, 0, 0]}>
                {/* Simple rotating mesh */}
                <meshStandardMaterial color="orange" />
            </Box>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2}/>
        </Canvas>
    );
}