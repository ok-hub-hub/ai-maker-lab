---
author: AI Maker Lab
pubDatetime: 2026-05-14T11:30:00+09:00
title: "Claude Code で「AI会社」を1ヶ月運営してみた｜CEO・QA・事業開発・技術検証の4部門で個人開発を回す"
slug: claude-code-ai-company-1month-2026
featured: true
draft: false
tags:
  - journal
  - claude-code
  - ai-company
  - vibe-coding
  - ai-agent
description: "Claude Code を「個人開発の助っ人」ではなく、CEO・QA・事業開発・技術検証の4部門を持つ「AI会社」として1ヶ月運営してきた運用記録です。役割定義書の中身、相談処理フロー、失敗事例、1ヶ月の実績数字まで、誰も書いていない部分を全部公開します。"
---

<div class="relative mb-8 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 sm:h-64">
  <img src="/icons/ai-company.png" alt="" aria-hidden="true" class="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-md" />
  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
</div>

> 本記事は **AI Maker Lab の個人ジャーナル（連載企画 #1）** です。Vibe Coding ツールのレビューや比較ではなく、**「実際に何が起きているか」** を月次で公開していきます。

## この記事の30秒結論

- **Claude Code を「個人開発の助っ人」ではなく、CEO・QA・事業開発・技術検証の4部門を持つ "AI会社" として1ヶ月運営してきた**運用ログです
- 結果：個人開発の本数2本（P-015 Scout AI → [P-019 AI Maker Lab](/about/) → [P-020 ジャーナル拡張](/tags/journal/)）、AI Maker Lab だけで git コミット25本超、相談ログ27件、進行中PJ台帳46回更新、本サイト（AI Maker Lab）の本番公開、アフィリリンク5件Live化
- **コスト：月 $0**（Claude Code 通常運用枠、ChatGPT OAuth 経由の Codex SDK、Cloudflare Pages 無料枠、Astro 静的サイト）
- **やってよかったこと**：1日の意思決定数が増えた（テンポ向上）、台帳・相談ログ・メモリの3点運用でタスクの抜け漏れがほぼゼロに、運営知識が Markdown 資産として残り後から検索可能
- **失敗したこと**：CEO代行作業を「オーナーが自分でやった」と誤帰属したこと、初期にブラウザ自動化を組み込んだのに使わなかったこと、など

詳細を以下に書きます。

## 目次

- なぜ「AI会社」という形にしたか
- 部門構成と役割定義
- 1日のオペレーション（相談処理フロー）
- 1ヶ月の実績数字
- 起きた失敗と学習
- 道具立て（コスト$0で動かす構成）
- 第一弾商品の予告
- FAQ
- 関連リソース

---

## なぜ「AI会社」という形にしたか

最初は普通に Claude Code に「これやって」「あれやって」と話しかけていました。1人で個人開発をしていると、よくあるパターンです。

ただ、案件が増えてくると：

- **同じ判断を毎回しなければならない**（「これは新規プロジェクトに採番すべき？」「これは品質チェックいる？」）
- **過去の決定が忘れられる**（「先週これ決めたんだけど、なんでだっけ？」）
- **抜け漏れが発生する**（QA をしないまま納品、競合調査をせずに着手）

そこで、Claude Code に **明示的に組織の役割を与える** ことにしました。

| 役割 | 担当 | 設計の動機 |
|---|---|---|
| **CEO** | 全体の判断と部門間調整 | 1人の意思決定者を立てて、責任の所在を明確化 |
| **QA部** | 成果物の批判的レビュー | 自分で書いたものを自分でレビューすると甘くなる |
| **事業開発部** | 市場・競合・収益モデル | 「作るか・作らないか」を判断する前に検証する |
| **技術検証部** | 技術的実現可能性の検証 | 推測ではなく実際に PoC を動かす |

これらをすべて **同じ Claude Code セッション内** で人格を分けて動かしています。**部門ごとに別のサブエージェントを使う**運用ではありません。役割定義書（マークダウン）を読み込み、その役割で動いてもらう方式です。

---

