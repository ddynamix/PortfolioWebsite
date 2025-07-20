import {SanityDocument} from "@sanity/client";
import {projectPathsQuery, projectQuery} from "../../../sanity/lib/queries";
import {sanityFetch} from "../../../sanity/lib/fetch";
import {client} from "../../../sanity/lib/client";
import Project from "../../components/Project";

export const revalidate = 60;

export async function generateStaticParams() {
    return await client.fetch(projectPathsQuery)
}

const ProjectPage = async ({ params }: { params: any }) => {
    const { slug } = await params; // destructure synchronously before awaits
    const project = await sanityFetch<SanityDocument>({
        query: projectQuery,
        params: { slug }
    });
    return (
        <Project project={project} />
    )
}

export default ProjectPage