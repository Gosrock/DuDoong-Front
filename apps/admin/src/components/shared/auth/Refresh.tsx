import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { AuthApi } from '@dudoong/utils';
import { FullScreen, SyncLoader } from '@dudoong/ui';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';

const Refresh = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const [state, setState] = useState<'loading' | 'succeed' | 'failed'>(
    'loading',
  );
  const setAuth = useSetRecoilState(authState);

  const refreshMutation = useMutation(AuthApi.REFRESH, {
    onMutate: () => {
      setState('loading');
    },
    onSuccess: (data) => {
      setAuth({
        userProfile: data.userProfile,
        accessToken: data.accessToken,
        isAuthenticated: true,
        callbackUrl: '/',
      });
      localStorage.setItem('refreshToken', data.refreshToken);
      setState('succeed');
    },
    onError: () => {
      setState('failed');
    },
  });

  useEffect(() => {
    refreshToken ? refreshMutation.mutate(refreshToken) : setState('failed');
  }, []);

  if (state === 'loading') {
    return (
      <FullScreen
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <SyncLoader />
      </FullScreen>
    );
  } else if (state === 'failed') {
    return <Navigate replace to="/login" />;
  } else return <Outlet />;
};

export default Refresh;