<aside class="my-8 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-5">
  <p class="flex items-center gap-2 font-bold text-indigo-900">
    <svg aria-hidden="true" class="h-5 w-5 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"></path></svg>
    実践でのポイント
  </p>
  <p class="mt-2 text-sm leading-7 text-indigo-900">「役割定義書をマークダウンで書き、Claude Code に読み込ませる」だけで、抜け漏れ・判断疲れが劇的に減ります。特に QA部（批判的レビュー）の導入価値は想像以上です。</p>
</aside>

## 部門構成と役割定義

### CEO（中央）

役割定義書は **v2.7** まで改訂されました。中身は：

- 口調ルール（必ずデスマス調）
- 判断権限の境界（CEO判断可 / オーナー確認必須）
- 報告リズム（週次サマリー / 完了報告 / 随時エスカレーション）
- 壁打ちモード発動条件（指示に明確な悪手がある、前提誤りがある、より良い方法がある、情報不足、過去の方針と矛盾）
- プロダクト化機会の検出フロー
- 相談処理フロー（即答 / 壁打ち / タスク化 / プロダクト化候補 / 事業相談 の5分類）

**ポイントは「判断権限の境界」を最初に明文化したこと**です。「これはCEOが勝手に決めて良い」「これはオーナーに必ず確認」を表にしておくと、毎回の判断で「これ確認すべきか？」を考え直す手数が省け、テンポが目に見えて上がります。

### QA部

QA部の役割定義書には **「あなたの仕事は改善点を見つけること。良い点を褒める必要はない」** と明記しています。

評価チェックリストは：

- A. 基本品質（誤字・脱字、フォーマット）
- B. 内容の正確性（事実誤認、根拠、論理飛躍、**情報の一次性**）
- C. 実用性（読者にとっての分かりやすさ、アクション可能性）
- D. CEO指示書チェック（背景説明、完了基準の測定可能性）

判定は **承認 / 条件付き承認 / 差し戻し** の3段階。差し戻しになったら CEO または該当部門が修正して再レビュー。

**実際に運用してみると、QA部からの差し戻しは想像以上に頻発**します。1ヶ月で確認できただけで、本サイトのコンテンツ品質保証だけで QA レビューサイクルを **3連続完走**（記事#11+#4一括、記事#5、記事#6）しています。

### 事業開発部

事業開発部の特徴は **「仮説と事実を分離する」「主張には必ず根拠を付ける」** こと。すべての成果物に「情報の一次性」（一次情報に基づく／二次情報・一般論／混合）を明記する運用です。

### 技術検証部

技術検証部だけは少し特殊で、**Codex SDK（OpenAI Codex CLI）を Claude Code から呼び出す**構成にしています。理由：

- Codex は実機でコードを書いて動かせる
- Claude Code との比較・併用が可能
- 検証本体は Codex、レビュー・要約は Claude Code、という分業

これを `codex-bridge`（自作の薄いラッパー、`npm link` で導入）経由で呼んでいます。**ChatGPT OAuth 認証で動かしているので、OpenAI API への追加課金は発生しません**（ただし **ChatGPT 側の利用枠**を消費するため、多数案件を連続実行する場合は ChatGPT Plus 等への移行を検討する必要があります）。

---

## 1日のオペレーション（相談処理フロー）

オーナー（私）がメッセージを投げると、CEO が以下のフローで処理します：

```
1. 相談内容の本質把握
   ↓
2. 分類（即答 / 壁打ち / タスク化 / プロダクト化候補 / 事業相談）
   ↓
3. 分類に応じた対応
   ├ 即答 → その場で回答、必要なら追加調査タスク化
   ├ 壁打ち → 選択肢を構造化、メリット・デメリット提示、結論は押し付けない
   ├ タスク化 → 指示書作成、部門に振る
   ├ プロダクト化候補 → 候補メモに追記
   └ 事業相談 → 事業開発部に振る
   ↓
4. 相談ログに必ず記録
   ↓
5. プロダクト化機会チェック（繰り返しパターンの検出）
```

