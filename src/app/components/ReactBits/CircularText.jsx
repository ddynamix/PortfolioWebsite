import {useEffect, useState, memo} from "react";
import {motion, useAnimation, useMotionValue} from "framer-motion";

const getRotationTransition = (duration, from, loop = true, direction = "clockwise") => ({
    from,
    to: direction === "clockwise" ? from + 360 : from - 360,
    ease: "linear",
    duration,
    type: "tween",
    repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from, direction) => ({
    rotate: getRotationTransition(duration, from, true, direction),
    scale: {
        type: "spring",
        damping: 20,
        stiffness: 300,
    },
});

const CircularText = ({
                          text,
                          spinDuration = 20,
                          direction = "clockwise",
                          onHover = "speedUp",
                          className = "",
                      }) => {
    // Performance optimization: reduce the number of letters for low-performance devices
    const [isLowPerformance, setIsLowPerformance] = useState(false);
    
    // Detect low-performance devices
    useEffect(() => {
        const checkPerformance = () => {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isLowEnd = isMobile || window.innerWidth < 768;
            setIsLowPerformance(isLowEnd);
        };
        
        checkPerformance();
    }, []);
    
    // For low-performance devices, reduce the number of letters by skipping asterisks
    // and potentially reducing the text length
    const optimizedText = isLowPerformance 
        ? text.replace(/\*/g, '') // Remove asterisks
        : text;
        
    // Further reduce text length for very low-end devices
    const finalText = isLowPerformance && optimizedText.length > 12
        ? optimizedText.substring(0, Math.ceil(optimizedText.length * 0.75))
        : optimizedText;
    
    const letters = Array.from(finalText);
    const controls = useAnimation();
    const rotation = useMotionValue(0);
    
    // Adjust spin duration based on device performance
    const adjustedSpinDuration = isLowPerformance ? spinDuration * 1.5 : spinDuration;

    useEffect(() => {
        const start = rotation.get();
        controls.start({
            rotate: start + (direction === "clockwise" ? 360 : -360),
            scale: 1,
            transition: getTransition(adjustedSpinDuration, start, direction),
        });
    }, [adjustedSpinDuration, finalText, onHover, controls, rotation, direction]);

    const handleHoverStart = () => {
        // Skip hover effects on low-performance devices to improve performance
        if (isLowPerformance) return;
        
        const start = rotation.get();
        if (!onHover) return;

        let transitionConfig;
        let scaleVal = 1;

        // Simplified hover effects for better performance
        switch (onHover) {
            case "slowDown":
                transitionConfig = getTransition(adjustedSpinDuration * 1.5, start, direction);
                break;
            case "speedUp":
                transitionConfig = getTransition(adjustedSpinDuration / 3, start, direction);
                break;
            case "pause":
                transitionConfig = {
                    rotate: {type: "spring", damping: 15, stiffness: 200}, // Less complex spring
                    scale: {type: "spring", damping: 15, stiffness: 200},
                };
                scaleVal = 1;
                break;
            case "goBonkers":
                transitionConfig = getTransition(adjustedSpinDuration / 10, start, direction);
                scaleVal = 0.9; // Less extreme scale change
                break;
            default:
                transitionConfig = getTransition(adjustedSpinDuration, start, direction);
        }

        controls.start({
            rotate: start + (direction === "clockwise" ? 360 : -360),
            scale: scaleVal,
            transition: transitionConfig,
        });
    };

    const handleHoverEnd = () => {
        // Skip hover end effects on low-performance devices
        if (isLowPerformance) return;
        
        const start = rotation.get();
        controls.start({
            rotate: start + (direction === "clockwise" ? 360 : -360),
            scale: 1,
            transition: getTransition(adjustedSpinDuration, start, direction),
        });
    };

    return (
        <motion.div
            className={`m-0 mx-auto rounded-full w-[200px] h-[200px] relative text-gray-600 font-serif font-bold text-center cursor-pointer origin-center ${className}`}
            style={{rotate: rotation}}
            initial={{rotate: 0}}
            animate={controls}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i;
                const factor = Math.PI / letters.length;
                const x = factor * i;
                const y = factor * i;
                const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

                return (
                    <span
                        key={i}
                        className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
                        style={{transform, WebkitTransform: transform}}
                    >
            {letter}
          </span>
                );
            })}
        </motion.div>
    );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(CircularText);
