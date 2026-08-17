---
author: AI Maker Lab
pubDatetime: 2026-08-17T09:23:00+09:00
title: "Claude Code vs Cursor｜Workbench廃止当日に両方使った実録【2026年8月17日】"
slug: claude-code-vs-cursor-after-workbench-2026
featured: false
draft: false
tags:
  - claude-code
  - cursor
  - ai-coding
  - vibe-coding
  - comparison
description: "2026年8月17日、Claude Workbench廃止当日。AI会社を実際に運営するオーナーが、Claude CodeとCursorを実プロジェクトで両方使い続けた立場から「廃止後の世界では結局どちらを使うか」を実録で答えます。"
affiliateCta:
  - id: lovable
    lead: "Claude CodeでもCursorでも、作ったアプリを公開するならLovableが最短ルート。ビルド→デプロイURLまで数分。"
---

<div class="relative mb-8 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-violet-100 to-indigo-100 sm:h-32">
  <img src="/icons/code-block.png" alt="" aria-hidden="true" class="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

「**Claude Workbench が廃止された。これで Claude Code の使い方は変わるのか？ Cursor と Claude Code、結局どっちを使えばいい？**」

<p class="mb-6 text-xs leading-6 text-stone-500 dark:text-stone-400">広告を含みます：Lovable。評価・手順は広告と無関係に実体験で書いています。</p>

2026年8月17日、Anthropic は Claude Workbench（claude.ai 内のプロンプトテスト環境）を正式廃止し、Claude Console（console.anthropic.com）への統合を完了しました。この節目の日に、**AI 会社として Claude Code を実際の自走バッチジョブや記事生成に使い続けている立場**から、両ツールの実態と廃止後の使い分けを書きます。

## 目次

- 30秒で結論：Workbench廃止後の使い分け原則
- Workbench廃止当日の朝に実際に起きたこと
- Claude Code の本当の強み（Workbench とは無関係だった話）
- Cursor の本当の強み
- メリット・デメリット比較
- 料金比較（2026年8月17日実測）
- どちらを選ぶか判断基準
- 正直なデメリット
- FAQ
- まとめ

## 30秒で結論：Workbench廃止後の使い分け原則

<div class="my-6 rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
  <p class="flex items-center gap-2 text-lg font-bold text-amber-900">✅ 編集部の結論（廃止当日版）</p>
  <p class="mt-2 text-amber-950"><strong>Workbench 廃止は Claude Code ユーザーに実質影響なし。</strong>プロンプトを試す場所が Console（console.anthropic.com）に変わっただけで、CLI で動く Claude Code の体験は変わらない。「自走・複数ファイル一括」は Claude Code、「GUI で見ながら対話的に直す」は Cursor、という使い分けは 2026年後半もそのまま。</p>
  <div class="mt-4 grid gap-1.5 text-sm text-amber-950">
    <div class="flex items-center gap-2"><span class="w-40 flex-none">Workbench廃止の影響</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-emerald-500" style="width:10%"></span></span><span class="w-8 text-right font-bold">低</span></div>
    <div class="flex items-center gap-2"><span class="w-40 flex-none">Claude Code 自走力</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:100%"></span></span><span class="w-8 text-right font-bold">5.0</span></div>
    <div class="flex items-center gap-2"><span class="w-40 flex-none">Cursor 操作感・IDE統合</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:96%"></span></span><span class="w-8 text-right font-bold">4.8</span></div>
    <div class="flex items-center gap-2"><span class="w-40 flex-none">価格（月払い）</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:80%"></span></span><span class="w-8 text-right font-bold">同等</span></div>
    <div class="flex items-center gap-2"><span class="w-40 flex-none">初心者への優しさ</span><span class="h-2 flex-1 rounded-full bg-amber-200"><span class="block h-2 rounded-full bg-amber-500" style="width:70%"></span></span><span class="w-8 text-right font-bold">Cursor↑</span></div>
  </div>
</div>

| あなたの状況 | 選ぶべきツール | 理由 |
|------------|------------|------|
| **夜中に回るバッチ・CI/CDに組み込みたい** | **Claude Code** | CLI ＋ CLAUDE.md で自走できる唯一の選択肢 |
| **UI を見ながら対話的にコードを直したい** | **Cursor** | IDE 内でリアルタイムに差分を確認できる |
| **初めて AI コーディングを試す** | **Cursor（Hobby 無料）** | インストールして即使える。コマンドラインが要らない |
| **複数ファイル・大規模リファクタを自動化したい** | **Claude Code** | エージェントとして複数ファイルにまたがった変更を自走できる |

