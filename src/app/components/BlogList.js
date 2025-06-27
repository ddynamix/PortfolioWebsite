// src/components/BlogList.js
'use client';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

// 1. Fetch exactly the fields we need
const GET_POSTS = gql`
    query GetPosts {
        posts {
            nodes {
                id
                title
                date
                uri
                content
                categories {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`;

// 2. Simple reading-time util
function getReadingTime(html) {
    // strip tags
    const text = html.replace(/<[^>]+>/g, '');
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(wordCount / 200));
    return `${mins} minute${mins > 1 ? 's' : ''}`;
}

export default function BlogList() {
    const { data, loading, error } = useQuery(GET_POSTS);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error loading posts :(</p>;

    return (
        <section id="bloglist" className="bg-slate-950 text-gray-100 px-20 py-20 h-screen">
            {/* Section header */}
            <h2 className="text-4xl md:text-5xl font-serif mb-6 border-b border-gray-700 pb-2">
                Here’s what’s been going on with me.
            </h2>

            <ul className="space-y-10">
                {data.posts.nodes.map((post) => {
                    const category = post.categories.nodes[0]?.name || 'Uncategorized';
                    const date = new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    });
                    const readingTime = getReadingTime(post.content);

                    return (
                        <li
                            key={post.id}
                            className="flex flex-col md:flex-row md:justify-between md:items-start"
                        >
                            {/* Left: title + meta */}
                            <div>
                                <Link href={post.uri}>
                                    <h3
                                        className="text-2xl md:text-3xl font-serif hover:underline"
                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                    />
                                </Link>
                                <p className="mt-1 text-sm text-gray-400">
                                    {date} &nbsp;|&nbsp; {category}
                                </p>
                            </div>

                            {/* Right: reading time */}
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
