import useRefreshMutate from '@lib/hooks/auth/useRefreshMutate';
import { authState } from '@store/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const RequireAuth = () => {
  const registerToken = localStorage.getItem('registerToken');
  const accessToken = localStorage.getItem('accessToken');
  const { authRefreshMutation } = useRefreshMutate();
  const curAuthState = useRecoilValue(authState);

  // return <Outlet />;
  if (accessToken) {
    // 엑세스 있으면 통과
    return <Outlet />;
  } else if (registerToken) {
    // 토큰 리프레시
    authRefreshMutation.mutate(registerToken);
    // 토큰 있으면 통과
    if (curAuthState.isAuthenticated) return <Outlet />;
    // 없으면 홈으로
    else return <Navigate replace to="/login" />;
  }
  // 둘 다 없으면 홈으로
  return <Navigate replace to="/login" />;
};

export default RequireAuth;
