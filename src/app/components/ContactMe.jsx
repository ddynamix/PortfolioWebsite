'use client';

import React from "react";
import useSectionObserver from './UseSectionObserver';

const ContactPage = () => {
    const ref = useSectionObserver('contact');

    return (
        <section ref={ref} id={"contact"}>
            <div className="bg-gray-950 text-white min-h-screen flex flex-col justify-between">
                <div className="mx-auto px-4 pt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div>
                        <p className="text-xl font-bold mb-4">I’m open to chat!.</p>
                        <div className="space-y-4">
                            <a href="mailto:tfsteptoe@gmail.com" className="underline text-lg">
                                tfsteptoe@gmail.com
                            </a>
                            <p className="text-lg">647-804-0076</p>
                            <a href="/TylerSteptoe_SoftwareResumeMarch2025.pdf" className="underline text-lg">
                                résumé
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <form className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm lowercase">
                                your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-black border-2 border-gray-400 px-4 py-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="text-sm lowercase">
                                subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full bg-black border-2 border-gray-400 px-4 py-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="text-sm lowercase">
                                message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full bg-black border-2 border-gray-400 px-4 py-2"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-cyan-400 text-black font-semibold py-2 px-4 mt-2 flex items-center justify-center hover:bg-cyan-500"
                        >
                            send
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
                <div className="bg-black py-4">
                    <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                        <a href="https://linkedin.com" className="bg-blue-700 py-2">
                            linkedin
                        </a>
                        <a href="https://github.com" className="bg-lime-400 py-2 text-black">
                            github
                        </a>
                        <a href="https://devpost.com" className="bg-cyan-400 py-2 text-black">
                            devpost
                        </a>
                        <a href="https://instagram.com" className="bg-pink-600 py-2">
                            instagram
                        </a>
                        <a href="https://dorahacks.io" className="bg-orange-400 py-2">
                            dorahacks
                        </a>
                    </div>
                    <p className="text-center text-sm mt-4">
                        Website created with NextJS.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
