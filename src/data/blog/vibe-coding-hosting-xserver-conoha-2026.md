---
author: AI Maker Lab
pubDatetime: 2026-08-24T09:25:00+09:00
title: "Vibe Coding で作ったサイト・LPをどこに公開する？エックスサーバー vs ConoHa WING 個人開発者向け比較【2026年版】"
slug: vibe-coding-hosting-xserver-conoha-2026
featured: false
draft: false
tags:
  - hosting
  - vibe-coding
  - xserver
  - conoha
  - infrastructure
  - individual-dev
description: "Vibe Coding でブログ・LP・副業サイトを作ったあと、Vercel / CF Pages ではなく共有ホスティングを選ぶのはどんな場面か。エックスサーバーとConoHa WINGを個人開発・AI副業の視点で比較。PHP/WordPress連携・コスト・サポートを実運用ベースで整理しました。"
affiliateCta:
  - id: xserver
    lead: "長期安定稼働と実績重視ならエックスサーバー。2003年から続く国内最大級の実績とサポートが強みです。"
  - id: conoha
    lead: "コスト効率と最新機能重視ならConoHa WING。GMOグループの国内データセンターで低遅延を実現しています。"
---

<div class="relative mb-8 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 sm:h-32">
  <img src="/icons/individual-dev.png" alt="" aria-hidden="true" class="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「**AIで副業サイトを作ったけど、Vercel と xserver どっちにデプロイすればいい？**」

[Vibe Coding](/posts/vibe-coding-guide-2026/) で LP やブログを作れるようになった人が次に直面するのが、この「公開先」の問題です。

結論から言うと**用途によって答えが真逆**になります。Next.js / Astro の静的アプリなら Vercel / Cloudflare Pages（無料）で完結しますが、**WordPress 連携・PHP が必要・日本語サポートが欲しい** という場面では、日本の共有ホスティング（エックスサーバー or ConoHa WING）が最適解になります。

本記事では、**3つのメディアを AI でフル運用している立場**から、「Vibe Coder がいつ共有ホスティングを選ぶべきか」と「2大サービスの使い分け」を整理します。

<p class="mb-6 text-xs leading-6 text-stone-500 dark:text-stone-400">広告を含みます：エックスサーバー・ConoHa WING。評価・手順は広告と無関係に実体験で書いています。</p>

## 目次

- 30秒で結論：用途別「これを選べ」
- Vibe Coding でも共有ホスティングが要る場面
- エックスサーバー vs ConoHa WING 比較表
- エックスサーバー — 安定実績派のVibe Coderへ
- ConoHa WING — コスト最適化派のVibe Coderへ
- 「どちらを選ぶか」のチェックリスト
- FAQ
- まとめ

## 30秒で結論：用途別「これを選べ」

<div class="my-6 rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
  <p class="flex items-center gap-2 text-lg font-bold text-amber-900">✅ 編集部の結論</p>
  <p class="mt-2 text-amber-950">Vibe Coding で作ったサイトの公開先は<strong>用途で分岐する</strong>。静的アプリは無料の Vercel / CF Pages で完結。WordPress 連携・PHP・長期の副業ブログ運用なら共有ホスティング一択。2社の使い分けは「実績＝xserver・コスト＝ConoHa」で90%の判断が付く。</p>
  <div class="mt-4 grid gap-1.5 text-sm text-amber-950">
    <div class="flex items-center gap-2"><span class="w-28 flex-none">安定・実績</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:95%"></span></span><span class="w-8 text-right font-bold">Xserver</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">コスト効率</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:90%"></span></span><span class="w-8 text-right font-bold">ConoHa</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">WordPress速度</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:85%"></span></span><span class="w-8 text-right font-bold">どちらも◎</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">日本語サポート</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:90%"></span></span><span class="w-8 text-right font-bold">どちらも◎</span></div>
    <div class="flex items-center gap-2"><span class="w-28 flex-none">AI副業向き</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:90%"></span></span><span class="w-8 text-right font-bold">どちらも○</span></div>
  </div>
</div>

| あなたの状況 | 推奨 | 理由 |
|-------------|------|------|
| Next.js / v0 アプリを公開 | **Vercel（無料）** | [個人開発ホスティング記事](/posts/hosting-for-individual-developers-2026/)参照 |
| Astro / 静的サイト | **Cloudflare Pages（無料）** | 同上 |
| WordPress でアフィリブログ | **エックスサーバー or ConoHa WING** | PHP + MySQL + 独自ドメイン → 共有ホスティング |
| AI で作った LP を低コストで公開 | **ConoHa WING** | 月額を抑えつつ国内高速 |
| 長期稼働・障害対応を重視 | **エックスサーバー** | 20年超の実績・障害情報開示 |

