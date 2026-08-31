---
author: AI Maker Lab
pubDatetime: 2026-08-12T09:22:00+09:00
title: "Claude WorkbenchがConsoleに統合——Claude Code・Cursor開発者が知るべき変更点まとめ【2026年最新】"
slug: claude-workbench-console-2026
featured: false
draft: false
tags:
  - claude-code
  - cursor
  - ai-coding
  - vibe-coding
description: "Claude Workbenchが2026年8月17日に廃止されました。Console統合でClaude Codeのセットアップと開発フローが具体的にどう変わるか、Cursor vs Claude Codeの使い分けを含め実録で解説します。"
affiliateCta:
  - id: lovable
    lead: "CursorやClaude Codeで作ったアプリをそのままデプロイできます。ビルド→公開URLまで最短ルート。"
  - id: conoha
    lead: "独自ドメインで本番公開するなら、国内最速クラスのレンタルサーバー。WordPress・静的サイトどちらも対応。"
---

<div class="relative mb-8 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-violet-100 to-indigo-100 sm:h-32">
  <img src="/icons/code-block.png" alt="" aria-hidden="true" class="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

<p class="mb-6 text-xs leading-6 text-stone-500 dark:text-stone-400">広告を含みます：Lovable・ConoHa WING。評価・手順は広告と無関係に実体験で書いています。</p>

「**Claude Workbench が無くなるって聞いたけど、Claude Code の使い方は変わるの？**」

2026年8月17日、Anthropic は Claude Workbench（claude.ai 内のプロンプトテスト環境）の廃止を予告しています。Claude Code ユーザーや Cursor ユーザーから「何が変わるのか分からない」という声が増えていたので、**実際に AI Maker Lab の開発フローで Claude Code を常用している立場**から変更点を整理しました。

<div class="my-6 rounded-xl border-l-4 border-sky-500 bg-sky-50 p-5">
  <p class="font-bold text-sky-900 mb-2">この記事でわかること</p>
  <ul class="text-sm leading-7 text-sky-900 list-disc pl-4 mb-0">
    <li>Claude Workbench とは何で、Console 統合後に何が消えるか</li>
    <li>Claude Code ユーザーのセットアップ手順が変わる点・変わらない点</li>
    <li>Cursor vs Claude Code——Workbench 廃止後の使い分け判断基準</li>
    <li>作ったアプリを公開する際の現実的な選択肢</li>
  </ul>
</div>

## 目次

- Claude Workbench とは何だったのか（30秒で解説）
- 2026年8月17日廃止—何が変わり、何が変わらないか
- Claude Console で Claude Code を設定する（新しいワークフロー）
- Cursor vs Claude Code——Workbench 廃止後の使い分け
- 作ったアプリを公開する——ホスティングの選び方
- 正直なデメリット・弱点
- FAQ
- まとめ

## Claude Workbench とは何だったのか（30秒で解説）

Claude Workbench は、**claude.ai の中に組み込まれたプロンプトテスト環境**です。API を直接叩かなくても、システムプロンプトの調整・複数モデルの出力比較・Temperature（応答のランダム性）の調整などを、ブラウザ上で気軽に試せるプレイグラウンドでした。

「Claude Code のシステムプロンプトをどう書くか迷う」→「Workbench でモデルの反応を試してから CLAUDE.md に反映する」というループが、個人開発者の間でスタンダードな使い方になっていました。

これが **2026年8月17日に廃止**となり、同等機能は **Claude Console（console.anthropic.com）に統合**されます。

## 2026年8月17日廃止—何が変わり、何が変わらないか

