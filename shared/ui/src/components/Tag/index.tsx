import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { KeyOfPalette, KeyOfTypo } from '../../theme';

type TagColorKey = 'main' | 'mono' | 'red';
type TagColorType = {
  [key in TagColorKey]: {
    background: KeyOfPalette;
    text: KeyOfPalette;
  };
};

type TagSizeKey = 'sm' | 'md' | 'lg';
type TagSizeType = {
  [key in TagSizeKey]: {
    typo: KeyOfTypo;
    padding: string;
    radius: 6 | 8 | 12;
  };
};

const TAG_COLOR: TagColorType = {
  main: {
    background: 'main_100',
    text: 'main_500',
  },
  mono: {
    background: 'gray_200',
    text: 'gray_500',
  },
  red: {
    background: 'red_100',
    text: 'red_200',
  },
};

const TAG_SIZE: TagSizeType = {
  sm: { typo: 'P_Text_10_M', padding: '2px 10px', radius: 6 },
  md: { typo: 'P_Text_12_M', padding: '3px 12px', radius: 8 },
  lg: { typo: 'P_Text_14_M', padding: '7.5px 20px', radius: 8 },
};

export interface TagProps {
  text: string;
  color: TagColorKey;
  size: TagSizeKey;
}

export const Tag = ({ text, color, size }: TagProps) => {
  return (
    <Wrapper color={color} size={size}>
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: TagColorKey; size: TagSizeKey }>`
  ${({ size, theme }) => theme.typo[TAG_SIZE[size].typo]}
  padding: ${({ size }) => TAG_SIZE[size].padding};
  border-radius: ${({ size }) => TAG_SIZE[size].radius}px;
  background-color: ${({ theme, color }) =>
    theme.palette[TAG_COLOR[color].background]};
  color: ${({ theme, color }) => theme.palette[TAG_COLOR[color].text]};
  display: inline-block;
`;
