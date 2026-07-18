---
author: AI Maker Lab
pubDatetime: 2026-05-25T03:30:00+09:00
title: "Vibe Coding でランディングページを30分で作る実装パターン10【v0 / Lovable 併記・2026年版】"
slug: vibe-coding-landing-page-in-30min-2026
featured: true
draft: false
tags:
  - vibe-coding
  - v0
  - lovable
  - landing-page
  - shadcn-ui
  - tailwind
  - implementation
description: "v0 と Lovable で LP を30分以内に作る実装パターンを10種類、プロンプト例とツール別手順で網羅。ヒーローのみ・3カラム・FAQ・縦長 LP・料金表・申し込みフォーム・A/B テスト・モバイル特化・shadcn/ui・Tailwind v4 ダーク対応まで編集部の所見付きで解説します。"
---

<div class="relative mb-8 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-100 via-pink-100 to-orange-100 sm:h-32">
  <img src="/icons/vibe-coding.png" alt="" aria-hidden="true" class="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「Vibe Coding でランディングページを作りたいけど、**どのツールでどう書けば30分で終わるのか**が分からない」

これは AI Maker Lab 編集部に届く相談のなかで、いちばん多いテーマです。本記事は **v0 by Vercel と Lovable の2つを軸に、LP を30分以内に作るための実装パターン10種類**を、プロンプト例・ツール別手順・編集部所見つきで整理しました。AI 駆動の個人開発に振り切ったメディアとして、編集部が実際に使っている再現性のあるテンプレート集としてご活用ください。

> 本記事は **AI Maker Lab 編集部（運営者 + AI 編集部の協働運用）が 2026-04〜2026-05 にかけて [v0](/posts/v0-review-2026/) / [Lovable](/posts/v0-vs-lovable-vs-bolt-2026/) で実際に LP を量産した一次経験** をベースに執筆しています。料金・機能は 2026-05 時点の公式情報です。

## この記事で扱う10パターン

1. ヒーロー + CTA ボタンだけの最短 LP
2. ヒーロー + 3カラム特徴 LP
3. ヒーロー + FAQ アコーディオン LP
4. 縦長 LP（複数セクション）
5. 料金表 LP
6. 申し込みフォーム付き LP
7. A/B テスト用バリエーション LP
8. レスポンシブ・モバイル特化 LP
9. shadcn/ui を活用した実装
10. Tailwind v4 ベース・ダーク対応 LP

各パターンに **v0 でやる手順** と **Lovable でやる手順** を併記しています。ツール特性は以下のとおり整理しています（[詳細な比較は v0 vs Lovable vs Bolt 記事](/posts/v0-vs-lovable-vs-bolt-2026/) で深掘り）。

- **v0**：shadcn/ui ベース、Next.js 出力、Vercel への Publish が1クリック。UI 量産機としての完成度が高い
- **Lovable**：Supabase 統合がデフォルト、フォーム → DB 保存まで一気通貫。LP からそのまま MVP に育てやすい

---

## パターン1：ヒーロー + CTA ボタンだけの最短 LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span><span class="text-emerald-700">入門</span></span>

「とにかく公開する」用途の最短 LP。ローンチ告知・メール登録だけが目的のときの第1選択肢。

**v0 でやる手順**

```
ヒーローセクション1枚だけの LP。
- 中央寄せのタイトル（H1）「<プロダクト名>」
- サブタイトル1行（30字以内）
- CTA ボタン1つ（プライマリ：ウェイトリストに登録）
- 背景はグラデーション（cyan-to-indigo）
- ダークモード対応
- レスポンシブ
```

「ダークモード対応」を必ず入れると、Tailwind の `dark:` プレフィックスが自動で付きます。

**Lovable でやる手順**

```
シンプルなヒーロー LP を作って。
タイトルとサブタイトル、CTA は「ウェイトリスト登録」。
登録フォームはメールアドレスのみ、送信先は Supabase の waitlist テーブル。
ダークモード対応。
```

