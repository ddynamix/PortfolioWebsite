import * as THREE from 'three'
import {Canvas, useFrame} from '@react-three/fiber'
import {
    MeshTransmissionMaterial,
    useGLTF,
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    OrbitControls,
    Center,
} from '@react-three/drei'
import {useRef, useState, useEffect} from "react";

// Simplified configuration for better performance
const simpleConfig = {
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: true,
    samples: 10, // Reduced from 32
    resolution: 1024, // Reduced from 2048
    transmission: 1,
    roughness: 0.24,
    thickness: 0.73,
    ior: 1.08,
    chromaticAberration: 0.04,
    anisotropy: 0.09,
    distortion: 0.01,
    distortionScale: 0.79,
    temporalDistortion: 0.33,
    clearcoat: 1,
    attenuationDistance: 2.10,
    attenuationColor: '#ffffff',
    color: '#ffffff',
    bg: '#ffffff'
};

// Even more simplified config for low-end devices
const lowEndConfig = {
    ...simpleConfig,
    samples: 4,
    resolution: 512,
    chromaticAberration: 0,
    anisotropy: 0,
    distortion: 0,
    temporalDistortion: 0
};

export default function Model(props) {
    const torus = useRef(null);
    const text = useRef(null);
    const [isLowEndDevice, setIsLowEndDevice] = useState(false);
    const [frameRate, setFrameRate] = useState(1); // Controls animation speed
    
    // Detect low-end devices
    useEffect(() => {
        // Check if device is likely to be low-end
        const checkPerformance = () => {
            // Simple heuristic: check if it's a mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // More sophisticated check could involve testing actual rendering performance
            // For now, we'll just use the mobile check as a proxy
            setIsLowEndDevice(isMobile);
            
            // Set frame rate based on device capability
            setFrameRate(isMobile ? 0.01 : 0.02); // Slower rotation on mobile
        };
        
        checkPerformance();
    }, []);

    // Optimize frame updates - only rotate every other frame on low-end devices
    useFrame((state, delta) => {
        if (torus.current) {
            torus.current.rotation.x += frameRate;
        }
    });

    // Use React.lazy and Suspense for model loading in the parent component
    const { nodes: torusNodes } = useGLTF('torus.glb');
    const { nodes: helloNodes } = useGLTF('HelloWorld.glb');

    // Choose config based on device capability
    const config = isLowEndDevice ? lowEndConfig : simpleConfig;

    return (
        <group scale={5}>
            <mesh ref={text} geometry={helloNodes.Text.geometry} position={[.1, 0, -1]} rotation={[90 * (Math.PI/180), 0, 0]}>
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh ref={torus} geometry={torusNodes.Torus002.geometry} position={[0, 0, 0]}>
                <MeshTransmissionMaterial {...config} background={new THREE.Color('#ffffff')} />
            </mesh>
        </group>
    )
}

