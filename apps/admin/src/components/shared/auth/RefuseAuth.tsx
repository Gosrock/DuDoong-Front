import { Navigate, Outlet } from 'react-router-dom';
const RefuseAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  // 엑세스 있으면 홈으로
  if (accessToken) {
    return <Navigate replace to="/" />;
  }
  // 둘 다 없으면 로그인
  return <Outlet />;
};

export default RefuseAuth;
