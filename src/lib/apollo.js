import { ApolloClient, InMemoryCache } from "@apollo/client";

// console.log("WP URL:", process.env.NEXT_PUBLIC_WORDPRESS_API_URL);
export const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
    cache: new InMemoryCache(),
});