import { groq } from "next-sanity";

// Get all posts
export const postsQuery = groq`*[_type == "post"] {
      _createdAt,
      title,
      slug,
      mainImage,
      publishedAt,
      categories[]->{
        title
      },
      "imageURL": mainImage.asset->url,
      "authorName": author->name,
  }`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
      title, description, mainImage, body
  }`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

// Get all projects
export const projectsQuery = groq`*[_type == "project"] {
      _id,
      title,
      slug,
      summary,
      award,
      wonAward,
      description,
      context,
      link,
      github,
      collaborators,
      splashImage,
      projectLogo,
      projectgallery[],
      "imageURL": splashImage.asset->url
  }`;