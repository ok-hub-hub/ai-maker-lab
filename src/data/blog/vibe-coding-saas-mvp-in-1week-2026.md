---
author: AI Maker Lab
pubDatetime: 2026-05-25T03:31:00+09:00
title: "Vibe Coding で SaaS MVP を1週間で動かす実装ロードマップ【Day1-7 タスク表・2026年版】"
slug: vibe-coding-saas-mvp-in-1week-2026
featured: true
draft: false
tags:
  - vibe-coding
  - saas-mvp
  - v0
  - lovable
  - supabase
  - cursor
  - claude-code
  - implementation
description: "v0 / Lovable / Cursor / Claude Code / Supabase を組み合わせて、SaaS MVP を1週間で動かすロードマップ。Day1 アイデア整理から Day7 公開告知まで、編集部の実装日記とトラブルシュート込みで具体タスクを提示します。"
---

<div class="relative mb-8 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 sm:h-32">
  <img src="/icons/individual-dev.png" alt="" aria-hidden="true" class="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「SaaS を作りたい、けど何から手をつければ1週間で動くものになるのか分からない」

AI Maker Lab 編集部に届く相談で、いちばん多いテーマです。本記事は **v0 / Lovable / Cursor / Claude Code / Supabase を組み合わせて、SaaS MVP を1週間（実働7日）で動かすロードマップ**を、Day 別タスク・編集部の実装日記・トラブルシュートまで含めて提示します。

