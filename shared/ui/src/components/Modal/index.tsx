import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { Padding, RoundBlock } from '../../layout';

export interface ModalBoxProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onDismiss: () => void;
  children: ReactNode;
}

export const Modal = ({
  open,
  onDismiss,
  children,
  ...props
}: ModalBoxProps) => {
  return (
    <Wrapper open={open}>
      <Overlay onClick={onDismiss} />
      <ModalBox size={[16, 0]} {...props}>
        {children}
      </ModalBox>
    </Wrapper>
  );
};

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
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`;

const ModalBox = styled(Padding)`
  @keyframes grow {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.white};
  animation: 0.15s forwards grow ease-out;
  z-index: 101;
  /* width: 390px; */
  border: 1px solid black;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  width: 100%;
  height: 100%;
`;
