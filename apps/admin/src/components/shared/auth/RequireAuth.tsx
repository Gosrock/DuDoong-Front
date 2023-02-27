import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '@lib/utils/cookie';
import { axiosPrivate } from '@lib/apis/axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { useEffect, useState } from 'react';
import { UserApi } from '@lib/apis/user/UserApi';
// import { useCookies } from 'react-cookie';

const RequireAuth = () => {
  // const [cookies] = useCookies();
  // const accessToken = cookies.accessToken;
  const setAuth = useSetRecoilState(authState);
  const [status, setStatus] = useState<'loading' | 'succeed' | 'failed'>(
    'loading',
  );
  const accessToken = getCookie('accessToken');
  const fetchUserData = async () => {
    const data = await UserApi.GET_MY_INFO();
    setAuth({
      isAuthenticated: true,
      callbackUrl: '/',
      accessToken: accessToken,
      userProfile: {
        id: data.userId,
        profileImage: data.profileImage,
        name: data.userName,
      },
    });
  };

  useEffect(() => {
    if (accessToken) {
      axiosPrivate.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      try {
        fetchUserData();
        setStatus('succeed');
      } catch (error) {
        setStatus('failed');
      }
    } else {
      setStatus('failed');
    }
  }, [accessToken]);

  // 엑세스 있으면 홈으로
  if (status === 'succeed') {
    return <Outlet />;
  } else if (status === 'failed')
    // 둘 다 없으면 로그인 */
    return <Navigate replace to="/login" />;
  else return <></>;
};

export default RequireAuth;
