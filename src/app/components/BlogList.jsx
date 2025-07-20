'use client';

import Image from "next/image";
import Link from "next/link";
import useSectionObserver from './UseSectionObserver';

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


const BlogList = ({posts = []}) => {
    const ref = useSectionObserver('bloglist');

    const convertDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})
    }

    return (
        <section ref={ref} id="bloglist" className="bg-background text-gray-100 px-6 md:px-20 py-20 min-h-screen">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 border-b border-gray-700 pb-2">
                Here’s what’s been going on with me.
            </h2>

            <ul className="space-y-10">
                {posts.map((post) => {
                    const category = (post.categories && post.categories[0]?.title) || 'Uncategorized';
                    const date = convertDate(post.publishedAt);
                    const readingTime = getReadingTime(post.body);

                    return (
                        <li
                            key={post._id}
                            className="flex flex-col md:flex-row md:justify-between md:items-start"
                        >
                            <div>
                                <Link href={`/posts/${post.slug.current}`}>
                                    <h3 className="text-2xl md:text-3xl font-serif hover:underline">
                                        {post.title}
                                    </h3>
                                </Link>
                                <p className="mt-1 text-sm text-gray-400">
                                    {date} &nbsp;|&nbsp; {category}
                                </p>
                            </div>

                            <span className="mt-2 md:mt-0 text-sm text-gray-400">
                                {readingTime}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default BlogList;
