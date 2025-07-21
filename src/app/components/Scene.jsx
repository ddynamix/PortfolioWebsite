'use client'

import {Canvas} from '@react-three/fiber'
import Model from './Model'
import {Environment} from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas>
            <Model/>
            <directionalLight position={[0, 2, 0]} intensity={4}/>
            <Environment preset="studio"/>
        </Canvas>
    )
}