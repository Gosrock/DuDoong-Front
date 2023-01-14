import useRefreshMutate from '@lib/hooks/auth/useRefreshMutate';
import { authState } from '@store/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const RefuseAuth = () => {
  const registerToken = localStorage.getItem('registerToken');
  const accessToken = localStorage.getItem('accessToken');
  const { authRefreshMutation } = useRefreshMutate();
  const curAuthState = useRecoilValue(authState);

  if (accessToken) {
    // 엑세스 있으면 홈으로
    return <Navigate replace to="/" />;
  } else if (registerToken) {
    // 토큰 리프레시
    authRefreshMutation.mutate(registerToken);
    // 토큰 있으면 홈으로
    if (curAuthState.isAuthenticated) return <Navigate replace to="/" />;
    // 없으면 로그인
    else return <Outlet />;
  }
  // 둘 다 없으면 로그인
  return <Outlet />;
};

export default RefuseAuth;