<div class="my-6 rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
  <p class="flex items-center gap-2 text-lg font-bold text-amber-900">✅ 編集部の結論</p>
  <p class="mt-2 text-amber-950">Claude Code の<strong>コーディング体験自体は何も変わらない</strong>。変わるのはプロンプトを「試す場所」だけ。移行コストは実質ゼロで、むしろ Console 統合で API キー管理と一元化できるメリットがある。</p>
  <div class="mt-4 grid gap-1.5 text-sm text-amber-950">
    <div class="flex items-center gap-2"><span class="w-36 flex-none">移行コスト</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:90%"></span></span><span class="w-8 text-right font-bold">低</span></div>
    <div class="flex items-center gap-2"><span class="w-36 flex-none">Claude Code 体験への影響</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-emerald-500" style="width:10%"></span></span><span class="w-8 text-right font-bold">微</span></div>
    <div class="flex items-center gap-2"><span class="w-36 flex-none">Console への移行推奨度</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:100%"></span></span><span class="w-8 text-right font-bold">高</span></div>
  </div>
</div>

| 項目 | Workbench 廃止前 | Console 統合後 |
|------|-----------------|----------------|
| プロンプトテスト | claude.ai の Workbench | console.anthropic.com の API Playground |
| API キー管理 | console.anthropic.com | 変わらず console.anthropic.com |
| Projects（システムプロンプト保存） | console.anthropic.com | 変わらず |
| Claude Code の CLI 操作 | 変わらず | 変わらず |
| CLAUDE.md によるコンテキスト設定 | 変わらず | 変わらず |
| 料金・プラン | Anthropic Pro $22/月に同梱 | 変わらず（※最新は公式で確認） |

**結論：廃止で「無くなる」のは claude.ai の Workbench メニューだけ**。Claude Code を CLI で動かしている限り、日常の開発フローはほぼ影響を受けません。

<div class="my-6">
  <a href="/go/lovable" class="flex flex-col rounded-2xl bg-indigo-600 p-5 text-white no-underline shadow-sm transition hover:bg-indigo-700">
    <span class="text-lg font-bold">Lovable でアプリを無料で試す →</span>
    <span class="mt-1 text-sm text-indigo-100">プロンプトを渡すだけで動くアプリの形になる。Claude Codeで構想→Lovableで公開、の連携が快適</span>
  </a>
</div>

## Claude Console で Claude Code を設定する（新しいワークフロー）

Console 統合後の Claude Code 活用フローを、実際の手順に沿って整理します。

### 1. API キーは引き続き Console で管理

Claude Code には Anthropic の API キーが必要です。取得・管理場所は **console.anthropic.com** で変わりません。廃止前後でこの手順に差はゼロです。

```bash
# 設定は ~/.claude/config.json か ANTHROPIC_API_KEY 環境変数で
export ANTHROPIC_API_KEY="sk-ant-..."
claude
```

### 2. システムプロンプトのテストは Console の API Playground へ

Workbench 廃止後、「CLAUDE.md に書く前に Claude の反応を確認したい」は **Console の API Playground** で行います。UI は Workbench と類似しており、モデル選択・システムプロンプト入力・Temperature 調整が同じ感覚で使えます。

実際に当サイトの AI Maker Lab 業務でも、Workbench から Console Playground へ移行して **2日で慣れた**というのが率直な感想です。

### 3. Projects 機能でチームや複数プロジェクトを整理

Console の **Projects 機能**は、プロジェクト単位でシステムプロンプトと API キーを紐づけて管理できます。個人の複数サイト管理や、複数のフロントエンド・バックエンドプロジェクトを扱う場合に便利です。

CLAUDE.md との使い分けの目安：

- **CLAUDE.md**：ローカルリポジトリのコーディング規約・コンテキスト（git にコミットして追う）
- **Console Projects**：API レベルのシステムプロンプト（クラウドで管理・複数環境で共有したい設定）

## Cursor vs Claude Code——Workbench 廃止後の使い分け

GSC データで「cursor claude code」「cursor vs claude code」の検索が増えているため、Workbench 廃止後の視点から改めて整理します。

| 判断軸 | Cursor | Claude Code |
|-------|--------|-------------|
| 形態 | IDE（VS Code フォーク）内蔵 AI | CLI エージェント |
| プロンプト調整の場 | IDE 内の AI Panel | Console API Playground + CLAUDE.md |
| Workbench 廃止の影響 | ほぼゼロ（元々 Workbench 非依存） | テスト場所が Console に移るだけ |
| 得意なタスク | 今開いているファイルを対話的に編集 | 複数ファイル横断・自律的なリファクタ |
| 月額費用目安 | $20/月（Cursor Pro） | Anthropic Pro $22/月に同梱 |

