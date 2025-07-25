"use client";

import { useEffect, useRef, useState, createElement, memo } from "react";
import { gsap } from "gsap";

const TextType = ({
                      text,
                      as: Component = "div",
                      typingSpeed = 50,
                      initialDelay = 0,
                      pauseDuration = 2000,
                      deletingSpeed = 30,
                      loop = true,
                      className = "",
                      showCursor = true,
                      hideCursorWhileTyping = false,
                      cursorCharacter = "|",
                      cursorClassName = "",
                      cursorBlinkDuration = 0.5,
                      textColors = [],
                      variableSpeed,
                      onSentenceComplete,
                      startOnVisible = false,
                      reverseMode = false,
                      ...props
                  }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const [isLowPerformance, setIsLowPerformance] = useState(false);
    const cursorRef = useRef(null);
    const containerRef = useRef(null);
    
    // Detect low-performance devices
    useEffect(() => {
        const checkPerformance = () => {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isLowEnd = isMobile || window.innerWidth < 768;
            setIsLowPerformance(isLowEnd);
        };
        
        checkPerformance();
    }, []);

    const textArray = Array.isArray(text) ? text : [text];

    const getRandomSpeed = () => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    };

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return "#ffffff";
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            
            // Optimize cursor animation for low-performance devices
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: isLowPerformance ? cursorBlinkDuration * 1.5 : cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: isLowPerformance ? "power1.inOut" : "power2.inOut", // Simpler easing for low-performance devices
            });
        }
    }, [showCursor, cursorBlinkDuration, isLowPerformance]);

    useEffect(() => {
        if (!isVisible) return;

        let timeout;

        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode
            ? currentText.split("").reverse().join("")
            : currentText;

        const executeTypingAnimation = () => {
            // Adjust speeds based on device performance
            const adjustedTypingSpeed = isLowPerformance ? typingSpeed * 1.5 : typingSpeed;
            const adjustedDeletingSpeed = isLowPerformance ? deletingSpeed * 1.5 : deletingSpeed;
            const adjustedPauseDuration = isLowPerformance ? pauseDuration * 0.7 : pauseDuration;
            
            // On low-performance devices, we might skip some characters to improve performance
            const skipChars = isLowPerformance && processedText.length > 20 ? 2 : 1;
            
            if (isDeleting) {
                if (displayedText === "") {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) {
                        return;
                    }

                    if (onSentenceComplete) {
                        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    }

                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => { }, adjustedPauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        // Delete multiple characters at once on low-performance devices
                        const charsToDelete = isLowPerformance ? Math.min(2, displayedText.length) : 1;
                        setDisplayedText((prev) => prev.slice(0, -charsToDelete));
                    }, adjustedDeletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(
                        () => {
                            // Add multiple characters at once on low-performance devices
                            const remainingChars = processedText.length - currentCharIndex;
                            const charsToAdd = isLowPerformance ? 
                                Math.min(skipChars, remainingChars) : 1;
                            
                            const newChars = processedText.substring(
                                currentCharIndex, 
                                currentCharIndex + charsToAdd
                            );
                            
                            setDisplayedText((prev) => prev + newChars);
                            setCurrentCharIndex((prev) => prev + charsToAdd);
                        },
                        variableSpeed ? 
                            (isLowPerformance ? getRandomSpeed() * 1.2 : getRandomSpeed()) : 
                            adjustedTypingSpeed
                    );
                } else if (textArray.length > 1) {
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, adjustedPauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        onSentenceComplete,
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping &&
        (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return createElement(
        Component,
        {
            ref: containerRef,
            className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
            ...props,
        },
        <span className="inline" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
        showCursor && (
            <span
                ref={cursorRef}
                className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
            >
        {cursorCharacter}
      </span>
        )
    );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(TextType);
