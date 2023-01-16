import { globalStyle, Layout, theme } from '@dudoong/ui';
import { Global, ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps, AppContext } from 'next/app';
import { useMemo, useState } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import 'react-spring-bottom-sheet/dist/style.css';
import GlobalOverlay from '@components/shared/overlay/GlobalOverlay';
import { AuthApi } from '@dudoong/utils';
import cookies from 'next-cookies';
import { authState, AuthStateType } from '@store/auth';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import MainLayout from '@components/shared/Main';

interface MyAppProps extends AppProps {
  auth: AuthStateType | null;
}

function MyApp({ Component, pageProps, auth }: MyAppProps) {
  const initializer = useMemo(
    () =>
      ({ set }: MutableSnapshot) => {
        if (auth) {
          set(authState, auth);
        }
      },
    [auth],
  );
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot initializeState={initializer}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <Global styles={globalStyle} />
            <MainLayout>
              <Component {...pageProps} />
              <GlobalOverlay />
            </MainLayout>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context;
  const refreshToken = cookies(ctx).refreshToken;
  //console.log(refreshToken);
  let pageProps = {};
  let auth: AuthStateType | null;

  try {
    const response = await AuthApi.REFRESH(refreshToken!);
    auth = {
      userProfile: response.userProfile,
      accessToken: response.accessToken,
      isAuthenticated: true,
      callbackUrl: '/',
    };
  } catch (err) {
    auth = null;
  }

  if (Component.getInitialProps) {
    // Component의 context로 ctx를 넣어주자
    pageProps = await Component.getInitialProps(ctx);
  }
  // return한 값은 해당 컴포넌트의 props로 들어가게 됩니다.
  return { pageProps, auth };
};

export default MyApp;
