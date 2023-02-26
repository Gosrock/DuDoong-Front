import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '@lib/utils/cookie';
import { useCookies } from 'react-cookie';

const RequireAuth = () => {
  const [cookies] = useCookies();
  const accessToken = cookies.accessToken;

  // 엑세스 있으면 홈으로
  if (accessToken) {
    return <Outlet />;
  }
  // 둘 다 없으면 로그인 */
  return <Navigate replace to="/login" />;
};

export default RequireAuth;
