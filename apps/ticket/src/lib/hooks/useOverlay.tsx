import dynamic from 'next/dynamic';
import { ReactNode, useState } from 'react';

const useOverlay = () => {
  const Element = dynamic(
    () => import('@components/shared/overlay/OverlayBox'),
    { ssr: false },
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openOverlay = () => {
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const OverlayBox = ({ children }: { children: ReactNode }) => {
    return (
      <Element open={isOpen} onDismiss={closeOverlay}>
        {children}
      </Element>
    );
  };

  return { OverlayBox, openOverlay, closeOverlay };
};

export default useOverlay;
