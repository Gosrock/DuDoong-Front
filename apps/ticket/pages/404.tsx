import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

function NotFound() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.replace('/home');
  }, []);
  return null;
}

export default NotFound;
