'use client'; // Needed because ThreePlaceholder uses hooks

import {useState, useRef, useEffect, memo} from "react";
import {motion} from "framer-motion";
import Link from 'next/link';
import useSectionObserver from './UseSectionObserver';
import dynamic from 'next/dynamic';
import TextType from './ReactBits/TextType';
import CircularText from './ReactBits/CircularText';

// Lazy load the Scene component
const Scene = dynamic(() => import('./cnScene'));

function Hero() {
    const ref = useSectionObserver('hero');
    const [showAbout, setShowAbout] = useState(false);
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

    return (
        <section ref={ref} className={'relative bg-white'}>
            <div className="relative overflow-hidden w-screen max-h-screen z-10">
                <motion.div
                    className="flex w-[200vw] h-screen"
                    animate={{x: showAbout ? "-100vw" : "0vw"}}
                    transition={{
                        duration: isLowPerformance ? 0.4 : 0.6,
                        ease: isLowPerformance ? "easeInOut" : [0.65, 0, 0.35, 1]
                    }}
                >
                    <section id="hero" className="relative w-screen h-full flex flex-col justify-between pt-20 sm:pt-30">
                        {/* 3D Scene Background - Full Height */}
                        <div className="absolute inset-0 top-0 left-1/2 transform -translate-x-1/2 sm:-translate-x-1/10 w-[90%] sm:w-[60%] h-screen z-0 pointer-events-none sm:pointer-events-auto ">
                            <Scene />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between px-6 sm:px-10 md:px-20">
                            {/* Left Side: Text Content */}
                            <div className="text-left flex flex-col h-full w-full">
                                <p className="text-base sm:text-lg text-black mb-4 sm:mb-10">Hello! My name is</p>

                                {/* Reserve space for full text */}
                                <div className="relative md:mb-10">
                                    {/* Invisible placeholder to reserve space */}
                                    <div
                                        className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif font-bold text-transparent leading-tight"
                                        aria-hidden="true"
                                    >
                                        Tyler Steptoe
                                    </div>

                                    {/* Actual typing animation positioned absolutely */}
                                    <div className="absolute top-0 left-0">
                                        <TextType
                                            text={["Tyler Steptoe"]}
                                            typingSpeed={75}
                                            pauseDuration={1500}
                                            showCursor={true}
                                            cursorCharacter=""
                                            className={"text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif font-bold text-black leading-tight"}
                                            textColors={["#000000"]}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Empty space for 3D content (now in background) */}
                            <div className="relative w-full max-h-full items-center md:-mr-12 pt-0 pointer-events-none md:pt-16">
                                {/* This div just provides spacing - the 3D scene is positioned absolutely */}
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row w-full items-center sm:items-end justify-between gap-6 sm:gap-0 mb-10 sm:mb-20 md:mb-35 px-6 sm:px-10 md:px-20">
                            <p className="text-base sm:text-lg text-black max-w-md cursor-pointer hover:underline text-center sm:text-left"
                               onClick={() => setShowAbout(true)}>
                                I am a software developer based in Toronto. I love Hackathons, design, and
                                creating new things. &gt;
                            </p>
                            <a
                                href="/TylerSteptoe_SoftwareResumeMarch2025.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:underline font-serif underline-offset-4 text-xl sm:text-2xl md:text-3xl"
                            >
                                résumé
                            </a>
                        </div>
                    </section>

                    {/* About Me Section */}
                    <section className="w-screen h-full">
                        <section className="min-h-screen flex items-center justify-center">
                            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">

                                {/* Back Arrow */}
                                <p className="inline-block mb-2 text-black cursor-pointer hover:underline text-3xl md:text-xl sm:text-2xl mt-10 md:mt-5"
                                   onClick={() => setShowAbout(false)}>
                                    &larr; {/* Left arrow character */}
                                </p>

                                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 min-h-fit h-screen lg:h-auto overflow-hidden lg:overflow-visible">
                                    {/* Left Column: Text Content */}
                                    <div className="lg:w-3/5 flex flex-col overflow-hidden lg:overflow-visible">
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-black mb-6 sm:mb-10">
                                            Tyler Steptoe
                                        </h1>

                                        {/* Paragraphs */}
                                        <div className="space-y-4 sm:space-y-6 text-xs md:text-sm sm:text-base text-black leading-relaxed overflow-y-auto lg:overflow-visible flex-1 pr-2">
                                            <p>
                                                How's it going? I&apos;m currently a 4th year student at the
                                                University of Toronto studying Computer Science and Cognitive Science.
                                                Technology and coding have always fascinated me ever since I first used
                                                Scratch at 8 years old. Since then, I&apos;ve dedicated my academic and
                                                professional career to developing my skills in order to develop projects
                                                that can make a difference.
                                            </p>
                                            <p>
                                                I love all ends of programming and am always eager to learn more.
                                                Hackathons are a particularly favourite pastime as they allow me to meet
                                                equally as passionate developers and allow me to brainstorm, develop,
                                                and pitch an idea that I&apos;ve had on my mind. Check out some of
                                                my&nbsp;
                                                <Link href="/#projects" className="text-blue-600 hover:underline">
                                                    projects on this website!
                                                </Link>
                                            </p>
                                            <p>
                                                Another passion of mine is design. If it weren&apos;t UofT it would have
                                                been OCAD. I love using programming to translate artistic ideas into
                                                unique user experiences. That&apos;s why I love being at the forefront
                                                of technologies like ThreeJS and Framer; they make it so much easier to
                                                make lasting and memorable graphic designs. Despite this, I still
                                                consider myself more of a back-end developer, although I will always try
                                                out new technologies and languages.
                                            </p>
                                            <p>
                                                Other than tech, I&apos;m also very passionate about film and I&apos;m
                                                doing a minor in Cinema Studies (check out my&nbsp;
                                                <a
                                                    href="https://letterboxd.com/ddynamix/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline">
                                                    Letterboxd
                                                </a>
                                                &nbsp;if that&apos;s your kind of thing). As for experience, I&apos;ve
                                                worked as
                                                a back-end AI intern for Parlay Games Inc., and am currently a data
                                                scientist intern at Propel Holdings doing risk management. Feel free to
                                                contact me for more details, and take a look at my&nbsp;
                                                <a href="/resume.pdf"
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className="text-blue-600 hover:underline">
                                                    CV
                                                </a>.
                                            </p>
                                            <blockquote
                                                className="pl-4 border-l-4 border-gray-300 italic text-gray-600">
                                                &quot;In your lifetime, you are going to clean a lot of houses. And
                                                among all of those, a few of them will stick out as truly wonderful,
                                                beautiful experiences. And none of them will be the ones that were easy.
                                                Just something to think about while you smooth out the rug in the
                                                bedroom.&quot;
                                            </blockquote>
                                            <p className="text-right">
                                                - Davey Wreden, <i>The Beginners Guide</i>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Column: Skill Wheels */}
                                    <div className="hidden sm:flex lg:w-1/3 items-center flex-col justify-center mt-10 lg:mt-0 text-black flex-shrink-0">
                                        <div className="flex items-start justify-start sm:mr-20 md:mr-40 -mb-4 sm:-mb-10">
                                            <CircularText
                                                text="PYTHON*C*JAVA*ASM*R*JS*TS*"
                                                onHover="slowDown"
                                                spinDuration={25}
                                                className="text-black text-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
                                            />
                                        </div>
                                        <div className="flex items-end justify-end sm:ml-30 md:ml-70 -mb-6 sm:-mb-15 -mt-6 sm:-mt-15">
                                            <CircularText
                                                text={"PYTORCH*LLMS*DEVOPS*GITLAB*GITHUB*DOCKER*"}
                                                onHover="slowDown"
                                                spinDuration={15}
                                                direction="counterclockwise"
                                                className="text-black text-center w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]"
                                            />
                                        </div>
                                        <div className="flex items-start justify-start sm:mr-15 md:mr-30">
                                            <CircularText
                                                text={"THREEJS*FRAMER*REACT*NEXTJS*HTML*CSS*TAILWIND*"}
                                                onHover="slowDown"
                                                spinDuration={20}
                                                className="text-black text-center w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]"
                                            />
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

// Export memoized component to prevent unnecessary re-renders
export default memo(Hero);