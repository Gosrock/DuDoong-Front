import { useState } from 'react';

const useOverlay = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openOverlay = () => {
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  return { isOpen, openOverlay, closeOverlay };
};

export default useOverlay;
