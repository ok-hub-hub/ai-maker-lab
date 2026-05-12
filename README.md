# AI Maker Lab

AIで個人が「実際に作って公開する」ためのチュートリアル＋比較サイトのソースコードです。

- 本番URL（取得予定）：https://aimaker-lab.com/
- 関連プロジェクト：AI会社運営 / P-019

## 技術スタック

- **Astro 5.x** ＋ MDX ＋ React Islands（診断UI用）
- Tailwind CSS v4
- Pagefind（サイト内検索）
- Satori（OG画像自動生成）
- ベーステーマ：[AstroPaper](https://github.com/satnaing/astro-paper)（MITライセンス）をフォーク・カスタマイズ

## ホスティング

- Cloudflare Pages（予定）

## 開発

```bash
npm install
npm run dev      # http://localhost:4321/
npm run build    # 本番ビルド + Pagefindインデックス生成
npm run preview  # ビルド成果物のローカル確認
```

## ディレクトリ

- `src/data/blog/` ：記事（.md / .mdx）
- `src/pages/` ：固定ページ（about, archives, posts/, tags/）
- `src/config.ts` ：サイト全体設定（タイトル・著者・言語・タイムゾーン等）
- `src/constants.ts` ：SNSリンク・シェアリンク
- `src/components/` ：Astroコンポーネント
- `src/layouts/` ：レイアウトテンプレート
- `public/` ：静的アセット

## ライセンス

ベーステーマの MIT ライセンスは `LICENSE` を参照。記事コンテンツ・サイト固有のデザイン部分は別管轄（運営者著作物）。
