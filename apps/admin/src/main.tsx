/* eslint-disable react/jsx-no-undef */
import { globalStyle, theme } from '@dudoong/ui';
import { css, Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import GlobalOverlay from './components/shared/overlay/GlobalOverlay';

const queryClient = new QueryClient();

const adminGlobalStyle = css`
  ${globalStyle}
  body {
    background-color: ${theme.palette.gray_100};
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename="/admin">
    <Global styles={adminGlobalStyle} />
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
          <GlobalOverlay />
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  </BrowserRouter>,
);

export { queryClient };
