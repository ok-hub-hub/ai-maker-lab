---
author: AI Maker Lab
pubDatetime: 2026-05-19T10:00:00+09:00
title: "Claude Code 実体験｜セットアップから1ヶ月運用・月$20のコストを公開【2026】"
slug: claude-code-setup-1month-practical
featured: false
draft: false
tags:
  - claude-code
  - ai-coding
  - setup
  - cli
  - vibe-coding
description: "Claude Code を macOS / Windows でセットアップし1ヶ月運用。実コスト（Claude Pro 月$20）、よく使う基本コマンド、つまづいたポイントを実体験ベースで公開。AI 駆動で個人開発を回したい人の実践教本です。"
---

<div class="relative mb-8 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 sm:h-64">
  <img src="/icons/code-block.png" alt="" aria-hidden="true" class="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「**Claude Code を入れてみたいけど、結局どこからどう動かせばいいの？**」

公式ドキュメントは充実していますが、「**個人開発者が1人で1ヶ月使い倒した後に、何が分かるか**」という観点の情報はまだ薄いです。本記事では、編集部が **2026-04 中旬 〜 2026-05-19 の約1ヶ月、Claude Code を主力ツールとして AI 駆動の個人開発を回した実体験** をもとに、セットアップから運用までを実機目線で整理します。

> 本記事は **AI 駆動を堂々と明示する立場** で書いています。「実は AI が書いた」を隠す方針ではなく、**AI と一緒に1人会社を回す**ことを前提にした実践ガイドです。

## 目次

- 30秒結論：Claude Code は CLI で動く「自律エージェント」
- インストール手順（macOS / Windows）
- 基本コマンド一覧
- 1ヶ月運用で得た知見（実体験）
- 料金プラン・コスト（2026-05-19 取得）
- つまづいたポイントと回避策
- FAQ
- 関連記事

## 30秒結論：Claude Code は CLI で動く「自律エージェント」

- **位置づけ**：Anthropic 公式の **CLI 型 AI コーディングエージェント**。Cursor のような IDE ではなく、**ターミナルで Claude が直接ファイルを読み書き・コマンド実行する**設計
- **得意領域**：複数ファイルにまたがる調査・リファクタ、ターミナル作業の自動化、Markdown 駆動の運用、MCP（Model Context Protocol）連携
- **不向き**：単発のスニペット生成（→ ChatGPT/Claude.ai 直叩きで十分）、IDE 上の UI を見ながらの細かい編集（→ [Cursor](/posts/cursor-vs-claude-code-comparison/) のほうが快適）
- **編集部の実体験**：Claude Code 単体で **本サイト（AI Maker Lab）の本番公開・記事10本超・git コミット25本超** を回した（最新の記事数は [/posts](/posts/) 参照）。詳細は[「Claude Code で AI 会社を1ヶ月運営してみた」](/posts/claude-code-ai-company-1month-2026/) を参照

---

## インストール手順（macOS / Windows）

### 前提

