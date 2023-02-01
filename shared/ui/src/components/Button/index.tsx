/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { theme } from '../../theme';
import { Spinner } from '../Loader/Spinner';
import { Text } from '../Text';

export type ButtonVarient =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'warn'
  | 'kakao';

/**
 * @param types 버튼의 종류 :  'primary' | 'secondary' | 'selected' | 'unselected' | 'alert' | 'kakao';
 * @param size 버튼의 사이즈 : 화면에 꽉차게 / 크기 고정
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient: ButtonVarient;
  fullWidth: boolean;
  isLoading: boolean;
  width: number;
}

type Props = Partial<ButtonProps>;

const TEXT_COLOR = {
  normal: {
    primary: `${theme.palette.white}`,
    secondary: `${theme.palette.black}`,
    tertiary: `${theme.palette.black}`,
    warn: `${theme.palette.white}`,
    kakao: `${theme.palette.black}`,
  },
};

const BUTTON_COLOR = {
  normal: {
    primary: `${theme.palette.main_500}`,
    secondary: `${theme.palette.point_mint}`,
    tertiary: `${theme.palette.white}`,
    warn: `${theme.palette.red_200}`,
    kakao: `#FFEB00`,
  },
  hover: {
    primary: `${darken(0.01, theme.palette.main_500)}`,
    secondary: `${darken(0.035, theme.palette.point_mint)}`,
    tertiary: `${darken(0.02, theme.palette.white)}`,
    warn: `${darken(0.01, theme.palette.red_200)}`,
    kakao: `${darken(0.01, '#FFEB00')}`,
  },
  active: {
    primary: `${darken(0.03, theme.palette.main_500)}`,
    secondary: `${darken(0.06, theme.palette.point_mint)}`,
    tertiary: `${darken(0.05, theme.palette.white)}`,
    warn: `${darken(0.03, theme.palette.red_200)}`,
    kakao: `${darken(0.03, '#FFEB00')}`,
  },
  disabled: {
    primary: `${theme.palette.gray_200}`,
    secondary: `${theme.palette.gray_200}`,
    tertiary: `${theme.palette.gray_200}`,
    warn: `${theme.palette.gray_200}`,
    kakao: `${theme.palette.gray_200}`,
  },
};

export const Button = ({
  children,
  varient = 'primary',
  fullWidth = false,
  isLoading = false,
  width,
  ...props
}: Props) => {
  return (
    <StyledButton
      varient={varient}
      fullWidth={fullWidth}
      width={width}
      {...props}
    >
      {isLoading ? (
        <Spinner color={TEXT_COLOR.normal[varient]} />
      ) : (
        <Text typo={'P_Header_16_SB'}>{children}</Text>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  varient: ButtonVarient;
  fullWidth: boolean;
  width?: number;
}>`
  height: 56px;
  border-radius: 12px;

  width: ${({ fullWidth, width }) =>
    width ? `${width}px` : fullWidth ? '100%' : '194px'};

  border: 1px solid ${({ theme }) => theme.palette.black};
  background-color: ${({ varient }) => BUTTON_COLOR.normal[varient]};

  color: ${({ varient }) => TEXT_COLOR.normal[varient]};

  &:hover {
    background-color: ${({ varient }) => BUTTON_COLOR.hover[varient]};
  }
  &:active {
    background-color: ${({ varient }) => BUTTON_COLOR.active[varient]};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.white} !important;
    background-color: ${({ varient }) =>
      BUTTON_COLOR.disabled[varient]} !important;
    border: none;
  }
`;
