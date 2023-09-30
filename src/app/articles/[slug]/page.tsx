import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { BlogPostsResult, BlogPostPageProps } from "@/app/types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "pageBlogPost",
    select: "fields.slug",
  };
  const articles = await client.getEntries(queryOptions);
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}

const fetchBlogPost = async (slug: string) => {
  const queryOptions = {
    content_type: "pageBlogPost" as "pageBlogPost",
    "fields.slug[match]": slug,
  };
  const queryResult = await client.getEntries<BlogPostsResult>(queryOptions);
  return queryResult.items[0];
};

export default async function BlogPage(props: BlogPostPageProps) {
  const { params } = props;
  const { slug } = params;
  const article = await fetchBlogPost(slug);

  const { title, publishedDate, content } = article.fields;
  return (
    <main className="min-h-screen p-24 flex justify-center">
      <div className="max-w-2xl">
        <h1 className="font-extrabold text-3xl mb-2">{title}</h1>
        <p className="mb-6 text-slate-400 ">
          Posted on{" "}
          {new Date(publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="[&>p]:mb-8 [&>h2]:font-extrabold">
          {documentToReactComponents(content)}
        </div>
      </div>
    </main>
  );
}
