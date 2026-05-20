import { useState } from "react";
import {
  diagnose,
  buildReason,
  type Answers,
} from "@/lib/diagnose";
import type {
  Q1Code,
  Q2Code,
  Q3Code,
  Q4Code,
  Q5Code,
  ToolMeta,
} from "@/data/tools";

type Step = 1 | 2 | 3 | 4 | 5 | "result";

const Q1_OPTIONS: { code: Q1Code; label: string }[] = [
  { code: "dev", label: "プログラミング・開発（コードを書く）" },
  { code: "ui", label: "UI・デザイン・Webサイトを作る" },
  { code: "video", label: "動画・コンテンツ作成" },
  { code: "writing", label: "文章・記事・SEO" },
  { code: "automation", label: "業務自動化（複数ツール連携）" },
];

const Q2_OPTIONS: { code: Q2Code; label: string }[] = [
  { code: "engineer", label: "プログラミング経験あり" },
  { code: "some", label: "少しだけある（HTML/CSS程度）" },
  { code: "none", label: "全くない（非エンジニア）" },
];

const Q3_OPTIONS: { code: Q3Code; label: string }[] = [
  { code: "free", label: "無料が良い" },
  { code: "20", label: "月額$20以下（≒3,000円）" },
  { code: "50", label: "月額$50以下（≒7,500円）" },
  { code: "100plus", label: "月額$100以上もOK" },
];

const Q4_OPTIONS: { code: Q4Code; label: string }[] = [
  { code: "hobby", label: "趣味・学習" },
  { code: "side", label: "副業で収益化したい" },
  { code: "business", label: "起業・本業化したい" },
];

const Q5_OPTIONS: { code: Q5Code; label: string }[] = [
  { code: "speed", label: "スピード重視" },
  { code: "quality", label: "クオリティ重視" },
  { code: "scale", label: "拡張性重視" },
  { code: "jp", label: "日本語対応重視" },
];

type Partial5 = Partial<Answers>;