<div class="my-6">
  <a href="/go/xserver" class="flex flex-col rounded-2xl bg-indigo-600 p-5 text-white no-underline shadow-sm transition hover:bg-indigo-700">
    <span class="text-lg font-bold">エックスサーバーの料金・特典を公式で確認する →</span>
    <span class="mt-1 text-sm text-indigo-100">本記事の比較ポイントを公式サイトで照合してからご判断ください</span>
  </a>
</div>

## Vibe Coding でも共有ホスティングが要る場面

Vibe Coding で生まれたコードの多くは、Next.js・Astro・React などの JavaScript フレームワーク製です。これらは **Vercel / Cloudflare Pages に無料でデプロイ**できるため、「共有ホスティングなんて要らない」と感じる人も多い。

でも、次のシナリオになった瞬間に話が変わります。

**1. WordPress で SEO ブログ・アフィリ記事サイトを作る**

AI（Claude Code / Cursor）を使って WordPress のカスタマイズ・記事の自動生成をする流れが広まっています。WordPress は PHP + MySQL 環境が必要なため、Vercel では動きません。共有ホスティングが必要になる最大の理由がこれです。

**2. PHP が必要なウェブアプリ（バックエンド付き）**

Vibe Coding でフォーム受付・簡易 CRM・API を PHP で作ると、共有ホスティングで安価に動かせます。VPS だと管理コストが上がるため、まず共有ホスティングで試す判断が現実的です。

**3. LP を長期で安定稼働させたい**

静的 HTML の LP なら Cloudflare Pages で十分ですが、長期で運用しながら A/B テストや CMS 管理をしたい場合は WordPress + 共有ホスティングが楽です。

**4. コスト固定・日本語サポートが要る副業初期**

Vercel の無料枠には帯域制限があり、一定のアクセスで有料化します。月額固定の共有ホスティングは、副業初期のコスト管理がしやすい点でメリットがあります。

## エックスサーバー vs ConoHa WING 比較表

共有ホスティングに絞った上での2択です。どちらも PHP・MySQL・WordPress に対応しており、基本スペックは拮抗しています。

| 項目 | エックスサーバー | ConoHa WING |
|------|----------------|-------------|
| 運営会社 | エックスサーバー株式会社 | GMOインターネット株式会社 |
| 運営開始 | 2003年（20年超） | 2019年（WING提供開始） |
| サーバー設置 | 大阪・東京 | 東京・大阪 |
| WordPress 対応 | ◎（Kusanagi技術を採用） | ◎（独自チューニング） |
| 無料独自ドメイン | 条件付きで付帯 | 条件付きで付帯 |
| サポート | 電話・メール・チャット | メール・チャット |
| 料金目安 | 公式サイトでご確認 | 公式サイトでご確認 |
| 向く人 | 長期安定稼働重視 | コスト最適化重視 |

> **料金について**：キャンペーン・契約期間により変動が大きいため、最新の価格は各公式サイトでご確認ください。本記事執筆時点（2026年8月）はどちらも月額数百円〜からの展開です。

## エックスサーバー — 安定実績派の Vibe Coder へ

2003年から稼働を続ける国内最古参クラスのホスティングサービス。**Vibe Coding で副業ブログを長期で回したい人**に向きます。

### 実際に使って分かった良い点と気になる点

<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-xl bg-emerald-50 p-4">
    <p class="font-bold text-emerald-800">✓ 良い点（3つ）</p>
    <ul class="mt-2 space-y-1 text-sm text-emerald-900">
      <li>20年超の稼働実績。障害発生時の公式情報開示が継続されている</li>
      <li>WordPress の表示速度が国内比較で安定上位。Vibe Coding で量産した記事がすぐ反映</li>
      <li>電話サポート対応あり。設定に詰まったとき日本語で即解決できる</li>
    </ul>
  </div>
  <div class="rounded-xl bg-rose-50 p-4">
    <p class="font-bold text-rose-800">✕ 気になる点（2つ）</p>
    <ul class="mt-2 space-y-1 text-sm text-rose-900">
      <li>ConoHa と比べると月額がやや高め。最初の年のコストが嵩む</li>
      <li>管理画面が機能豊富な分、初心者には設定項目が多く見える</li>
    </ul>
  </div>
