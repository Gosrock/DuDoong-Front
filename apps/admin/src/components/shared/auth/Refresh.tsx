import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { FullScreen, SyncLoader } from '@dudoong/ui';
import useRefresh from '@lib/hooks/auth/useRefresh';
import { getCookie } from '@lib/utils/cookie';

const Refresh = () => {
  const refreshToken = getCookie('refreshToken');
  const { refreshMutation, state, setState } = useRefresh();

  useEffect(() => {
    refreshToken ? refreshMutation.mutate(refreshToken) : setState('failed');
  }, []);

  if (state === 'loading') {
    return (
      <FullScreen verticalCenter>
        <SyncLoader />
      </FullScreen>
    );
  } else if (state === 'failed') {
    return <Navigate replace to="/login" />;
  } else return <Outlet />;
};

export default Refresh;