Lovable は CTA を Supabase テーブルへ自動で繋ぐので、**「ボタンが押された瞬間にメールアドレスが溜まり始める」**状態が30分以内に作れます。

**編集部所見**：ローンチ前ウェイトリストは「公開する勇気」が最大のボトルネック。v0 で見た目だけ作るより、**Lovable で DB 込みで作って公開してしまう**ほうが ROI が高いケースが多いです。

---

## パターン2：ヒーロー + 3カラム特徴 LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span><span class="text-emerald-700">入門</span></span>

SaaS・ガジェット・コミュニティの紹介で頻出。「速い・安い・うまい」の現代版。

**v0 でやる手順**

```
ヒーロー + 3カラム特徴 LP。
- 上部：ヒーロー（タイトル + サブ + CTA ボタン2つ）
- 中段：特徴3カラム（アイコン + 見出し + 80字説明）
  1. 速度：「30分で公開」
  2. コスト：「月額0円から開始」
  3. 品質：「shadcn/ui 標準」
- 下部：CTA リピート
- カラースキームは fuchsia-to-orange
```

**Lovable でやる手順**

```
3カラム特徴付き LP を作って。
特徴は「速度・コスト・品質」で、それぞれにアイコン（Lucide React）。
CTA はメール登録、Supabase の signups テーブルに保存。
```

**編集部所見**：3カラムは **特徴の文字数を80字以内に揃える**だけで読みやすさが激変します。「ヒーロー → 特徴 → CTA」の三段構成は LP の基本形なので、最初の1枚目として最も汎用性が高いです。

---

## パターン3：ヒーロー + FAQ アコーディオン LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span><span class="text-emerald-700">入門</span></span>

価格や使い方への疑問が多い B2B SaaS・有料サービスで効くパターン。

**v0 でやる手順**

```
ヒーロー + FAQ アコーディオン LP。
- ヒーロー：タイトル + サブ + CTA「無料で試す」
- FAQ セクション：6問のアコーディオン
  Q1. 料金は？
  Q2. 解約はいつでもできる？
  Q3. データは安全？
  Q4. 商用利用は可能？
  Q5. サポートは？
  Q6. 法人契約はある？
- shadcn/ui の Accordion を使う
- 各 FAQ の回答は150字程度
```

**Lovable でやる手順**

```
FAQ アコーディオン付き LP を作って。
FAQ 内容は Supabase の faqs テーブルから取得する構造で。
ヒーロー + FAQ + フッターに問い合わせフォーム。
```

Lovable の特徴は「**FAQ を CMS のように DB 管理できる**」点。後から運営側で FAQ を追加・編集する運用に向きます。

**編集部所見**：FAQ は **JSON-LD の FAQPage schema** を埋めると検索流入が改善します。v0 / Lovable の出力に schema は含まれないので、AI Maker Lab では Claude Code で後付けする運用にしています。

---

## パターン4：縦長 LP（複数セクション）<span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-amber-400"></span><span class="text-amber-700">実践</span></span>

ローンチ用の本格 LP。ヒーロー → 課題 → 解決 → 機能 → 実績 → 料金 → FAQ → CTA の8セクション構成。

**v0 でやる手順**

```
8セクション構成の縦長 LP。
1. ヒーロー（タイトル + CTA + プロダクトのスクリーンショット風プレースホルダー）
2. 課題セクション（読者の3つの悩み）
3. 解決セクション（プロダクトの3つの強み）
4. 機能紹介（4機能 + アイコン + 説明）
5. お客様の声（テスティモニアル3件）
6. 料金プラン（3プラン比較カード）
7. FAQ（5問アコーディオン）
8. 最終 CTA + フッター
- セクション間にスクロールアニメーション（fade-in）
- ダークモード対応
```

**Lovable でやる手順**

