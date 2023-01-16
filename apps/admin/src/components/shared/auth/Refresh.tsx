import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useAuthMutate from '@lib/hooks/auth/useAuthMutate';
import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { AuthApi } from '@dudoong/utils';
import { FullScreen, SyncLoader } from '@dudoong/ui';
import { css } from '@emotion/react';

interface AuthType {
  isTried: boolean;
  accessToken: string;
  refreshToken: string;
  userProfile: {
    id: number;
    profileImage: string;
    name: string;
  } | null;
}

const initialState: AuthType = {
  isTried: false,
  accessToken: '',
  refreshToken: '',
  userProfile: null,
};

const Refresh = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const [auth, setAuth] = useState<AuthType>(initialState);
  useEffect(() => {
    AuthApi.REFRESH(refreshToken!)
      .then((res) => {
        setAuth({ isTried: true, ...res });
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('accessToken', res.refreshToken);
      })
      .catch(() => {
        setAuth({ ...initialState, isTried: true });
      });
  }, []);

  // 엑세스 토큰 만료, 엑세스 토큰 없는 경우
  if (!auth.accessToken && auth.isTried)
    return <Navigate replace to="/login" />;

  // 토큰 발급되었을 때
  if (auth.accessToken) {
    return <Outlet />;
  }
  // default
  else {
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
  }
};

export default Refresh;
