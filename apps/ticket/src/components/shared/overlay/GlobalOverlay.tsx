import { useResponsive } from '@dudoong/utils';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRecoilValue } from 'recoil';
import Login from './content/Login';
<<<<<<< HEAD
import Modal from './Modal';

export type GlobalSheetContentKey = 'login';
=======
import Register from './content/Register';
import Modal from './Modal';

export type GlobalSheetContentKey = 'login' | 'register';
>>>>>>> 77cef6b71ddb5e81757f722cf8af0636b449bccc

export type GlobalSheetContentType = {
  [key in GlobalSheetContentKey]: ReactNode;
};

const globalSheetContent = {
  login: Login,
<<<<<<< HEAD
=======
  register: Register,
>>>>>>> 77cef6b71ddb5e81757f722cf8af0636b449bccc
};

const GlobalOverlay = () => {
  const overlay = useRecoilValue(overlayState);
  const { isOpen, closeOverlay } = useGlobalOverlay();

  if (!overlay) {
    return null;
  } else {
    const Content = globalSheetContent[overlay.content];
    return (
      <OverlayBox open={isOpen} onDismiss={closeOverlay}>
        <Content {...overlay.props} />
      </OverlayBox>
    );
  }
};

export default GlobalOverlay;

export interface OverlayBoxProps {
  open: boolean;
  onDismiss: () => void;
  children: ReactNode;
}
const OverlayBox = ({ open, onDismiss, children }: OverlayBoxProps) => {
  const { isPC } = useResponsive();

  return (
    <>
      {isPC ? (
        <Modal open={open} onDismiss={onDismiss}>
          {children}
        </Modal>
      ) : (
        <BottomSheet open={open} onDismiss={onDismiss}>
          {children}
        </BottomSheet>
      )}
    </>
  );
};
