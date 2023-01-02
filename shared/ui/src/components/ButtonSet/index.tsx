import styled from '@emotion/styled';
import { Padding } from '../../layout';

export interface ButtonSetProps {
  children: JSX.Element;
}

export const ButtonSet = ({ children }: ButtonSetProps) => {
  return (
    <Wrapper>
      <Padding size={[40, 24, 20, 24]}>{children}</Padding>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.gradient.linear_white};
`;
