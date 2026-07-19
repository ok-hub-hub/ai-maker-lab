---
author: AI Maker Lab
pubDatetime: 2026-07-19T09:22:30+09:00
title: "Cline の料金は？ 2026年版｜ClinePass $9.99・BYOK・Claude Code月額を比べた"
slug: cline-ryokin-2026
featured: false
draft: false
tags:
  - ai-coding
  - cline
  - vibe-coding
  - review
description: "Clineはオープンソースで無料だが、AIが動くには推論コストが別途かかる。「ClinePass $9.99/月」「BYOK（自前APIキー）」「Claude Code月額$20」の3パターンをコスパ実測で比較し、副業ブログ制作への活用フローも解説します。"
---

<div class="relative mb-8 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 sm:h-32">
  <img src="/icons/code-block.png" alt="" aria-hidden="true" class="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「**Cline って無料って聞いたけど、実際いくらかかるの？ ClinePass って何？**」

GitHub スター数 65k 超（2026年7月時点）で AIコーディングツールのトップに躍り出た **Cline**。「オープンソースで無料」という触れ込みは本当ですが、実際に AI に動いてもらうには**推論コストが別途かかる**構造です。本記事では、2026-07-19 に公式サイトへ直接接続して取得した料金をもとに、3パターンのコスト構造を整理します。

> **広告に関する表記**：本記事には [Catchy](/go/catchy) および [Transcope](/go/transcope) を経由するアフィリエイトリンクが含まれます。リンク経由でご契約いただくと、AI Maker Lab に紹介料が発生する場合があります。レビュー内容そのものは、実際に使った上で公平な視点で執筆しています。

## 目次

- 30秒で結論：Cline の料金は「3パターン」
- Cline とは（オープンソース・VSCode拡張）
- 料金体系の全体マップ
- ClinePass $9.99 詳細（含まれるモデル）
- ClinePass vs Claude.ai Pro コスパ比較
- メリット・デメリット
- 副業ブログ制作への活用フロー（Cline × Catchy/Transcope）
- 向く人 / 向かない人
- FAQ
- まとめ

## 30秒で結論：Cline の料金は「3パターン」

<div class="my-6 rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
  <p class="flex items-center gap-2 text-lg font-bold text-amber-900">✅ 編集部の結論</p>
  <p class="mt-2 text-amber-950">Cline ツール自体は<strong>完全無料</strong>。AI に動いてもらうには「ClinePass（$9.99/月・初月$4.99）」か「自前 API キー（BYOK）」が必要。コスト定額化したいなら ClinePass、Claude や GPT-4o にこだわるなら BYOK。</p>
  <div class="mt-4 grid gap-1.5 text-sm text-amber-950">
    <div class="flex items-center gap-2"><span class="w-28 flex-none">基本料金の安さ</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:100%"></span></span><span class="w-8 text-right font-bold">5.0</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">モデル選択肢</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:100%"></span></span><span class="w-8 text-right font-bold">5.0</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">コスパ（総合）</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:90%"></span></span><span class="w-8 text-right font-bold">4.5</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">日本語 UI</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:50%"></span></span><span class="w-8 text-right font-bold">2.5</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">初心者向け</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:60%"></span></span><span class="w-8 text-right font-bold">3.0</span></div>
  </div>
  <p class="mt-2 text-xs text-amber-800">※ 編集部の実運用にもとづく5段階評価（総合 4.0）</p>
</div>

**3択まとめ：**

| 比較軸 | ClinePass | BYOK（自前APIキー） | Claude.ai Pro |
|--------|-----------|---------------------|---------------|
| 月額 | **$9.99**（初月$4.99） | ツール$0 + API代 | **$20**（月払い） |
| 使えるAIモデル | DeepSeek・Qwen・Kimi等 | Claude・GPT-4o・Gemini等 | Claude 全モデル |
| コスト上振れ | なし（定額） | あり（青天井） | なし（定額） |
| API 設定 | 不要 | 自分で各社と契約 | 不要 |

