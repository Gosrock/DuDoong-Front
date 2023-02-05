import { Modal } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import Register from './content/Register';

export type GlobalSheetContentKey = 'register';

export type GlobalSheetContentType = {
  [key in GlobalSheetContentKey]: ReactNode;
};

const globalSheetContent = {
  register: Register,
};

const GlobalOverlay = () => {
  const overlay = useRecoilValue(overlayState);
  const { isOpen, closeOverlay } = useGlobalOverlay();

  if (!overlay) {
    return null;
  } else {
    const Content = globalSheetContent[overlay.content];
    return (
      <Modal open={isOpen} onDismiss={closeOverlay}>
        <Content {...overlay.props} />
      </Modal>
    );
  }
};

export default GlobalOverlay;
