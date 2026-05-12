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

const Q1_OPTIONS: { code: Q1Code; label: string; emoji: string }[] = [
  { code: "dev", label: "プログラミング・開発（コードを書く）", emoji: "💻" },
  { code: "ui", label: "UI・デザイン・Webサイトを作る", emoji: "🎨" },
  { code: "video", label: "動画・コンテンツ作成", emoji: "🎬" },
  { code: "writing", label: "文章・記事・SEO", emoji: "✍️" },
  { code: "automation", label: "業務自動化（複数ツール連携）", emoji: "🔗" },
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
        <div className="mb-6">
          <div className="mb-2 text-sm text-foreground/60">
            ステップ {step} / 5
          </div>
          <div className="h-2 w-full overflow-hidden rounded bg-foreground/10">
            <div
              className="h-full rounded bg-accent transition-all"
              style={{ width: `${((step as number) / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <Question title="Q1. AIで何をしたいですか？">
          {Q1_OPTIONS.map(o => (
            <OptionButton
              key={o.code}
              onClick={() => pick("q1", o.code)}
              label={`${o.emoji} ${o.label}`}
            />
          ))}
        </Question>
      )}

      {step === 2 && (
        <Question title="Q2. あなたの開発経験は？">
          {Q2_OPTIONS.map(o => (
            <OptionButton
              key={o.code}
              onClick={() => pick("q2", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 3 && (
        <Question title="Q3. 月額予算はどれくらい？">
          {Q3_OPTIONS.map(o => (
            <OptionButton
              key={o.code}
              onClick={() => pick("q3", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 4 && (
        <Question title="Q4. AIで何をしたい？（目的）">
          {Q4_OPTIONS.map(o => (
            <OptionButton
              key={o.code}
              onClick={() => pick("q4", o.code)}
              label={o.label}
            />
          ))}
        </Question>
      )}

      {step === 5 && (
        <Question title="Q5. 重視するポイントは？（任意）">
          {Q5_OPTIONS.map(o => (
            <OptionButton
              key={o.code}
              onClick={() => pick("q5", o.code)}
              label={o.label}
            />
          ))}
          <button
            type="button"
            onClick={skipQ5}
            className="mt-4 text-sm text-foreground/60 underline hover:text-accent"
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
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function OptionButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-border bg-background px-5 py-4 text-left text-base font-medium transition hover:border-accent hover:bg-accent/5"
    >
      {label}
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
      <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
        🎯 あなたへの推奨ツール
      </h2>
      <p className="mb-8 text-base text-foreground/70">
        診断結果に基づいて、あなたに合うAIツールを3つ提案します。
      </p>

      <ol className="flex flex-col gap-6">
        {tools.map((tool, i) => (
          <li
            key={tool.id}
            className="rounded-lg border border-border bg-foreground/[0.02] p-6"
          >
            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-accent">
                {i + 1}位
              </span>
              <h3 className="text-2xl font-bold">{tool.name}</h3>
            </div>
            <p className="mb-3 text-sm text-foreground/60">
              💡 {buildReason(answers, tool)}
            </p>
            <p className="mb-4 text-base">{tool.description}</p>

            <div className="mb-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              <Stat
                label="月額"
                value={tool.priceMin === 0 ? "無料あり" : `$${tool.priceMin}〜`}
              />
              <Stat label="日本語" value={tool.jpFriendly ? "◯" : "△"} />
              <Stat
                label="スピード"
                value={"★".repeat(tool.speed)}
              />
              <Stat
                label="拡張性"
                value={"★".repeat(tool.scale)}
              />
            </div>

            <details className="mb-4">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80 hover:text-accent">
                強み・弱みを見る
              </summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs font-semibold text-foreground/60">
                    ✨ 強み
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {tool.strengths.map(s => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold text-foreground/60">
                    ⚠️ 弱み
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {tool.weaknesses.map(w => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>

            <a
              href={`/go/${tool.id}`}
              target="_blank"
              rel="noopener sponsored"
              className="inline-block rounded-md bg-accent px-6 py-3 font-semibold text-background transition hover:opacity-90"
            >
              🚀 {tool.name} を試す →
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-foreground/5"
        >
          ↻ もう一度診断する
        </button>
        <a
          href="/posts/"
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-foreground/5"
        >
          📚 関連記事を読む →
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
