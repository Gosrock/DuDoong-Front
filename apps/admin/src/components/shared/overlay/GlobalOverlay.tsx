import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import Login from './content/Login';
import Register from './content/Register';
import Modal from './Modal';

export type GlobalSheetContentKey = 'login' | 'register';

export type GlobalSheetContentType = {
  [key in GlobalSheetContentKey]: ReactNode;
};

const globalSheetContent = {
  login: Login,
  register: Register,
};

const GlobalOverlay = () => {
  const overlay = useRecoilValue(overlayState);
  const { closeOverlay } = useGlobalOverlay();

  if (!overlay) {
    return null;
  } else {
    const Content = globalSheetContent[overlay.content];
    return (
      <Modal onDismiss={closeOverlay}>
        <Content {...overlay.props} />
      </Modal>
    );
  }
};

export default GlobalOverlay;