<div class="my-6">
  <a href="/go/catchy" class="flex flex-col rounded-2xl bg-sky-600 p-5 text-white no-underline shadow-sm transition hover:bg-sky-700">
    <span class="text-lg font-bold">Cline で自動化した作業を Catchy で仕上げる →</span>
    <span class="mt-1 text-sm text-sky-100">AIコーディング × AIライティングの2刀流で副業収益を作る</span>
  </a>
</div>

## Cline とは（オープンソース・VSCode拡張）

Cline は、VS Code（または CLI・SDK）で動く**オープンソースの AI コーディングエージェント**です。GitHub スター数 65k 超（2026年7月時点）は AI コーディングツールでトップクラスで、Cline Bot Inc. が開発・運営しています。

Cline の最大の特徴は **モデルを選ばない設計**にあります。Anthropic・OpenAI・Google・DeepSeek・OpenRouter・AWS Bedrock・GCP Vertex など主要 AI プロバイダーの API をすべて差し替えできます。つまり「ツール代は無料・課金するのは AI モデルの使用量だけ」という構造です。

コーディングエージェントとして、ファイルの読み書き・ターミナルコマンド実行・ブラウザ確認・チェックポイント保存・ループ処理など、人間が手作業でやっていた開発タスクを自律的にこなします。

## 料金体系の全体マップ

