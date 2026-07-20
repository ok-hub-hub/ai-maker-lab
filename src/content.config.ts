import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      // スマホ追従CTA等の主要導線を明示指定（省略時は本文最初の /go/ を自動検出）
      primaryGo: z.string().optional(),
      // 記事末尾に挿すアフィリCTA（AffiliateCta を PostDetails が描画）。
      // id は tools.ts の id。experienced=true のときだけ実運用メモ(note)を表示。
      affiliateCta: z
        .array(
          z.object({
            id: z.string(),
            lead: z.string().optional(),
            note: z.string().optional(),
            experienced: z.boolean().optional(),
          })
        )
        .optional(),
      // レビュー記事の構造化データ（Article+Review）。編集部が実運用したツールのみ設定し、
      // rating はページ内にも可視表示される（JSON-LDだけに載せない）。
      review: z
        .object({
          itemName: z.string(),
          rating: z.number().min(1).max(5),
        })
        .optional(),
    }),
});

export const collections = { blog };
