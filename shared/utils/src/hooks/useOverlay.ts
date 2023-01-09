import { useState } from 'react';

export const useOverlay = (initial: boolean) => {
  const [isOpen, setOpen] = useState(initial);

  function onOpen() {
    setOpen(true);
  }
  function onDismiss() {
    setOpen(false);
  }

  return [isOpen, onOpen, onDismiss] as const;
};
