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
import { useControls, Leva } from 'leva'
import {useRef} from "react";


export default function Model(props) {
    const torus = useRef(null);
    const text = useRef(null);

    useFrame( () => {
        torus.current.rotation.x += 0.02
    })

    const config = useControls({
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        backside: true,
        samples: { value: 32, min: 1, max: 32, step: 1 },
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.24, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0.73, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.08, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0.04, min: 0, max: 1 },
        anisotropy: { value: 0.09, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.01, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.79, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.33, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 1, min: 0, max: 1 },
        attenuationDistance: { value: 2.10, min: 0, max: 10, step: 0.01 },
        attenuationColor: '#ffffff',
        color: '#ffffff',
        bg: '#ffffff'
    })


    const { nodes: torusNodes, materials: torusMaterials } = useGLTF('torus.glb')
    const { nodes: helloNodes } = useGLTF('HelloWorld.glb');


    return (
        <group scale={5}>
            <Leva
                hidden={true}
            />
            <mesh ref={text} geometry={helloNodes.Text.geometry} position={[.1, 0, -1]} rotation={[90 * (Math.PI/180), 0, 0]}>
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh ref={torus} geometry={torusNodes.Torus002.geometry} position={[0, 0, 0]}>
                {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial {...config} background={new THREE.Color('#ffffff')} />}
            </mesh>
        </group>
    )
}

