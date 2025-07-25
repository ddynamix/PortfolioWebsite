'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from "@react-three/drei"
import Image from 'next/image'
import { AsciiRenderer } from "@react-three/drei";

// Lazy load the 3D model component
const Model = lazy(() => import('./Model'))

export default function Scene() {
    const [isLowPerformance, setIsLowPerformance] = useState(false)
    const [is3DLoaded, setIs3DLoaded] = useState(false)
    const [shouldRender3D, setShouldRender3D] = useState(true)

    useEffect(() => {
        // Check if device is likely to be low-end
        const checkPerformance = () => {
            // Check if it's a mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            
            // Check if it's a low-end device (simple heuristic)
            // Could be enhanced with more sophisticated detection
            const isLowEnd = isMobile || window.innerWidth < 768
            
            setIsLowPerformance(isLowEnd)
            
            // For extremely low-end devices, don't even try to render 3D
            const isVeryLowEnd = isMobile && window.innerWidth < 480
            setShouldRender3D(!isVeryLowEnd)
        }
        
        checkPerformance()
        
        // Set a timeout to mark 3D as loaded after a delay
        // This helps prevent layout shifts during initial load
        const timer = setTimeout(() => {
            setIs3DLoaded(true)
        }, 500)
        
        return () => clearTimeout(timer)
    }, [])

    // Fallback image for very low-end devices
    if (!shouldRender3D) {
        return (
            <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                    src="/images/model-fallback.png" 
                    alt="3D Model Representation" 
                    width={300} 
                    height={300}
                    priority={true}
                    className="object-contain"
                />
            </div>
        )
    }

    return (
        <div className="relative w-full h-full">
            {/* Show loading state before 3D is ready */}
            {!is3DLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Loading 3D...</div>
                </div>
            )}
            
            <Canvas
                dpr={isLowPerformance ? [1, 1.5] : [1, 2]} // Lower resolution on low-end devices
                performance={{ min: 0.5 }} // Allow frame rate to drop more on low-end devices
                gl={{ 
                    powerPreference: 'high-performance',
                    antialias: !isLowPerformance, // Disable antialiasing on low-end devices
                    depth: true,
                    stencil: false, // Disable stencil buffer for better performance
                    alpha: true
                }}
            >
                <Suspense fallback={null}>
                    <Model />
                    <directionalLight position={[0, 2, 0]} intensity={4} />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    )
}