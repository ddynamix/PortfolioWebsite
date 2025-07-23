"use client"

import {client} from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import {SanityDocument} from "next-sanity";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import Image from "next/image";
import {useState} from "react";
import {clsx} from "clsx";
import {useRouter} from "next/navigation";
import useSectionObserver from './UseSectionObserver';

const builder = imageUrlBuilder(client);

const Project = ({project}: { project: SanityDocument }) => {

    const ref = useSectionObserver('projects');

    const [currentIndex, setCurrentIndex] = useState(0);

    const router = useRouter();

    const handleBack = () => {
        router.push("/#projects");
    };

    const galleryImages = project.gallery && project.gallery.length > 0
        ? project.gallery.map(image => ({
            url: builder.image(image.url).url(),
            alt: image.alt || project.title
        }))
        : [];

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <section ref={ref}>
            <div className="w-full min-h-screen bg-background text-white px-10 py-20">
                <div className="max-w-7xl mx-auto mt-6">

                    {/* Back Arrow */}
                    <p className="inline-block mb-4 text-white cursor-pointer hover:underline text-2xl"
                       onClick={() => handleBack()}>
                        &larr; {/* Left arrow character */}
                    </p>

                    <div className="flex flex-row items-center justify-between">
                        {/* Project Logo */}
                        {project?.projectLogo ? (
                            <Image
                                src={builder.image(project.projectLogo).url()}
                                alt={project.title}
                                width={250}
                                height={250}
                                className="object-contain"
                            />
                        ) : null}

                        {project?.collaborators ? (
                            <p className="text-lg font-sans text-gray-300">With {project.collaborators}</p>
                        ) : null}
                    </div>

                    <hr className={"mt-2 mb-8 w-[102%] -ml-[1%]"}/>

                    <div className={"flex flex-row space-x-8"}>

                        {/* Text portion */}
                        <div className={"flex flex-col w-3/5"}>
                            {/* Context & external link */}
                            <p className="text-2xl text-gray-300 font-bold">
                                Created during {project.context}
                            </p>

                            <div className="flex space-x-4 items-center font-bold">
                                {/* Hackathon link if applicable */}
                                {project.link && (
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer"
                                          className="text-sm text-gray-400 hover:underline mb-6 inline-block">
                                        devpost ↗
                                    </Link>
                                )}

                                {/* GitHub link */}
                                {project.github && (
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer"
                                          className="text-sm text-gray-400 hover:underline mb-6 inline-block">
                                        github ↗
                                    </Link>
                                )}
                            </div>

                            {/* Award section */}
                            {project.wonAward && (
                                <div className="flex items-center mb-8">
                                    <p className="text-2xl font-bold mr-2">{project.award}</p>
                                    <span className="text-yellow-500 text-2xl">🏆</span>
                                </div>
                            )}

                            {/* Description */}
                            <div className="flex flex-col">
                                {project.description && (
                                    <div className="prose">
                                        <PortableText value={project.description}/>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gallery carousel */}
                        <div className="mt-16 flex flex-col items-center w-2/5">
                            {galleryImages.length > 0 && (
                                <>
                                    {/* Carousel container with fixed size and darker background */}
                                    <div
                                        className="relative w-[400px] h-[400px] bg-black/20 rounded-lg overflow-hidden">
                                        <div
                                            className="flex transition-transform duration-500 ease-in-out"
                                            style={{transform: `translateX(-${currentIndex * 100}%)`}}
                                        >
                                            {galleryImages.map((img, idx) => (
                                                <div key={idx}
                                                     className="w-[400px] h-[400px] flex-shrink-0 flex items-center justify-center">
                                                    <Image
                                                        src={img.url}
                                                        alt={img.alt}
                                                        width={380}
                                                        height={380}
                                                        className="object-contain max-h-[380px] max-w-[380px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Carousel navigation arrows */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 px-2 py-1 rounded-full text-white hover:cursor-pointer hover:bg-black/70"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 px-2 py-1 rounded-full text-white hover:cursor-pointer hover:bg-black/70"
                                        >
                                            ›
                                        </button>
                                    </div>

                                    {/* Dots indicator */}
                                    <div className="flex justify-center mt-4 space-x-2">
                                        {galleryImages.map((_, idx) => (
                                            <span
                                                key={idx}
                                                onClick={() => setCurrentIndex(idx)}
                                                className={clsx(
                                                    "h-2 w-2 rounded-full cursor-pointer",
                                                    idx === currentIndex ? "bg-cyan-400" : "bg-gray-500"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Project;
