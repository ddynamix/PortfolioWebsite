'use client'; // Needed because ThreePlaceholder uses hooks

import {useState} from "react";
import {motion} from "framer-motion";
import Link from 'next/link';
import useSectionObserver from './UseSectionObserver';
import dynamic from 'next/dynamic';

import Scene from './Scene';
// const Scene = dynamic(() => import('./Scene'), {ssr: false});

export default function Hero() {
    const ref = useSectionObserver('hero');

    const [showAbout, setShowAbout] = useState(false);

    return (
        <section ref={ref}>
            <div className="overflow-hidden w-screen h-screen">
                {/* Parent container that holds both sections */}
                <motion.div
                    className="flex w-[200vw] h-full"
                    animate={{x: showAbout ? "-100vw" : "0vw"}}
                    transition={{duration: 0.6, ease: [0.65, 0, 0.35, 1]}}
                >

                    {/* Hero Section */}
                    <section id="hero" className="w-screen h-full flex flex-col justify-between pt-30 bg-white">

                        <div className="flex flex-row justify-between px-20">

                            {/* Left Side: Text Content */}
                            <div className="text-left flex flex-col">
                                <p className="text-lg text-black mb-10">Hello, my name is</p>
                                <h1 className="text-9xl font-serif font-bold text-black leading-tight">
                                    Tyler
                                </h1>
                                <h1 className="text-9xl font-serif font-bold text-black leading-tight">
                                    Steptoe
                                </h1>
                            </div>

                            {/* Right Side: ThreeJS Content */}
                            <div className="flex w-[60%] h-full items-center -mr-12 pt-16">
                                <Scene/>
                            </div>

                        </div>

                        <div className="flex w-full items-end justify-between mb-35 px-20">
                            <p className="text-lg text-black max-w-md cursor-pointer hover:underline"
                               onClick={() => setShowAbout(true)}>
                                I am a software developer based in Toronto. I love Hackathons, design, and
                                creating new things. &gt;
                            </p>
                            <a
                                href="/TylerSteptoe_SoftwareResumeMarch2025.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:underline font-serif underline-offset-4 text-3xl"
                            >
                                résumé
                            </a>
                        </div>
                    </section>

                    {/* About Me Section */}
                    <section className="w-screen h-full">
                        <section className="min-h-screen flex items-center justify-center bg-white">
                            <div className="container mx-auto px-4 -mt-10">

                                {/* Back Arrow */}
                                <p className="inline-block mb-8 text-black cursor-pointer hover:underline text-2xl"
                                   onClick={() => setShowAbout(false)}>
                                    &larr; {/* Left arrow character */}
                                </p>

                                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                                    {/* Left Column: Text Content */}
                                    <div className="lg:w-3/5">
                                        <h1 className="text-7xl sm:text-6xl font-serif font-medium text-black mb-10">
                                            Tyler Steptoe
                                        </h1>

                                        {/* Paragraphs from the image */}
                                        <div className="space-y-6 text-[13px] sm:text-m text-black leading-relaxed">
                                            <p>
                                                How are you doing. I&apos;m currently a 3rd year student at the
                                                University
                                                of
                                                Toronto studying Computer Science and Cognitive Science. Technology and
                                                coding
                                                have always fascinated me ever since I first used Scratch at 8 years
                                                old.
                                                Since
                                                then, I&apos;ve dedicated my academic and professional career to
                                                developing
                                                my
                                                skills in order to develop projects that can make a difference.
                                            </p>
                                            <p>
                                                I love all ends of programming and am always eager to learn more.
                                                Hackathons
                                                are
                                                a particularly favourite pastime as they allow me to meet equally as
                                                passionate
                                                developers and allow me to brainstorm, develop, and pitch an idea that
                                                I&apos;ve
                                                had on my mind. Check out some of my <Link href="/#projects"
                                                                                           className="text-blue-600 hover:underline">projects
                                                on this website!</Link>
                                            </p>
                                            <p>
                                                I hope it&apos;s already made itself clear, but another passion of mine
                                                is
                                                design. If it weren&apos;t UofT it would have been OCAD. I love using
                                                programming to translate artistic ideas into unique user experiences.
                                                That&apos;s why I love being at the forefront of technologies like
                                                ThreeJS
                                                and
                                                Framer; they make it so much easier to make lasting and memorable
                                                graphic
                                                designs.
                                            </p>
                                            <p>
                                                Other than that, I&apos;m also very passionate about film and I&apos;m
                                                doing
                                                a
                                                minor in Cinema Studies (check out my <a
                                                href="YOUR_LETTERBOXD_LINK_HERE"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline">Letterboxd</a> if
                                                that&apos;s your kind of thing). As for experience, I&apos;ve worked as
                                                a
                                                back-end AI intern for Parlay Games Inc., and am currently a data
                                                scientist
                                                intern at Propel Holdings doing risk management. Feel free to contact me
                                                for
                                                more details, and take a look at my <a href="/resume.pdf"
                                                                                       target="_blank"
                                                                                       rel="noopener noreferrer"
                                                                                       className="text-blue-600 hover:underline">CV</a>.
                                            </p>
                                            <p>
                                                Since I don&apos;t know how to end this, here&apos;s a quote from my
                                                favourite
                                                game of all time, <span className="italic">The Beginners Guide</span> by
                                                Davey
                                                Wreden:
                                            </p>
                                            <blockquote
                                                className="pl-4 border-l-4 border-gray-300 italic text-gray-600">
                                                &quot;In your lifetime, you are going to clean a lot of houses. And
                                                among
                                                all of
                                                those, a few of them will stick out as truly wonderful, beautiful
                                                experiences.
                                                And none of them will be the ones that were easy. Just something to
                                                think
                                                about
                                                while you smooth out the rug in the bedroom.&quot;
                                            </blockquote>
                                        </div>
                                    </div>

                                    {/* Right Column: Skill Wheel Placeholder */}
                                    <div className="lg:w-1/3 flex items-center justify-center mt-10 lg:mt-0">
                                        <div
                                            className="w-64 h-64 border-4 border-dashed border-gray-400 rounded-full flex items-center justify-center text-gray-500 text-center p-4">
                                            [ Skill Wheel / 3D Element Placeholder ]
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </motion.div>
            </div>
        </section>
    );
}