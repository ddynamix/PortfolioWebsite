'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function CNModel(props) {
    const { nodes, materials, scene } = useGLTF('/cntower.glb');

    return (
        <primitive object={scene} {...props} />
    );
}