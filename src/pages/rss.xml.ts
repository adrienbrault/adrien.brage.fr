import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );

  return rss({
    title: "Adrien Brault's Blog",
    description:
      "Technical writing on LLMs, Python, TypeScript, React, system design, home automation, and more.",
    site: context.site?.toString() ?? "https://adrien.brage.fr",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
