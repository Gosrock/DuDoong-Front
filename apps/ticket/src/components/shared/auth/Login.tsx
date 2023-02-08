import { FullScreen, SyncLoader } from '@dudoong/ui';
import LoginMarkup from '@dudoong/ui/src/layout/LoginMarkup';
import { loginFc } from '@dudoong/utils';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 *
 * @returns login/expired 의 주소로 돌리면 '로그인이 만료되었어요'라는 워딩
 */
const Login = () => {
  const router = useRouter();
  const { param, redirect } = router.query;
  const { openGlobalOverlay } = useGlobalOverlay();
  useEffect(() => {
    if (param) {
      openGlobalOverlay({ content: 'login', props: { variant: param[0] } });
      if (redirect) {
        setCookie('redirectUrl', redirect, { maxAge: 60 });
      }
    }
  }, []);

  if (param) {
    return (
      <FullScreen verticalCenter>
        <SyncLoader />
      </FullScreen>
    );
  } else {
    return (
      <LoginMarkup
        onKakao={() => {
          loginFc.login({ redirect: redirect as string });
        }}
      />
    );
  }
};

export default Login;
