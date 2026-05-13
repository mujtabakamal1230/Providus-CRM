// ─── Color Tokens ─────────────────────────────────────────────
export const colors = {
  brandBlue: "#1D70C5",
  brandBlueLight: "#E2F2FF",
  brandGreen: "#38A81B",
  brandGreenLight: "#A0FF88",
  brandPinkLight: "#FAD3FF",
  brandYellowLight: "#FFE072",
} as const;

export type ColorToken = keyof typeof colors;

// ─── Typography Tokens ────────────────────────────────────────
export const typography = {
  h1: {
    fontFamily: "Afacad",
    fontWeight: 700,
    fontSize: "60px",
    lineHeight: "60.9px",
    letterSpacing: "-1.24px",
  },
  h2: {
    fontFamily: "Afacad",
    fontWeight: 700,
    fontSize: "50px",
    lineHeight: "45px",
    letterSpacing: "0px",
  },
  h3: {
    fontFamily: "Afacad",
    fontWeight: 600,
    fontSize: "45px",
    lineHeight: "25px",
    letterSpacing: "-0.39px",
  },
  h4: {
    fontFamily: "Afacad",
    fontWeight: 700,
    fontSize: "30px",
    lineHeight: "35px",
    letterSpacing: "0px",
  },
  p1: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "22px",
    lineHeight: "60.9px",
    letterSpacing: "0.24px",
  },
  p2: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "45px",
    letterSpacing: "0px",
  },
  p3: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "25px",
    letterSpacing: "-0.39px",
  },
  p4: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "35px",
    letterSpacing: "0px",
  },
} as const;

export type TypographyToken = keyof typeof typography;
