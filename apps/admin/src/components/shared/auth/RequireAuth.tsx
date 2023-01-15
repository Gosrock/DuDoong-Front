import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  // 엑세스 있으면 통과
  if (accessToken) {
    return <Outlet />;
  }
  // 없으면 로그인
  return <Navigate replace to="/login" />;
};

export default RequireAuth;
