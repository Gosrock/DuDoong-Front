import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { FullScreen, SyncLoader } from '@dudoong/ui';
import useRefresh from '@lib/hooks/auth/useRefresh';
import { getCookie } from '@lib/utils/cookie';

const Refresh = () => {
  const refreshToken = getCookie('refreshToken');
  const { refreshMutate, status } = useRefresh();

  useEffect(() => {
    console.log('쿠키에 있는거', refreshToken);
    refreshMutate(refreshToken);
  }, []);

  if (status === 'success') {
    return <Outlet />;
  } else if (status === 'error') {
    return <Navigate replace to="/login" />;
  } else
    return (
      <FullScreen verticalCenter>
        <SyncLoader />
      </FullScreen>
    );
};

export default Refresh;
