import {SanityDocument} from "@sanity/client";
import {postPathsQuery, postQuery} from "../../../sanity/lib/queries";
import {sanityFetch} from "../../../sanity/lib/fetch";
import {client} from "../../../sanity/lib/client";
import Post from "../../components/Post";

export const revalidate = 60;

export async function generateStaticParams() {
    return await client.fetch(postPathsQuery)
}

const PostPage = async ({ params }: { params: any }) => {
    const { slug } = await params; // destructure synchronously before awaits
    const post = await sanityFetch<SanityDocument>({
        query: postQuery,
        params: { slug }
    })
    return (
        <Post post={post} />
    )
}

export default PostPage