```
8セクション縦長 LP を作って。構成は v0 と同じ。
お客様の声は Supabase の testimonials テーブルから取得。
料金プランも Supabase の plans テーブルから取得。
最終 CTA は Stripe チェックアウト連携で。
```

Lovable は **Stripe 連携を1プロンプトで組める**のが強み。「ボタンを押したら決済画面に飛ぶ」ところまで30分でいけます。

**編集部所見**：縦長 LP は **「課題 → 解決」の橋渡しの言語化**が9割。プロンプトに「読者が抱える具体的な悩み3つ」「自社が解決する具体的な方法3つ」を箇条書きで渡すと、出力品質が段違いに上がります。

---

## パターン5：料金表 LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-amber-400"></span><span class="text-amber-700">実践</span></span>

SaaS の販売ページ。月額/年額切替・「人気」バッジ・年額20%オフ表示の3点セットがコンバージョン定石。

**v0 でやる手順**

```
料金プラン特化 LP。
- 上部に月額/年額切替トグル（年額は20%オフ表示）
- 3プラン比較カード（Free / Pro / Business）
  - Free：$0、月7メッセージ、基本機能
  - Pro：$30/月、無制限メッセージ、優先サポート（「最も人気」バッジ）
  - Business：$100/月、チーム機能、SLA保証
- 各カードに CTA ボタン
- 下部に機能比較テーブル（10項目）
- FAQ 5問
- shadcn/ui の Card + Switch + Table を使う
```

**Lovable でやる手順**

```
料金 LP を作って。月額/年額切替、3プラン、CTA は Stripe 連携。
プラン情報は Supabase の plans テーブルから取得して、
管理画面で編集できる構造にして。
```

Lovable は **「料金を変えたくなったら DB を更新するだけ」**の構造を一発で作ります。LP を運用しながら価格テストする運営に最適。

**編集部所見**：料金 LP は **「Pro プランに最も人気バッジを付ける」**だけでクリック率が体感1.5〜2倍に変わります。これは v0 / Lovable の出力にプロンプト1行で組み込めるので、必ず指定してください。

---

## パターン6：申し込みフォーム付き LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-amber-400"></span><span class="text-amber-700">実践</span></span>

イベント告知・無料体験・資料請求の定番。

**v0 でやる手順**

```
申し込みフォーム付き LP。
- ヒーロー + フォーム
- フォームフィールド：氏名・メール・会社名・電話番号・希望日程（カレンダー）・備考
- バリデーション（必須項目チェック）
- 送信成功時にサンクスメッセージ表示
- shadcn/ui の Form + Input + Calendar を使う
- フォームのデータは Console.log のみ（実送信は後付け）
```

**Lovable でやる手順**

```
申し込みフォーム LP を作って。
フォーム内容は Supabase の registrations テーブルに保存。
送信後は確認メールを Resend 経由で送信。
管理画面で申込一覧を見られるようにして。
```

ここが Lovable のもっとも強い領域。**「フォーム → DB 保存 → 確認メール → 管理画面」**まで30分で動く状態が作れます。v0 だと別途 Cursor / Claude Code でロジックを組む必要があるので、申し込みフォーム系は Lovable 一択といって良いでしょう。

**編集部所見**：申し込み完了率は **「フィールド数を最小限に絞る」**ことが最大の効きどころ。最初は「氏名 + メール」の2項目だけで作り、運用しながら追加していくのが定石です。

---

## パターン7：A/B テスト用バリエーション LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-rose-500"></span><span class="text-rose-700">応用</span></span>

同じ商品で見出しを2パターン作って配信し、コンバージョン率を比較する用途。

**v0 でやる手順**

```
A/B テスト用 LP を2バリエーション。
- バリエーション A：見出し「30分で LP が公開できる Vibe Coding ツール」
- バリエーション B：見出し「コードを書かずに LP を量産する AI ツール」
- 本文・CTA・画像はすべて同じ
- それぞれ独立した URL で公開できる構造
```

