import { useEffect } from 'react';

const useScreenHeight = () => {
  useEffect(() => {
    const setScreenSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    return () => {
      // cleanup
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);
};

export { useScreenHeight };
