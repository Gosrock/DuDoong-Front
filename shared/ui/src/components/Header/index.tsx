/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { FlexBox, Padding } from '../../layout';
import { Text } from '../Text';
import Logo from '../../assets/logo/Logo';
import { ThemeType, useHeaderColorContext } from './useHeaderColorContext';
import { palette } from '../../theme';
export * from './useHeaderColorContext';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  rightElement: ReactNode;
  title?: string;
}

export const Header = ({ rightElement, title }: HeaderProps) => {
  const { theme } = useHeaderColorContext();

  return (
    <Wrapper align={'center'} colortheme={theme}>
      <Padding size={[0, 38]} fill>
        <FlexBox justify={'space-between'} align={'center'}>
          <button
            onClick={() =>
              (window.location.href = `${window.location.origin}/home`)
            }
          >
            <Logo fill={theme === 'black' ? palette.white : '#040001'} />
          </button>
          {rightElement}
        </FlexBox>
      </Padding>
      {title && (
        <Text
          typo="G_Side_14_M"
          color="black"
          css={css`
            position: absolute;
            margin: 0 auto;
            padding-left: 252px;
          `}
        >
          {title}
        </Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)<{ colortheme?: ThemeType }>`
  height: 64px;
  width: 100%;
  border-bottom: 1px solid
    ${({ theme, colortheme }) =>
      colortheme === 'black' ? 'transparent' : theme.palette.gray_200};
  box-sizing: border-box;
  background-color: ${({ colortheme, theme }) =>
    colortheme === 'black' ? theme.palette.black : theme.palette.white};

  transition: color 0.2s;
  -webkit-transition: background-color 0.2s linear;
  -ms-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;

  & * {
    transition: color 0.2s;
    -webkit-transition: background-color 0.2s linear;
    -ms-transition: background-color 0.2s linear;
    transition: background-color 0.2s linear;
  }
`;
