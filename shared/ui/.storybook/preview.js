import { Global, ThemeProvider } from '@emotion/react';
import { globalStyle } from '../src/theme/global';
import { theme } from '../src/index';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Story />
    </ThemeProvider>
  ),
];