export default function Diagnose() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Partial5>({});
  const [results, setResults] = useState<ToolMeta[]>([]);

  function pick<K extends keyof Answers>(key: K, value: Answers[K]) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (key === "q1") setStep(2);
    else if (key === "q2") setStep(3);
    else if (key === "q3") setStep(4);
    else if (key === "q4") setStep(5);
    else if (key === "q5") finishWith(next as Answers);
  }

  function finishWith(a: Answers) {
    setResults(diagnose(a));
    setStep("result");
  }

  function skipQ5() {
    const full: Answers = {
      q1: answers.q1!,
      q2: answers.q2!,
      q3: answers.q3!,
      q4: answers.q4!,
      q5: null,
    };
    finishWith(full);
  }

  function reset() {
    setAnswers({});
    setResults([]);
    setStep(1);
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      {step !== "result" && (
        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
            <span>Question {step} / 5</span>
            <span className="font-mono">
              0{step}.
            </span>
          </div>
          <div className="h-px w-full overflow-hidden bg-border">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${((step as number) / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <Question title="Q1. AIで、何をつくりますか？">
          {Q1_OPTIONS.map((o, i) => (
            <OptionButton
              key={o.code}
              index={i}
              onClick={() => pick("q1", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 2 && (
        <Question title="Q2. あなたの開発経験は？">
          {Q2_OPTIONS.map((o, i) => (
            <OptionButton
              key={o.code}
              index={i}
              onClick={() => pick("q2", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 3 && (
        <Question title="Q3. 月額の予算は、どれくらいですか？">
          {Q3_OPTIONS.map((o, i) => (
            <OptionButton
              key={o.code}
              index={i}
              onClick={() => pick("q3", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 4 && (
        <Question title="Q4. 何のために、つかいますか？">
          {Q4_OPTIONS.map((o, i) => (
            <OptionButton
              key={o.code}
              index={i}
              onClick={() => pick("q4", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 5 && (
        <Question title="Q5. 重視したいことは？（任意）">
          {Q5_OPTIONS.map((o, i) => (
            <OptionButton
              key={o.code}
              index={i}
              onClick={() => pick("q5", o.code)}
              label={o.label}
            />
          ))}
          <button
            type="button"
            onClick={skipQ5}
            className="mt-6 self-start border-b border-foreground-muted/40 pb-0.5 text-sm tracking-wide text-foreground-muted transition hover:border-accent hover:text-accent"
          >
            スキップして結果を見る →
          </button>
        </Question>
      )}

      {step === "result" && (
        <Result
          tools={results}
          answers={answers as Answers}
          onReset={reset}
        />
      )}
    </div>
  );
}

function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-8 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function OptionButton({
  onClick,
  label,
  index,
}: {
  onClick: () => void;
  label: string;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full border-b border-border bg-transparent px-1 py-5 text-left transition hover:border-accent"
    >
      <span className="flex items-baseline gap-5">
        <span className="font-mono text-xs text-foreground-muted transition group-hover:text-accent">
          {num}
        </span>
        <span className="flex-1 text-base font-medium text-foreground transition group-hover:text-accent">
          {label}
        </span>
        <span className="text-foreground-muted opacity-0 transition group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100">
          →
        </span>
      </span>
    </button>
  );
}

function Result({
  tools,
  answers,
  onReset,
}: {
  tools: ToolMeta[];
  answers: Answers;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="mb-3 text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
        Recommended Tools
      </div>
      <h2 className="mb-6 font-serif text-3xl text-foreground sm:text-4xl">
        あなたへの推奨ツール
      </h2>
      <p className="mb-12 max-w-2xl text-base leading-[1.8] text-foreground-muted">
        診断結果に基づいて、あなたに合うAIツールを3つご提案します。
      </p>

      <ol className="flex flex-col gap-4">
        {tools.map((tool, i) => {
          const isTop = i === 0;
          return (
            <li
              key={tool.id}
              className={`relative overflow-hidden rounded-2xl border bg-card-bg p-5 transition sm:p-6 ${
                isTop
                  ? "border-accent/40 shadow-lg shadow-accent/5"
                  : "border-border hover:border-accent/30"
              }`}
            >
              {isTop && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                />
              )}

              <div className="grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                {/* ランク */}
                <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-semibold tracking-widest text-foreground/45 uppercase">
                      Rank
                    </span>
                    <span
                      className={`font-mono text-3xl font-bold leading-none tracking-tight sm:text-4xl ${
                        isTop ? "text-accent" : "text-foreground/80"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* 本体 */}
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {tool.affiliateTier === "S" && (
                      <span className="rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-success uppercase">
                        継続収益◎
                      </span>
                    )}
                    {tool.affiliateTier === "watch" && (
                      <span className="rounded-md border border-foreground/15 bg-foreground/5 px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground/55 uppercase">
                        監視中
                      </span>
                    )}
                    {tool.jpFriendly && (
                      <span className="rounded-md border border-secondary/30 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-secondary uppercase">
                        日本語
                      </span>
                    )}
                    {tool.priceFree && (
                      <span className="rounded-md border border-border bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground/65 uppercase">
                        無料枠あり
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {tool.name}
                  </h3>

                  <p className="mb-3 border-l-2 border-accent/50 pl-3 text-sm text-foreground/75">
                    <span className="font-semibold text-accent">推奨理由：</span>{" "}
                    {buildReason(answers, tool)}
                  </p>

                  <p className="mb-4 text-sm text-foreground/65 sm:text-base">
                    {tool.description}
                  </p>

                  <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                    <SpecCell
                      label="月額"
                      value={tool.priceMin === 0 ? "Free〜" : `$${tool.priceMin}〜`}
                    />
                    <SpecCell
                      label="日本語"
                      value={tool.jpFriendly ? "◯" : "△"}
                    />
                    <BarCell label="スピード" score={tool.speed} />
                    <BarCell label="拡張性" score={tool.scale} />
                  </dl>

                  <details className="group/details">
                    <summary className="cursor-pointer list-none text-xs font-semibold tracking-wide text-foreground/55 uppercase hover:text-accent">
                      <span className="inline-block transition-transform group-open/details:rotate-90">
                        ▶
                      </span>{" "}
                      強み・弱みを見る
                    </summary>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="mb-1.5 text-[10px] font-bold tracking-widest text-success uppercase">
                          ＋ 強み
                        </div>
                        <ul className="space-y-1 text-sm text-foreground/75">
                          {tool.strengths.map(s => (
                            <li key={s} className="flex gap-2">
                              <span className="text-success">·</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="mb-1.5 text-[10px] font-bold tracking-widest text-foreground/55 uppercase">
                          − 弱み
                        </div>
                        <ul className="space-y-1 text-sm text-foreground/75">
                          {tool.weaknesses.map(w => (
                            <li key={w} className="flex gap-2">
                              <span className="text-foreground/40">·</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>

                {/* CTA カラム */}
                <div className="flex flex-row gap-2 sm:flex-col sm:items-stretch">
                  <a
                    href={`/go/${tool.id}`}
                    target="_blank"
                    rel="noopener sponsored"
                    className={`group inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                      isTop
                        ? "bg-accent text-accent-fg shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 hover:scale-[1.02]"
                        : "border border-accent/40 text-accent hover:bg-accent/10"
                    }`}
                  >
                    公式を見る
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href={`/tools/${tool.id}/`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground/65 transition hover:border-foreground/30 hover:text-foreground"
                  >
                    詳細・料金
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onReset}
          className="group inline-flex items-center gap-2 border-b border-foreground-muted/40 pb-0.5 text-sm tracking-wide text-foreground-muted transition hover:border-accent hover:text-accent"
        >
          <span className="text-xs">↻</span>
          もう一度診断する
        </button>
        <a
          href="/posts/"
          className="group inline-flex items-center gap-2 border-b border-foreground-muted/40 pb-0.5 text-sm tracking-wide text-foreground-muted transition hover:border-accent hover:text-accent"
        >
          関連記事を読む
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-background px-3 py-2">
      <div className="text-xs text-foreground/60">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold tracking-widest text-foreground/45 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm font-bold tabular-nums">
        {value}
      </dd>
    </div>
  );
}

function BarCell({ label, score }: { label: string; score: 1 | 2 | 3 }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold tracking-widest text-foreground-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 flex h-[3px] overflow-hidden bg-foreground/[0.08]">
        <span
          className="block h-full bg-accent transition-all"
          style={{ width: `${(score / 3) * 100}%` }}
        />
      </dd>
    </div>
  );
}