v0 は **Project を2つ作る**運用が現実的。バリエーション A / B でそれぞれ Publish し、広告配信側で URL を切り替えます。

**Lovable でやる手順**

```
A/B テスト機能付き LP を作って。
URL の ?variant=a / ?variant=b で見出しを切り替え。
クリック数を Supabase の ab_clicks テーブルに記録。
管理画面で A/B のコンバージョン率を可視化。
```

Lovable は **A/B のロギングまで DB に組み込める**ので、計測まで一気通貫で作れます。

**編集部所見**：A/B テストは **最低でも片側1,000 PV** ないと統計的に有意な差が出ません。少アクセス時はテストせず、まず流入を作るのが先決です。

---

## パターン8：レスポンシブ・モバイル特化 LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-amber-400"></span><span class="text-amber-700">実践</span></span>

モバイル流入が9割の業種（コスメ・転職・サブスク）で必須。

**v0 でやる手順**

```
モバイル特化 LP。
- モバイルファースト（PC は副次的）
- 親指で押しやすい大型 CTA ボタン（高さ56px以上）
- スティッキー CTA（画面下部に常時固定）
- ハンバーガーメニュー（モバイル時のみ）
- 縦スワイプ前提のセクション構成
- 画像は WebP、遅延読み込み
```

「親指で押しやすい高さ56px以上」「スティッキー CTA」を明示するのが効きどころ。

**Lovable でやる手順**

```
モバイル特化 LP を作って。
- モバイルファースト
- スティッキー CTA で Supabase の clicks テーブルにクリック数を記録
- 画像は Supabase Storage に保存して配信
```