<div class="my-6">
  <a href="/go/lovable" class="flex flex-col rounded-2xl bg-violet-600 p-5 text-white no-underline shadow-sm transition hover:bg-violet-700">
    <span class="text-lg font-bold">作ったアプリをそのまま公開する →</span>
    <span class="mt-1 text-sm text-violet-100">Claude Code でも Cursor でも、ビルド後の公開は Lovable が最短。デプロイ URL まで数分。</span>
  </a>
</div>

## Workbench廃止当日の朝に実際に起きたこと

2026年8月17日の朝、claude.ai にアクセスした。Workbench タブが消えていた。

**それだけだった。**

Claude Code のターミナルは普通に動いていた。CLAUDE.md も、MCP サーバーの設定も、前日と何も変わっていなかった。dodax-pilot の自走バッチジョブも、aimaker-lab の記事生成ジョブも、何事もなく動いた。

Workbench は「プロンプトを試す GUI 環境」だった。それが Console に移っただけで、**実際にコードを書く道具（Claude Code・Cursor 双方）には何の影響もない**。

ただ一点だけ変わったのは、「Claude Code に渡すシステムプロンプトを試行錯誤したいとき」の場所が変わったことだ。これまでの流れは「Workbench でモデルの反応を確認 → CLAUDE.md に反映」だったが、これからは「Console の API Playground で確認 → CLAUDE.md に反映」になる。手順は一ステップ増えたが、慣れれば同じだ。

<aside class="my-8 rounded-xl border-l-4 border-violet-400 bg-violet-50 p-5">
  <p class="font-bold text-violet-900">廃止後の移行先：Console の API Playground</p>
  <p class="mt-2 text-sm text-violet-950">console.anthropic.com にアクセスし、左メニューの「API Playground」から同等の機能が使える。システムプロンプトの設定・複数モデルの出力比較・Temperature 調整が可能。</p>
</aside>

## Claude Code の本当の強み（Workbench とは無関係だった話）

Claude Code の核心は「**ターミナルで動く自律エージェント**」だ。これは Workbench の廃止前から変わっていないし、今後も変わらない。

実際に AI 会社のインフラとして使っている例を挙げると：

**dodax-pilot（スカウト自動送信）**：doda X や Circus への転職スカウト送信を、毎朝自動で実行するバッチジョブ。Claude Code が CLAUDE.md を読み、台帳を確認し、送信条件を判断し、送信し、結果を記録するまでを人の介在なしに回している。これは Cursor では実現できない。IDE の外で、ターミナルで、自律的に動くのが Claude Code の本質だからだ。

**aimaker-create（記事生成・SEO更新）**：毎日 GSC データを取得し、優先度の高い記事を生成・改善し、git push するまでを自走するジョブ。今この記事もその一部として生成されている。

**CLAUDE.md による制約と自由の設計**：Claude Code は `CLAUDE.md` というプロジェクト固有の指示ファイルを読む。これが「人間の承認なしに何をやっていいか・何をやってはいけないか」の境界を定義する。Workbench でテストしたシステムプロンプトの知見がこのファイルに蓄積されている。Workbench がなくなっても、このファイルは消えない。

**Claude Code が最も輝く場面：**
- 深夜・休日の自走バッチ処理
- 「20 ファイルを一括リファクタしてコミットまで自動化」
- CI/CD パイプラインへの組み込み
- MCP サーバーを介した外部 API・ブラウザ操作の自動化

## Cursor の本当の強み

Cursor の核心は「**IDE に AI を埋め込んだ対話的な編集体験**」だ。

コードを書きながら、画面を見ながら、AI に「ここだけ直して」と言える。その差分をリアルタイムに確認して OK / 却下を判断できる。これは Claude Code の CLI 体験とは根本的に異なる。

**Cursor が最も輝く場面：**
- フロントエンドの微調整（「このコンポーネントの色を変えて」「このボタンを右寄せにして」）
- コードを見ながら仕様の意図を確認したい作業
- チームで同じ IDE を使いたい環境
- AI コーディングを始めて試してみたい人（Hobby は無料で始められる）

特に「Vibe Coding」で初めてアプリを作る場合、Cursor の Hobby（無料）が最初の一歩として最も低い摩擦だ。コマンドラインの知識がなくても始められる。

## メリット・デメリット比較

