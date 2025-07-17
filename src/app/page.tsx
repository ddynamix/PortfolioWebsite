import Hero from './components/HeroSection';
import Projects from './components/Projects';
import BlogList from './components/BlogList';
import ContactMe from './components/ContactMe';

import { sanityFetch } from "../sanity/lib/fetch";
import { postsQuery, projectsQuery } from "../sanity/lib/queries";
import { SanityDocument } from "next-sanity";

export default async function Home() {
    const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
    const projects = await sanityFetch<SanityDocument[]>({ query: projectsQuery });

    return (
        <>
            <Hero />
            <Projects projects={projects}/>
            <BlogList posts={posts}/>
            <ContactMe />
        </>
    );
}