> 本記事は **AI Maker Lab 編集部（運営者 + AI 編集部の協働運用）が、実際に複数のミニ SaaS（[ココラボ](https://kokolabo.jp/) や [キャリアラウンジ](https://careerlounge.jp/) などのメディアサイト本体および付随する内部ツール）を作るなかで蓄積した一次経験** をもとに執筆しています。料金・機能は 2026-05 時点の公式情報です。
>
> **広告に関する表記**：本記事には [お名前.com](/go/onamae)・[ConoHa WING](/go/conoha)・[エックスサーバー](/go/xserver) を経由するリンクが含まれます。リンク経由でのお申し込みにより、AI Maker Lab に紹介料が発生する場合があります。ツールの評価・手順は広告と無関係に実体験で書いています。

## 結論：1週間スケジュール（Day1-7）

| Day | フェーズ | 完了基準 |
|-----|---------|----------|
| Day 1 | アイデア整理 + プロンプト設計 | プロンプト集 v1 が手元にある |
| Day 2 | v0 / Lovable で UI スケルトン | 主要3画面の見た目が動く |
| Day 3 | Supabase Auth + Postgres セットアップ | サインアップ → ログインまで通る |
| Day 4 | ビジネスロジック実装（Cursor / Claude Code） | コア機能が1つ通しで動く |
| Day 5 | API 連携・テスト | 外部 API 連携 + 主要テストが緑 |
| Day 6 | Cloudflare Pages / Vercel デプロイ | 本番 URL で動作確認 |
| Day 7 | Twitter / Product Hunt で公開告知 | 投稿完了 + 初期フィードバック収集 |

1日あたり **4〜6時間の実働** を想定しています。フルタイム稼働なら3〜4日に圧縮できますが、副業で取り組むなら1週間枠が現実的です。

---

## Day 1：アイデア整理 + プロンプト設計

### やること

1. **1行プロダクト定義**：「誰の何の課題を、どう解決するか」を1行で書く
2. **コア機能3つに絞る**：MVP は機能を増やさない。3つだけ
3. **画面リスト**：必要画面を5〜7枚に絞る（ログイン・ホーム・コア機能・設定・課金）
4. **プロンプト集 v1**：各画面 / 各機能のプロンプトを Markdown で1ファイルにまとめる

### 編集部の実装日記

> [Claude Code](/posts/claude-code-setup-1month-practical/) を相棒にして、まずは「1行定義」を5回書き直しました。最初は「個人開発者向けのプロジェクト管理 SaaS」と曖昧でしたが、Claude Code との対話で「**個人開発者がリリース後3ヶ月の作業を3分で計画できるツール**」まで具体化しました。1行が決まれば残りは芋づる式です。

### プロンプト設計のコツ

- **プロンプトに含めるべき要素**：機能・画面構成・データ構造・UI ライブラリ指定・カラースキーム
- **避けたほうがいいこと**：抽象的な形容詞（「シンプル」「モダン」）だけで終わらせる
- **編集部の運用**：プロンプト集を `/prompts/` ディレクトリに置き、Cursor / Claude Code から参照する

---

## Day 2：v0 / Lovable で UI スケルトン

### やること

1. **画面 1〜3 を v0 / Lovable で量産**：1画面15〜30分
2. **ナビゲーション接続**：画面間遷移を仮配線
3. **モックデータ表示**：ハードコードでよいので「動いている雰囲気」を出す

### ツール選択

- **DB / 認証 / 決済まで一気に欲しい** → [Lovable](/go/lovable/)（Supabase 統合がデフォルト）
- **UI を細かく追い込みたい / Next.js 環境に組み込みたい** → [v0](/go/v0/)（shadcn/ui ベース）
- **ブラウザ完結で気楽に試したい** → [Bolt](/go/bolt/)（WebContainer ブラウザ完結）

詳細な比較は [v0 vs Lovable vs Bolt 記事](/posts/v0-vs-lovable-vs-bolt-2026/) と [Vibe Coding LP 30分実装パターン10](/posts/vibe-coding-landing-page-in-30min-2026/) を参照してください。

### 編集部の実装日記

> 編集部は Day 2 を **Lovable + v0 の併用** で進めました。Lovable は「DB 連携前提の動く画面」、v0 は「shadcn/ui を活かした見栄えのある画面」が得意。**コア機能の動作確認は Lovable、見せ場の画面は v0** という分業で、Day 2 終了時には主要3画面が動く状態になりました。

---

## Day 3：Supabase Auth + Postgres セットアップ

### やること

1. **Supabase プロジェクト作成**：[supabase.com](https://supabase.com/) で新規プロジェクト
2. **Auth 有効化**：Email + Google OAuth を ON
3. **Postgres スキーマ作成**：コア機能で必要なテーブルを3〜5個
4. **Row Level Security (RLS) ポリシー**：「ユーザーは自分のデータだけ見える」を設定
5. **環境変数の管理**：`.env.local` に URL / Anon Key を保存

### Supabase 設計のコツ

- **テーブル名は複数形**：`users` / `projects` / `tasks`
- **`auth.users` を参照する外部キー**：`user_id uuid references auth.users(id)`
- **作成日時・更新日時**：`created_at timestamptz default now()` を必須カラムに
- **RLS は必ず有効化**：忘れると **全テーブルが世界に公開される事故** が起きます

### 編集部の実装日記

> Supabase の最大の落とし穴は **RLS の設定忘れ**。Lovable で「Supabase 統合」を有効にすると、最初は RLS が無効のまま動作してしまいます。Day 3 の最後に必ず「RLS ポリシーの一覧確認」を行ってください。Claude Code に「Supabase の全テーブルの RLS 状況を確認するクエリを書いて」と依頼すると、SQL を出してくれます。

---

## Day 4：ビジネスロジック実装（Cursor / Claude Code 活用）

### やること

1. **コア機能の1つを通しで実装**：データ取得 → 表示 → 編集 → 保存
2. **Cursor / Claude Code でロジック実装**：v0 / Lovable の生成物にビジネスロジックを足す
3. **エラーハンドリング**：ネットワークエラー・認証エラー・バリデーションエラー
4. **ローディング状態**：スピナー・スケルトン

### Cursor / Claude Code の使い分け

[詳細な比較は Cursor vs Claude Code 記事](/posts/cursor-vs-claude-code-comparison/) を参照してください。編集部の現場感は以下のとおり。

- **Cursor**：エディタ内のチャットで小規模なリファクタを高速反復
- **Claude Code**：ターミナル中心で **複数ファイルにまたがる大規模な変更**を一括実行

両方とも無料枠 or 月額 $20 で試せます。

### 編集部の実装日記

> Day 4 が一番ハマりがち。「v0 / Lovable で出した画面に、自分のビジネスロジックを足す」工程です。編集部は **Claude Code に「このコンポーネントに〜のロジックを追加して」と1機能ずつ指示** する運用に落ち着きました。1機能を30分以内で完了し、コミットしてから次へ進む、というリズムを守ると Day 4 で破綻しにくいです。

---

## Day 5：API 連携・テスト

### やること

1. **外部 API 連携**：決済（Stripe）・メール送信（Resend）・AI（OpenAI / Anthropic）など
2. **環境変数の整理**：API キーは Vercel / Cloudflare のシークレットに登録
3. **主要テスト**：認証フロー・コア機能・課金フロー
4. **エラー監視**：Sentry 等のセットアップ（無料枠あり）

### API 連携のコツ

- **API キーはサーバーサイドのみ**：クライアントに漏れない構造に
- **レート制限の確認**：無料枠の上限を必ずチェック
- **エラーレスポンスの取り扱い**：500 系・429 系のリトライ実装

### 編集部の実装日記

> Stripe 連携が一番ハマりやすいポイント。Webhook の検証・本番環境とテスト環境の切替・カード支払い失敗時のリトライなど、論点が多いです。編集部は **Claude Code に「Stripe Webhook の検証コードを Next.js Route Handler で書いて」と依頼**して、雛形を生成してから自分で1行ずつ理解する、という勉強モードで進めました。

---

## Day 6：Cloudflare Pages / Vercel デプロイ

### やること

1. **GitHub にリポジトリ作成**：プロジェクトを push
2. **Vercel or Cloudflare Pages に接続**：自動デプロイ設定
3. **環境変数を本番に設定**：API キー・Supabase キー
4. **独自ドメイン接続**：取得済みドメインを CNAME 設定
5. **本番動作確認**：認証 → コア機能 → 課金まで通しチェック

### Vercel vs Cloudflare Pages

| 観点 | Vercel | Cloudflare Pages |
|------|--------|------------------|
| Next.js との相性 | 最高（公式） | 一部 Edge Runtime 制約あり |
| 無料枠 | 商用は制限あり | 商用 OK・帯域無制限 |
| Edge Functions | あり | あり（Workers） |
| 学習コスト | 低 | やや高 |

編集部は **メディアサイト（[ココラボ](https://kokolabo.jp/) / [キャリアラウンジ](https://careerlounge.jp/) / 本サイト [aimaker-lab.com](/) ）** をすべて Cloudflare Pages で運用しています。商用無料・帯域無制限が決め手です。Next.js を本格的に使う場合は Vercel が無難。

### 独自ドメインだけは「無料」で済まない

ホスティングは無料枠で足りますが、**独自ドメインだけは実費**です（年1,000〜2,000円台）。`*.vercel.app` や `*.pages.dev` のままでも動きますが、Day 7 の告知で **SaaS として信用されるかが露骨に変わります**。「有料で使ってもらう」つもりなら、Day 6 のうちに押さえてください。

<div class="my-8 flex flex-col gap-3">
  <a href="/go/onamae" class="flex flex-col rounded-2xl bg-slate-800 p-5 text-white no-underline shadow-sm transition hover:bg-slate-900">
    <span class="text-lg font-bold">独自ドメインの空きを調べる →</span>
    <span class="mt-1 text-sm text-slate-300">お名前.com（検索は無料・取得は有料／Cloudflare Pages に CNAME で接続できます）</span>
  </a>
</div>

WordPress 等のサーバー込み構成が必要なら [ConoHa WING](/go/conoha)・[エックスサーバー](/go/xserver) も選択肢です（本記事の構成では不要）。

### 編集部の実装日記

> 「ローカルで動くのに本番で動かない」の99%は **環境変数の設定漏れ** です。Vercel / Cloudflare Pages の管理画面で、Production / Preview / Development の3環境すべてに変数を設定してください。Claude Code に「.env.local を読んで Vercel CLI で全環境にセットするコマンドを出して」と依頼すると、`vercel env add` のコマンドを生成してくれます。

---

## Day 7：Twitter / Product Hunt で公開告知

### やること

1. **Twitter / X で公開告知**：プロダクト概要 + URL + スクリーンショット
2. **Product Hunt 投稿準備**：タグライン・タグ・スクリーンショット・動画
3. **個人ブログ / Zenn / Qiita に開発記**：作った過程を記事化（SEO 流入の起点）
4. **フィードバック収集**：初期ユーザーの声を Notion / スプレッドシートに集約

### 公開告知のコツ

- **スクリーンショット 3枚**：1枚目はビフォーアフター系、2枚目は機能、3枚目は料金
- **タグライン1行**：「誰の何を解決するか」を10秒で読める長さに
- **動画30秒**：Loom や QuickTime で画面録画。編集なしで OK

### 編集部の実装日記

> Day 7 の最大の罠は **「もう少し直してから公開しよう」と思って公開しないこと**。編集部は「Day 7 の終了時刻に何があっても公開ボタンを押す」というルールにしています。**完成度70%で公開して、フィードバックを浴びてから直す** のが、Vibe Coding 時代の MVP のスピード感です。

---

## 失敗パターン・トラブルシュート

### パターン1：Day 3 で Supabase 設計が決まらない

**原因**：Day 1 のデータ構造設計が甘い

**対策**：Day 1 で「ER 図を1枚紙に書く」フェーズを必ず入れる。Claude Code に「このプロダクトの ER 図を Mermaid で出して」と依頼するのも有効。

### パターン2：Day 5 で API キーが GitHub に漏れた

**原因**：`.env.local` を `.gitignore` に入れ忘れ

**対策**：プロジェクト作成直後に `.gitignore` をチェック。漏れた場合は **即座に API キーをローテーション**してください。

### パターン3：Day 6 で本番が動かない

**原因**：環境変数未設定、もしくは Build Command の設定誤り

**対策**：ローカルで `next build && next start` が通ることを確認してからデプロイ。エラーが出たら **Vercel / Cloudflare のビルドログを最後まで読む**。

### パターン4：Day 7 で公開できない

**原因**：完成度を気にしすぎ

**対策**：「Day 7 の17時にツイートする」と先に予定を入れる。**「完成」より「公開」が常に優先**。

<aside class="my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
  <p class="flex items-center gap-2 font-bold text-emerald-900">
    <svg aria-hidden="true" class="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    編集部の実体験メモ（AI 駆動明示）
  </p>
  <p class="mt-2 text-sm leading-7 text-emerald-900">本サイト（AI Maker Lab）の運営自体が <strong>「AI 駆動の編集部」</strong> として、Claude Code を中心に複数のメディアと内部ツールを同時並行で構築している実例です。同じワークフローを SaaS MVP に転用すると、1人の個人開発者でも <strong>1週間で動く SaaS を公開できる</strong> ところまで来ています。詳しくは <a href="/posts/claude-code-ai-company-1month-2026/">Claude Code で AI 会社を運営した1ヶ月</a> をどうぞ。</p>
</aside>

---

## FAQ

### Q1. 1週間で本当に動く SaaS が作れますか？

**コア機能を3つに絞れば作れます**。10機能を盛り込むと1ヶ月かかります。MVP は機能の少なさが正義です。

### Q2. プログラミング初学者でもできますか？

**Day 1〜2 は初学者でも進められます**。Day 3 以降は SQL / Auth / API の基礎理解があるとスムーズです。基礎学習を並走させるなら、Day 1〜7 を2週間に拡張するのが現実的です。

### Q3. ツールの月額はどれくらいかかりますか？

最小構成なら **0円〜$50/月** の範囲です。v0 / Lovable / Cursor / Claude Code すべてに無料枠があり、Supabase / Cloudflare Pages も無料枠で個人開発の範囲はカバーできます。本格運用フェーズで月額 $50〜$200 に増えるイメージです。

### Q4. デプロイ先は Vercel と Cloudflare Pages のどちらが良いですか？

**Next.js を本格的に使うなら Vercel、商用無料・帯域無制限を取るなら Cloudflare Pages** です。編集部のメディアサイト群は Cloudflare Pages、個別のミニ SaaS は Vercel という併用にしています。

### Q5. AI が生成したコードはそのまま本番投入できますか？

**プロトタイプ品質まではそのまま使えますが、セキュリティ・パフォーマンス・アクセシビリティは必ずレビューしてください**。とくに認証・課金・個人情報を扱う部分は、Claude Code に「セキュリティの観点でこのコードをレビューして」と依頼するのが最低ラインです。

---

## まとめ

Vibe Coding の最大の価値は **「個人が1週間で SaaS を出せる」状態を作ったこと** です。10年前なら1〜2ヶ月かかった作業が、今は7日で動きます。AI Maker Lab 編集部は本記事のロードマップを実際の案件に適用して、複数のメディア・ツールを並行運用しています。

[v0 を試す（無料枠あり） →](/go/v0/)

[Lovable を試す（無料枠あり） →](/go/lovable/)

[Bolt を試す（無料枠あり） →](/go/bolt/)

[Cursor を試す（無料枠あり） →](/go/cursor/)

[Claude Code を試す →](/go/claude-code/)

---

## 関連記事

- [Vibe Coding 完全ガイド 2026](/posts/vibe-coding-guide-2026/) — AI 時代の個人開発入門
- [v0 vs Lovable vs Bolt：Vibe Coding 3大ツール比較](/posts/v0-vs-lovable-vs-bolt-2026/) — UI 生成ツール横並び比較
- [Vibe Coding でランディングページを30分で作る実装パターン10](/posts/vibe-coding-landing-page-in-30min-2026/) — Day 2 で使う LP テンプレ
- [Vibe Coding × Supabase で認証 + DB のアプリを1日で動かす](/posts/vibe-coding-auth-db-in-1day-2026/) — Day 3 の認証 + DB を1日で動かす版
- [Cursor vs Claude Code 比較](/posts/cursor-vs-claude-code-comparison/) — Day 4 で使うエディタ選定
- [Claude Code セットアップから1ヶ月運用まで](/posts/claude-code-setup-1month-practical/) — Day 4 以降の相棒ツール
- [個人開発者向けホスティング選定ガイド](/posts/hosting-for-individual-developers-2026/) — Day 6 のデプロイ先選定
- [独自ドメイン取得ガイド 2026](/posts/domain-selection-guide-2026/) — Day 6 のドメイン接続

---

## 情報の一次性について

本記事のロードマップは **AI Maker Lab 編集部（運営者 + AI 編集部）が実際に複数のメディア・ミニ SaaS を構築・運用するなかで蓄積した一次経験** をもとに整理しています。料金・機能は 2026-05 時点の各サービス公式情報です。実装時の工数は読者のスキル・案件複雑度・並行作業数によって変動します。

---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-6">
  <p class="mb-1 text-xs font-semibold tracking-wide text-violet-700">AI Maker Lab の自社商品</p>
  <p class="mb-2 text-lg font-bold text-violet-900">Vibe Coding プロンプトパック v1</p>
  <p class="mb-4 text-sm leading-relaxed text-violet-900/80">本記事のような v0 / Lovable / Bolt / Cursor / Claude Code での開発を、そのまま使えるプロンプト50本（5ツール×各10本）＋実例ケーススタディ3件にまとめました。日本語ネイティブ向けに最適化・失敗パターン付き・30日返金保証。</p>
  <a href="https://okamuse.gumroad.com/l/skdrjq" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white no-underline transition hover:bg-violet-700">$19（ローンチ価格）でプロンプトパックを見る →</a>
</div>

## Amazon で関連書籍・ガジェットを探す

本記事のテーマに関連する書籍は Amazon でも購入できます。

- <a href="https://www.amazon.co.jp/s?k=SaaS+%E9%96%8B%E7%99%BA+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">SaaS 開発本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Supabase+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Supabase 本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Next.js+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Next.js 入門書を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Vibe+Coding+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Vibe Coding 本を探す →</a>

※ AI Maker Lab は Amazon アソシエイト・プログラムの参加サイトとして、商品のリンク経由のご購入から紹介料を受け取ります（PR）。掲載内容そのものは公平な視点で執筆しています。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "1週間で本当に動く SaaS が作れますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "コア機能を3つに絞れば作れます。10機能を盛り込むと1ヶ月かかります。MVP は機能の少なさが正義です。"
      }
    },
    {
      "@type": "Question",
      "name": "プログラミング初学者でもできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Day 1〜2 は初学者でも進められます。Day 3 以降は SQL や Auth や API の基礎理解があるとスムーズです。基礎学習を並走させるなら2週間枠に拡張するのが現実的です。"
      }
    },
    {
      "@type": "Question",
      "name": "ツールの月額はどれくらいかかりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最小構成なら0円から月50ドルの範囲です。v0 / Lovable / Cursor / Claude Code すべてに無料枠があり、Supabase や Cloudflare Pages も無料枠で個人開発の範囲はカバーできます。"
      }
    },
    {
      "@type": "Question",
      "name": "デプロイ先は Vercel と Cloudflare Pages のどちらが良いですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js を本格的に使うなら Vercel、商用無料と帯域無制限を取るなら Cloudflare Pages です。編集部はメディアサイト群を Cloudflare Pages、個別ミニ SaaS を Vercel という併用にしています。"
      }
    },
    {
      "@type": "Question",
      "name": "AI が生成したコードはそのまま本番投入できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "プロトタイプ品質まではそのまま使えますが、セキュリティ・パフォーマンス・アクセシビリティは必ずレビューしてください。認証・課金・個人情報を扱う部分はとくに念入りに見てください。"
      }
    }
  ]
}
</script>
