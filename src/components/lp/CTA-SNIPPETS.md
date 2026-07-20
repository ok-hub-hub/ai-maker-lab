# CTA スニペット集（承認済み提携・2026-07-20 もしも管理画面で実照合）

すべて `/go/<id>` クローク経由（GA4 `affiliate_click` / `go_redirect` で計測）。
tools.ts の `affiliateUrl` が未設定の場合は公式サイトへフォールバック（報酬は発生しない）。

## トランスコープ（提携中・実運用あり → experienced: true 可）
```yaml
affiliateCta:
  - id: transcope
    experienced: true
    note: "当サイトのSEO記事制作で実運用中。長文SEO本文の叩き台づくりに使っています。"
```

## テラキャンAI（提携中・未検証。成果地点=受講申し込み・受講有料）
```yaml
affiliateCta:
  - id: terracam-ai
```

## AIブログくん（提携中・未検証。成果地点=有料プラン登録）
```yaml
affiliateCta:
  - id: ai-blog-kun
```

## type転職エージェント（AI Maker Lab媒体は未提携 = リンクは公式フォールバック中）
```yaml
affiliateCta:
  - id: type-tenshoku
```
※ AML媒体で提携承認後、tools.ts の `// affiliateUrl: TODO_AFFILIATE_URL` にAML用テキスト原稿URLを差し込む。
　 キャリアラウンジ媒体用リンク（a_id=5673961）の流用は媒体不一致のため禁止。