> **価格情報の取得日**：以下の料金は **2026-07-19 に公式サイト（cline.bot）へ直接接続して取得**した値です。プラン変更が入る可能性があるため、契約前に必ず[公式サイト](https://cline.bot/pricing)で最新情報をご確認ください。

| プラン | 月額 | 対象 | こんな人におすすめ |
|--------|------|------|----------------|
| **Open Source（無料）** | $0 | 個人開発者 | まず試したい全員。ここから始める一択 |
| **ClinePass** | $9.99（初月$4.99） | 個人 | 月額定額でコスト上振れを避けたい人 |
| **BYOK** | ツール$0 + API代 | 技術者 | Claude/GPT-4o など特定モデルにこだわる人 |
| **Enterprise** | カスタム | 法人チーム | SSO・集中請求・チーム管理が必要な組織 |

<sup>※料金・条件は2026-07-19時点。最新は[Cline公式サイト](https://cline.bot/pricing)でご確認ください。</sup>

### 「Cline は無料」の正確な意味

よく「Cline は無料」と書かれていますが、これは **VS Code 拡張をインストールして起動するコストが $0** という意味です。実際に AI にコードを書かせるには、AI モデルが動く必要があります。その推論コストが「ClinePass」か「BYOK」として別途発生します。

「完全に無料で使う」ことも可能ですが、それは「各社 API キーの無料枠内で動かす」場合に限ります。商用・副業利用では無料枠はすぐ上限に達します。

## ClinePass $9.99 詳細（含まれるモデル）

ClinePass は **API キー設定不要** でオープンウェイトモデルを定額で使えるサブスクリプションです。初月$4.99、以降 $9.99/月。

**含まれるモデル（2026-07-19 公式確認）：**

| モデル | 提供元 | 特徴 |
|--------|--------|------|
| GLM 5.2 | Z.ai | ディープリーズニング |
| Kimi K2.7 Code | Moonshot AI | コーディング特化 |
| Kimi K2.6 | Moonshot AI | エージェントワークフロー |
| DeepSeek V4 Pro | DeepSeek | 大規模変更向け |
| DeepSeek V4 Flash | DeepSeek | 高速イテレーション |
| MiniMax M3 | MiniMax | 汎用コーディング |
| MiMo V2.5 Pro | MiMo | 重作業向け |
| MiMo V2.5 | MiMo | 効率編集 |
| Qwen3.7-Max | Qwen | 高負荷タスク |
| Qwen3.7-Plus | Qwen | バランス型 |

「DeepSeek か Qwen で十分」という人には $9.99 はかなり割安です。これらを BYOK で使う場合は各社と別途 API 契約が必要なため、**ClinePass は「複数プロバイダーの管理が面倒」な人向けのオールインワン**と言えます。

## ClinePass $9.99 vs Claude.ai Pro $20 コスパ比較

実際によく検討される比較は「ClinePass（$9.99/月）vs Claude.ai Pro（$20/月）」です。

**Claude.ai Pro に含まれるもの（2026-07-19 公式確認）：**
- claude.ai チャット（Web・iOS・Android・デスクトップ）
- **Claude Code**（VS Code 拡張でのコーディング）
- Claude Cowork・Claude Design・Claude Science
- 追加の使用量枠・混雑時の優先アクセス

**整理すると：**

**Cline + ClinePass（$9.99/月）**
DeepSeek/Qwen/Kimi 等のオープンウェイトモデルでコーディング。Claude を使いたい場合は別途 BYOK 設定が必要。Claude Code のような公式サポートはないが、Cline の MCP エコシステムや柔軟なモデル切り替えが使える。

**Claude.ai Pro（$20/月）**
Claude Code 込みで Claude 全モデルが使える。セットアップが最もシンプル。ただし Cline の UI・広いモデル選択は使えない。Claude 品質で十分な人はこちらでよい。

**Cline + BYOK（Claude API）**
Cline の UI を使いながら Claude モデルで動かす。API コストは使った分だけ（使い方によって月 $10〜$100+ と幅がある）。上限設定を必ず行うこと。

**副業での使い方別の推奨：**

| 使い方 | おすすめ |
|--------|---------|
| コスト最小でまず試す | Cline Open Source + BYOK 各社無料枠 |
| 定額でオープンウェイトを使い倒す | **ClinePass $9.99** |
| Claude で高品質コード生成 | Claude.ai Pro $20（Claude Code 込み）|
| 副業ブログを自動化・記事生成まで | Cline + **Catchy/Transcope**（後述）|

<div class="my-6">
  <a href="/go/transcope" class="flex flex-col rounded-2xl bg-emerald-600 p-5 text-white no-underline shadow-sm transition hover:bg-emerald-700">
    <span class="text-lg font-bold">Cline で骨格・Transcope で SEO 最適化する →</span>
    <span class="mt-1 text-sm text-emerald-100">コーディング AI × SEO ライティング AI の2刀流で検索流入を作る</span>
  </a>
</div>

## メリット・デメリット

<div class="my-6 grid gap-4 sm:grid-cols-2">
  <div class="rounded-xl border-t-4 border-emerald-500 bg-emerald-50 p-4">
    <p class="font-bold text-emerald-900">メリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-emerald-950">
      <li>✓ ツール自体が完全無料（オープンソース・GitHub 65k超）</li>
      <li>✓ BYOK でどの AI モデルでも使える柔軟性</li>
      <li>✓ ClinePass $9.99 は定額でコスト管理がしやすい</li>
    </ul>
  </div>
  <div class="rounded-xl border-t-4 border-rose-400 bg-rose-50 p-4">
    <p class="font-bold text-rose-900">デメリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-rose-950">
      <li>✕ UI が英語のみ（日本語設定なし）</li>
      <li>✕ VS Code 前提で非エンジニアには敷居が高い</li>
      <li>✕ BYOK は使い過ぎると API 代が青天井になる</li>
    </ul>
  </div>
</div>

### 弱点を正直に補足

**英語 UI の問題**：Cline 自体は英語のみですが、プロンプトを日本語で書けば日本語コードコメントが出力されます。UI の英語に慣れれば実用上の問題はほぼありません。

**BYOK の青天井リスク**：Claude API や OpenAI API は使った分だけ課金されます。エージェントを長時間走らせると一夜で数千円の請求になるケースもあります。**BYOK を使う場合は各社ダッシュボードで支出上限（Usage Limit）を必ず設定してください**。ClinePass ならこのリスクがなく、$9.99 の定額で上振れしません。

<aside class="my-8 rounded-xl border-l-4 border-indigo-400 bg-indigo-50 p-5">
  <p class="font-bold text-indigo-900">実運用でよくある失敗</p>
  <p class="mt-2 text-sm text-indigo-950">BYOK で試し始めて「なんか思ったより使ってしまった…」という報告は多い。Anthropic ダッシュボードの「Usage Limits」から月額上限を $10 〜 $20 に設定しておくだけで精神的に安心できます。</p>
</aside>

<div class="my-6">
  <a href="/go/catchy" class="flex flex-col rounded-2xl bg-sky-600 p-5 text-white no-underline shadow-sm transition hover:bg-sky-700">
    <span class="text-lg font-bold">無料で Catchy を試してみる →</span>
    <span class="mt-1 text-sm text-sky-100">毎月10クレジット無料。Cline で作った仕組みと組み合わせて副業ブログを回す</span>
  </a>
</div>

## 副業ブログ制作への活用フロー（Cline × Catchy/Transcope）

Cline はコーディングエージェントですが、**「作業を自動化するスクリプトを書く」**用途でも非常に強力です。副業でブログを運営している場合、以下のコンビが機能します。

### 役割分担

| 役割 | ツール | 何をするか |
|------|--------|-----------|
| 仕組み作り | **Cline** | API 連携スクリプト・バッチ処理・デプロイ自動化 |
| 記事叩き台・コピー | **[Catchy](/go/catchy)** | 短文・見出し・広告文・SNS 投稿文 |
| SEO 長文・競合分析 | **[Transcope](/go/transcope)** | 検索クエリ対応の長文・キーワード最適化 |

### 実際のフロー

**ステップ 1：Cline で自動化スクリプトを書く**

Cline に「毎日キーワードリストから Catchy API を呼んで記事叩き台 JSON を生成するバッチスクリプトを Python で書いて」と指示します。Cline はコードを書き、エラーを自律修正して、動作確認まで行います。プログラミング作業の大半を Cline が担います。

**ステップ 2：Catchy/Transcope で記事を仕上げる**

Cline が出力した叩き台（アウトライン・見出し案・主要ポイント）をもとに、[Catchy](/go/catchy) で導入文や短文コピーを生成します。SEO を意識した長文を作る場合は [Transcope](/go/transcope) でキーワード分析と本文生成を行います。

**ステップ 3：公開・計測・改善サイクル**

公開後は GSC（Google Search Console）で順位をモニタリング。反応が良いクエリがあれば Cline に「関連記事の自動生成フローを追加して」と依頼して仕組みを拡充します。

### なぜこの組み合わせが機能するか

Cline を「**自動化インフラを作るエンジン**」として使い、Catchy/Transcope を「**コンテンツ生成エンジン**」として使う分業です。「AI で仕組みを作る」と「AI で記事を書く」を両立することで、1人でも複数メディアを回せます。

競合サイトはどちらか一方しか使っていないケースが多い。この2刀流は、検索で見ても空白が大きい組み合わせです。

## 向く人 / 向かない人

**向く人：**
- VS Code を普段使いしているエンジニア・個人開発者
- 「まず無料で試したい」人（BYOK 各社無料枠から始められる）
- コスト上振れを避けたい人（ClinePass $9.99 が最適解）
- 自動化スクリプトを書いてコンテンツ生産を効率化したい副業者

**向かない人：**
- VS Code を使わない人・コードに触れたくない人（→ [Catchy](/go/catchy) や [Transcope](/go/transcope) など UI 完結のツールの方が向く）
- 「AI が全部勝手にやってくれる」を期待している人（動作確認・エラー対応の基礎知識は必要）

## FAQ

**Q. Cline は本当に無料ですか？**

A. ツール自体は完全無料（オープンソース）。ただし AI に動いてもらうには BYOK（自前 API キー）か ClinePass（$9.99/月）が必要です。「完全無料で使う」＝各社 API キーの無料枠内に収める、が現実ラインです。

**Q. ClinePass を契約すれば Claude が使えますか？**

A. いいえ。ClinePass に含まれるのは DeepSeek・Qwen・Kimi 等のオープンウェイトモデルです。Claude を使いたい場合は Anthropic API キーを BYOK で別途設定する必要があります（または Claude.ai Pro $20/月に加入）。

**Q. Claude Code と Cline の違いは？**

A. Claude Code（Anthropic 製）は Claude モデルに最適化された公式 CLI/拡張です。Cline は Claude 以外にも OpenAI・Gemini・DeepSeek 等マルチ対応のサードパーティ拡張。Claude 縛りでよければ Claude.ai Pro（$20/月・Claude Code 込み）が最もシンプル。複数モデルを試したいなら Cline の方が柔軟です。

**Q. 副業ブログ制作に使えますか？**

A. 使えます。ただし「Cline だけで記事が書ける」わけではなく、「記事生成を自動化するスクリプトを Cline で書く」が正確な使い方です。記事の品質は [Catchy](/go/catchy) や [Transcope](/go/transcope) と組み合わせることで上がります。

## まとめ

- **Cline 自体は完全無料**（オープンソース・GitHub 65k超）
- AI モデルの使用は「**ClinePass $9.99/月（初月$4.99）**」か「**BYOK（使った分だけ）**」の2択
- コスト上振れが怖いなら ClinePass。Claude/GPT-4o にこだわるなら BYOK + 必ず支出上限を設定
- 副業ブログでは「Cline で自動化スクリプト ＋ Catchy/Transcope で記事生成」のコンビが強力

<div class="my-8 flex flex-col gap-3">
  <a href="/go/catchy" class="flex flex-col rounded-2xl bg-sky-600 p-5 text-white no-underline shadow-sm transition hover:bg-sky-700">
    <span class="text-lg font-bold">Catchy を無料で試す →</span>
    <span class="mt-1 text-sm text-sky-100">毎月10クレジット無料。Cline と組み合わせた副業ブログの第一歩</span>
  </a>
  <a href="/go/transcope" class="flex flex-col rounded-2xl bg-emerald-600 p-5 text-white no-underline shadow-sm transition hover:bg-emerald-700">
    <span class="text-lg font-bold">Transcope で SEO 記事を書いてみる →</span>
    <span class="mt-1 text-sm text-emerald-100">Cline でインフラを作り、Transcope で検索上位を狙う</span>
  </a>
</div>

次に読むなら：

- [Catchy レビュー 2026](/posts/catchy-review-2026/) — AIライティングツールの実力を正直評価
- [Transcope レビュー 2026](/posts/transcope-review-2026/) — SEO記事生成ツールの詳細レビュー
- [vibe coding ツール比較 2026](/posts/vibe-coding-tools-2026/) — Cline 以外の AI コーディングツール全体像

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "Cline",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "VS Code, CLI",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "オープンソース無料（AI推論コスト別途）" }
  },
  "reviewRating": { "@type": "Rating", "ratingValue": "4.0", "bestRating": "5" },
  "author": { "@type": "Organization", "name": "AI Maker Lab 編集部" },
  "publisher": { "@type": "Organization", "name": "AI Maker Lab" }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Cline は本当に無料ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ツール自体は完全無料（オープンソース）。ただし AI に動いてもらうには BYOK（自前 API キー）か ClinePass（$9.99/月）が必要です。「完全無料で使う」＝各社 API キーの無料枠内に収める、が現実ラインです。"
      }
    },
    {
      "@type": "Question",
      "name": "ClinePass を契約すれば Claude が使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "いいえ。ClinePass に含まれるのは DeepSeek・Qwen・Kimi 等のオープンウェイトモデルです。Claude を使いたい場合は Anthropic API キーを BYOK で別途設定する必要があります（または Claude.ai Pro $20/月に加入）。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude Code と Cline の違いは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code（Anthropic 製）は Claude モデルに最適化された公式 CLI/拡張です。Cline は Claude 以外にも OpenAI・Gemini・DeepSeek 等マルチ対応のサードパーティ拡張。Claude 縛りでよければ Claude.ai Pro（$20/月・Claude Code 込み）が最もシンプル。複数モデルを試したいなら Cline の方が柔軟です。"
      }
    },
    {
      "@type": "Question",
      "name": "Cline は副業ブログ制作に使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "使えます。ただし「Cline だけで記事が書ける」わけではなく、「記事生成を自動化するスクリプトを Cline で書く」が正確な使い方です。記事の品質は Catchy や Transcope と組み合わせることで上がります。"
      }
    }
  ]
}
</script>
