import {
  TOOLS,
  type ToolMeta,
  type Q1Code,
  type Q2Code,
  type Q3Code,
  type Q4Code,
  type Q5Code,
} from "@/data/tools";

export type Answers = {
  q1: Q1Code;
  q2: Q2Code;
  q3: Q3Code;
  q4: Q4Code;
  q5: Q5Code;
};

const PRICE_CAP: Record<Q3Code, number> = {
  free: 0,
  "20": 20,
  "50": 50,
  "100plus": Infinity,
};

export function diagnose(answers: Answers): ToolMeta[] {
  // 1) Q1 で候補プール抽出
  let pool = TOOLS.filter(t => t.category.includes(answers.q1));

  // Q1=unsure（このプロジェクトでは "writing" や万能で代用）の場合は
  // ベースライン3つを返す（ChatGPT/Bolt/ElevenLabsなど）
  // 本MVP1では明示的に Q1 が選ばれている前提

  // 2) Q2（経験）でフィルタ
  if (answers.q2 === "engineer") {
    pool = pool.filter(t => t.forEngineer);
  } else if (answers.q2 === "none") {
    pool = pool.filter(t => t.forBeginner);
  }

  // 3) Q3（予算）でフィルタ
  if (answers.q3 === "free") {
    pool = pool.filter(t => t.priceFree);
  } else {
    pool = pool.filter(t => t.priceMin <= PRICE_CAP[answers.q3]);
  }

  // 4) Q5（任意）+ 内部優先度 でスコアリング
  const tierScore: Record<ToolMeta["affiliateTier"], number> = {
    S: 1,
    A: 0.5,
    B: 0.3,
    C: 0.1,
    watch: 0.05,
  };

  const scored = pool.map(t => {
    let score = 0;
    if (answers.q5 === "speed") score += t.speed * 10;
    if (answers.q5 === "quality") score += t.quality * 10;
    if (answers.q5 === "scale") score += t.scale * 10;
    if (answers.q5 === "jp") score += t.jpFriendly ? 10 : 0;
    // タイブレーカーとしてアフィリ強度（純粋な品質スコアの後）
    score += tierScore[t.affiliateTier];
    // 経験との適合度ボーナス
    if (answers.q2 === "engineer" && t.forEngineer) score += 0.5;
    if (answers.q2 === "none" && t.forBeginner) score += 0.5;
    return { tool: t, score };
  });

  scored.sort((a, b) => b.score - a.score);
  let top3 = scored.slice(0, 3).map(s => s.tool);

  // 5) Q4 補強：副業/本業なら、収益化系を1つ混ぜる
  if (answers.q4 === "side" || answers.q4 === "business") {
    let monetize: ToolMeta | undefined;
    if (answers.q1 === "writing") monetize = TOOLS.find(t => t.id === "getresponse");
    else if (answers.q1 === "video") monetize = TOOLS.find(t => t.id === "tubebuddy");
    else if (answers.q1 === "ui" || answers.q1 === "dev")
      monetize = TOOLS.find(t => t.id === "conoha");

    if (monetize && !top3.some(t => t.id === monetize!.id) && top3.length >= 3) {
      top3[2] = monetize;
    }
  }

  // 6) フォールバック：3つに満たない場合は予算/経験フィルタを段階的に緩めて補充
  if (top3.length < 3) {
    const filler = TOOLS.filter(
      t => t.category.includes(answers.q1) && !top3.some(x => x.id === t.id)
    );
    top3 = [...top3, ...filler].slice(0, 3);
  }

  // それでも3未満なら、ChatGPT を最後の砦に
  if (top3.length < 3) {
    const chatgpt = TOOLS.find(t => t.id === "chatgpt");
    if (chatgpt && !top3.some(t => t.id === chatgpt.id)) top3.push(chatgpt);
  }

  return top3.slice(0, 3);
}

export function buildReason(answers: Answers, tool: ToolMeta): string {
  const reasons: string[] = [];
  if (answers.q2 === "engineer" && tool.forEngineer)
    reasons.push("エンジニアのワークフローに馴染む");
  if (answers.q2 === "none" && tool.forBeginner)
    reasons.push("非エンジニアでも導入しやすい");
  if (answers.q3 === "free" && tool.priceFree)
    reasons.push("無料枠から始められる");
  if (answers.q5 === "jp" && tool.jpFriendly) reasons.push("日本語対応");
  if (answers.q5 === "speed" && tool.speed === 3)
    reasons.push("スピード重視に最適");
  if (answers.q5 === "quality" && tool.quality === 3)
    reasons.push("出力品質が高い");
  if (answers.q5 === "scale" && tool.scale === 3)
    reasons.push("拡張性が高い");
  if (answers.q4 === "business" && tool.affiliateTier === "S")
    reasons.push("継続収益モデルとも相性が良い");

  if (reasons.length === 0) reasons.push("総合バランスで上位");
  return reasons.join("、") + "。";
}
