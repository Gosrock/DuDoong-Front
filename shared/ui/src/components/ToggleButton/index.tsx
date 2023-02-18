import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export interface ToggleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggle: boolean;
  onToggleClick: () => void;
}

/**
 *
 * @param toggle 현재 토글상태
 * @param onToggleClick 토글시 액션
 */
export const ToggleButton = ({
  toggle,
  onToggleClick,
  ...props
}: ToggleButtonProps) => {
  const [value, setValue] = useState<boolean>(toggle);
  const handleClickToggle = () => {
    setValue(!value);
    onToggleClick();
  };

  return (
    <ToggleBtn onClick={handleClickToggle} toggle={value} {...props}>
      <Circle toggle={value} />
    </ToggleBtn>
  );
};

const ToggleBtn = styled.button<{ toggle: boolean }>`
  width: 51px;
  height: 31px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.black};
  cursor: pointer;
  background-color: ${({ theme, toggle }) =>
    !toggle ? theme.palette.gray_200 : theme.palette.point_mint};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:disabled {
    background-color: ${({ theme }) => theme.palette.sub_mint};
    cursor: default;
  }
`;

const Circle = styled.div<{ toggle: boolean }>`
  background-color: ${({ theme }) => theme.palette.white};
  border: 0.7px solid ${({ theme }) => theme.palette.black};
  width: 27px;
  height: 27px;
  box-sizing: border-box;
  border-radius: 50%;
  position: absolute;
  left: 1px;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(20px, 0);
      transition: all 0.2s ease-in-out;
    `}

  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
`;