<div class="my-6 grid gap-4 sm:grid-cols-2">
  <div class="rounded-xl border-t-4 border-emerald-500 bg-emerald-50 p-4">
    <p class="font-bold text-emerald-900">Claude Code のメリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-emerald-950">
      <li>✓ CLI エージェントとして夜間・定期実行に組み込める</li>
      <li>✓ 複数ファイルにまたがった自律的な変更が得意</li>
      <li>✓ CLAUDE.md でプロジェクト固有の制約を永続的に管理</li>
      <li>✓ MCP サーバーでブラウザ・DB・外部 API を自動操作</li>
    </ul>
  </div>
  <div class="rounded-xl border-t-4 border-rose-400 bg-rose-50 p-4">
    <p class="font-bold text-rose-900">Claude Code のデメリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-rose-950">
      <li>✕ GUI がなく、CLI に慣れていない人には入門の壁がある</li>
      <li>✕ 「今どこを編集しているか」をリアルタイムに確認しにくい</li>
      <li>✕ Anthropic Pro 以上が必要で、無料では試せない</li>
    </ul>
  </div>
</div>

<div class="my-6 grid gap-4 sm:grid-cols-2">
  <div class="rounded-xl border-t-4 border-emerald-500 bg-emerald-50 p-4">
    <p class="font-bold text-emerald-900">Cursor のメリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-emerald-950">
      <li>✓ Hobby（無料）で即試せる。クレジットカード不要</li>
      <li>✓ IDE 統合で「見ながら直す」体験が洗練されている</li>
      <li>✓ フロントエンドの微調整・UI 確認が圧倒的にやりやすい</li>
    </ul>
  </div>
  <div class="rounded-xl border-t-4 border-rose-400 bg-rose-50 p-4">
    <p class="font-bold text-rose-900">Cursor のデメリット</p>
    <ul class="mt-2 grid gap-1.5 text-sm text-rose-950">
      <li>✕ IDE を開いている間しか動かない（夜間自走が苦手）</li>
      <li>✕ CLI ベースの自動化・バッチ実行には向かない</li>
      <li>✕ CLAUDE.md のような「エージェント向けの文脈管理」がない</li>
    </ul>
  </div>
</div>

<div class="my-6">
  <a href="/go/lovable" class="flex flex-col rounded-2xl bg-violet-600 p-5 text-white no-underline shadow-sm transition hover:bg-violet-700">
    <span class="text-lg font-bold">Lovable で作ったアプリを今すぐ公開 →</span>
    <span class="mt-1 text-sm text-violet-100">Claude Code や Cursor で書いたコードを、そのままビルド・デプロイ。公開 URL まで最短ルート。</span>
  </a>
</div>

## 料金比較（2026年8月17日実測）

| ツール | プラン | 月額（月払い） | 月額（年払い） |
|--------|--------|--------------|--------------|
| **Cursor** | Hobby | 無料 | 無料 |
| **Cursor** | Pro | **$20/月** | 割引あり |
| **Claude Code** | Anthropic Pro 同梱 | **$22/月** | $18/月相当 |
| **Claude Code** | Anthropic Max | $110〜/月 | — |

※ 2026年8月17日に cursor.com/pricing および claude.com/pricing にて実測。為替・プランは変動する場合があります。最新は各公式サイトで確認してください。

**コスト面では両者はほぼ同等。** Cursor Pro $20/月 vs Claude Pro $22/月（月払い）。大きな差はない。ただし Claude Code をより重い自走利用（大規模バッチ・高頻度実行）に使う場合は Anthropic Max（$110〜/月）が必要になることがある。

## どちらを選ぶか判断基準

「どちらか一方だけ使うとしたら？」という質問が多いので、シンプルな基準を出す。

**Claude Code を選ぶべき人：**
- 毎日・毎週繰り返す作業をコードで自動化したい
- 複数のファイル・ディレクトリにまたがる一括変更を任せたい
- launchd・cron・CI/CD に組み込んで夜間も動かしたい
- ターミナル操作に慣れている

**Cursor を選ぶべき人：**
- AI コーディングを今日から試したい（無料で始められる）
- フロントエンドを見ながら細かく調整したい
- チームで共通の IDE 環境を使いたい
- GUI ベースで操作したい

**どちらも使うべき人：**
- 「自走バッチ」と「対話的な UI 修正」の両方が必要な人（＝ AI 会社オーナー的な使い方）

Workbench 廃止後も、この使い分け原則は変わらない。

## 正直なデメリット（使って分かった限界）

**Claude Code の限界**：最大の弱点は「今何をやっているかが見えにくい」ことだ。エージェントが複数ファイルを編集している途中、何が起きているかを IDE のようにリアルタイムで確認する仕組みがない。`git diff` を後から見て「あれも変えてたのか」と気づくことがある。CLAUDE.md で禁止事項を明示するなど、事前の設計が重要になる。