**編集部所見**：[ココラボ](https://kokolabo.jp/) など編集部運営の本番 UGC サイトでは **モバイル流入が85〜90%** を占めます。LP もデフォルトでモバイル特化に振り切るほうが、PC を別途最適化するより総コンバージョンが大きい体感です。

---

## パターン9：shadcn/ui を活用した実装 <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-amber-400"></span><span class="text-amber-700">実践</span></span>

v0 はそもそも shadcn/ui ベースで出力されるため、明示しなくても shadcn/ui が入ります。**Lovable で shadcn/ui を使いたい場合は明示が必要**。

**v0 でやる手順**

```
LP を作って。
- shadcn/ui の Button / Card / Accordion / Form / Table をフル活用
- カスタマイズは Tailwind の variants で
- ダークモード切替トグルを右上に
```

**Lovable でやる手順**

```
LP を shadcn/ui ベースで作って。
- shadcn/ui を必ず使う
- Button / Card / Accordion / Form / Table を活用
- カラーパレットは tailwind.config.ts で集中管理
```

**編集部所見**：shadcn/ui の最大の価値は **「コンポーネント単位でコピペできる」**こと。後から Claude Code で個別カスタマイズするときに、各コンポーネントが独立しているので保守性が桁違いに高くなります。

---

## パターン10：Tailwind v4 ベース・ダーク対応 LP <span class="inline-flex items-center gap-1 align-middle text-sm"><span class="inline-block h-2.5 w-2.5 rounded-full bg-rose-500"></span><span class="text-rose-700">応用</span></span>

Tailwind v4 の `@theme` ディレクティブ・CSS-first 構成に対応した最新スタイル。

**v0 でやる手順**

```
Tailwind v4 ベースの LP。
- @theme ディレクティブでカラーパレット定義
- CSS-first 構成（@apply は最小限）
- ダークモードは prefers-color-scheme と class 切替の両対応
- light / dark の切替トグルを右上に
- カラーは oklch ベースで定義
```

**Lovable でやる手順**

```
Tailwind v4 ベースの LP を作って。
- @theme でカラー定義
- ダークモード対応（class 切替）
- 設定は Supabase の theme_settings テーブルに保存して、
  ユーザーごとに保存されるように
```

**編集部所見**：Tailwind v4 は 2026 年現在まだベータ気味の部分があり、ライブラリとの相性問題が出る場面があります。**確実性を取るなら v3 系のままが安全**。最新を試したい人だけ v4 にチャレンジしてください。

---

## 編集部の所見：どのパターンが ROI 高いか

10パターンを実運用した編集部の結論として、**個人開発者の最初の30分の投資先**は以下の順序がおすすめです。

<aside class="my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
  <p class="flex items-center gap-2 font-bold text-emerald-900">
    <svg aria-hidden="true" class="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    編集部の実体験メモ（AI 駆動明示）
  </p>
  <p class="mt-2 text-sm leading-7 text-emerald-900">本サイト（AI Maker Lab）の最初の LP は <strong>パターン1（ヒーロー + CTA だけ）</strong> を Lovable で30分で作って公開しました。アクセス計測を始めてから、パターン4（縦長 LP）に育てたほうが <strong>「公開してから直す」</strong> サイクルが早く、編集部としては「30分の公開」のほうが「3日の完璧」より価値が高いと結論づけています。</p>
</aside>

ROI 順の推奨：

1. **パターン1（ヒーロー + CTA）** ：最初に作る。公開するハードルを下げる
2. **パターン6（申し込みフォーム）** ：問い合わせ・無料体験で実際の見込み客を貯める
3. **パターン2（3カラム特徴）** ：パターン1の次の進化形
4. **パターン4（縦長 LP）** ：本格運用フェーズで作る
5. **パターン5（料金表）** ：マネタイズ開始時に作る

---

## ツール選定の最終判断（編集部の現場感）

- **30分で公開したいだけ** → Lovable（DB / 認証 / 決済まで統合済み）
- **デザインを細かく追い込みたい** → v0（shadcn/ui ベースで shadcn コンポーネントへの慣れも蓄積）
- **既存のコードベースに組み込みたい** → v0 で Next.js コードを書き出して Cursor / Claude Code で繋ぐ
- **A/B テスト・ロギングまでやりたい** → Lovable

両方とも無料枠で十分試せるので、**実際に1パターン作って手応えを確かめる**のが最速です。

---

## FAQ

### Q1. v0 と Lovable のどちらから始めるべきですか？

**「LP の先に DB が必要かどうか」**で決めるのがおすすめです。ウェイトリスト登録・申し込みフォーム・ユーザー管理が必要なら Lovable、純粋に LP の見た目だけなら v0 が手早いです。

### Q2. 本当に30分で作れますか？

**パターン1〜3、5〜6、8 は30分以内**で作れます。パターン4（縦長 LP）・パターン7（A/B テスト）・パターン10（Tailwind v4）は1〜2時間見ておくのが現実的です。

### Q3. 公開するドメインは何を使えばいいですか？

最速は **v0 / Lovable のサブドメイン** で公開する方法。本格運用には [お名前.com](/go/onamae/) などの独自ドメインを取得して接続するのがおすすめです（詳細は [独自ドメイン取得ガイド](/posts/domain-selection-guide-2026/)）。

### Q4. 生成された LP のホスティングは無料ですか？

v0 は Vercel への Publish が無料枠で可能、Lovable も独自のホスティングが無料枠で含まれます。本格運用で帯域が増えた場合は [国産レンタルサーバー](/posts/hosting-for-individual-developers-2026/) などへの引っ越しも選択肢になります。

### Q5. LP の SEO はこれだけで十分ですか？

メタタグ・OGP・FAQ schema は **後付けで Claude Code に依頼するのが現実的**です。v0 / Lovable の生成物には含まれないため、別途整備してください。

---

## まとめ

10パターンを覚えておくと、Vibe Coding で LP を作るときに **「次に何を書けばいいか」迷う時間がゼロ**になります。AI Maker Lab 編集部は本記事の10パターンをテンプレ化して、案件ごとに使い回しています。

[v0 を試す（無料枠あり） →](/go/v0/)

[Lovable を試す（無料枠あり） →](/go/lovable/)

---

## 関連記事

- [v0 by Vercel とは：料金・使い方・個人開発者の実践レビュー](/posts/v0-review-2026/) — v0 単独の深掘り
- [v0 vs Lovable vs Bolt：Vibe Coding 3大ツール比較](/posts/v0-vs-lovable-vs-bolt-2026/) — UI 生成ツール横並び比較
- [v0 で個人開発を始めた人のための実装パターン10選](/posts/v0-implementation-patterns-10/) — v0 単独の実装パターン集
- [Vibe Coding 完全ガイド 2026](/posts/vibe-coding-guide-2026/) — AI 時代の個人開発入門
- [Vibe Coding × Supabase で認証 + DB のアプリを1日で動かす](/posts/vibe-coding-auth-db-in-1day-2026/) — LP の次のステップ
- [Vibe Coding で SaaS MVP を1週間で動かすロードマップ](/posts/vibe-coding-saas-mvp-in-1week-2026/) — 本格 SaaS 化への道筋

---

## 情報の一次性について

本記事の10パターンは **AI Maker Lab 編集部が 2026-04〜2026-05 に v0 / Lovable で実際に作った LP の運用経験** をもとに整理しています。料金・機能は 2026-05 時点の公式情報です。ツール選定の最終判断は読者の用途・予算・スキルセットに依存します。

---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-6">
  <p class="mb-1 text-xs font-semibold tracking-wide text-violet-700">AI Maker Lab の自社商品</p>
  <p class="mb-2 text-lg font-bold text-violet-900">Vibe Coding プロンプトパック v1</p>
  <p class="mb-4 text-sm leading-relaxed text-violet-900/80">本記事のような v0 / Lovable / Bolt / Cursor / Claude Code での開発を、そのまま使えるプロンプト50本（5ツール×各10本）＋実例ケーススタディ3件にまとめました。日本語ネイティブ向けに最適化・失敗パターン付き・30日返金保証。</p>
  <a href="https://okamuse.gumroad.com/l/skdrjq" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white no-underline transition hover:bg-violet-700">$19（ローンチ価格）でプロンプトパックを見る →</a>
</div>

## Amazon で関連書籍・ガジェットを探す

本記事のテーマに関連する書籍は Amazon でも購入できます。

- <a href="https://www.amazon.co.jp/s?k=%E3%83%A9%E3%83%B3%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E3%83%9A%E3%83%BC%E3%82%B8+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">ランディングページ本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Tailwind+CSS+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Tailwind CSS 本を探す →</a>
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
      "name": "v0 と Lovable のどちらから始めるべきですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LP の先に DB が必要かで決めるのがおすすめです。ウェイトリスト登録や申し込みフォームが必要なら Lovable、純粋に LP の見た目だけなら v0 が手早いです。"
      }
    },
    {
      "@type": "Question",
      "name": "本当に30分で作れますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "パターン1〜3、5〜6、8 は30分以内で作れます。縦長 LP や A/B テスト、Tailwind v4 ベースは1〜2時間見ておくのが現実的です。"
      }
    },
    {
      "@type": "Question",
      "name": "公開するドメインは何を使えばいいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最速は v0 / Lovable のサブドメイン公開です。本格運用には独自ドメインを取得して接続するのがおすすめです。"
      }
    },
    {
      "@type": "Question",
      "name": "生成された LP のホスティングは無料ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "v0 は Vercel への Publish が無料枠で可能、Lovable も独自のホスティングが無料枠で含まれます。帯域が増えた場合は国産レンタルサーバー等への引っ越しも選択肢になります。"
      }
    },
    {
      "@type": "Question",
      "name": "LP の SEO はこれだけで十分ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "メタタグ・OGP・FAQ schema は Claude Code 等で後付けするのが現実的です。v0 / Lovable の生成物には含まれないため別途整備してください。"
      }
    }
  ]
}
</script>
