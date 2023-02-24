import { Navigate, Outlet } from 'react-router-dom';
import useRefresh from '@lib/hooks/auth/useRefresh';
import { useEffect } from 'react';
import { getCookie } from '@lib/utils/cookie';

const RefuseAuth = () => {
  const refreshToken = getCookie('refreshToken');
  const { refreshMutation, state, setState } = useRefresh();

  useEffect(() => {
    refreshToken ? refreshMutation.mutate(refreshToken) : setState('failed');
  }, []);

  // 엑세스 있으면 홈으로
  if (state === 'succeed') {
    return <Navigate replace to="/" />;
  }
  // 둘 다 없으면 로그인
  return <Outlet />;
};

export default RefuseAuth;
