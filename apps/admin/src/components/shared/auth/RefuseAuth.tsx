import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '@lib/utils/cookie';
import { axiosPrivate } from '@lib/apis/axios';
// import { useCookies } from 'react-cookie';
import useRefresh from '@lib/hooks/auth/useRefresh';
import { useEffect } from 'react';

const RefuseAuth = () => {
  // // const [cookies] = useCookies();
  // // const accessToken = cookies.accessToken;
  // const accessToken = getCookie('accessToken');
  // // 엑세스 있으면 홈으로
  // if (accessToken) {
  //   axiosPrivate.defaults.headers.common[
  //     'Authorization'
  //   ] = `Bearer ${accessToken}`;
  //   return <Navigate replace to="/" />;
  // }
  // // 둘 다 없으면 로그인 */
  // return <Outlet />;
  const refreshToken = getCookie('refreshToken');
  const { refreshMutate, status } = useRefresh();

  useEffect(() => {
    refreshToken ? refreshMutate(refreshToken) : null;
  }, []);

  // 엑세스 있으면 홈으로
  if (status === 'success') {
    return <Navigate replace to="/" />;
  }
  // 둘 다 없으면 로그인
  return <Outlet />;
};

export default RefuseAuth;
