import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';

export interface ToggleButtonProps {
  toggle: boolean;
  onToggleClick: () => void;
}

/**
 *
 * @param toggle 현재 토글상태
 * @param onToggleClick 토글시 액션
 */
export const ToggleButton = ({ toggle, onToggleClick }: ToggleButtonProps) => {
  const [value, setValue] = useState<boolean>(toggle);
  const handleClickToggle = () => {
    setValue(!value);
    onToggleClick();
  };

  return (
    <ToggleBtn onClick={handleClickToggle} toggle={value}>
      <Circle toggle={value} />
    </ToggleBtn>
  );
};

const ToggleBtn = styled.button<{ toggle: boolean }>`
  width: 51px;
  height: 31px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme, toggle }) =>
    !toggle ? theme.palette.gray_200 : theme.palette.main_400};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
`;

const Circle = styled.div<{ toggle: boolean }>`
  background-color: ${({ theme }) => theme.palette.white};
  width: 27px;
  height: 27px;
  border-radius: 50%;
  position: absolute;
  left: 2px;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(20px, 0);
      transition: all 0.2s ease-in-out;
    `}

  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
`;