このフロー、文字で見ると当たり前なのですが、**「相談ログに必ず記録」と決めておくだけで、過去の決定の追跡可能性が劇的に上がります**。1ヶ月で27件の相談が記録され、いつでも「以前こういう話がありましたね」と接続できる状態になりました。

---

## 1ヶ月の実績数字

| 指標 | 数 |
|---|---|
| 立ち上がった部門 | **4部門**（CEO / QA / 事業開発 / 技術検証） |
| 起票したプロジェクト | **20本**（P-001 〜 P-020） |
| 完了プロジェクト | **15本** |
| 進行中プロジェクト | **4本**（P-019 運用中、P-020 Phase 0、T-001 / T-002） |
| 進行中PJ台帳更新回数 | **46回** |
| 相談ログエントリ | **27件** |
| QA部レビュー実施回数 | **6回以上** |
| 本番公開したプロダクト | **1本**（[AI Maker Lab](/)） |
| 公開記事 | **10本超**（最新は [/posts](/posts/) 参照） |
| Liveアフィリリンク | **5件**（onamae / mixhost / xserver / xserver-biz / conoha-ai-canvas） |
| git コミット（AI Maker Lab） | **25本超** |

特に **「進行中PJ台帳46回更新」** は、自分でやろうとしたら確実にサボっていた領域です。CEO に「実装した瞬間に台帳を更新」というルールを与えたら、本当にやってくれます。

---

<aside class="my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
  <p class="flex items-center gap-2 font-bold text-emerald-900">
    <svg aria-hidden="true" class="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    編集部の実体験メモ
  </p>
  <p class="mt-2 text-sm leading-7 text-emerald-900">1ヶ月で進行中PJ台帳46回更新、相談ログ27件、git コミット25本超、本番公開1本。「自分でやろうとしたら確実にサボっていた領域」をAI会社にやらせる効果が一番大きかった部分です。</p>
</aside>

<aside class="my-8 rounded-xl border-l-4 border-red-500 bg-red-50 p-5">
  <p class="flex items-center gap-2 font-bold text-red-900">
    <svg aria-hidden="true" class="h-5 w-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    失敗を避けるための注意
  </p>
  <p class="mt-2 text-sm leading-7 text-red-900">CEO代行の作業をオーナーがやったと誤帰属するパターンが頻発。失敗が起きたら即メモリに足して運用ルール化することが、AI 会社運営の最大の利点です。</p>
</aside>

## 起きた失敗と学習

正直なところを書きます。**1ヶ月で 4つの「やらかし」** があり、そのつど運用ルールを足してきました。

### 失敗1：CEO代行作業を「オーナーが進めた」と誤帰属した

ある日、本番サイトの状態を CEO が報告してきた中で、**実際は CEO 自身が実装したコミットを「オーナーが進めた」と書いていた**ことに気づきました。

人間（私）からの指摘で発覚。原因は「git log を確認せずに過去の自分の作業を忘れた」こと。

**修正**：メモリ（`feedback_ceo_work_logging.md`）に「CEO代行で実装・指示した作業は完了の都度、進行中PJ台帳・相談ログに反映」を追加。これで以降は実装直後に必ず台帳を更新する運用に。

### 失敗2：ブラウザ自動化を入れたのに使っていなかった

Playwright MCP を専用 Chrome プロファイルで導入し、`✓ Connected` まで確認したのに、その後の作業で **CEO は curl と git だけで済ませてしまっていました**。

オーナーが「ブラウザ操作でできうる限りのことはやった？」と聞いて発覚。実際にブラウザを使ったら、**トップページに記事が表示されない致命バグ**（pubDatetime が未来日付）と、**Vercel pricing の表現ミス**を1セッションで発見・修正できました。

**修正**：メモリ（`feedback_browser_automation_realtime_reporting.md`）に「ブラウザ自動化中の実況報告」と「作業終了時の browser_close」を追加。「ブラウザ権限がある以上、実機観測を積極的に投入する」を運用ルールに。

### 失敗3：両論併記のクセ

CEO が「(A) これがおすすめだけど、(B) こっちもアリです」と両論併記で終わるパターンが多発。オーナー側は判断疲れ。

