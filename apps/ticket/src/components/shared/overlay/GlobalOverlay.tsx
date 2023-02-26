import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import Error from './content/Error';
import Login from './content/Login';
import Register from './content/Register';
import OverlayBox from './OverlayBox';

export type GlobalSheetContentKey = 'login' | 'register' | 'error';

export type GlobalSheetContentType = {
  [key in GlobalSheetContentKey]: ReactNode;
};

export interface OverlayBoxProps {
  open: boolean;
  onDismiss: () => void;
  children: ReactNode;
}

const globalSheetContent: Record<GlobalSheetContentKey, any> = {
  login: Login,
  register: Register,
  error: Error,
};

const GlobalOverlay = () => {
  const overlay = useRecoilValue(overlayState);
  const { isOpen, closeGlobalOverlay } = useGlobalOverlay();

  if (!overlay) {
    return null;
  } else {
    const Content = globalSheetContent[overlay.content];
    return (
      <OverlayBox open={isOpen} onDismiss={closeGlobalOverlay}>
        <Content {...overlay.props} />
      </OverlayBox>
    );
  }
};

export default GlobalOverlay;
