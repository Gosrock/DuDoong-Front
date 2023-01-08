import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { KeyOfPalette, KeyOfTypo } from '../../theme';

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  typo: KeyOfTypo;
  color?: KeyOfPalette;
  children: any;
}

export type TextPropsKey = 'typo' | 'color';
/**
 *
 * @param as Text 컴포넌트의 태그 (기본값 span)
 * @param typo Typo theme 선택
 * @param color Palette theme 선택
 */
export const Text = ({
  typo,
  as = 'span',
  color,
  children,
  ...props
}: TextProps) => {
  return (
    <StyledText typoKey={typo} colorKey={color} as={as} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.span<{ typoKey: KeyOfTypo; colorKey?: KeyOfPalette }>`
  ${({ typoKey, theme }) => theme.typo[typoKey]}
  ${({ colorKey, theme }) =>
    colorKey &&
    css`
      color: ${theme.palette[colorKey]};
    `}
`;
