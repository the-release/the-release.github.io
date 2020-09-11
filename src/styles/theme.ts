import "styled-components";
import { createGlobalStyle, css, DefaultTheme } from "styled-components";

type Theme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

const fonts = {
  sans: "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
  serif: `Georgia, Cambria, "Times New Roman", Times, serif`,
  mono: `monospace`
};

const colors = {
  primary: "#8a3af4",
  secondary: "#000",
  tertiary: "#2AA1A1",
  textPrimary: "#000",
  textSecondary: "#666",
  textTertiary: "#999",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
  success: "#4caf50"
};

const h1: any = css`
  font-family: ${fonts.sans};
  font-size: 36px;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media only screen and (max-width: 560px) {
    font-size: 24px;
  }
`;

const h2: any = css`
  font-family: ${fonts.sans};
  font-size: 21px;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media only screen and (max-width: 560px) {
    font-size: 18px;
  }
`;

const h3: any = css`
  font-family: ${fonts.sans};
  font-size: 18px;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media only screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

const h4: any = css`
  font-family: ${fonts.sans};
  font-size: 16px;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media only screen and (max-width: 560px) {
    font-size: 14px;
  }
`;

const h5: any = css`
  font-family: ${fonts.sans};
  font-size: 14px;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media only screen and (max-width: 560px) {
    font-size: 12px;
  }
`;

const h6: any = css`
  font-family: ${fonts.sans};
  font-size: 12px;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const body: any = css`
  font-family: ${fonts.serif};
  font-size: 21px;
  font-weight: normal;
  color: ${colors.textPrimary};
  line-height: 1.55em;

  @media only screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

const caption: any = css`
  font-family: ${fonts.sans};
  font-size: 14px;
  font-weight: normal;
  font-style: italic;
  color: ${colors.textTertiary};
`;

const quote: any = css`
  font-family: ${fonts.serif};
  font-size: 21px;
  font-weight: normal;
  font-style: italic;
  color: ${colors.textTertiary};

  @media only screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

const code: any = css`
  font-family: ${fonts.mono};
  background: #eee;
  border-radius: 5px;
  padding: 0 0.2em;
  color: ${colors.textTertiary};
`;

export const theme = {
  fonts,
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
    quote,
    code
  }
};

export const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    ::selection {
      background: ${theme.colors.primary};
    }
    ::-moz-selection {
      background: ${theme.colors.primary};
    }

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
      cursor: default;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-text-size-adjust: none;
      ${theme.typography.body};
      line-height: normal;
    }

    a {
      color: inherit;
    }

    button {
      cursor: pointer;
    }
  `}
`;
