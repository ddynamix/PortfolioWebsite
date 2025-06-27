'use client';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';

const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            nodes {
                id
                projecttitle
                projectsummary
                award
                splashpicture {
                    node {
                        sourceUrl
                        altText
                    }
                }
                wonaward
                projectlogo {
                    node {
                        sourceUrl
                        altText
                    }
                }
                longdesc
                projectcontext
                projectlink
                projectgithub
                projectgallery {
                    nodes {
                        sourceUrl
                        altText
                    }
                }
                createdwith
            }
        }
    }
`;

export default function Projects() {
    const { data, loading, error } = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error loading projects :(</p>;

    return (
        <section id="projects" className="py-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-serif text-center mb-12">
                    My Projects
                </h2>
                <div className="space-y-6">
                    {data.projects.nodes.map(proj => (
                        <div
                            key={proj.id}
                            className="border-12 border-gray-300 rounded-xl overflow-hidden group hover:shadow-lg transition"
                            style={{backgroundImage: `url(${proj.splashpicture.node.sourceUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <div className="m-6 rounded-xl">
                                <div className="flex items-center justify-between">
                                    {proj.projectlogo.node.sourceUrl && (
                                        <Image
                                            src={proj.projectlogo.node.sourceUrl}
                                            alt={proj.projectlogo.node.altText || proj.projecttitle}
                                            width={250}
                                            height={250}
                                            className="object-contain"
                                        />
                                    )}
                                    {proj.wonaward && (
                                        <span className="text-yellow-500 text-2xl">🏆</span>
                                    )}
                                </div>

                                {/* Hidden summary on hover */}
                                <div className="max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                                    <p className="text-gray-700"><br />{proj.projectsummary}</p>
                                    <div className="mt-4 flex space-x-4">
                                        {proj.projectlink && (
                                            <a href={proj.projectlink} className="text-blue-600 hover:underline">
                                                Live Site →
                                            </a>
                                        )}
                                        {proj.projectgithub && (
                                            <a href={proj.projectgithub} className="text-blue-600 hover:underline">
                                                View Code →
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