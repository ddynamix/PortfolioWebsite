'use client';

import Link from 'next/link';
import {useSection} from './SectionContext';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, memo } from 'react';

// Define the Header component
function HeaderComponent() {
    const {currentSection} = useSection();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Conditionally apply backdrop-blur based on device performance
    const backdropClass = isLowPerformance ? "backdrop-blur-sm" : "backdrop-blur-md";
    
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 glassHeader ${backdropClass}`}>
            <nav className="container mx-auto px-4 sm:pl-2 sm:pr-6 py-4 sm:py-5 flex justify-between items-center max-w-[80%]">
                <div className="relative h-6">
                    <AnimatePresence mode="wait">
                        {currentSection === 'hero' ? (
                            <motion.div
                                key="logo"
                                initial={{ y: isLowPerformance ? -20 : -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: isLowPerformance ? -20 : -50, opacity: 0 }}
                                transition={{ 
                                    duration: isLowPerformance ? 0.2 : 0.4, 
                                    ease: isLowPerformance ? 'easeOut' : 'easeInOut' 
                                }}
                                className="top-0 left-0 w-full -mt-1"
                            >
                                <Link href="/">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Logo"
                                        width={30}
                                        height={30}
                                        className=""
                                        priority={true}
                                    />
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="name"
                                initial={{ y: isLowPerformance ? -20 : -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: isLowPerformance ? -20 : -50, opacity: 0 }}
                                transition={{ 
                                    duration: isLowPerformance ? 0.2 : 0.4, 
                                    ease: isLowPerformance ? 'easeOut' : 'easeInOut' 
                                }}
                                className="top-0 left-0 w-full -mt-1 sm:-mt-2"
                            >
                                <Link href="/" className="text-3xl font-extralight font-serif">
                                    Tyler Steptoe
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile menu button */}
                <button 
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`${currentSection !== 'hero' ? 'bg-white' : 'bg-gray-700'} block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`${currentSection !== 'hero' ? 'bg-white' : 'bg-gray-700'} block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`${currentSection !== 'hero' ? 'bg-white' : 'bg-gray-700'} block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Desktop navigation */}
                <ul className="hidden md:flex space-x-6 lg:space-x-8">
                    <li>
                        <Link
                            href="/#hero"
                            className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#0011FF]`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#projects"
                            className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#00E40F]`}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#bloglist"
                            className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#FF0000]`}
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#contact"
                            className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#FFFF00]`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ 
                            duration: isLowPerformance ? 0.2 : 0.3,
                            ease: isLowPerformance ? 'easeOut' : 'easeInOut'
                        }}
                        className={`md:hidden glassHeader ${backdropClass}`}
                    >
                        <ul className="flex flex-col items-center py-4 space-y-4">
                            <li>
                                <Link
                                    href="/#hero"
                                    className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#0011FF]`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#projects"
                                    className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#00E40F]`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#bloglist"
                                    className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#FF0000]`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className={`${currentSection !== 'hero' ? 'text-white' : 'text-gray-700'} hover:underline underline-offset-4 decoration-2 decoration-[#FFFF00]`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(HeaderComponent);