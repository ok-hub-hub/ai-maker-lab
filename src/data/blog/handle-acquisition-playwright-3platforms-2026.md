---
author: AI Maker Lab
pubDatetime: 2026-06-09T08:00:00+09:00
title: "ハンドル取得競争を Playwright で検証した記録【AI会社運営 J3-02】"
slug: handle-acquisition-playwright-3platforms-2026
featured: false
draft: false
modDatetime: 2026-07-02T10:00:00+09:00
tags:
  - journal
  - playwright
  - claude-code
  - ai-company
  - branding
description: "TikTok/Instagram/YouTube の3プラで同じハンドル名を取得するために、Playwright で URL 直叩き＋snapshot 検証を回した実記録。@trivia_loop は取得済、@hatena_lab は IG で被ってた、@nazo_lab で全揃い。個人開発者向けの「ブランド開設のリアル」を可視化します。"
---

<div class="relative mb-8 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 via-cyan-100 to-stone-100 sm:h-64">
  <img src="/icons/ai-side-business.png" alt="" aria-hidden="true" class="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「**TikTok で取れた、Instagram は取られてた、YouTube は名前変更必要**」──新規 SNS ブランドを 3 プラで揃えるのは、想像以上にパズルです。

当時、AI Maker Lab で動画ニッチの新ブランドを立ち上げることになり、**ハンドル `@nazo_lab` を TikTok / Instagram / YouTube の 3 プラで取得するまで、Playwright で実検証した記録**を残しました。ハンドル検証の自動化手法は、これから SNS ブランドを立ち上げるすべての個人開発者に使い回せます。

## 目次

- なぜハンドル名がそんなに大事なのか
- 第1候補 @trivia_loop の検証：取られてた
- 第2候補 @hatena_lab の検証：IG で韓国系ユーザーに先取
- 第3候補 @nazo_lab の検証：3プラ全揃い
- Playwright 検証コードの実装
- 「アカウント開設は Web 自動化禁止」という結論
- 学び：個人開発者のブランド開設チェックリスト
- 次回予告

## なぜハンドル名がそんなに大事なのか

SNS マーケで意外と軽視されがちなのが、**「3プラで同じハンドルを取れるか」**。

理由は3つ：

1. **クロスプロモーション効率**：TikTok で見た視聴者が Instagram を検索する時、同じハンドルなら一発で見つかる
2. **Linktree や URL シェアの統一感**：`linktr.ee/nazolab` `tiktok.com/@nazo_lab` `youtube.com/@nazo_lab` が揃うとブランドの説得力が桁違い
3. **検索 SEO**：「nazo_lab」で検索した時、3プラ全部表示されると視認性が大きく上がる

逆に、片方のプラだけ違うハンドル（例：`@nazo_lab_official` `@nazolab_jp` `@thenazolab`）になると、視聴者の脳内マッピングが複雑化して**ブランド認知が分散**します。

そこで、**3プラで取れる確率を最大化するハンドル候補を Playwright で実検証** することにしました。

## 第1候補 @trivia_loop の検証：取られてた

最初の候補は `@trivia_loop`（トリビアループ）。短い・覚えやすい・横文字で海外展開も可能。

Playwright で TikTok のプロフィール URL に直接アクセスする検証コード：

```javascript
await page.goto('https://www.tiktok.com/@trivia_loop');
await page.waitForLoadState('networkidle');
const title = await page.title();
console.log(title);
// → "Trivia Loop (@trivia_loop) | TikTok"
```

`title` がアカウント名を含むなら、そのハンドルは **既に取得済**。

実検証の結果：
- ハンドル `trivia_loop`
- 表示名 「Trivia Loop」
- フォロワー 10、いいね 43
- バイオ「Welcome to trivia loop! Follow for more quizzes 🧠」
- 既投稿あり（Flag quiz、Car logo quiz、Animal group names quiz）

→ **TikTok で既に取得済（クイズ系の小規模アカウント）。第1候補は脱落**。

## 第2候補 @hatena_lab の検証：IG で韓国系ユーザーに先取

第2候補は `@hatena_lab`（ハテナラボ）。日本語ニッチとの整合性も高い。

TikTok で `goto('/@hatena_lab')` → タイトル「このアカウントは見つかりませんでした」→ **TikTok は空き**。

次に Instagram で `https://www.instagram.com/hatena_lab/` を Playwright で確認：

```javascript
await page.goto('https://www.instagram.com/hatena_lab/');
await page.waitForLoadState('networkidle');
const title = await page.title();
// → "하테나 | はてな❓(@hatena_lab) • Instagram写真と動画"
```

→ **Instagram で韓国系ユーザー「하테나 | はてな❓」が既に取得**。3プラ統一は不可で脱落。

## 第3候補 @nazo_lab の検証：3プラ全揃い

第3候補 `@nazo_lab`（ナゾラボ）。日本語ニッチで「世界の謎・歴史のIF」と完全整合。

3プラ並列検証コード：

```javascript
// TikTok
await page.goto('https://www.tiktok.com/@nazo_lab');
// → "このアカウントは見つかりませんでした" ✅ 空き

// Instagram
await page.goto('https://www.instagram.com/nazo_lab/');
// → "ページが見つかりません • Instagram" ✅ 空き

// YouTube
await page.goto('https://www.youtube.com/@nazo_lab');
// → "404 Not Found" ✅ 空き
```

