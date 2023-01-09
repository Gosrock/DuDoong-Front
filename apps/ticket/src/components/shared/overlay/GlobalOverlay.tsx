import { useResponsive } from '@dudoong/utils';
import styled from '@emotion/styled';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRecoilValue } from 'recoil';
import Login from './content/Login';
import Modal from './Modal';

export type GlobalSheetContentKey = 'login';

export type GlobalSheetContentType = {
  [key in GlobalSheetContentKey]: ReactNode;
};

const globalSheetContent = {
  login: Login,
};

const GlobalSheet = () => {
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

export default GlobalSheet;

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
