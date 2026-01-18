import type { APIRoute } from "astro";
import { generateOgImage } from "../../lib/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "Adrien Brault",
    description:
      "Principal-level engineer who ships products across the stack. Writing about LLMs, TypeScript, and system design.",
    type: "website",
  });

  return new Response(png as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
