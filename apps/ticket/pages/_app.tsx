import { globalStyle, theme } from '@dudoong/ui';
import { Global, ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps, AppContext } from 'next/app';
import { useEffect, useState } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import 'react-spring-bottom-sheet/dist/style.css';
import GlobalOverlay from '@components/shared/overlay/GlobalOverlay';
import { AuthApi, OauthLoginResponse } from '@dudoong/utils';
import { authState } from '@store/auth';
import cookies from 'next-cookies';
import { setCredentials } from '@lib/utils/setCredentials';
import { getCookie } from 'cookies-next';
import Layout from '@components/shared/Layout';
import Head from 'next/head';
import { UserApi } from '@lib/apis/user/UserApi';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import { axiosPrivate } from '@lib/apis/axios';

interface MyAppProps extends AppProps {
  loginData: OauthLoginResponse | null;
}

function MyApp({ Component, pageProps, loginData }: MyAppProps) {
  const initializer = ({ set }: MutableSnapshot) => {
    if (loginData) {
      const auth = {
        userProfile: loginData.userProfile,
        accessToken: loginData.accessToken,
        isAuthenticated: true,
        callbackUrl: (getCookie('redirectUrl') as string) || '/',
      };
      set(authState, auth);
    }
  };

  useEffect(() => {
    loginData && setCredentials(loginData);
  }, [loginData]);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot initializeState={initializer}>
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
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component, router } = context;
  const refreshToken = cookies(ctx).refreshToken;
  let pageProps = {};
  let loginData: OauthLoginResponse | null;

  try {
    //?????????????????????(???????????????)????????? ?????????????????? ?????? ??????
    if (ctx.req) {
      const cookie = ctx.req.headers.cookie;
      axiosPrivate.defaults.headers.Cookie = cookie || '';
      const response = await UserApi.REFRESH();
      loginData = response;

      ctx.res?.setHeader(
        'set-cookie',
        `refreshToken=${response.refreshToken}; path=/; max-age=${response.refreshTokenAge}`,
      );
    } else throw new Error('isClient');
  } catch (err: any) {
    //console.log(err.response);
    loginData = null;
  }

  if (Component.getInitialProps) {
    // Component??? context??? ctx??? ????????????
    pageProps = await Component.getInitialProps(ctx);
  }
  // return??? ?????? ?????? ??????????????? props??? ???????????? ?????????.
  return { pageProps, loginData };
};

export default MyApp;