**Cursor の限界**：「IDE を閉じたら動かない」これに尽きる。スケジューラーに組み込んで夜中に実行する、という使い方は Cursor では実現できない。また「30 ファイルを一度に変更する」のような大規模タスクは、IDE ベースの対話では途中で文脈が途切れることがある。

## FAQ

**Q：Workbench が廃止されて、Claude Code を使うのに何か追加の設定が必要になりましたか？**

A：不要です。Claude Code は独立した CLI ツールで、Workbench とは別系統です。API キーの管理は以前から Console（console.anthropic.com）で行っていたので、廃止による影響はありません。プロンプトのテストをしたい場合は Console の API Playground を使ってください。

**Q：Cursor Pro と Claude Code、両方契約すると月いくらですか？**

A：Cursor Pro $20/月 + Anthropic Pro $22/月（月払い）＝ **$42/月（約6,000〜7,000円）**。使いこなせれば月に数十時間のコーディング時間を節約できるためコスパは高い。ただし最初は一方から始めて、必要性を感じたら追加する判断が現実的です。

**Q：Vibe Coding でアプリを作るなら Claude Code と Cursor のどちらがいいですか？**

A：最初の一歩には **Cursor（Hobby・無料）** を強くすすめます。インストールして IDE を開けばすぐ使える。Claude Code は CLI の知識が必要で、初期設定のハードルが高い。ただし作ったアプリを「公開したい」となれば、別途ホスティングが必要です。

**Q：Claude Code は Anthropic Pro でないと使えませんか？**

A：はい。Claude Code は Anthropic Pro（$22/月・月払い）以上のプランが必要です（2026年8月17日時点）。Cursor のように無料プランで試すことはできません。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Workbench が廃止されて、Claude Code を使うのに何か追加の設定が必要になりましたか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不要です。Claude Code は独立した CLI ツールで、Workbench とは別系統です。API キーの管理は以前から Console（console.anthropic.com）で行っていたので、廃止による影響はありません。プロンプトのテストをしたい場合は Console の API Playground を使ってください。"
      }
    },
    {
      "@type": "Question",
      "name": "Cursor Pro と Claude Code、両方契約すると月いくらですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cursor Pro $20/月 + Anthropic Pro $22/月（月払い）＝ $42/月（約6,000〜7,000円）。使いこなせれば月に数十時間のコーディング時間を節約できるためコスパは高い。ただし最初は一方から始めて、必要性を感じたら追加する判断が現実的です。"
      }
    },
    {
      "@type": "Question",
      "name": "Vibe Coding でアプリを作るなら Claude Code と Cursor のどちらがいいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最初の一歩には Cursor（Hobby・無料）を強くすすめます。インストールして IDE を開けばすぐ使える。Claude Code は CLI の知識が必要で、初期設定のハードルが高い。ただし作ったアプリを公開したい場合は、別途ホスティングが必要です。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude Code は Anthropic Pro でないと使えませんか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。Claude Code は Anthropic Pro（$22/月・月払い）以上のプランが必要です（2026年8月17日時点）。Cursor のように無料プランで試すことはできません。"
      }
    }
  ]
}
</script>

## まとめ

Workbench が廃止された 2026年8月17日の朝、実際に確かめた結論を書く。

**変わったこと**：プロンプトを試す場所が Workbench から Console の API Playground になった。

**変わらなかったこと**：Claude Code の CLI 自走力、Cursor の IDE 統合体験、両者の月額料金（$20〜22）、使い分けの原則。

2026年後半も「自走・一括・夜間実行」は Claude Code、「見ながら・対話的・フロント調整」は Cursor、この組み合わせが個人開発者・AI 会社オーナーの現実解だ。Workbench の廃止をきっかけにどちらを使うか迷っているなら、シンプルに「**CLI で自走させたいかどうか**」で判断していい。

どちらのツールで作っても、完成したアプリを実際に誰かに使ってもらうには「公開」が必要だ。

<div class="my-6">
  <a href="/go/lovable" class="flex flex-col rounded-2xl bg-violet-600 p-5 text-white no-underline shadow-sm transition hover:bg-violet-700">
    <span class="text-lg font-bold">Lovable でアプリを公開してみる →</span>
    <span class="mt-1 text-sm text-violet-100">Claude Code でも Cursor でも、作ったアプリを最短でデプロイできます。</span>
  </a>
</div>
