import styled from '@emotion/styled';
import { KeyOfPalette } from '../../theme';

export type TagColorKey = 'main' | 'mono' | 'red';

type TagColorType = {
  [key in TagColorKey]: {
    background: KeyOfPalette;
    text: KeyOfPalette;
  };
};

const tagColor: TagColorType = {
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

export interface TagProps {
  text: string;
  color: TagColorKey;
}

export const Tag = ({ text, color }: TagProps) => {
  return <Wrapper color={color}>{text}</Wrapper>;
};

const Wrapper = styled.div<{ color: TagColorKey }>`
  padding: 4px 12px;
  ${({ theme }) => theme.typo.Text_12};
  background-color: ${({ theme, color }) =>
    theme.palette[tagColor[color].background]};
  color: ${({ theme, color }) => theme.palette[tagColor[color].text]};
  display: inline-block;
  border-radius: 8px;
`;
