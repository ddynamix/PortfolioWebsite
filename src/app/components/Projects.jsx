'use client';

import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import {SanityDocument} from "@sanity/client";
import {PortableText} from "@portabletext/react";
import {client} from "../../sanity/lib/client";
import {useRouter} from "next/navigation";
import ScrollFloat from './ReactBits/ScrollFloat';
import React, { memo, useCallback, useMemo } from 'react';
import ShinyText from "./ReactBits/ShinyText";

const builder = imageUrlBuilder(client);

const Projects = ({projects = []}) => {
    const router = useRouter();

    return (
        <section id="projects" className="py-6 bg-background min-h-screen">
            <div className="container mx-auto px-6">
                <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='center bottom+=50%'
                    scrollEnd='bottom bottom-=40%'
                    stagger={0.03}
                    containerClassName={"w-full text-center"}
                    textClassName={"text-2xl sm:text-3xl font-serif text-center mb-8 sm:mb-12 mt-3"}
                >
                    My Projects
                </ScrollFloat>

                <div className="space-y-4 sm:space-y-6">
                    {projects.map((proj, index) => (
                        <div
                            key={proj._id}
                            className="relative rounded-xl overflow-hidden group hover:shadow-lg hover:scale-[102%] transition cursor-pointer"
                            onClick={() => router.push(`/projects/${proj.slug.current}`)}
                        >
                            {/* Background Image using Next.js Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={builder.image(proj.splashImage).url()}
                                    alt={proj.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    className="object-cover"
                                    style={{
                                        objectPosition: '50% 55%'
                                    }}
                                    priority={index === 0} // Only prioritize the first image
                                    loading={index <= 1 ? "eager" : "lazy"} // Eager load first two, lazy load the rest
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    placeholder="empty"
                                    quality={index < 2 ? 85 : 75} // Higher quality for visible images
                                />
                            </div>

                            {/* Glass overlay - optimized for performance */}
                            <div className="absolute inset-0 bg-white/30 group-hover:bg-white/20 group-hover:backdrop-blur-md transition duration-300 rounded-xl glassCardBorder"></div>
                            
                            {/* Content */}
                            <div className="relative z-10 m-4 sm:m-6 rounded-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                                    <div className="h-16 sm:h-20 w-full sm:w-60 flex items-center justify-center sm:justify-start">
                                        {proj?.projectLogo ? (
                                            <Image
                                                src={builder.image(proj.projectLogo).url()}
                                                alt={proj.title}
                                                width={250}
                                                height={250}
                                                className="object-contain max-h-[60px] sm:max-h-[80px] imageShadow"
                                            />
                                        ) : null}
                                    </div>

                                    {proj?.wonAward ? (
                                        <div className="flex items-center justify-center sm:justify-end">
                                            <p className="text-white font-bold text-lg sm:text-xl textDropShadow text-center">{proj.award}</p>
                                            <span className="text-yellow-500 text-xl sm:text-2xl ml-2 sm:ml-4">🏆</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center sm:justify-end">
                                            <p className="text-white font-bold text-lg sm:text-xl textDropShadow">{proj.status}</p>
                                            {proj.status === "Archived" && (
                                                <span className="text-gray-400 text-xl sm:text-2xl ml-2 sm:ml-4">🗃️</span>
                                            )}
                                            {proj.status === "In Development" && (
                                                <span className="text-blue-400 text-xl sm:text-2xl ml-2 sm:ml-4">🟢</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Hidden summary on hover */}
                                <div className="max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-300 overflow-hidden">                                    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex-auto ml-0 sm:ml-2 mt-2 sm:mt-0">
                                        <p className="text-white font-bold text-base sm:text-lg md:text-xl textDropShadow">
                                            <br/>
                                            {proj.summary}
                                        </p>
                                    </div>
                                    <div className="mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 ml-0 sm:ml-2">
                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                className="text-blue-400 hover:underline textDropShadow w-full sm:w-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Project Site →
                                            </a>
                                        )}
                                        {proj.github && (
                                            <a
                                                href={proj.github}
                                                className="text-blue-400 hover:underline textDropShadow w-full sm:w-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                GitHub →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <ShinyText text="more to come..." disabled={false} speed={2} className={"text-center text-gray-500 text-xl sm:text-2xl font-light mt-10"}/>
                </div>
            </div>
        </section>
    );
}

export default Projects;