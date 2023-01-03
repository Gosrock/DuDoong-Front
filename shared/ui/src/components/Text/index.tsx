import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { KeyOfTypo } from '../../theme';

interface TextProps {
  typo: KeyOfTypo;
  children: string;
  css?: SerializedStyles;
}

export const Text = ({ typo, children }: TextProps) => {
  return <StyledText typo={typo}>{children}</StyledText>;
};

const StyledText = styled.span<{ typo: KeyOfTypo }>`
  ${({ typo }) => typo}
`;
