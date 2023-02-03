import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import Login from './content/Login';
import Register from './content/Register';
import OverlayBox from './OverlayBox';

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
