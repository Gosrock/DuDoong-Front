import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { FullScreen, SyncLoader } from '@dudoong/ui';
import useRefresh from '@lib/hooks/auth/useRefresh';
import { getCookie } from '@lib/utils/cookie';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';

const Refresh = () => {
  const refreshToken = getCookie('refreshToken');
  const { refreshMutate, status } = useRefresh();
  const auth = useRecoilValue(authState);
  useEffect(() => {
    console.log('쿠키에 있는거', refreshToken);
    refreshMutate(refreshToken);
  }, []);

  useEffect(() => {
    console.log(auth.isAuthenticated);
  }, [auth]);

  if (status === 'success' && auth.isAuthenticated === true) {
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
