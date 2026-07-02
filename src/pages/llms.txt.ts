import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import getSortedPosts from "@/utils/getSortedPosts";
import { getPath } from "@/utils/getPath";
import { SITE } from "@/config";

// AI検索（ChatGPT / Perplexity / Claude 等）のクローラ向けサイト案内。
// 記事一覧から自動生成されるためメンテ不要。
export const GET: APIRoute = async ({ site }) => {
  const posts = getSortedPosts(await getCollection("blog"));
  const base = site ?? new URL(SITE.website);

  const lines = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.desc}`,
    "",
    "AI Maker Lab は、Claude Code で「AI会社」を運営する個人開発者が、AIライティングツール（Catchy / Transcope）・Vibe Coding（v0 / Lovable / Bolt / Cursor / Claude Code）・ホスティング・AI副業を実体験と公式データで比較・検証する日本語メディアです。料金は公式サイトに実接続して取得日付きで記載しています。",
    "",
    "## 主要ページ",
    `- [AI診断（5問であなたに合うツールを提示）](${new URL("/diagnose/", base).href})`,
    `- [AIツール辞書](${new URL("/tools/", base).href})`,
    `- [運営者情報](${new URL("/about/", base).href})`,
    "",
    "## 記事一覧",
    ...posts.map(
      p =>
        `- [${p.data.title}](${new URL(getPath(p.id, p.filePath), base).href}): ${p.data.description}`
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
