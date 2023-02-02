import { Padding, PaddingSize } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

interface BorderBoxProps extends HTMLAttributes<HTMLDivElement> {
  shadow: boolean;
  fullWidth: boolean;
  padding: PaddingSize;
}

type Props = Partial<BorderBoxProps>;
type WrapperProps = Pick<BorderBoxProps, 'shadow' | 'fullWidth'>;

const BorderBox = ({
  shadow = false,
  fullWidth = true,
  children,
  padding,
  ...props
}: Props) => {
  return (
    <Wrapper shadow={shadow} fullWidth={fullWidth} {...props}>
      <Padding size={padding}>{children}</Padding>
    </Wrapper>
  );
};

export default BorderBox;

const Wrapper = styled.div<WrapperProps>`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.black};
  background-color: ${({ theme }) => theme.palette.white};
  ${({ shadow }) =>
    shadow &&
    css`
      box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.15);
    `}
`;
