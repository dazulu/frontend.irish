import Link from "next/link";
import { createClient } from "contentful";

import type { BlogPostsResult } from "./types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const getBlogEntries = async () => {
  const entries = await client.getEntries<BlogPostsResult>({
    content_type: "pageBlogPost",
  });
  return entries;
};

/* page.tsx */
export default async function Home() {
  const blogEntries = await getBlogEntries();
  return (
    <main className="flex min-h-screen flex-col p-24 gap-y-8">
      {blogEntries.items.map((singlePost) => {
        const { slug, title, publishedDate } = singlePost.fields;
        return (
          <div key={slug}>
            <Link className="group" href={`/articles/${slug}`}>
              <h2 className="font-extrabold text-xl group-hover:text-blue-500 transition-colors">
                {title}
              </h2>
              <span>
                Posted on{" "}
                {new Date(publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}
    </main>
  );
}
