import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Callback = () => {
  const router = useRouter();
  const { idToken, accessToken, refreshToken } = router.query;
  const { openOverlay } = useGlobalOverlay();
  console.log(idToken);
  const openLoginTest = () => {
    idToken && openOverlay({ content: 'register', props: { idToken } });
  };

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken as string);
    openLoginTest();
  }, []);
  return <>로그인중</>;
};

export default Callback;
