/**
 * 自社商品の唯一の正。/shop と トップページの ShopStrip・/diagnose の商品枠が
 * ここを参照する（価格の二重管理をしない）。価格改定はこのファイルだけ直す。
 */
export type Product = {
  id: string;
  title: string;
  tagline: string;
  /** 表示価格（通貨記号込みの実売価格） */
  price: string;
  promoNote?: string;
  status: "live" | "coming-soon";
  url?: string;
  /** 販売プラットフォーム表示名 */
  platform: "ココナラ" | "Gumroad";
  highlights: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "ai-company-complete-kit-jp",
    title: "AI会社 完全キット（日本語・円決済）",
    tagline:
      "実運営ガイド10章＋そのまま使える運用テンプレート8点＋再発防止チェックリスト（PDF・8万字超）",
    price: "¥6,500",
    promoNote:
      "リリース価格。レビュー掲載後に段階的に値上げ予定（ココナラで販売・円決済/国内プラットフォーム）",
    status: "live",
    url: "https://coconala.com/contents_market/pictures/cmrg0cn5t03pj8i0hqae820bf",
    platform: "ココナラ",
    highlights: [
      "ガイド本編 全10章（約32,000字）：全体設計〜実際に起きた4つの事故と回復の記録",
      "実運用テンプレート8点（約48,000字）：CEO役割定義書・QA体制・判断キュー・運用アラート・自動ジョブ設計ほか",
      "ボーナス：再発防止チェックリスト（事故4件の蒸留）",
      "完全非同期・買い切り（ココナラのコンテンツマーケットで購入）",
    ],
  },
  {
    id: "ai-company-ops-template",
    title: "AI Company Ops Template",
    tagline: "Claude Code で動く 4 部門 AI会社 のテンプレ集 + 1ヶ月実運営ログ",
    price: "$39",
    promoNote: "プロモ価格（リリース後30日間）→ 通常 $49",
    status: "live",
    url: "https://okamuse.gumroad.com/l/ai-company-ops-template",
    platform: "Gumroad",
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
    tagline:
      "v0 / Lovable / Bolt / Cursor / Claude Code 用のプロンプト集（50本+ケーススタディ3件）",
    price: "$19（ローンチ価格）",
    promoNote:
      "2026-07-06 リリース。ローンチ価格は予告なく通常価格（$29）に変わります",
    status: "live",
    url: "https://okamuse.gumroad.com/l/skdrjq",
    platform: "Gumroad",
    highlights: [
      "個人開発者向け 50 プロンプト（5ツール × 各10本）",
      "日本語ネイティブ向けに最適化",
      "実例ケーススタディ3件（SaaSランディング1日構築 / MVP10時間構築 / リファクタ3時間）",
      "失敗パターンと回避策を全プロンプトに記載",
      "30日間返金保証（Gumroad標準）",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}
