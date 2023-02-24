import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import { ButtonHTMLAttributes } from 'react';
import { KeyOfTypo, theme } from '../../theme';

type TagButtonColorKey = 'primary' | 'secondary' | 'warn';

type TagButtonColorType = {
  [key in TagButtonColorKey]: {
    default: string;
    hover: string;
    active: string;
    text: string;
  };
};

const TAG_BUTTON_COLOR: TagButtonColorType = {
  primary: {
    default: `${theme.palette.main_500}`,
    hover: `${darken(0.01, theme.palette.main_500)}`,
    active: `${darken(0.03, theme.palette.main_500)}`,
    text: `${theme.palette.white}`,
  },
  secondary: {
    default: `${theme.palette.point_mint}`,
    hover: `${darken(0.01, theme.palette.point_mint)}`,
    active: `${darken(0.03, theme.palette.point_mint)}`,
    text: `${theme.palette.black}`,
  },
  warn: {
    default: `${theme.palette.red_200}`,
    hover: `${darken(0.01, theme.palette.red_200)}`,
    active: `${darken(0.03, theme.palette.red_200)}`,
    text: `${theme.palette.white}`,
  },
};

type tagButtonSizeKey = 'sm' | 'lg' | 'md';
type TagButtonSizeType = {
  [key in tagButtonSizeKey]: {
    typo: KeyOfTypo;
    padding: string;
    radius: 6 | 8 | 12;
  };
};

const TAG_BUTTON_SIZE: TagButtonSizeType = {
  sm: {
    typo: 'P_Text_10_M',
    padding: '4px 12px',
    radius: 6,
  },
  md: {
    typo: 'P_Text_12_M',
    padding: '4px 12px',
    radius: 8,
  },
  lg: {
    typo: 'P_Text_16_M',
    padding: '6px 32px',
    radius: 12,
  },
};

export interface TagButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: TagButtonColorKey;
  size: tagButtonSizeKey;
  width?: number;
}

export const TagButton = ({
  text,
  color,
  size,
  width,
  ...props
}: TagButtonProps) => {
  return (
    <Wrapper color={color} size={size} width={width} {...props}>
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.button<{
  color: TagButtonColorKey;
  size: tagButtonSizeKey;
  width?: number;
}>`
  padding: ${({ size }) => TAG_BUTTON_SIZE[size].padding};
  border-radius: ${({ size }) => TAG_BUTTON_SIZE[size].radius}px;
  ${({ theme, size }) => theme.typo[TAG_BUTTON_SIZE[size].typo]};

  color: ${({ color }) => TAG_BUTTON_COLOR[color].text};
  background-color: ${({ color }) => TAG_BUTTON_COLOR[color].default};
  display: inline-block;

  &:hover {
    background-color: ${({ color }) => TAG_BUTTON_COLOR[color].hover};
  }

  &:active {
    background-color: ${({ color }) => TAG_BUTTON_COLOR[color].active};
  }

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.palette.gray_300};
    color: ${({ theme }) => theme.palette.white};
    cursor: default;
  }
`;
