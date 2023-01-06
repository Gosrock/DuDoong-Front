import styled from '@emotion/styled';
import { darken } from 'polished';
import { ButtonHTMLAttributes } from 'react';
import { theme } from '../../theme';

export type TagButtonColorKey = 'main' | 'red';

type TagButtonColorType = {
  [key in TagButtonColorKey]: {
    default: string;
    hover: string;
    active: string;
    text: string;
  };
};

const TAG_BUTTON_COLOR: TagButtonColorType = {
  main: {
    default: `${theme.palette.main_400}`,
    hover: `${darken(0.01, theme.palette.main_400)}`,
    active: `${darken(0.03, theme.palette.main_400)}`,
    text: `${theme.palette.white}`,
  },
  red: {
    default: `${theme.palette.red_200}`,
    hover: `${darken(0.01, theme.palette.red_200)}`,
    active: `${darken(0.03, theme.palette.red_200)}`,
    text: `${theme.palette.red_100}`,
  },
};

export interface TagButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: TagButtonColorKey;
}

export const TagButton = ({ text, color, ...props }: TagButtonProps) => {
  return (
    <Wrapper color={color} {...props}>
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.button<{ color: TagButtonColorKey }>`
  padding: 4px 12px;
  ${({ theme }) => theme.typo.Text_12};
  color: ${({ color }) => TAG_BUTTON_COLOR[color].text};
  background-color: ${({ color }) => TAG_BUTTON_COLOR[color].default};
  display: inline-block;
  border-radius: 8px;

  &:hover {
    background-color: ${({ color }) => TAG_BUTTON_COLOR[color].hover};
  }

  &:active {
    background-color: ${({ color }) => TAG_BUTTON_COLOR[color].active};
  }
`;