→ **3プラ全揃い！** `@nazo_lab` で確定。

## Playwright 検証コードの実装

私が実際に使った全体コードはこちらです（Claude Code に書かせた）：

```typescript
// scripts/check_handle_availability.ts
import { chromium } from 'playwright';

async function checkHandle(handle: string) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const results: Record<string, { available: boolean; title: string }> = {};

  // TikTok
  await page.goto(`https://www.tiktok.com/@${handle}`);
  await page.waitForTimeout(3000);
  const tiktokTitle = await page.title();
  results.tiktok = {
    available: tiktokTitle.includes('見つかりませんでした') || tiktokTitle.includes("Couldn't find"),
    title: tiktokTitle,
  };

  // Instagram
  await page.goto(`https://www.instagram.com/${handle}/`);
  await page.waitForTimeout(3000);
  const igTitle = await page.title();
  results.instagram = {
    available: igTitle.includes('ページが見つかりません') || igTitle.includes('Page not found'),
    title: igTitle,
  };

  // YouTube
  await page.goto(`https://www.youtube.com/@${handle}`);
  await page.waitForTimeout(3000);
  const ytTitle = await page.title();
  results.youtube = {
    available: ytTitle.includes('404'),
    title: ytTitle,
  };

  await browser.close();
  return results;
}

// 検証実行
const handles = ['trivia_loop', 'hatena_lab', 'nazo_lab', 'mystery_lab', 'if_history'];
for (const handle of handles) {
  console.log(`Checking @${handle}...`);
  const result = await checkHandle(handle);
  console.log(JSON.stringify(result, null, 2));
}
```

このコードを Claude Code に書かせて、ブラウザで実際に検証 → 結果を CSV で保存 → 候補一覧から「3プラ全揃い」をフィルタする、というフローです。**所要時間 3 分で 5 候補×3プラ=15 検証を完了**できます。

ハンドル選びで悩んだ個人開発者は、このスクリプトを使えば「直感」ではなく「データ」で候補を絞れます。

## 「アカウント開設は Web 自動化禁止」という結論

ハンドル検証は Playwright で 100% 自動化できますが、**「アカウント開設そのもの」は手動 or 半自動が正解**でした。

実検証で分かった事実：

| プラ | 自動化での新規開設 | 結果 |
|---|---|---|
| TikTok | 試行 | **「アカウントのステータス：リスクあり」警告ダイアログ表示**、シャドウBAN リスク高 |
| Instagram | 既存セッションありで試行 | Meta の BOT 検知厳しく、`aimaker_lab` セッションへの影響リスク |
| YouTube | `create_channel` トークン直接叩き | Google アカウントの登録名が自動採用され、確認モーダルなしでチャンネル作成 |

特に **TikTok の警告ダイアログ** は、Playwright を検知した可能性が高く、これ以上の自動操作は完全にリスク。

結論：
- **ハンドル候補検証 ✅ Playwright で全自動可能**
- **アカウント開設 ❌ Web 自動化は危険、スマホアプリ or 手動が安全**
- **ログイン後の設定操作（プロフィール編集・ハンドル変更）⚠️ 慎重に、警告が出たら即停止**

## 学び：個人開発者のブランド開設チェックリスト

3プラで新規 SNS ブランドを立ち上げる時の、私の運用ベストプラクティスです：

### ✅ DO
- ハンドル候補を **5-10 個** リストアップ
- **Playwright で一括検証**（所要 3 分）
- **「最速で 3プラ全揃い」を満たす候補**を選ぶ
- **アカウント開設はスマホアプリ**（特に TikTok・Instagram は Meta/ByteDance の BOT 検知が厳しい）
- **YouTube は確認モーダルで Google アカウント個人名を必ず置き換える**

### ❌ DON'T
- Web 自動化で新規開設しない（BAN リスク）
- 1 プラだけ違うハンドルにしない（ブランド認知分散）
- 「だいたい取れそう」と勘で決めない（後で困る）
- 個人 Google でチャンネル作ると「登録名」がそのままチャンネル名として残る（必ず別 Google アカウント or ブランドアカウント）

## その後の話（2026-07 追記）

正直に書くと、この `@nazo_lab` で立ち上げた動画ブランド自体は、市場との相性を検証した結果 1 ヶ月足らずで撤退しました。それでも**ハンドル検証の自動化フローだけは、その後のブランド立ち上げすべてで使い回しています**。「開設前に 3 分で 15 検証」は、やるかやらないかで後のブランド運用コストが大きく変わります。

ブランドを立ち上げたら、次は発信の中身です。記事コンテンツを AI で量産する体制については、[Catchy と Transcope をガチ比較した記事](/posts/catchy-vs-transcope-2026/)にまとめています。

### 関連記事

- [Catchy vs Transcope 徹底比較：AIライティングツールはどっちを選ぶべきか](/posts/catchy-vs-transcope-2026/)
- [Claude Code を AI 会社として運用した 1ヶ月の記録](/posts/claude-code-ai-company-1month-2026/)
- [Vibe Coding の基礎ガイド 2026](/posts/vibe-coding-guide-2026/)
