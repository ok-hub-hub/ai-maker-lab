---
author: AI Maker Lab
pubDatetime: 2026-05-25T03:32:00+09:00
title: "Vibe Coding × Supabase で認証 + DB 込みのアプリを1日で動かす実装ガイド【時間割つき・2026年版】"
slug: vibe-coding-auth-db-in-1day-2026
featured: true
draft: false
tags:
  - vibe-coding
  - lovable
  - supabase
  - auth
  - rls
  - cloudflare-pages
  - implementation
description: "Lovable と Supabase を組み合わせて、ログインつき ToDo アプリを8時間で公開するまでの時間割。9:00 雛形生成から20:00 公開告知まで、RLS / OAuth / Cloudflare デプロイのトラブルシュート込みで提示します。"
---

<div class="relative mb-8 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 sm:h-64">
  <img src="/icons/read-time.png" alt="" aria-hidden="true" class="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「Supabase を使えば認証 + DB のアプリが1日で作れる、と聞いた。でも実際にやってみると **9:00 に始めて23時を回っても動かない**」

これは AI Maker Lab 編集部に届く相談で、二番目に多いテーマです。本記事は **Lovable × Supabase × Cloudflare Pages で「ログインつき ToDo アプリ」を1日（8時間）で公開する時間割** を、9:00 から20:00 まで1時間単位で示します。

> 本記事は **AI Maker Lab 編集部（運営者 + AI 編集部の協働運用）が Lovable と Supabase を実際に運用して、本番公開までを複数回再現した一次経験** をもとに執筆しています。料金・機能は 2026-05 時点の公式情報です。

## 目標：1日（8時間）で「ログインつき ToDo アプリ」公開まで

| 時刻 | フェーズ | 完了基準 |
|------|---------|----------|
| 9:00 | Lovable で雛形生成 | 主要画面が動くプレビュー |
| 11:00 | Supabase Dashboard で DB スキーマ確認・修正 | tasks テーブルが正しい構造 |
| 13:00 | 認証フロー（メール / Google OAuth）動作確認 | サインアップ → ログインまで通る |
| 14:00 | Row Level Security (RLS) 設定 | 他人のデータが見えないことを検証 |
| 16:00 | Cloudflare Pages へデプロイ | 本番 URL で動作確認 |
| 18:00 | 本番ドメイン接続 | 独自ドメインで HTTPS 表示 |
| 20:00 | 公開告知 | X / 個人ブログで告知投稿完了 |

休憩・ランチ込みで1日8時間枠の現実的なスケジュールです。フルタイム集中なら6時間で終わります。

---

## 9:00 — Lovable で雛形生成（Supabase 統合デフォルト）

### やること

1. [Lovable](/go/lovable/) にログイン → 新規プロジェクト作成
2. 以下のプロンプトを入力：

```
ログインつき ToDo アプリを作って。
- メール + パスワードのサインアップ・ログイン
- Google OAuth ログインも追加
- ログイン後、自分の ToDo 一覧が見える
- ToDo の追加・完了・削除ができる
- ToDo は Supabase の tasks テーブルに保存
- RLS で「ユーザーは自分のタスクだけ見える」設定
- shadcn/ui ベース、ダークモード対応
- カラーは emerald-to-teal
```

3. Lovable が **Supabase プロジェクトを自動作成** + テーブル + RLS ポリシーまで生成
4. プレビューで動作確認

### 編集部の所見

Lovable の真価は **「Supabase 統合がデフォルト」** な点。プロンプトに「Supabase に保存」と書くだけで、テーブル作成・RLS ポリシー・認証フックまで自動で構築されます。

v0 や Bolt にも認証はありますが、**「DB 込みで1日で動かす」**用途では Lovable のほうが手数が少なく済む構成です（編集部の実装比較による）。

---

## 11:00 — Supabase Dashboard で DB スキーマ確認・修正

### やること

