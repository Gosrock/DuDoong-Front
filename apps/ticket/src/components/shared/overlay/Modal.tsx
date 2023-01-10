import { RoundBlock } from '@dudoong/ui';
import styled from '@emotion/styled';
import { OverlayBoxProps } from './GlobalOverlay';

const Modal = ({ onDismiss, children }: OverlayBoxProps) => {
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
  animation: 0.1s ease-in forwards fadeIn;
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
  /* -webkit-backdrop-filter: blur(5px);
backdrop-filter: blur(5px); */
  position: absolute;
  width: 100%;
  height: 100%;
`;
