import { RoundBlock } from '@dudoong/ui';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface ModalProps {
  onDismiss: () => void;
  children: ReactNode;
}

const Modal = ({ onDismiss, children }: ModalProps) => {
  return (
    <Wrapper>
      <Overlay onClick={onDismiss} />
      <RoundBlock padding={[16, 0]} css={{ zIndex: '10', width: '390px' }}>
        {children}
      </RoundBlock>
    </Wrapper>
  );
};
export default Modal;

const Wrapper = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: 0.1s forwards fadeIn;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
`;
