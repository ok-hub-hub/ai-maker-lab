import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";
import fs from "node:fs";
import path from "node:path";

// sitemap の lastmod 用に、ビルド時にブログ frontmatter から slug→更新日 を作る
const BLOG_DIR = path.resolve("./src/data/blog");
const lastmodBySlug: Record<string, string> = {};
for (const f of fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"))) {
  const src = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
  const slug = src.match(/^slug:\s*(\S+)/m)?.[1];
  const mod = src.match(/^modDatetime:\s*(\S+)/m)?.[1];
  const pub = src.match(/^pubDatetime:\s*(\S+)/m)?.[1];
  const d = mod ?? pub;
  if (slug && d) lastmodBySlug[slug] = d;
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => {
        // /go/[id] はアフィリリダイレクト用、noindex+nofollow なのでサイトマップ除外
        if (page.includes("/go/")) return false;
        // archives は SITE.showArchives で制御
        if (!SITE.showArchives && page.endsWith("/archives")) return false;
        return true;
      },
      serialize(item) {
        const m = item.url.match(/\/posts\/([a-z0-9-]+)\/?$/);
        const d = m ? lastmodBySlug[m[1]] : undefined;
        if (d) item.lastmod = new Date(d).toISOString();
        return item;
      },
    }),
    mdx(),
    react(),
  ],
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "目次|table of contents" }],
      [remarkCollapse, { test: /目次|table of contents/i }],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Inter",
        cssVariable: "--font-inter",
        provider: fontProviders.google(),
        fallbacks: ["sans-serif"],
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
      },
      {
        name: "Noto Sans JP",
        cssVariable: "--font-noto-sans-jp",
        provider: fontProviders.google(),
        fallbacks: ["sans-serif"],
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["japanese"],
      },
      {
        name: "Noto Serif JP",
        cssVariable: "--font-noto-serif-jp",
        provider: fontProviders.google(),
        fallbacks: ["serif"],
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["japanese"],
      },
      {
        name: "Google Sans Code",
        cssVariable: "--font-google-sans-code",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [400, 500],
        styles: ["normal"],
      },
    ],
  },
});
