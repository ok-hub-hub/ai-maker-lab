import type { ToolMeta } from "../data/tools";

/**
 * ツール価格の表示フォーマッタ。
 *
 * なぜ必要か（2026-08-31 / Q-108）：
 * `ToolMeta.priceMin` は診断の予算フィルタ（$20 / $50 / $100）で使うため **USD に正規化した値**で、
 * 円建て商品の実売価格とは一致しない。にもかかわらず表示側3箇所が `$${priceMin}` と
 * ドル記号をハードコードしていたため、国内サービスがすべてドル表記かつドル換算の数字で出ていた。
 *   例）ConoHa WING「$9/月〜」（実際は¥660/月〜）／お名前.com「$1/月〜」（実際は初年度¥1・年額）
 *       Xserverビジネス「$30/月〜」（実際は¥3,762/月〜）／AIブログくん「$33/月〜」（実際は¥8,200/月〜）
 * 円をドル換算した数字は実際より小さく見えるため、景表法の有利誤認にあたる。
 *
 * 実売価格は `tool.priceDisplay` を正とし、無い場合だけ `priceMin` を USD として表示する。
 */

type Resolved = {
  amount: number;
  currency: "JPY" | "USD";
  unit: "月" | "年";
  condition?: string;
};

function money(amount: number, currency: "JPY" | "USD"): string {
  return currency === "JPY"
    ? `¥${amount.toLocaleString("ja-JP")}`
    : `$${amount.toLocaleString("en-US")}`;
}

function resolve(tool: ToolMeta): Resolved {
  const d = tool.priceDisplay;
  return {
    amount: d ? d.amount : tool.priceMin,
    currency: d?.currency ?? "USD",
    unit: d?.unit ?? "月",
    condition: d?.condition,
  };
}

/** 一覧の狭い枠用。例:「¥660」「$20」「Free」 */
export function priceCompact(tool: ToolMeta): string {
  const p = resolve(tool);
  return p.amount === 0 ? "Free" : money(p.amount, p.currency);
}

/** 診断カード用。例:「¥660〜」「$20〜」「Free〜」 */
export function priceShort(tool: ToolMeta): string {
  const p = resolve(tool);
  return p.amount === 0 ? "Free〜" : `${money(p.amount, p.currency)}〜`;
}

/** 単位ラベル。ドメインのような年額課金を「月額」と出さないため */
export function priceUnitLabel(tool: ToolMeta): string {
  return resolve(tool).unit === "年" ? "年額" : "月額";
}

/** 詳細ページ用。例:「¥660/月〜（36ヶ月契約時）」「無料あり（有料は ¥8,200/月〜）」 */
export function priceLabelFull(tool: ToolMeta): string {
  const p = resolve(tool);
  if (p.amount === 0) {
    return tool.priceFree ? "無料あり（無料プランで利用可）" : "無料";
  }
  const amount = `${money(p.amount, p.currency)}/${p.unit}〜`;
  const cond = p.condition ? p.condition : "";
  // 括弧の入れ子を避ける：無料プランがある場合は条件を「・」で continue させる
  if (tool.priceFree) {
    return `無料あり（有料は ${amount}${cond ? `・${cond}` : ""}）`;
  }
  return `${amount}${cond ? `（${cond}）` : ""}`;
}
