import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

export interface SelectButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  fullWidth?: boolean;
  isSelected: boolean;
}

type Props = Pick<SelectButtonProps, 'fullWidth' | 'isSelected'>;

export const SelectButton = ({
  text,
  isSelected,
  fullWidth = true,
  ...props
}: SelectButtonProps) => {
  return (
    <Wrapper fullWidth={fullWidth} isSelected={isSelected} {...props}>
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.button<Props>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '194px')};
  height: 48px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.main_400 : 'transparent'};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.white : theme.palette.main_400};
  border: 1px solid ${({ theme }) => theme.palette.main_400};
  border-radius: 12px;
  ${({ theme }) => theme.typo.P_Button_16_SB}

  &:disabled {
    background-color: ${({ theme }) => theme.palette.gray_200}!important;
    color: ${({ theme }) => theme.palette.white} !important;
    border: none !important;
  }
`;
