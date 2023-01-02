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
  paddings: {
    values: [
      { name: 'margin-template', value: '24px' },
      { name: 'none', value: '0px' },
    ],
    default: 'none',
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'iPhone 13',
        styles: {
          width: '390px',
          height: '844px',
        },
        type: 'mobile',
      },
      tablet: {
        name: 'iPad Pro 11"',
        styles: {
          width: '834px',
          height: '1194px',
        },
        type: 'tablet',
      },
    },
    defaultViewport: 'mobile',
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
