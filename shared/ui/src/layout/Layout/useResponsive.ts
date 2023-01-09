<<<<<<< HEAD
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isPC = useMediaQuery({ minWidth: '768px' });
  return { isPC };
};
=======
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useResponsive() {
  const [isPC, setIsPC] = useState<boolean>(false);
  const pc = useMediaQuery({ minWidth: '768px' });

  useEffect(() => {
    setIsPC(pc);
  }, [pc]);

  return { isPC };
}
>>>>>>> fb33d8f10ad8f6c2cb0b2245ba677c7aab0de5b0