</div>

**向く Vibe Coder のプロフィール：** 「副業ブログを2〜3年回して回収したい」「障害が起きたとき電話でサポートを受けたい」「安定第一で迷ったらここ」という人。

<div class="my-6">
  <a href="/go/xserver" class="flex flex-col rounded-2xl bg-indigo-600 p-5 text-white no-underline shadow-sm transition hover:bg-indigo-700">
    <span class="text-lg font-bold">エックスサーバー を公式で確認する →</span>
    <span class="mt-1 text-sm text-indigo-100">2003年運営開始の国内最大級レンタルサーバー。最新料金・特典は公式でご確認ください</span>
  </a>
</div>

## ConoHa WING — コスト最適化派の Vibe Coder へ

GMOインターネットグループが提供する、WING プランでの WordPress 特化ホスティング。**コストを抑えながら本番環境を立ち上げたい個人開発者・副業初期の人**に向きます。

### 実際に使って分かった良い点と気になる点

<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-xl bg-emerald-50 p-4">
    <p class="font-bold text-emerald-800">✓ 良い点（3つ）</p>
    <ul class="mt-2 space-y-1 text-sm text-emerald-900">
      <li>エックスサーバーと比較して月額コストを抑えやすい。副業初期の固定費管理に向く</li>
      <li>管理画面がシンプルで分かりやすく、Vibe Coding で作ったサイトのデプロイがスムーズ</li>
      <li>GMOグループの国内データセンター。アクセス集中時も国内アクセスの遅延が低い</li>
    </ul>
  </div>
  <div class="rounded-xl bg-rose-50 p-4">
    <p class="font-bold text-rose-800">✕ 気になる点（2つ）</p>
    <ul class="mt-2 space-y-1 text-sm text-rose-900">
      <li>WING プランの提供開始が2019年で、エックスサーバーと比べると歴史が浅い</li>
      <li>電話サポートがなく、メール・チャットのみ。障害時の問い合わせに時間がかかることも</li>
    </ul>
  </div>
</div>

**向く Vibe Coder のプロフィール：** 「まずコストを抑えて副業を始めたい」「Vibe Coding で量産したLPを低コストで並列公開したい」「管理画面がシンプルな方がいい」という人。

<div class="my-6">
  <a href="/go/conoha" class="flex flex-col rounded-2xl bg-teal-600 p-5 text-white no-underline shadow-sm transition hover:bg-teal-700">
    <span class="text-lg font-bold">ConoHa WING を公式で確認する →</span>
    <span class="mt-1 text-sm text-teal-100">GMOグループの国内ホスティング。最新料金・キャンペーンは公式でご確認ください</span>
  </a>
</div>

## 「どちらを選ぶか」のチェックリスト

迷ったらこの順番で確認してください。

**まず：「静的アプリか、WordPressか」**
- 静的サイト・Next.js・Astro → Vercel / Cloudflare Pages（無料。[詳細はこちら](/posts/hosting-for-individual-developers-2026/)）
- WordPress・PHP が必要 → 共有ホスティングへ進む

**次：「安定実績か、コスト優先か」**

| チェック項目 | エックスサーバー | ConoHa WING |
|------------|----------------|-------------|
| 電話サポートが欲しい | ✅ あり | ❌ なし |
| 初年度コストを最小化したい | △ やや高め | ✅ 抑えやすい |
| 20年超の実績を重視 | ✅ 2003年〜 | △ 2019年〜 |
| 管理画面のシンプルさ | △ 多機能 | ✅ シンプル |
| WordPress 速度 | ✅ 安定上位 | ✅ 安定上位 |

**判断基準の一言まとめ**
- どっちでも大差ない → **ConoHa WING**（コストで有利）
- 長期2〜3年で副業を回す・安心感重視 → **エックスサーバー**

<div class="my-6">
  <a href="/go/conoha" class="flex flex-col rounded-2xl bg-teal-600 p-5 text-white no-underline shadow-sm transition hover:bg-teal-700">
    <span class="text-lg font-bold">ConoHa WING でまずコスト確認 →</span>
    <span class="mt-1 text-sm text-teal-100">副業初期のコスト管理に向く。公式サイトで最新キャンペーンをご確認ください</span>
  </a>
</div>

## FAQ

