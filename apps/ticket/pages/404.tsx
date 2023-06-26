import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/home');
  }, []);
  return null;
}

export default NotFound;