**修正**：メモリ（`feedback_ceo_self_consistency.md`）に「CEOが明確な推奨を出して、オーナーが拒否する場合のみ別案」を追加。

### 失敗4：本記事を書くきっかけになった「思考漏れ」

オーナーから「Apple Storeで売れるアプリ作りたい、Gmail フォルダ分けとかも商品化できそう」と相談を受けた時、**CEO は最初 P-019（既に稼働中の AI Maker Lab）との重なりを完全に見落とした**まま、新規プロジェクト案を組み立てました。

オーナーが「Claude Code でやってること自体が宣伝になるんじゃない？」と発話して初めて気づき、戦略を「AI Maker Lab を3層拡張」に修正。

**学習**：新規アイデア相談時には「既存PJとの重複・統合可能性」を最初の検討項目にする。これは既存メモリ `feedback_ceo_self_consistency.md` の運用強化として記録。

---

## 道具立て（コスト$0で動かす構成）

「AI会社を運営する」と聞くと大層に聞こえますが、実態は **マークダウンファイル群＋Claude Code＋無料インフラ** で完結しています。

| レイヤー | 道具 | 月額 |
|---|---|---|
| 司令塔 | [Claude Code](https://claude.com/product/claude-code)（CLI） | 通常運用枠 |
| 役割定義・ナレッジ | マークダウンファイル群（`/99_ナレッジ/`） | $0 |
| 相談ログ・台帳 | マークダウンファイル群 | $0 |
| ブラウザ自動化 | [Playwright MCP](https://github.com/microsoft/playwright-mcp)（npx） | $0 |
| 技術検証 | OpenAI [Codex CLI](https://github.com/openai/codex) + 自作 codex-bridge | $0（ChatGPT OAuth） |
| 本番サイト | [Astro](/posts/vibe-coding-guide-2026/) + [Cloudflare Pages](/posts/hosting-for-individual-developers-2026/) | $0 |
| ドメイン | [お名前.com](/go/onamae) | 年 約2,000円 |
| 計測 | GA4 + Search Console + Bing WMT + IndexNow | $0 |
| **合計** | | **約 ¥170 / 月相当**（ドメイン代のみ） |

「個人開発で月10万を目指す」みたいな話をすると、サーバー代やツール代の心配をする人が多いのですが、**Vibe Coding 時代の個人開発は実質ほぼタダ**で立ち上がります。詳細は[「個人開発者のためのホスティング選び」](/posts/hosting-for-individual-developers-2026/)に書きました。

---

## 第一弾商品の予告

ここまでの運営ノウハウを **「AI会社運営テンプレ＋1ヶ月運営ログ」** として、来月（2026年6月）に [Gumroad](https://gumroad.com/) で公開する予定です。

中身（予定）：

- **CEO 役割定義書テンプレ**（v2.7 を一般化）
- **QA部運用ルール**
- **事業開発部役割定義書**
- **技術検証部運用ガイド**（Codex SDK との接続を含む）
- **相談ログ運用テンプレ**
- **進行中PJ台帳テンプレ**
- **1ヶ月分の運営ログ（匿名化済）**：実際の判断の記録、失敗パターン、リカバリ手順
- **連続実行モード設計**：オーナー作業負荷を最小化する仕組み

**価格：$39（プロモ価格、リリース後30日間）→ $49（通常価格）**。プロンプト集系（$5-29）より高めですが、テンプレ単体ではなく **「1ヶ月の実運営ログ」とセット**であることが差別化軸です。

**2026-05-14 リリース済み**：https://okamuse.gumroad.com/l/ai-company-ops-template

リリース後は **6ヶ月間、毎月の運営ログを既存購入者に無料で追加配信** します。本サイトの[ショップページ](/shop/)からも購入できます。

> 「テンプレだけなら無料 OSS がいくらでもある」ことは承知しています。実際 [Claude Code Templates の aitmpl.com](https://www.aitmpl.com/) には1000+ Agents が並んでいます。本商品の価値は **「実際に運営した時の判断・失敗・修正の記録」** であり、これは AI に書かせても出てこない部分です。

[本サイト（AI Maker Lab）](/) のフォロワーになっておくと、リリース時に通知が届くようにする予定です（X アカウント @aimakerlab 開設準備中）。

---

## FAQ

### Q1：これって Claude Code じゃないと動かないのですか？

いいえ、**役割定義書はマークダウンなので、Cursor でも ChatGPT でも理屈上は動きます**。ただし以下の理由で Claude Code がフィットします：

- 長い会話履歴の維持（コンテキスト管理が自動）
- メモリ機能（セッションをまたいでオーナーの好みを保持）
- MCP（Playwright、Codex SDK、自社MCPサーバーの追加が容易）
- Skill（再利用可能な手順をコマンド化）

### Q2：1人でやるには大げさじゃないですか？

最初は私もそう思っていました。実際に運用してみると、**「自分で全部決める」のと「役割を分けて判断させる」では、抜け漏れの量が桁違い**でした。特に QA部（批判的レビュー）の価値が想像以上に大きいです。

### Q3：複数エージェント・複数 LLM の協調運用ですか？

**多くの場合は単一の Claude Code セッション内で人格を切り替える**形です。サブエージェントを起動するのは、独立して並列化できる調査タスクなど限定的なケースのみ。Paperclip や AI Team OS のような「複数 LLM オーケストレーション」フレームワークとは設計思想が違います（あちらは大規模並列、こちらは小規模・コスト$0で完結が目標）。

### Q4：本当に効果が出るまでどのくらいかかりますか？

1ヶ月運用してみた感覚値で：

- **3日目**：役割定義書を読み込んでもらうフローに慣れる
- **1週間**：相談ログが10件超、過去参照が利き始める
- **2週間**：QA部の差し戻しが入って品質が変わる
- **1ヶ月**：プロダクトが本番公開されて収益化軸が立つ

ただし、これは **私の個人開発ペース**（毎日数時間〜数十時間 AI に向かう）での話です。ペースを抑えても、ルールを書く時間を取れば 2-3週間で立ち上がると思います。

### Q5：失敗したらどうしますか？

本記事の「起きた失敗と学習」セクションが答えです。**失敗が起きるたびにメモリに足していくことで、二度と同じ失敗をしない仕組み**にしています。これは AI 会社運営の最大の利点だと思っています。

---

## 情報の一次性について

本記事は **AI Maker Lab の運営者（私）が、自分で実際に 2026-04 中旬 〜 2026-05-14 の約1ヶ月間運営した記録** に基づいています。

- **一次情報**：相談ログ27件、進行中PJ台帳46回更新、git コミットログ、本番公開した AI Maker Lab、Gumroad 競合調査ログ
- **二次情報**：[aitmpl.com](https://www.aitmpl.com/) の Templates 数、Gumroad の Claude Code 系商品リスト、[Paperclip](https://www.mindstudio.ai/blog/build-multi-agent-company-paperclip-claude-code) の設計思想
- **想定・推測の範囲**：「個人開発ペースを抑えても 2-3週間で立ち上がる」は私個人の見立て、第一弾商品の価格帯 $39-49 は競合観察から逆算した想定値

本連載は **連続発信予定**です。来月（2026-06）の運営ログも公開します。

---

## まとめと関連リソース

**この記事の要点**：

1. Claude Code を **CEO・QA・事業開発・技術検証の4部門を持つ「AI会社」** として1ヶ月運営した
2. 役割定義書（マークダウン）と相談処理フローを明文化することで、**判断スピードと品質が両立**
3. 失敗が起きるたびに **メモリに記録 → 運用ルール化** することで、二度と同じ失敗をしない
4. **コストは月 ¥170 相当**（ドメイン代のみ）。Claude Code 通常運用枠＋無料インフラで完結
5. 1ヶ月で **本番公開1本・公開記事10本超・アフィリLive5件・PJ台帳46回更新**（最新の記事数は [/posts](/posts/) 参照）

**関連記事**：

- [Vibe Coding 完全ガイド：個人開発者が AI で動くアプリをつくる、最短ルート【2026年版】](/posts/vibe-coding-guide-2026/)
- [Cursor vs Claude Code 徹底比較](/posts/cursor-vs-claude-code-comparison/) — 本記事で主力に据えた Claude Code の特性を Cursor と対比
- [v0 by Vercel とは：料金・使い方・個人開発者の実践レビュー【2026年最新】](/posts/v0-review-2026/)
- [AI副業ロードマップ：個人が AI で月10万を目指す現実的な道筋](/posts/ai-side-business-roadmap-2026/)
- [Catchy vs Transcope 徹底比較](/posts/catchy-vs-transcope-2026/) — このAI会社の記事量産で使うライティングツールの選び方
- [未経験からITエンジニア転職 完全ガイド](/posts/it-engineer-career-start-2026/) — AIを「触る」から「仕事にする」への現実的な一歩
- [個人開発者のためのホスティング選び](/posts/hosting-for-individual-developers-2026/)
- [個人開発者のドメイン取得完全ガイド](/posts/domain-selection-guide-2026/)

**この連載のフォロー方法**：

- 本サイト（AI Maker Lab）の RSS：`https://aimaker-lab.com/rss.xml`
- X：**@aimakerlab**（2026年5月〜6月開設予定）
- 第一弾商品（AI会社運営テンプレ＋1ヶ月運営ログ）：**2026年6月 Gumroad リリース予定**

来月の運営ログ（連載 #2）でまた会いましょう。

---

> 本サイトは個人開発者向けの解説ジャーナルとして、Vibe Coding と AI による個人開発の最新情報を発信しています。フィードバック・ご質問は contact@aimaker-lab.com まで。

---

## Amazon で関連書籍・ガジェットを探す

本記事のテーマ（Claude Code・AI コーディング・個人開発）に関連する書籍・教材は Amazon でも購入できます。

- <a href="https://www.amazon.co.jp/s?k=Vibe+Coding+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Vibe Coding 本を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=Cursor+%E5%85%A5%E9%96%80&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">Cursor 入門書を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=AI%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">AI コーディング関連書を探す →</a>
- <a href="https://www.amazon.co.jp/s?k=%E5%80%8B%E4%BA%BA%E9%96%8B%E7%99%BA+%E6%9C%AC&tag=aimakerlab26-22" rel="nofollow sponsored noopener" target="_blank">個人開発本を探す →</a>

※ AI Maker Lab は Amazon アソシエイト・プログラムの参加サイトとして、商品のリンク経由のご購入から紹介料を受け取ります。掲載内容そのものは公平な視点で執筆しています。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "「AI 会社」運営は Claude Code じゃないと動かないのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "役割定義書は Markdown なので理屈上は Cursor や ChatGPT でも動きます。ただし長い会話履歴の維持・メモリ機能・MCP・Skill の観点で Claude Code がフィットします。"
      }
    },
    {
      "@type": "Question",
      "name": "1人で AI 会社を回すのは大げさじゃないですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "実際に運用すると、自分で全部決めるのと役割を分けて判断させるのでは抜け漏れの量が桁違いです。特に QA 部（批判的レビュー）の価値が想像以上に大きいです。"
      }
    },
    {
      "@type": "Question",
      "name": "複数エージェント・複数 LLM の協調運用ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "多くの場合は単一の Claude Code セッション内で人格を切り替える形です。サブエージェント起動は独立並列化できる調査タスクなど限定的なケースのみです。"
      }
    },
    {
      "@type": "Question",
      "name": "効果が出るまでどのくらいかかりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3日目に役割定義書フローに慣れ、1週間で相談ログ10件超で過去参照が利き始め、2週間で QA 部差し戻しで品質が変わり、1ヶ月でプロダクト本番公開と収益化軸が立ちます。"
      }
    },
    {
      "@type": "Question",
      "name": "失敗したらどうしますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "失敗が起きるたびにメモリに足していくことで、二度と同じ失敗をしない仕組みにします。これが AI 会社運営の最大の利点です。"
      }
    }
  ]
}
</script>