> **情報の取得日**：料金情報は 2026-08-12 時点で各公式サイトで確認したものです。変動があるため、契約前に公式サイトで最新価格をご確認ください。

### どちらを選ぶかの判断基準

| あなたの状況 | 推奨 |
|------------|------|
| IDE でコードを見ながら AI と対話して編集したい | **Cursor** |
| ターミナルからプロジェクト全体に複数ステップの作業を任せたい | **Claude Code** |
| Vibe Coding で作った UI を素早く調整したい | **Cursor（差分確認がしやすい）** |
| CLAUDE.md でプロジェクト方針を書き込み、自走させたい | **Claude Code** |
| まず 1 つだけ選ぶなら | **Claude Code（Anthropic Pro に込みで追加コストゼロ）** |

**「どちらか一方」という発想を捨てるのが近道です**。当サイトでは、UI の調整や差分確認に Cursor を使い、複数ファイルをまたいだリファクタ・記事生成ジョブの自走には Claude Code を使う両立スタイルが、今も最も効率的です。

<div class="my-6">
  <a href="/go/lovable" class="flex flex-col rounded-2xl bg-indigo-600 p-5 text-white no-underline shadow-sm transition hover:bg-indigo-700">
    <span class="text-lg font-bold">Lovable で作ったアプリを無料で公開してみる →</span>
    <span class="mt-1 text-sm text-indigo-100">Claude Codeで設計→Lovableで実装→デプロイの流れが最短。無料枠でプロトタイプ公開まで到達できます</span>
  </a>
</div>

## 作ったアプリを公開する——ホスティングの選び方

Claude Code や Cursor でアプリを作った後の「公開」フローも整理しておきます。

**Vibe Coding（プロンプト中心）で作ったノーコード寄りのアプリ**には、[Lovable](/go/lovable) が最短です。ビルド設定なしで、Lovable の環境から直接公開 URL が発行されます。

**独自ドメインを持って本格的に公開したい、WordPress / 静的サイトをホストしたい**なら、国内レンタルサーバーが現実的な選択肢になります。

<div class="my-6">
  <a href="/go/conoha" class="flex flex-col rounded-2xl bg-emerald-700 p-5 text-white no-underline shadow-sm transition hover:bg-emerald-800">
    <span class="text-lg font-bold">ConoHa WING で独自ドメイン公開を始める →</span>
    <span class="mt-1 text-sm text-emerald-100">国内最速クラスのサーバー速度。独自ドメイン+SSL込みで本番公開の敷居が低い（最新料金は公式で確認）</span>
  </a>
</div>

選び方の目安：

- **プロトタイプ・SaaS っぽいもの**：[Lovable](/go/lovable) → 最短でデプロイ URL
- **ブログ・情報サイト・WordPress**：[ConoHa WING](/go/conoha) → 国内最速クラスの速度
- **Next.js / Astro などのフレームワーク**：Vercel / Cloudflare Pages（現状は未提携のため公式サイトで確認）

## 正直なデメリット・弱点

<div class="my-6 grid gap-4 sm:grid-cols-2">
  <div class="rounded-xl border-t-4 border-emerald-500 bg-emerald-50 p-4">
    <p class="font-bold text-emerald-900">Console 統合のメリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-emerald-950">
      <li>✓ API キー管理・プロンプトテスト・Projects が 1 画面に集約</li>
      <li>✓ 複数プロジェクトのシステムプロンプトをクラウドで管理できる</li>
      <li>✓ 個人開発者にとって移行コストがほぼゼロ</li>
    </ul>
  </div>
  <div class="rounded-xl border-t-4 border-rose-400 bg-rose-50 p-4">
    <p class="font-bold text-rose-900">デメリット・注意点</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-rose-950">
      <li>✕ Workbench の保存済みプリセットは Console に自動移行しない（手動の移植が必要）</li>
      <li>✕ Console の UI は Workbench より多機能なぶん、慣れるまでに数日かかる</li>
      <li>✕ Claude Code 自体は CLI なので GUI に慣れた人には入り口が急</li>
    </ul>
  </div>
