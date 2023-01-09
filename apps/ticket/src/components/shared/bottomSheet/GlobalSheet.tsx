import styled from '@emotion/styled';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRecoilValue } from 'recoil';
import Login from './content/Login';

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
      <BottomSheet open={isOpen} onDismiss={closeOverlay}>
        <Container>
          <Content {...overlay.props} />
        </Container>
      </BottomSheet>
    );
  }
};

export default GlobalSheet;

const Container = styled.div``;
