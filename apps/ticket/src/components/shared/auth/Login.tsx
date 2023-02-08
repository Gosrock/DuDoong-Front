import { FullScreen, SyncLoader } from '@dudoong/ui';
import { css } from '@emotion/react';
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
    } else {
      openGlobalOverlay({ content: 'login' });
    }

    if (redirect) {
      setCookie('redirectUrl', redirect, { maxAge: 60 });
    }
  }, []);

  return (
    <FullScreen verticalCenter>
      <SyncLoader />
    </FullScreen>
  );
};

export default Login;
