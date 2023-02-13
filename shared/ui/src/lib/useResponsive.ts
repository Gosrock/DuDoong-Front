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
