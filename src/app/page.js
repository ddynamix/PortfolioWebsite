import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/apollo";

import Hero from './components/HeroSection';
import Projects from './components/Projects';
import BlogList from './components/BlogList';

export default function Home() {
    return (
        <>
            <Hero />
            <Projects />
            <BlogList />
        </>
    );
}