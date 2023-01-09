import { Global, ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { globalStyle, Layout, theme } from '@dudoong/ui';
import GlobalOverlay from '@components/shared/overlay/GlobalOverlay';
import 'react-spring-bottom-sheet/dist/style.css';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <Global styles={globalStyle} />
            <Layout>
              <Component {...pageProps} />
              <GlobalOverlay />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
