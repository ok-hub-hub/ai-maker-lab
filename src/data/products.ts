export type Product = {
  id: string;
  title: string;
  tagline: string;
  price: string;
  promoNote?: string;
  status: "live" | "coming-soon";
  url?: string;
  highlights: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "ai-company-ops-template",
    title: "AI Company Ops Template",
    tagline: "Claude Code で動く 4 部門 AI会社 のテンプレ集 + 1ヶ月実運営ログ",
    price: "$39",
    promoNote: "プロモ価格（リリース後30日間）→ 通常 $49",
    status: "live",
    url: "https://okamuse.gumroad.com/l/ai-company-ops-template",
    highlights: [
      "役割定義書 5本（CEO / QA / 事業開発 / 技術検証 / 採用部）",
      "運用ファイルテンプレ 7本",
      "1ヶ月実運営ログ：相談ログ抜粋6件 / 失敗パターン4件 / 経営判断ログ4件",
      "ハンドブック 全8章",
      "リリース後6ヶ月間、月次アップデート無料配信",
    ],
  },
  {
    id: "vibe-coding-prompt-pack",
    title: "Vibe Coding プロンプトパック v1",
    tagline: "v0 / Lovable / Bolt / Cursor / Claude Code 用のプロンプト集（50本+ケーススタディ3件）",
    price: "$19（プレオーダー登録者）→ $29 通常",
    promoNote: "2026-06-01 リリース予定 / プレオーダー登録で20%オフ",
    status: "coming-soon",
    highlights: [
      "個人開発者向け 50 プロンプト（5ツール × 各10本）",
      "日本語ネイティブ向けに最適化",
      "実例ケーススタディ3件（SaaSランディング1日構築 / MVP10時間構築 / リファクタ3時間）",
      "失敗パターンと回避策を全プロンプトに記載",
      "月次アップデート（6ヶ月、新ツール対応）",
    ],
  },
];
