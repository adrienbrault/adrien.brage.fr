import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export interface OgImageOptions {
  title: string;
  description?: string;
  type?: "website" | "article";
  date?: string;
  tags?: string[];
}

// Font data cache
let interRegular: ArrayBuffer | null = null;
let interBold: ArrayBuffer | null = null;

async function loadFonts() {
  if (interRegular && interBold) return;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fontsDir = join(__dirname, "../../public/fonts");

  // Load local fonts
  const [regular, bold] = await Promise.all([
    readFile(join(fontsDir, "Inter-Regular.woff")),
    readFile(join(fontsDir, "Inter-Bold.woff")),
  ]);

  interRegular = regular.buffer.slice(
    regular.byteOffset,
    regular.byteOffset + regular.byteLength
  );
  interBold = bold.buffer.slice(
    bold.byteOffset,
    bold.byteOffset + bold.byteLength
  );
}

export async function generateOgImage(
  options: OgImageOptions
): Promise<Uint8Array> {
  await loadFonts();

  const { title, description, type = "website", date, tags = [] } = options;

  // Design the OG image using satori's object syntax
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element: any = {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "60px",
        },
        children: [
          // Header with name
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "20px",
                      fontWeight: 700,
                    },
                    children: "AB",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      color: "#a3a3a3",
                      fontSize: "24px",
                    },
                    children: "adrien.brage.fr",
                  },
                },
              ],
            },
          },
          // Main content
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
              children: [
                // Title
                {
                  type: "div",
                  props: {
                    style: {
                      color: "#f5f5f5",
                      fontSize: title.length > 40 ? "48px" : "56px",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      maxWidth: "900px",
                    },
                    children: title,
                  },
                },
                // Description (if provided)
                ...(description
                  ? [
                      {
                        type: "div",
                        props: {
                          style: {
                            color: "#a3a3a3",
                            fontSize: "28px",
                            lineHeight: 1.4,
                            maxWidth: "800px",
                          },
                          children:
                            description.length > 120
                              ? description.slice(0, 117) + "..."
                              : description,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Footer with meta info
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "24px",
              },
              children: [
                // Date if article
                ...(type === "article" && date
                  ? [
                      {
                        type: "span",
                        props: {
                          style: {
                            color: "#a3a3a3",
                            fontSize: "20px",
                          },
                          children: date,
                        },
                      },
                    ]
                  : []),
                // Tags
                ...(tags.length > 0
                  ? [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            gap: "8px",
                          },
                          children: tags.slice(0, 3).map((tag) => ({
                            type: "span",
                            props: {
                              style: {
                                backgroundColor: "#262626",
                                color: "#a3a3a3",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                fontSize: "18px",
                              },
                              children: tag,
                            },
                          })),
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
        ],
      },
    };

  const svg = await satori(element, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interRegular!,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold!,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  // Convert SVG to PNG
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
