import "styled-components";
import { createGlobalStyle, css, DefaultTheme } from "styled-components";

type Theme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

const fonts = {
  sans: "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
  serif: `"Times New Roman", Times, Georgia, serif`
};

const fontWeights = {
  bold: 700,
  medium: 500,
  regular: 400
};

const colors = {
  primary: "#8a3af4",
  secondary: "#000",
  tertiary: "#2AA1A1",
  textPrimary: "#000",
  textSecondary: "#999",
  textTertiary: "#666",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
  success: "#4caf50"
};

const h1: any = css`
  font-family: ${fonts.sans};
  font-size: 10vw;
  font-weight: normal;
  line-height: 0.9em;
  color: ${colors.textPrimary};
`;

const h2: any = css`
  font-family: ${fonts.sans};
  font-size: 48px;
  font-weight: normal;
  line-height: 1em;
  color: ${colors.textPrimary};
`;

const h3: any = css`
  font-family: ${fonts.sans};
  font-size: 36px;
  font-weight: normal;
  line-height: 1em;
  color: ${colors.textPrimary};
`;

const h4: any = css`
  font-family: ${fonts.sans};
  font-size: 24px;
  font-weight: normal;
  line-height: 1em;
  color: ${colors.textPrimary};
`;

const h5: any = css`
  font-family: ${fonts.sans};
  font-size: 18px;
  font-weight: normal;
  line-height: 1em;
  color: ${colors.textPrimary};
`;

const h6: any = css`
  font-family: ${fonts.sans};
  font-size: 16px;
  font-weight: normal;
  line-height: 1em;
  color: ${colors.textPrimary};
`;

const button: any = css`
  font-family: ${fonts.sans};
  font-size: 14px;
  font-weight: ${fontWeights.medium};
`;

const body: any = css`
  font-family: ${fonts.sans};
  font-size: 18px;
  font-weight: ${fontWeights.regular};
`;

const caption: any = css`
  font-family: ${fonts.sans};
  font-size: 14px;
  font-weight: ${fontWeights.regular};
`;

const serif: any = css`
  font-family: ${fonts.serif};
  font-size: 14px;
  font-weight: ${fontWeights.regular};
`;

export const theme = {
  fonts,
  fontWeights,
  colors,
  typography: {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body,
    caption,
    button,
    serif
  },
  spacing: {
    large: 30,
    medium: 20,
    small: 15,
    tiny: 10
  },
  transition: {
    slow: 0.35,
    normal: 0.25,
    fast: 0.15
  },
  cornerRadius: 4
};

export const GlobalStyle = createGlobalStyle`
  ::selection {
    background: #8a3af4; /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: #8a3af4; /* Gecko Browsers */
  }

  ${({ theme }) => css`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html,
    body,
    #__next {
      height: 100%;
      min-width: 320px;
    }

    body {
      background: #fff;
      color: ${theme.colors.textPrimary};
      ${theme.typography.body};
      cursor: default;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-text-size-adjust: none;
    }

    strong {
      font-weight: ${theme.fontWeights.bold};
    }

    a {
      color: inherit;
    }

    button {
      cursor: pointer;
    }
  `}
`;
