import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { KeyOfPalette, KeyOfTypo } from '../../theme';

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  typo: KeyOfTypo;
  color?: KeyOfPalette;
  children: string;
}

export const Text = ({
  typo,
  as = 'span',
  color = 'gray_500',
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
