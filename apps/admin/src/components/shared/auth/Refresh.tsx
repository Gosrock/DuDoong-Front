import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { FullScreen, SyncLoader } from '@dudoong/ui';
import { css } from '@emotion/react';
import useRefresh from '@lib/hooks/auth/useRefresh';

const Refresh = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const { refreshMutation, state, setState } = useRefresh();

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
