import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    pallete: {
      main: {
        violet_100: string;
        violet_200: string;
        violet_300: string;
        violet_400: string;
        violet_500: string;
      };
      semantic: {
        red_100: string;
        red_200: string;
        red_300: string;
      };
      mono: {
        white: string;
        gray_100: string;
        gray_200: string;
        gray_300: string;
        gray_400: string;
        gray_500: string;
        black: string;
      };
    };

    typo: {
      Header: {
        Header_28: string;
        Header_24: string;
        Header_20: string;
      };
      Text: {
        Text_18: string;
        Text_18_SB: string;
        Text_16: string;
        Text_16_SB: string;
        Text_14: string;
        Text_14_SB: string;
        Text_12: string;
        Text_12_SB: string;
        Text_10: string;
      };
    };
  }
}
