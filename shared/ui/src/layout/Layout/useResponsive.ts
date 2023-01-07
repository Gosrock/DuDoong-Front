import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isPC = useMediaQuery({ minWidth: '768px' });
  return { isPC };
};
