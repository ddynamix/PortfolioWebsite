'use client';

import React from "react";
import useSectionObserver from './UseSectionObserver';
import Image from "next/image";

const ContactPage = () => {
    const ref = useSectionObserver('contact');

    return (
        <section ref={ref} id={"contact"}>
            <div className="bg-background text-white min-h-screen flex flex-col justify-between">
                <div className="mx-auto px-2 pt-32 grid grid-cols-2 gap-8 max-w-4/5">

                    {/* Left Side */}
                    <div className={"flex flex-col text-left mr-10 space-y-10 mt-20"}>
                        <p className="text-3xl font-bold font-serif">I’m open to chat!</p>
                        <p className="text-xl">
                            If you're interested in any of my projects, have any questions about me, or want to reach
                            out for any other reason, please feel free to leave a message! I'll respond within a day :)
                        </p>
                        <div className="flex space-x-9 mt-20 text-gray-400">
                            <p className="text-xl">647-804-0076</p>
                            <p>
                                <a href="mailto:tfsteptoe@gmail.com" className="underline text-xl">
                                    tfsteptoe@gmail.com
                                </a>
                            </p>
                            <p>
                                <a href="/TylerSteptoe_SoftwareResumeMarch2025.pdf" className="underline text-xl">
                                    résumé
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <form
                        action="https://formspree.io/f/mnnzjgvq"
                        method="POST"
                        className="flex flex-col space-y-3"
                    >
                        <div>
                            <label htmlFor="email" className="text-sm">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full bg-black border-2 border-gray-400 px-4 py-2 rounded-xl mt-1"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="text-sm">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="w-full bg-black border-2 border-gray-400 px-4 py-2 rounded-xl mt-1"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="text-sm">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="10"
                                required
                                className="w-full bg-black border-2 border-gray-400 px-4 py-2 rounded-xl mt-1"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-cyan-400 text-black font-semibold py-2 px-4 mt-2 flex items-center justify-center hover:bg-cyan-500 hover:cursor-pointer rounded-xl mt-1"
                        >
                            Send
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M2.01 21l20.99-9L2.01 3v7l15 2-15 2z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="bg-black">
                    <div className="w-screen grid grid-cols-5 text-center">

                        <a href="https://www.linkedin.com/in/tyler-steptoe"
                           className="flex bg-blue-700 py-4 items-center justify-center space-x-2 hover:scale-105 transition">
                            <span>linkedin</span>
                            <Image
                                src={'/images/linkedin_icon.png'}
                                alt={"LinkedIn Logo"}
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                        </a>

                        <a href="https://github.com/ddynamix"
                           className="flex bg-green-500 py-4 items-center justify-center space-x-2 hover:scale-105 transition">
                            <span className="text-black">github</span>
                            <Image
                                src={'/images/github_icon.png'}
                                alt={"GitHub Logo"}
                                width={30}
                                height={30}
                                className="object-contain invert"
                            />
                        </a>

                        <a href="https://devpost.com/ddynamix?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
                           className="flex bg-cyan-400 py-4 items-center justify-center space-x-2 hover:scale-105 transition">
                            <span className="text-black">devpost</span>
                            <Image
                                src={'/images/devpost_icon.png'}
                                alt={"Devpost Logo"}
                                width={30}
                                height={30}
                                className="object-contain invert"
                            />
                        </a>

                        <a href="https://www.instagram.com/tylerfs.g37/?hl=en"
                           className="flex bg-pink-600 py-4 items-center justify-center space-x-2 hover:scale-105 transition">
                            <span>instagram</span>
                            <Image
                                src={'/images/instagram_icon.png'}
                                alt={"Instagram Logo"}
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                        </a>

                        <a href="https://dorahacks.io/hacker/ddynamix"
                           className="flex bg-orange-400 py-4 items-center justify-center space-x-2 hover:scale-105 transition">
                            <span>dorahacks</span>
                            <Image
                                src={'/images/dorahacks_icon.png'}
                                alt={"Dorahacks Logo"}
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
