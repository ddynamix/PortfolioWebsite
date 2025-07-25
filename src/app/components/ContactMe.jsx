'use client';

import React from "react";
import useSectionObserver from './UseSectionObserver';
import Image from "next/image";
import ShinyText from "./ReactBits/ShinyText";

const ContactPage = () => {
    const ref = useSectionObserver('contact');

    return (
        <section ref={ref} id={"contact"}>
            <div className="bg-background text-white min-h-screen flex flex-col justify-between">
                <div
                    className="mx-auto px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[80%]] sm:max-w-5/6">

                    {/* Left Side */}
                    <div
                        className={"flex flex-col text-left mr-0 md:mr-6 lg:mr-10 space-y-6 sm:space-y-8 md:space-y-10 sm:my-16 md:my-10"}>

                        <p className="text-2xl sm:text-3xl font-bold font-serif">I'm open to chat!</p>
                        <p className="text-base sm:text-lg md:text-xl">
                            If you're interested in any of my projects, have any questions about me, or want to reach
                            out for any other reason, please feel free to leave a message! I'll respond within a day :)
                        </p>

                        <div className="flex justify-between flex-col text-gray-400 h-full min-h-30">

                            <p className="text-lg sm:text-xl whitespace-nowrap h-full -mb-2"> +1 647-804-0076</p>
                            <a href="mailto:tfsteptoe@gmail.com" className="w-full underline text-lg sm:text-xl h-full">
                                tfsteptoe@gmail.com
                            </a>
                            <a href="/TylerSteptoe_SoftwareResumeMarch2025.pdf"
                               className="w-full underline text-lg sm:text-xl hufill">
                                résumé
                            </a>

                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <form
                        action="https://formspree.io/f/mnnzjgvq"
                        method="POST"
                        className="flex flex-col space-y-3 sm:space-y-4"
                    >
                        <div>
                            <label htmlFor="email" className="text-xs sm:text-sm">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full font-bold bg-black border-2 border-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl mt-1"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="text-xs sm:text-sm">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="w-full font-bold bg-black border-2 border-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl mt-1"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="text-xs sm:text-sm">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="8"
                                required
                                className="w-full font-bold bg-black border-2 border-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl mt-1"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-gray-950 py-1.5 sm:py-2 px-3 sm:px-4 mt-2 flex items-center justify-center hover:bg-cyan-950 hover:cursor-pointer rounded-xl border-cyan-400 border-2"
                        >
                            <ShinyText text="Send ⇨" disabled={false} speed={3}/>
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div
                    className="bg-background mt-10 sm:mt-16 w-screen flex flex-col justify-stretch sm:flex-row text-center sm:space-y-0">

                    <a href="https://www.linkedin.com/in/tyler-steptoe"
                       className="flex bg-blue-700 items-center justify-center hover:scale-105 transition py-4 w-full sm:flex-1 space-x-2">
                        <span className="text-sm sm:text-base">LinkedIn</span>
                        <Image
                            src={'/images/linkedin_icon.png'}
                            alt={"LinkedIn Logo"}
                            width={25}
                            height={25}
                            className="object-contain w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                        />
                    </a>

                    <a href="https://github.com/ddynamix"
                       className="flex bg-green-500 items-center justify-center hover:scale-105 transition py-4 w-full sm:flex-1 space-x-2">
                        <span className="text-black text-sm sm:text-base">GitHub</span>
                        <Image
                            src={'/images/github_icon.png'}
                            alt={"GitHub Logo"}
                            width={25}
                            height={25}
                            className="object-contain invert w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                        />
                    </a>

                    <a href="https://devpost.com/ddynamix?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
                       className="flex bg-cyan-400 items-center justify-center hover:scale-105 transition py-4 w-full sm:flex-1 space-x-2">
                        <span className="text-black text-sm sm:text-base">Devpost</span>
                        <Image
                            src={'/images/devpost_icon.png'}
                            alt={"Devpost Logo"}
                            width={25}
                            height={25}
                            className="object-contain invert w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                        />
                    </a>

                    <a href="https://dorahacks.io/hacker/ddynamix"
                       className="flex bg-orange-400 items-center justify-center hover:scale-105 transition py-4 w-full sm:flex-1 space-x-2">
                        <span className="text-sm sm:text-base">Dorahacks</span>
                        <Image
                            src={'/images/dorahacks_icon.png'}
                            alt={"Dorahacks Logo"}
                            width={25}
                            height={25}
                            className="object-contain w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