1. [Supabase Dashboard](https://supabase.com/dashboard) を開く
2. プロジェクトを選択 → Table Editor へ
3. `tasks` テーブルのカラムを確認：
   - `id uuid primary key default gen_random_uuid()`
   - `user_id uuid references auth.users(id) not null`
   - `title text not null`
   - `is_done boolean default false`
   - `created_at timestamptz default now()`
4. 必要なら手動でカラム追加・修正

### Supabase Dashboard の使い方

- **Table Editor**：GUI でカラム追加・編集・行データ確認
- **SQL Editor**：SQL を直接実行（複雑な変更はこちらが速い）
- **Authentication**：ユーザー一覧・OAuth 設定
- **Policies**：RLS ポリシーの確認・編集

### 編集部の所見

> Lovable が自動生成する DB スキーマは **「動くけど最適ではない」** ことが多いです。編集部は11:00 のフェーズで **必ず手動レビュー**して、足りないカラム（`updated_at`、`priority`、`deleted_at` など）を追加します。後で追加するより、この段階で入れておくほうが100倍ラクです。

---

## 13:00 — 認証フロー（メール / Google OAuth）の動作確認

### やること

1. **メール認証**：
   - サインアップ → 確認メールが届く（Supabase の SMTP デフォルト or Resend 連携）
   - メールのリンクをクリック → ログイン状態に
2. **Google OAuth**：
   - Supabase Dashboard → Authentication → Providers → Google を有効化
   - Google Cloud Console で OAuth クライアント ID を作成
   - Redirect URI に Supabase の URL を登録
3. **動作確認**：
   - サインアップ → ログイン → ログアウト → 再ログインまで通す

### Google OAuth のセットアップ手順

1. [Google Cloud Console](https://console.cloud.google.com/) で新規プロジェクト
2. **APIとサービス > 認証情報 > OAuth クライアント ID** を作成
3. **承認済みのリダイレクト URI** に `https://<your-project>.supabase.co/auth/v1/callback` を追加
4. クライアント ID とクライアントシークレットを Supabase の Provider 設定に貼り付け

### 編集部の所見

Google OAuth は **Redirect URI の正確一致が必須**。末尾のスラッシュ・サブドメインの違いで動かないので、Supabase の callback URL を **コピペで貼る**のが安全です。

---

## 14:00 — Row Level Security (RLS) 設定

### やること

1. Supabase Dashboard → Authentication → Policies へ
2. `tasks` テーブルの RLS が **有効** であることを確認
3. ポリシーが以下のとおりであることを確認：

```sql
-- SELECT
create policy "Users can read own tasks"
  on tasks for select
  using (auth.uid() = user_id);

-- INSERT
create policy "Users can insert own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

-- UPDATE
create policy "Users can update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

-- DELETE
create policy "Users can delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);
```

4. **検証**：別アカウントを作って、お互いのデータが見えないことを確認

### 編集部の所見

<aside class="my-8 rounded-xl border-l-4 border-rose-500 bg-rose-50 p-5">
  <p class="flex items-center gap-2 font-bold text-rose-900">
    <svg aria-hidden="true" class="h-5 w-5 text-rose-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    最重要：RLS の確認は省略しない
  </p>
  <p class="mt-2 text-sm leading-7 text-rose-900">Supabase の最大の事故パターンが <strong>「RLS が無効のまま本番公開」</strong> です。Anon Key だけで全テーブルが読める状態になり、個人情報漏洩につながります。14:00 のフェーズで <strong>2アカウント検証</strong> を必ず実施してください。Lovable が自動生成した RLS ポリシーも、必ず Dashboard で目視確認します。</p>
</aside>

---

## 16:00 — Cloudflare Pages へデプロイ

### やること

1. Lovable のプロジェクトを **GitHub にエクスポート**（Lovable の「Export to GitHub」機能）
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → 「Create a project」
3. GitHub リポジトリと接続
4. **Build settings**：
   - Framework preset：Next.js (or Vite)
   - Build command：`npm run build`
   - Build output：`dist` or `.next`
5. **Environment variables** に Supabase の URL / Anon Key を設定
6. Deploy

### Vercel との比較

| 観点 | Cloudflare Pages | Vercel |
|------|------------------|--------|
| 商用無料 | OK | 一部制限あり |
| 帯域 | 無制限 | 100GB/月（無料） |
| Next.js | Edge Runtime 制約あり | 公式対応・最速 |
| 学習コスト | やや高 | 低 |

編集部のメディアサイト群（[ココラボ](https://kokolabo.jp/) / [キャリアラウンジ](https://careerlounge.jp/) / 本サイト）はすべて **Cloudflare Pages** で運用しています。

### 編集部の所見

Lovable の出力は Vite ベースが多く、**Cloudflare Pages との相性が良い**です。Next.js を選んだ場合は Vercel のほうがハマりにくいです。

---

## 18:00 — 本番ドメイン接続

### やること

1. [お名前.com](/go/onamae/) などで取得済みのドメインを使用
2. Cloudflare Pages の **Custom domains** にドメインを追加
3. ネームサーバーを Cloudflare に切替 or CNAME レコードを設定
4. SSL 証明書が自動発行されるのを待つ（5〜15分）
5. `https://yourdomain.com` で動作確認

### ドメインまだ取得していない場合

- [お名前.com](/go/onamae/)：国内最大手・初年度割安
- [mixhost](/go/mixhost/)：レンタルサーバー込みのお得セットあり

詳しくは [独自ドメイン取得ガイド](/posts/domain-selection-guide-2026/) と [個人開発者向けホスティング選定ガイド](/posts/hosting-for-individual-developers-2026/) を参照してください。

### 編集部の所見

ドメイン取得から SSL 発行まで、**最短で30分・最長で2時間**かかります。18:00 開始だと「20:00 公開告知に間に合わないリスク」があるので、ドメインは **前日までに取得**しておくのが理想です。

---

## 20:00 — 公開告知

### やること

1. **X（Twitter）で告知**：
   - スクリーンショット3枚 + 1行説明 + URL
   - ハッシュタグ：#個人開発 #Vibe Coding #Supabase
2. **個人ブログ / Zenn / Qiita に開発記**：
   - 1日でどう作ったか、ハマったポイントを記事化（SEO 流入の起点）
3. **Product Hunt 投稿準備**（任意）：
   - タグライン・タグ・動画を用意して翌週投稿

### 編集部の所見

> 「**完成度70%で公開**」が編集部のモットーです。残り30%は公開後にフィードバックを浴びてから直すのが正解。「もう少し直してから」と思って公開しないのが、Vibe Coding 時代の最大の罠です。

---

## トラブルシュート集

### CORS エラー

**症状**：ブラウザのコンソールに「CORS policy: No 'Access-Control-Allow-Origin' header」

**原因**：Supabase の URL Configuration で許可ドメインに本番ドメインが入っていない

**対策**：Supabase Dashboard → Authentication → URL Configuration → Site URL と Redirect URLs に本番ドメインを追加

### RLS で全データが見える / 見えない

**症状**：ログイン後にデータが見えない、もしくは他人のデータまで見える

**原因**：RLS ポリシーの条件が間違っている（`auth.uid()` ではなく `auth.email()` を使っているなど）

**対策**：14:00 のフェーズで紹介した SQL を SQL Editor で実行し直す

### Cloudflare Pages の Edge Functions エラー

**症状**：「Error: The functions ‘node_modules/...’ aren’t supported on Edge Runtime」

**原因**：Lovable が出力したコードに Node.js 専用 API が混ざっている

**対策**：問題のコードを Cloudflare Pages Functions（Workers）形式に書き直すか、Vercel への切替を検討。Claude Code に「このコードを Cloudflare Pages Functions 用に書き換えて」と依頼するのが最短

### Google OAuth が動かない

**症状**：ログインボタンを押したらエラーページ

**原因**：Redirect URI の不一致

**対策**：Google Cloud Console と Supabase の両方で **完全に同じ URL** が登録されているか確認。末尾のスラッシュにも注意

### サインアップ確認メールが届かない

**症状**：サインアップ後の確認メールが届かない

**原因**：Supabase の SMTP デフォルトはレート制限が厳しい（時間あたり数通）

**対策**：Resend や SendGrid などの SMTP を連携する。本番運用では必須

<aside class="my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
  <p class="flex items-center gap-2 font-bold text-emerald-900">
    <svg aria-hidden="true" class="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    編集部の実体験メモ（AI 駆動明示）
  </p>
  <p class="mt-2 text-sm leading-7 text-emerald-900">AI Maker Lab 編集部は <strong>「運営者 + AI 編集部」の協働運用</strong> で、本記事のような実装ガイドを継続発信しています。Claude Code でビルド・デプロイ・本番検証までを自走させながら、編集部としての所見を上乗せする流れです。AI 駆動で個人開発を加速したい人は <a href="/posts/claude-code-ai-company-1month-2026/">Claude Code で AI 会社を運営した1ヶ月</a> も合わせてどうぞ。</p>
</aside>

---

## FAQ

### Q1. プログラミング未経験でも1日で公開できますか？

**Lovable のプロンプト操作だけなら可能ですが、トラブル発生時は基礎知識が必要です**。RLS の挙動・OAuth の設定・ドメインの CNAME など、最低限の Web 開発の地図が頭に入っていると、ハマったときの復旧速度が変わります。

### Q2. Supabase の無料枠で本番運用できますか？

**個人開発のレベルなら無料枠で十分**です。Database 500MB / Auth 50,000 MAU / Storage 1GB / Edge Functions 500K invocations が無料枠。これを超えるトラフィックが出てきたら Pro プラン（$25/月）への移行を検討してください。

### Q3. Lovable で出力したコードは自由に編集できますか？

**GitHub にエクスポートすれば完全に自由**です。エクスポート後は Cursor / Claude Code でカスタマイズできます。Lovable に戻る必要もありません。

### Q4. Cloudflare Pages と Vercel のどちらを選べばよいですか？

**商用無料・帯域無制限を取るなら Cloudflare Pages**、**Next.js を本格的に使うなら Vercel** です。Lovable の出力が Vite ベースなら Cloudflare Pages、Next.js ベースなら Vercel が無難です。

### Q5. RLS の検証はどうやれば確実ですか？

**別アカウント（別ブラウザのプライベートウィンドウ）で2人分のユーザーを作る**のが最も確実です。お互いのデータが見えないこと、自分のデータだけが見えること、を両方検証してください。

---

## まとめ

Lovable × Supabase × Cloudflare Pages の組み合わせで、**ログインつきアプリを1日で公開**できます。AI Maker Lab 編集部は本時間割を複数回再現して、毎回20:00 までに公開ボタンを押せることを確認しています。

[Lovable を試す（無料枠あり） →](/go/lovable/)

[v0 を試す（無料枠あり） →](/go/v0/)

[Bolt を試す（無料枠あり） →](/go/bolt/)

[Claude Code を試す →](/go/claude-code/)

[お名前.com でドメインを取得 →](/go/onamae/)

---

## 関連記事

- [Vibe Coding 完全ガイド 2026](/posts/vibe-coding-guide-2026/) — AI 時代の個人開発入門
- [Vibe Coding でランディングページを30分で作る実装パターン10](/posts/vibe-coding-landing-page-in-30min-2026/) — LP テンプレ集
- [Vibe Coding で SaaS MVP を1週間で動かすロードマップ](/posts/vibe-coding-saas-mvp-in-1week-2026/) — 1週間版の本格ロードマップ
- [v0 vs Lovable vs Bolt：Vibe Coding 3大ツール比較](/posts/v0-vs-lovable-vs-bolt-2026/) — UI 生成ツール横並び比較
- [Claude Code セットアップから1ヶ月運用まで](/posts/claude-code-setup-1month-practical/) — Lovable の次のステップ
- [個人開発者向けホスティング選定ガイド](/posts/hosting-for-individual-developers-2026/) — Cloudflare Pages の詳細
- [独自ドメイン取得ガイド 2026](/posts/domain-selection-guide-2026/) — ドメイン選び

---

## 情報の一次性について

本記事の時間割は **AI Maker Lab 編集部（運営者 + AI 編集部）が Lovable × Supabase × Cloudflare Pages の組み合わせで実際に複数回アプリを公開した一次経験** をもとに整理しています。料金・機能は 2026-05 時点の各サービス公式情報です。実装時の所要時間は読者のスキル・案件複雑度・トラブル発生有無によって変動します。

---

## Amazon で関連書籍・ガジェットを探す

本記事のテーマに関連する書籍は Amazon でも購入できます。

- <a href="https://www.amazon.co.jp/s?k=Supabase+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Supabase 本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=PostgreSQL+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">PostgreSQL 本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Cloudflare+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Cloudflare 本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Vibe+Coding+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Vibe Coding 本を探す →</a>

※ AI Maker Lab は Amazon アソシエイト・プログラムの参加サイトとして、商品のリンク経由のご購入から紹介料を受け取ります（PR）。掲載内容そのものは公平な視点で執筆しています。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "プログラミング未経験でも1日で公開できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lovable のプロンプト操作だけなら可能ですが、トラブル発生時は基礎知識が必要です。RLS の挙動・OAuth の設定・ドメインの CNAME など最低限の地図が頭にあると復旧速度が変わります。"
      }
    },
    {
      "@type": "Question",
      "name": "Supabase の無料枠で本番運用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "個人開発のレベルなら無料枠で十分です。Database 500MB、Auth 50,000 MAU、Storage 1GB が無料枠。超えてきたら Pro プラン月25ドルへの移行を検討してください。"
      }
    },
    {
      "@type": "Question",
      "name": "Lovable で出力したコードは自由に編集できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GitHub にエクスポートすれば完全に自由です。エクスポート後は Cursor や Claude Code でカスタマイズできます。Lovable に戻る必要もありません。"
      }
    },
    {
      "@type": "Question",
      "name": "Cloudflare Pages と Vercel のどちらを選べばよいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "商用無料・帯域無制限を取るなら Cloudflare Pages、Next.js を本格的に使うなら Vercel です。Lovable の出力が Vite ベースなら Cloudflare Pages、Next.js なら Vercel が無難です。"
      }
    },
    {
      "@type": "Question",
      "name": "RLS の検証はどうやれば確実ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "別アカウント（別ブラウザのプライベートウィンドウ）で2人分のユーザーを作り、お互いのデータが見えないこと、自分のデータだけが見えることを両方検証するのが最も確実です。"
      }
    }
  ]
}
</script>
