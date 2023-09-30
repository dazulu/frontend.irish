import { Document, Link } from "@contentful/rich-text-types";

export type BlogPost = {
  title: string;
  subtitle: string;
  slug: string;
  publishedDate: Date;
  content: Document;
  seoFields: Link;
  author: Link;
  featuredImage: Link;
  relatedBlogPosts: Link[];
};

export type BlogPostsResult = {
  contentTypeId: "pageBlogPost";
  fields: BlogPost;
};

export type BlogPostPageProps = {
  params: {
    slug: string;
  };
};
