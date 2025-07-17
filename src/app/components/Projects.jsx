'use client';

import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../sanity/lib/client";
import { useRouter } from "next/navigation";

const builder = imageUrlBuilder(client);

const Projects = ({projects = []}) => {
    const router = useRouter();

    const convertDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})
    }

    return (
        <section id="projects" className="py-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-serif text-center mb-12">My Projects</h2>

                <div className="space-y-6">
                    {projects.map((proj) => (
                        <div
                            key={proj._id}
                            className="relative border-12 border-gray-300 rounded-xl overflow-hidden group hover:shadow-lg transition cursor-pointer"
                            onClick={() => router.push(`/projects/${proj.slug.current}`)}
                            style={{
                                backgroundImage: `url(${builder.image(proj.splashImage).url()})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPositionY: "55%",
                            }}
                        >
                            <div className="absolute inset-0 backdrop-blur-none group-hover:backdrop-blur-sm transition duration-300"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            {/* Content */}
                            <div className="relative z-10 m-6 rounded-xl">
                                <div className="flex items-center justify-between">
                                    {proj?.projectLogo ? (
                                        <Image
                                            src={builder.image(proj.projectLogo).url()}
                                            alt={proj.title}
                                            width={250}
                                            height={250}
                                            className="object-contain"
                                        />
                                    ) : null }

                                    {proj?.wonAward ? (
                                        <div className="flex items-center justify-end">
                                            <p className="text-white font-bold text-xl">{proj.award}</p>
                                            <span className="text-yellow-500 text-2xl ml-4">🏆</span>
                                        </div>
                                    ) : null }
                                </div>

                                {/* Hidden summary on hover */}
                                <div className="max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                                    <div className="w-1/2 flex-auto ml-2">
                                        <p className="text-white font-bold text-xl">
                                            <br />
                                            {proj.summary}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex space-x-4 ml-2">
                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                className="text-blue-300 hover:underline"
                                            >
                                                Project Site →
                                            </a>
                                        )}
                                        {proj.github && (
                                            <a
                                                href={proj.github}
                                                className="text-blue-300 hover:underline"
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
            </div>
        </section>
    );
}

export default Projects;
