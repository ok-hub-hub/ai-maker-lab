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

const EYEBROW = "AI MAKER LAB · AI-EDITED ESSAY";

export default async post => {
  const title = post.data.title;
  const author = post.data.author;

  // 長いタイトル用にフォントサイズを段階制御
  const titleLen = [...title].length; // 多バイト対応
  let titleFontSize = 84;
  if (titleLen > 28) titleFontSize = 68;
  if (titleLen > 40) titleFontSize = 56;
  if (titleLen > 56) titleFontSize = 48;

  const fontText =
    title +
    (author ?? "") +
    EYEBROW +
    SITE.title +
    new URL(SITE.website).hostname +
    "by ";

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
          // ── Eyebrow（terracotta line + label）──
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

          // ── Title block ──
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "center",
                marginTop: "8px",
                paddingRight: "20px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "Noto Serif JP",
                      fontWeight: 500,
                      fontSize: titleFontSize,
                      color: COLORS.foreground,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.18,
                      display: "flex",
                      // 長文タイトルの行数制限（satori はoverflow非対応のため文字数で制御）
                    },
                    children: title,
                  },
                },
              ],
            },
          },

          // ── Footer ──
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
                            display: "flex",
                            color: COLORS.foregroundMuted,
                            letterSpacing: "0.04em",
                          },
                          children: author ? `by ${author}` : SITE.title,
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
