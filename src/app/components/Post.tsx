"use client"

import {SanityDocument} from "@sanity/client";
import {PortableText} from "@portabletext/react";
import {client} from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import {useRouter} from "next/navigation";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function getReadingTime(blocks) {
    if (!blocks || !Array.isArray(blocks)) return "1 minute";

    // Extract all text from block children
    const text = blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) return '';
            return block.children.map(child => child.text).join(' ');
        })
        .join(' ');

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(wordCount / 200));
    return `${mins} minute${mins > 1 ? 's' : ''}`;
}

const Post = ({post}: { post: SanityDocument }) => {
    const convertDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})
    }

    const router = useRouter();

    const handleBack = () => {
        router.push('/#bloglist');
    };

    const category = (post.categories && post.categories[0]?.title) || 'Uncategorized';
    const date = convertDate(post.publishedAt);
    const readingTime = getReadingTime(post.body);

    return (
        <main className="flex flex-col mx-auto px-4 py-16 sm:py-10 text-white mt-10 max-w-4xl">
            {/* Back Arrow */}
            <p className="inline-block mb-4 text-white cursor-pointer hover:underline text-2xl"
               onClick={() => handleBack()}>
                &larr; {/* Left arrow character */}
            </p>

            {/* Headings */}
            <div className="flex flex-col w-full text-center sm:text-left">
                <h1 className="text-3xl font-serif pb-2">
                    {post.title}
                </h1>

                <hr className={" border-gray-300"}/>

                <p className="text-sm text-white font-serif mt-2">
                    {date} | {category} | {readingTime}
                </p>
            </div>

            {/* Body */}
            <div className="flex flex-col lg:max-w-[60%] md:max-w-[75%] sm:max-w-[80%] mx-auto mt-5">
                {post?.mainImage && (
                    <div className="justify-center my-8">
                        <Image
                            src={builder.image(post.mainImage).url()}
                            alt={post?.mainImage?.alt || ""}
                            width={400}
                            height={400}
                            style={{width: '100%'}}
                            className="rounded"
                        />
                    </div>
                )}

                {post?.body && (
                    <div className="prose prose-invert prose-lg">
                        <PortableText
                            value={post.body}
                            components={{
                                block: {
                                    normal: ({children}) => (
                                        <p className="mb-4">{children}</p>
                                    ),
                                },
                                marks: {
                                    italic: ({children}) => (
                                        <em className="italic">{children}</em>
                                    ),
                                    strong: ({children}) => (
                                        <strong className="font-bold">{children}</strong>
                                    ),
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}

export default Post
