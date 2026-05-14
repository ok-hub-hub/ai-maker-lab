import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

// Brand palette (matches src/styles/global.css)
const COLORS = {
  background: "#faf9f5",
  foreground: "#1c1a17",
  foregroundMuted: "#6b6660",
  accent: "#b8553b",
  secondary: "#8b6f56",
  border: "#e6e1d6",
};

const HEADLINE = "AI Maker Lab";
const SUB_PRIMARY = "Vibe Coding と個人開発の";
const SUB_SECONDARY = "実体験ジャーナル";
const EYEBROW = "VIBE CODING JOURNAL · 2026";
const FOOTER_NOTE = "v0 · Lovable · Bolt · Cursor";

export default async () => {
  // フォント subset 用テキスト（描画する全文字を渡す）
  const fontText =
    HEADLINE +
    SUB_PRIMARY +
    SUB_SECONDARY +
    EYEBROW +
    FOOTER_NOTE +
    SITE.title +
    SITE.desc +
    new URL(SITE.website).hostname;

  return satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          background: COLORS.background,
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "Inter",
        },
        children: [
          // ── Eyebrow（terracotta short line + uppercase label）──
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: 18,
                letterSpacing: "0.2em",
                color: COLORS.foregroundMuted,
                fontWeight: 500,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "48px",
                      height: "2px",
                      background: COLORS.accent,
                    },
                  },
                },
                EYEBROW,
              ],
            },
          },

          // ── Main headline block ──
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "center",
                marginTop: "8px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "Noto Serif JP",
                      fontWeight: 500,
                      fontSize: 104,
                      color: COLORS.foreground,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                    },
                    children: HEADLINE,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "Noto Serif JP",
                      fontWeight: 500,
                      fontSize: 44,
                      color: COLORS.foreground,
                      lineHeight: 1.45,
                      marginTop: "32px",
                      display: "flex",
                      flexDirection: "column",
                    },
                    children: [SUB_PRIMARY, SUB_SECONDARY],
                  },
                },
              ],
            },
          },

          // ── Footer (terracotta divider + hostname + tools)──
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      height: "2px",
                      background: COLORS.accent,
                      width: "100%",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 22,
                      color: COLORS.foregroundMuted,
                      fontWeight: 500,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            color: COLORS.foreground,
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                          },
                          children: new URL(SITE.website).hostname,
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            color: COLORS.foregroundMuted,
                            letterSpacing: "0.08em",
                          },
                          children: FOOTER_NOTE,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(fontText),
    }
  );
};
