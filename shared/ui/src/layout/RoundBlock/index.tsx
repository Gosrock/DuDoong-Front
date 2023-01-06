import { Padding, PaddingSize } from '..';
import { KeyOfPalette } from '../../theme';
import styled from '@emotion/styled';
import { CSSProperties } from '@emotion/serialize';

/**
 * @param paddingSize 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * @param color : 배경색
 * @param radius : border-radius 값
 */

export interface RoundBlockProps {
  children: JSX.Element;
  color?: KeyOfPalette;
  paddingSize?: PaddingSize;
  radius?: CSSProperties['borderRadius'];
}

export const RoundBlock = ({
  children,
  color = 'white',
  paddingSize = [20, 20],
  radius = 16,
}: RoundBlockProps) => {
  return (
    <RoundWrapper radius={radius} colorKey={color} size={paddingSize}>
      {children}
    </RoundWrapper>
  );
};

// ------------------------------------------------------

interface RoundWrapperProps {
  radius: CSSProperties['borderRadius'];
  colorKey: KeyOfPalette;
}

const RoundWrapper = styled(Padding)<RoundWrapperProps>`
  width: 100%;
  border-radius: ${({ radius }) => `${radius}px`};
  background-color: ${({ colorKey, theme }) => `${theme.palette[colorKey]}`};
`;