- **Node.js 18 以上**（推奨は 20 LTS）
- **Anthropic アカウント**（[claude.com](https://claude.com/) でサインアップ）
- 推奨：**Claude Pro / Max プラン**（無料プランはレート制限が厳しい）

### macOS

ターミナルで以下を実行します（npm がグローバルインストールできることが前提）。

```bash
# npm でグローバルインストール
npm install -g @anthropic-ai/claude-code

# バージョン確認
claude --version

# 初回起動 → ブラウザで OAuth 認証
claude
```

`/Users/<name>/.claude/` にプロジェクト履歴・設定・メモリが保存されます。**ホームディレクトリ直下に `node_modules` を作らない** こと（Claude Code が混乱します）。

### Windows

PowerShell / Windows Terminal で同様に：

```powershell
npm install -g @anthropic-ai/claude-code
claude --version
claude
```

WSL2 環境で動かす場合は **WSL 側に Node.js をインストール**し、WSL 側で `claude` を起動するのが安定します。Windows ネイティブと WSL の両方に入れると認証情報が混在するので、どちらか一方に統一してください。

### 認証

初回 `claude` 実行時、**ブラウザが開いて Anthropic アカウントの OAuth 認証**が走ります。Claude Pro / Max 加入済みなら、**追加 API キー不要**でその利用枠内で動かせます（**Claude Code 通常運用枠**）。

---

## 基本コマンド一覧

Claude Code は **対話セッションを起動 → 自然言語で指示** が基本ですが、CLI フラグも豊富です。

<aside class="my-8 rounded-xl border-l-4 border-violet-500 bg-violet-50 p-5">
  <p class="flex items-center gap-2 font-bold text-violet-900">
    <svg aria-hidden="true" class="h-5 w-5 text-stone-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"></path></svg>
    よく使うコマンド早見表
  </p>
  <div class="mt-3 overflow-x-auto">
    <table class="w-full text-xs leading-6 text-violet-900">
      <thead>
        <tr class="border-b border-violet-300">
          <th class="py-1 text-left font-bold">コマンド</th>
          <th class="py-1 text-left font-bold">用途</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="py-1 font-mono">claude</td><td class="py-1">対話セッション起動（カレントディレクトリ）</td></tr>
        <tr><td class="py-1 font-mono">claude -p "..."</td><td class="py-1">ワンショット実行（CI / スクリプト向け）</td></tr>
        <tr><td class="py-1 font-mono">claude --resume</td><td class="py-1">直前セッションを再開</td></tr>
        <tr><td class="py-1 font-mono">/init</td><td class="py-1">CLAUDE.md（プロジェクト指示書）を生成</td></tr>
        <tr><td class="py-1 font-mono">/memory</td><td class="py-1">メモリ（横断保存）の編集</td></tr>
        <tr><td class="py-1 font-mono">/clear</td><td class="py-1">コンテキストをリセット</td></tr>
        <tr><td class="py-1 font-mono">/cost</td><td class="py-1">セッションのトークン・コスト確認</td></tr>
      </tbody>
    </table>
  </div>
</aside>

セッション内では **自然言語で指示** するだけで、Claude が `Read` / `Edit` / `Write` / `Bash` などのツールを自動で選んで動きます。ツール実行前に **承認プロンプト** が出るので、暴走の心配は少ないです。

### CLAUDE.md：プロジェクト指示書を仕込む

`/init` で雛形が作られる **`CLAUDE.md`** には、プロジェクト固有のルール・コマンド・ファイル構造を書いておきます。Claude Code はセッション開始時に自動でこれを読み込みます。

```markdown
# プロジェクト：AI Maker Lab

## ビルド
- npm run dev でローカル起動
- npm run build で本番ビルド（成果物 dist/）

## ルール
- 記事は src/data/blog/*.md に追加
- 日付は ISO8601 形式（+09:00）
- 価格は実接続で照合し、取得日を明記
```

CLAUDE.md を書くだけで、**毎セッションのお作法説明が不要**になり、判断のブレも減ります。

---

## 1ヶ月運用で得た知見（実体験）

ここからは AI 駆動を隠さずに書きます。本サイトの記事生成・公開・運用は **Claude Code に「AI 会社」の役割を与えて回した**結果です。

### 1. 「Markdown ファイル＋Claude Code」がドキュメント駆動運用の核になった

役割定義書・台帳・相談ログをすべて Markdown に書き、Claude Code に読ませる構成にしたところ、**人間1人で 進行中PJ台帳46回更新・相談ログ27件・公開記事10本超** を1ヶ月で消化できました（最新は [/posts](/posts/) 参照）。詳細は[「Claude Code で AI 会社を1ヶ月運営してみた」](/posts/claude-code-ai-company-1month-2026/) に書きました。

### 2. MCP（Model Context Protocol）で外部ツールを接ぐ

Claude Code は **MCP サーバー** を追加することで、ブラウザ自動化（[Playwright MCP](https://github.com/microsoft/playwright-mcp)）、Gmail / Google Calendar / Drive、社内ファイル参照などを横断できます。導入は `.claude/mcp.json` か `claude mcp add` の1コマンドです。

```bash
# Playwright MCP を追加
claude mcp add playwright npx @playwright/mcp@latest
```

ブラウザ実機で本番サイトの表示確認・価格取得・スクリーンショットができるようになり、**「机上の修正」と「実機検証」のギャップ**が一気に縮みました。

### 3. メモリで「同じ指摘を二度させない」

`/memory` で書き込んだ内容は、**プロジェクトをまたいで永続化**されます。失敗が起きたら即メモリに追記して **再発防止のルール化** を回す、というサイクルが効きます。

---

## 料金プラン・コスト（2026-05-19 取得）

公式 [claude.com/pricing](https://claude.com/pricing) より：

| プラン | 月額 | 利用範囲 |
|---|---|---|
| **Free** | $0 | 軽量利用、レート制限あり |
| **Pro** | $20 | 個人向け、Claude Code 通常運用枠 |
| **Max 5x** | $100 | 重めの個人開発、Pro の約5倍枠 |
| **Max 20x** | $200 | 終日ヘビーユーザー向け |
| **Team / Enterprise** | 別途 | 組織向け、SSO・監査ログ |

<aside class="my-8 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5">
  <p class="flex items-center gap-2 font-bold text-amber-900">
    <svg aria-hidden="true" class="h-5 w-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 6v12"></path><path d="M9 9.5a2.5 2.5 0 0 1 2.5-1.5h1A2.5 2.5 0 0 1 15 10.5c0 1.5-1.5 2-3 2s-3 .5-3 2A2.5 2.5 0 0 0 11.5 17h1a2.5 2.5 0 0 0 2.5-1.5"></path></svg>
    料金・コストの注意
  </p>
  <p class="mt-2 text-sm leading-7 text-amber-900">上記は <strong>2026-05-19 時点で claude.com/pricing から取得</strong>した目安です。Anthropic はプラン改定・新プラン追加を継続的に行うため、契約前に必ず公式サイトで最新情報を確認してください。Claude Code は API キーでの従量課金（Pay-as-you-go）でも利用できますが、個人開発の主力に据えるなら <strong>Pro / Max のサブスクのほうが結果的に安く済む</strong>傾向です。</aside>

**編集部の実コスト**：1ヶ月のメイン運用は **Claude Pro（$20）+ ChatGPT OAuth 経由の Codex SDK（$0 追加課金）+ Cloudflare Pages 無料枠** で完結。ドメイン代を含めても月 **約 ¥3,200 相当**。フリーランスの単発案件1本でほぼ回収できる水準です。

---

## つまづいたポイントと回避策

<aside class="my-8 rounded-xl border-l-4 border-red-500 bg-red-50 p-5">
  <p class="flex items-center gap-2 font-bold text-red-900">
    <svg aria-hidden="true" class="h-5 w-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    失敗を避けるための注意
  </p>
  <ul class="mt-2 list-disc pl-5 text-sm leading-7 text-red-900">
    <li><strong>ホーム直下に node_modules を作らない</strong>：Claude Code が誤って認識して混乱する。プロジェクトは必ずサブディレクトリに置く</li>
    <li><strong>ブラウザ自動化を「入れただけ」で使わない</strong>：MCP を入れたら明示的に「ブラウザで確認して」と指示しないと使わない</li>
    <li><strong>大きな refactor は1セッションでやらない</strong>：途中でコンテキストが詰まると判断が劣化する。/clear と git commit で区切る</li>
  </ul>
</aside>

<aside class="my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
  <p class="flex items-center gap-2 font-bold text-emerald-900">
    <svg aria-hidden="true" class="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    編集部の実体験メモ（AI 駆動明示）
  </p>
  <p class="mt-2 text-sm leading-7 text-emerald-900">本サイト（AI Maker Lab）は <strong>Claude Code を主力に据えた AI 駆動運営</strong>を行っています。記事の執筆・公開・FAQ schema 追加・本番デプロイまで、ほぼすべての作業を AI エージェント群と一緒に回しています。「AI が書いた記事」を隠す方針ではなく、<strong>AI と人間が組んで1人会社を回せる時代の運用ノウハウ</strong>を公開していくのが本サイトのスタンスです。</p>
</aside>

---

## FAQ

### Q1. Claude Code は Cursor の代わりになりますか？

**完全な代替ではなく、役割分担**です。IDE 上の UI を見ながらの細かい編集なら [Cursor](/posts/cursor-vs-claude-code-comparison/) のほうが快適、複数ファイル横断の調査・リファクタ・自動化なら Claude Code が強いです。両方併用が現実解です。

### Q2. 料金プランは Pro と Max のどちらを選ぶべき？

**個人開発で「毎日数時間」程度なら Pro $20 で十分**です。1日中 Claude Code を回す・複数プロジェクト並列で重い refactor を任せたい、というレベルになって初めて Max $100 を検討してください。

### Q3. 無料プランだけで使い続けられますか？

技術的には可能ですが、**レート制限が厳しく実用性は低い**です。1日数時間使うとすぐ上限に達します。本格運用するなら Pro $20 への加入が現実的なラインです。

### Q4. ターミナルが苦手な人でも使えますか？

最初の数日は戸惑いますが、**コマンドは `claude` 1つで起動**できるので、IDE 操作に慣れている人なら1週間で慣れます。むしろ「ターミナルが分からない」期間が、AI に教えてもらいながら学ぶ絶好の機会になります。

### Q5. API キーで従量課金にしたほうが安いですか？

軽量利用なら従量課金のほうが安いですが、**1ヶ月で数時間以上使うなら Pro / Max のサブスクのほうが結果的に割安**になることが多いです。`/cost` でセッションの想定料金を確認しつつ、月末に振り返って判断するのが安全です。

---

## まとめ

Claude Code は、**CLI で動く自律エージェント** という、Cursor とは設計思想が異なる AI コーディングツールです。**Markdown ファイル＋Claude Code＋MCP** の3点セットで、個人開発者でも「1人会社」レベルの運用が回ります。

迷ったらまず **Claude Pro $20 に加入 → `npm install -g @anthropic-ai/claude-code` → `/init` で CLAUDE.md** の順で始めてみてください。

[Claude Code 公式ドキュメント →](https://docs.claude.com/en/docs/claude-code/)

---

## 関連記事

- [Claude Code で AI 会社を1ヶ月運営してみた](/posts/claude-code-ai-company-1month-2026/) — 役割定義書・運営ログ全公開
- [Cursor vs Claude Code 徹底比較](/posts/cursor-vs-claude-code-comparison/) — 設計思想・料金・使い分けの比較
- [Vibe Coding 完全ガイド 2026](/posts/vibe-coding-guide-2026/) — AI 時代の個人開発入門
- [AI 副業ロードマップ 2026](/posts/ai-side-business-roadmap-2026/) — 個人開発からの収益化シナリオ
- [Catchy vs Transcope 徹底比較](/posts/catchy-vs-transcope-2026/) — Claude Code で作ったサイトの記事量産に使うAIライティングツール
- [未経験からITエンジニア転職 完全ガイド](/posts/it-engineer-career-start-2026/) — AIスキルを仕事にする選択肢

---

## 情報の一次性について

本記事は **AI Maker Lab 編集部が 2026-04 中旬 〜 2026-05-19 の約1ヶ月間、Claude Code を主力ツールとして運用した一次情報** に基づきます。料金は 2026-05-19 時点の [claude.com/pricing](https://claude.com/pricing) 取得値です。プラン・価格は変動するため、契約前に必ず公式サイトでご確認ください。

---

<div class="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
  <p class="mb-1 text-xs font-semibold tracking-wide text-amber-700">AI Maker Lab の自社商品</p>
  <p class="mb-2 text-lg font-bold text-amber-900">AI会社運営テンプレ＋1ヶ月実運営ログ</p>
  <p class="mb-4 text-sm leading-relaxed text-amber-900/80">Claude Code で動く4部門AI会社のテンプレ集（役割定義書5本・運用ファイル7本・1ヶ月の実運営ログ・ハンドブック全8章）。OSSの無料テンプレでは再現できない「実運営の判断・失敗・リカバリの記録」付き。リリース後6ヶ月は月次アップデート無料。</p>
  <a href="https://okamuse.gumroad.com/l/ai-company-ops-template" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 font-medium text-white no-underline transition hover:bg-amber-700">$39（プロモ価格）でテンプレを見る →</a>
  <p class="mt-3 text-sm text-amber-900/70">まず読み物で試したい方は → <a href="https://zenn.dev/aimakerlab/books/bead6d47a62b9d" target="_blank" rel="noopener" class="underline">Zenn本「AIに会社を任せてみた」（¥1,000・1章無料試し読み）</a></p>
  <p class="mt-2 text-sm text-amber-900/70">日本語・円決済なら → <a href="https://coconala.com/contents_market/pictures/cmrg0cn5t03pj8i0hqae820bf" target="_blank" rel="noopener" class="underline">完全キット（ココナラ・ガイド10章＋テンプレ8点・リリース価格）</a></p>
</div>

## Amazon で関連書籍・ガジェットを探す

本記事のテーマ（Claude Code・AI コーディング・個人開発）に関連する書籍・教材は Amazon でも購入できます。

- <a href="https://www.amazon.co.jp/s?k=Claude+Code+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Claude Code 関連書を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=AI%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">AI コーディング関連書を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=%E5%80%8B%E4%BA%BA%E9%96%8B%E7%99%BA+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">個人開発本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=TypeScript+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">TypeScript 本を探す →</a>

※ AI Maker Lab は Amazon アソシエイト・プログラムの参加サイトとして、商品のリンク経由のご購入から紹介料を受け取ります。掲載内容そのものは公平な視点で執筆しています。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Claude Code は Cursor の代わりになりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "完全な代替ではなく役割分担です。IDE 上の UI を見ながらの細かい編集なら Cursor のほうが快適、複数ファイル横断の調査・リファクタ・自動化なら Claude Code が強く、両方併用が現実解です。"
      }
    },
    {
      "@type": "Question",
      "name": "料金プランは Pro と Max のどちらを選ぶべきですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "個人開発で毎日数時間程度なら Pro $20 で十分です。1日中 Claude Code を回す・重い refactor を並列で任せるレベルで初めて Max $100 を検討する流れが目安です。"
      }
    },
    {
      "@type": "Question",
      "name": "無料プランだけで使い続けられますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "技術的には可能ですがレート制限が厳しく実用性は低いです。1日数時間使うとすぐ上限に達するため、本格運用には Pro $20 以上の加入が現実的です。"
      }
    },
    {
      "@type": "Question",
      "name": "ターミナルが苦手な人でも使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "起動は claude 1コマンドだけなので、IDE 操作に慣れている人なら1週間で慣れます。むしろ AI に教えてもらいながらターミナル操作を覚える絶好の機会になります。"
      }
    },
    {
      "@type": "Question",
      "name": "API キーで従量課金にしたほうが安いですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "軽量利用なら従量課金が安いことがありますが、1ヶ月で数時間以上使うなら Pro / Max のサブスクのほうが割安になる傾向です。/cost でセッションコストを確認しつつ月末に判断するのが安全です。"
      }
    }
  ]
}
</script>