</div>

**Workbench で保存していたプロンプトプリセットは自動移行されません**。廃止前に手元にテキストでコピーしておくことを強く推奨します。CLAUDE.md に転記してしまうのが一番確実です。

## FAQ

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Claude Workbench が廃止されても Claude Code は使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、引き続き使えます。Claude Code は CLI ベースのツールで、Workbench とは独立して動作します。廃止の影響はプロンプトテスト環境が Console に移るだけで、コーディング体験自体は変わりません。"
      }
    },
    {
      "@type": "Question",
      "name": "Workbench のプロンプトを Console に移行する方法は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "自動移行機能はありません。廃止前に Workbench 上の保存プロンプトをテキストとして手動でコピーし、Console API Playground または CLAUDE.md に貼り付けて保存してください。"
      }
    },
    {
      "@type": "Question",
      "name": "Cursor と Claude Code はどちらが初心者向きですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GUI（IDE 画面）で視覚的に操作したい初心者には Cursor が馴染みやすいです。一方 Claude Code はターミナル操作が必須で、CLI に慣れていない場合は入門コストがあります。プログラミング歴が浅い場合は、まず Cursor から試すのがおすすめです。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude Code は Anthropic Pro に含まれていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2026年8月時点では Anthropic Pro プランに Claude Code の利用枠が含まれています。ただし利用量に応じて API コストが別途発生するモデルへの変更があるため、契約前に公式サイトで最新の料金体系をご確認ください。"
      }
    }
  ]
}
</script>

**Q. Claude Workbench が廃止されても Claude Code は使えますか？**
A. はい、引き続き使えます。Claude Code は CLI ベースのツールで、Workbench とは独立して動作します。廃止の影響はプロンプトテスト環境が Console に移るだけです。

**Q. Workbench のプロンプトを Console に移行する方法は？**
A. 自動移行機能はありません。廃止前に Workbench 上の保存プロンプトをテキストでコピーし、Console API Playground または CLAUDE.md に貼り付けてください。

**Q. Cursor と Claude Code、初心者にはどちらが向きますか？**
A. GUI で視覚的に操作したい初心者には Cursor が馴染みやすいです。Claude Code はターミナル操作が必須で、CLI に慣れていないと入門コストがあります。プログラミング歴が浅い場合は Cursor から試すのがおすすめです。

**Q. Claude Code は Anthropic Pro に含まれていますか？**
A. 2026年8月時点では Anthropic Pro プランに Claude Code の利用枠が含まれています。料金変更の可能性があるため、契約前に公式サイトで最新の料金体系をご確認ください。

## まとめ

Claude Workbench の廃止（2026年8月17日）は、**Claude Code ユーザーにとって実質的な影響がほぼない変更**です。プロンプトのテスト場所が claude.ai から console.anthropic.com に移るだけで、CLI の操作感・CLAUDE.md によるコンテキスト設定・API キー管理はすべてそのまま続きます。

**廃止前にやっておくべきこと**：
1. Workbench に保存しているプロンプトプリセットを手動でテキストコピー
2. Console API Playground を一度触って UI に慣れておく
3. 重要なシステムプロンプトは CLAUDE.md に転記して git 管理下に置く

Cursor vs Claude Code の使い分けは「IDE で今のファイルを対話的に編集したいか（Cursor）」vs「プロジェクト全体に複数ステップを自走させたいか（Claude Code）」で決まります。どちらかを捨てるより、用途で使い分けるのが最も生産性が高くなります。

作ったものを世界に出す——そのゴールに向けて、[Lovable](/go/lovable) でプロトタイプを公開するか、[ConoHa WING](/go/conoha) で独自ドメインの本番環境を整えるかを検討してみてください。

---

*当記事は実際に Claude Code を業務利用している AI Maker Lab 編集部の実運用経験をもとに作成しています。料金・仕様は変更になる場合がありますので、契約前に各公式サイトでご確認ください（2026年8月12日作成）。*
