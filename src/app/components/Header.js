'use client';

import Link from 'next/link';
import {useSection} from './SectionContext';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';

export default function Header() {
    const {currentSection} = useSection();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glassHeader backdrop-blur-md">
            <nav className="container mx-auto pl-2 pr-6 py-5 flex justify-between items-center">
                <div className="relative h-6">
                    <AnimatePresence mode="wait">
                        {currentSection === 'hero' ? (
                            <motion.div
                                key="logo"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="top-0 left-0 w-full -mt-1"
                            >
                                <Link href="/">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Logo"
                                        width={30}
                                        height={30}
                                        className=""
                                    />
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="name"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="top-0 left-0 w-full -mt-2"
                            >
                                <Link href="/" className="text-3xl font-extralight font-serif">
                                    Tyler Steptoe
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
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