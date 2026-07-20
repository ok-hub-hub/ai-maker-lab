# LP コンポーネント統合ガイド（編集部ジャーナル v2）

## 設計方針
- 紙色 `#F7F5F0` × 墨 `#1B1A17` × 朱 `#D9422A` 1色（`src/styles/aml-tokens.css` が唯一の正）
- 見出し = Noto Serif JP 900（`font-serif font-black`）／本文 = Noto Sans JP／数字 = IBM Plex Mono（`font-mono`）
- サムネ・装飾は「実物素材」のみ：`ThumbTerm`（ターミナル画面風）・`ThumbSheet`（帳簿カード/実測表）
- **数字を捏造しない**：LPに載せる数値は実測値＋時点表記（例「07.16時点」）必須

## コンポーネント一覧
| ファイル | 役割 | 数値の渡し方 |
|---|---|---|
| `Hero.astro` | H1＋CTA2＋信頼バー＋ターミナル＋帳簿カード | `ledger` props（帳簿更新時はここだけ直す） |
| `RankItem.astro` | 編集部ピックの行 | 読了時間・日付は index 側で本文から実算出 |
| `ThumbTerm.astro` | ターミナル風サムネ | 行の中身は実在の運用に沿って渡す |
| `ThumbSheet.astro` | 帳簿/実測表サムネ | `asOf`（時点）を必ず渡す |
| `PersonaGrid.astro` | 状況別入口3つ | リンク先は実在ページのみ |
| `ShopStrip.astro` | 自社商品3枠 | `src/data/products.ts` が唯一の正（/shopと同期） |
| `WeeklyCta.astro` | note週報CTA | メールフォームは作らない |
| `AffiliateCta.astro` | 記事末尾アフィリCTA | frontmatter `affiliateCta` から PostDetails が描画 |

## 帳簿の更新手順（毎週金曜のnote帳簿公開後）
`src/pages/index.astro` 冒頭の `LEDGER` 定数だけを更新する:

```ts
const LEDGER = {
  asOf: "07.16時点",        // ← 時点表記
  adRevenue: "¥0",          // 広告収益
  searchImpressions: "265", // GSC表示
  searchImpressionsDelta: "+71%",
  searchClicks: "3",
  noteLikes: "26",
};
```

## AffiliateCta の記事への挿入
記事 frontmatter に追記（本文は触らない）:

```yaml
affiliateCta:
  - id: transcope
    experienced: true
    note: "当サイトの記事量産で実際に使っている運用目線のメモ..."
  - id: terracam-ai   # experienced 省略時は「編集部未検証」を自動明示
```

`id` は `src/data/tools.ts` の `id`。リンクは自動で `/go/<id>`＋`rel="sponsored nofollow"`。
