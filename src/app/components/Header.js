'use client';

import Link from 'next/link';
import {useSection} from './SectionContext';
import {motion, AnimatePresence} from 'framer-motion';

export default function Header() {
    const {currentSection} = useSection();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xs bg-transparent">
            <nav className="container mx-auto pl-2 pr-6 py-5 flex justify-between items-center">
                <AnimatePresence>
                    {currentSection !== 'hero' && (
                        <motion.div
                            key="sliding-element"
                            initial={{y: -50, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -50, opacity: 0}}
                            transition={{duration: 0.4, ease: 'easeInOut'}}
                            className="top-0 left-0 w-full"
                        >
                            <Link href="/" className="text-3xl font-extralight font-serif">Tyler Steptoe</Link>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div></div>

                <ul className="flex space-x-6 sm:space-x-8">
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
        </header>
    );
}