**Q. Vibe Coding で作ったアプリは共有ホスティングにデプロイできますか？**

Next.js などのサーバーサイドレンダリング (SSR) アプリは、基本的には VPS や Vercel が必要です。共有ホスティングは静的ファイル（HTML/CSS/JS）と PHP の実行には対応していますが、Node.js の長期プロセス起動には制約があります。「静的 → 無料 JAMstack」「WordPress / PHP → 共有ホスティング」の使い分けが現実的です。

**Q. どちらが WordPress の表示速度が速いですか？**

エックスサーバー・ConoHa WING ともに WordPress の高速化に力を入れており、国内アクセスに最適化されています。どちらも適切にキャッシュ設定をすれば十分な速度が出ます。細かい差より「記事の質と内部リンク」の方が SEO に効きます。

**Q. AI で WordPress の記事を自動生成する場合、どちらが向きますか？**

どちらも同等に対応できます。Claude Code や ChatGPT で生成した記事を WordPress REST API で自動投稿するワークフロー（Vibe Coding の応用）は、どちらのホスティングでも動作します。管理コンソールの使いやすさで選んで問題ありません。

**Q. 最初は Vercel、後から xserver に移行することはできますか？**

Astro・Hugo などの静的サイトなら、ビルド済みファイルを FTP でアップロードするだけで移行できます。Next.js（SSR）の場合は静的エクスポート（`output: 'export'`）に変換する必要があります。WordPress へのリプレイスは構造が変わるため、別プロジェクトとして立て直す形が実務的です。

**Q. 独自ドメインはどちらのサービスで取得すればいいですか？**

ドメインはホスティングとは別に取得するのがおすすめです（ホスティングを変えても影響しないため）。Xserver ドメイン・お名前.com などでドメインを取得し、どちらの共有ホスティングにも接続できます。

## まとめ

Vibe Coding で副業サイト・LP・ブログを立ち上げる際のホスティング選びを整理しました。

**結論の再掲：**
- **静的アプリ・JAMstack** → Vercel / Cloudflare Pages（無料）でOK。[詳細記事はこちら](/posts/hosting-for-individual-developers-2026/)
- **WordPress・PHP・AI副業ブログ** → 共有ホスティングへ
  - **安定・実績重視** → エックスサーバー
  - **コスト最適化重視** → ConoHa WING

「どっちでもいい」と感じたら ConoHa WING でコストを抑えて始める。長期で稼ぎたい・障害時にサポートが欲しいならエックスサーバーを選ぶ。それだけの判断でほぼ間違いありません。

Vibe Coding で作ったコードに合うホスティングを選んで、副業を一歩前へ進めてください。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Vibe Coding で作ったアプリは共有ホスティングにデプロイできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.jsなどのSSRアプリはVPSやVercelが必要です。共有ホスティングは静的ファイルとPHPには対応していますが、Node.jsの長期プロセスには制約があります。静的サイトはVercel/CF Pages、WordPress/PHPは共有ホスティングの使い分けが現実的です。"
      }
    },
    {
      "@type": "Question",
      "name": "エックスサーバーとConoHa WINGでWordPressの速度はどちらが速いですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "どちらも国内アクセスに最適化されており、適切なキャッシュ設定をすれば同等の速度が出ます。細かい速度差よりも記事の質と内部リンク構造の方がSEOに影響します。"
      }
    },
    {
      "@type": "Question",
      "name": "エックスサーバーとConoHa WINGはどちらがVibe Coderに向きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "長期安定稼働と電話サポートを重視するならエックスサーバー、コストを抑えてシンプルな管理画面で始めたいならConoHa WINGが向きます。どちらでも迷う場合はコスト面でConoHa WINGが有利です。"
      }
    },
    {
      "@type": "Question",
      "name": "AIでWordPressの記事を自動生成する場合、どちらのホスティングが向きますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "どちらも同等に対応できます。WordPress REST APIを使った自動投稿ワークフローはどちらのホスティングでも動作します。管理コンソールの使いやすさで選んで問題ありません。"
      }
    },
    {
      "@type": "Question",
      "name": "最初はVercelで後からエックスサーバーに移行できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astro・Hugoなどの静的サイトならビルド済みファイルをFTPでアップロードすれば移行できます。Next.js（SSR）は静的エクスポートへの変換が必要で、WordPressへのリプレイスは別プロジェクトとして立て直す形が実務的です。"
      }
    }
  ]
}
</script>
