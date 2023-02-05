import { RoundBlock } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { OverlayBoxProps } from './GlobalOverlay';

const Modal = ({ open, onDismiss, children }: OverlayBoxProps) => {
  return (
    <Wrapper open={open}>
      <Overlay onClick={onDismiss} />
      <ModalBox padding={[16, 0]}>{children}</ModalBox>
    </Wrapper>
  );
};
export default Modal;

const Wrapper = styled.div<{ open: boolean }>`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: 0.1s forwards fadeIn ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`;

const ModalBox = styled(RoundBlock)`
  @keyframes grow {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  animation: 0.15s forwards grow ease-out;
  z-index: 10;
  width: 390px;
  border: 1px solid black;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  width: 100%;
  height: 100%;
`;
