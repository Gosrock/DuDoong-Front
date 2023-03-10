import { Padding, PaddingSize } from '..';
import { KeyOfPalette } from '../../theme';
import styled from '@emotion/styled';
import { CSSProperties } from '@emotion/serialize';
import { HTMLAttributes, ReactNode } from 'react';

/**
 * @param padding 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * @param color : 배경색
 * @param radius : border-radius 값
 */

export interface RoundBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  background?: KeyOfPalette;
  padding?: PaddingSize;
  radius?: CSSProperties['borderRadius'];
}

export const RoundBlock = ({
  children,
  background = 'white',
  padding = [20, 20],
  radius = 16,
  ...props
}: RoundBlockProps) => {
  return (
    <RoundWrapper
      radius={radius}
      background={background}
      size={padding}
      {...props}
    >
      {children}
    </RoundWrapper>
  );
};

// ------------------------------------------------------

interface RoundWrapperProps {
  radius: CSSProperties['borderRadius'];
  background: KeyOfPalette;
}

const RoundWrapper = styled(Padding)<RoundWrapperProps>`
  border-radius: ${({ radius }) => `${radius}px`};
  background-color: ${({ background, theme }) =>
    `${theme.palette[background]}`};
`;
