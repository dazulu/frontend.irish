import { createClient } from "contentful";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import type { BlogPostsResult, BlogPostPageProps } from "@/app/types";
import { SyntaxHighlighter } from "@/app/syntax";
import { MARKS } from "@contentful/rich-text-types";

import { Fjalla_One } from "next/font/google";

const fjallaOne = Fjalla_One({ subsets: ["latin"], weight: "400" });

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  host:
    process.env.NODE_ENV === "development"
      ? "preview.contentful.com"
      : undefined,
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

  const options: Options = {
    renderNode: {
      "embedded-entry-block": (node) => {
        const contentType = node.data.target.sys.contentType.sys.id;
        if (contentType === "codeBlock") {
          return <SyntaxHighlighter code={node.data.target.fields.snippet} />;
        }
        // handle other content types...
      },
      blockquote: (node, children) => {
        return (
          <div className="my-[2rem] rounded-lg px-4 py-2 bg-purple-200 text-purple-950">
            {children}
          </div>
        );
      },
      "heading-2": (node, children) => {
        return (
          <h2
            className={`text-xl text-bold mb-[0.5rem] ${fjallaOne.className}`}
          >
            {children}
          </h2>
        );
      },
    },
    renderMark: {
      [MARKS.CODE]: (text) => (
        <code className="text-purple-900 bg-purple-100 rounded-sm px-1">
          {text}
        </code>
      ),
    },
  };

  const { title, publishedDate, content } = article.fields;
  console.log(content);
  return (
    <main className="min-h-screen p-24 flex justify-center">
      <div className="max-w-2xl">
        <h1 className={`font-extrabold text-4xl mb-2 ${fjallaOne.className}`}>
          {title}
        </h1>
        <p className="mb-6 text-slate-400 ">
          Posted on{" "}
          {new Date(publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="[&>p]:mb-[2rem]">
          {documentToReactComponents(content, options)}
        </div>
      </div>
    </main>
  );
}
