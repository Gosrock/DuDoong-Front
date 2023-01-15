import { Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import useAuthMutate from '@lib/hooks/auth/useAuthMutate';

const Refresh = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const { authRefreshMutation } = useAuthMutate({
    accessToken: '',
    idToken: '',
    refreshToken: '',
  });
  useEffect(() => {
    if (refreshToken) authRefreshMutation.mutate(refreshToken);
  }, []);
  return <Outlet />;
};

export default Refresh;
