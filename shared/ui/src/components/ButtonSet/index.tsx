import styled from '@emotion/styled';
import { Padding, PaddingProps, PaddingSize } from '../../layout';

export interface ButtonSetProps {
  children: JSX.Element;
  size: PaddingSize;
}

export const ButtonSet = ({ children, size }: ButtonSetProps) => {
  return (
    <Wrapper>
      <Padding size={size}>{children}</Padding>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.gradient.linear_white};
`;
