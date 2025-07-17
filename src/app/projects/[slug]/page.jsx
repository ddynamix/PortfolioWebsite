// src/app/projects/[slug]/page.jsx

import { client } from "../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export async function generateStaticParams() {
    const query = `*[_type == "project"]{ slug }`;
    const projects = await client.fetch(query);
    return projects.map(proj => ({
        slug: proj.slug.current,
    }));
}

export default async function ProjectPage({ params }) {
    const { slug } = params;

    const query = `*[_type == "project" && slug.current == $slug][0]`;
    const project = await client.fetch(query, { slug });

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-4">{project.title}</h1>
            <img
                src={builder.image(project.splashImage).url()}
                alt={project.title}
                className="max-w-full max-h-96"
            />
            <p className="max-w-xl text-center mt-4">{project.summary}</p>
        </div>
    );
}
