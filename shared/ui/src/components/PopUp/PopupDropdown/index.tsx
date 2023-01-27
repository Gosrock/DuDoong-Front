/** @jsxImportSource @emotion/react */
import { theme } from '../../../theme';
import { useState, ReactNode } from 'react';
import { Text } from '../../Text';
import styled from '@emotion/styled';
import { FlexBox, Padding } from '../../../layout';
import { css } from '@emotion/react';
import { ChevronDown } from 'react-bootstrap-icons';
import { parseValue } from '../../../lib/utils/parsing';

export interface PopupDropdownProps {
  options: PopupDropdownOption[];
  selectedOption: PopupDropdownOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<PopupDropdownOption>>;
}

export interface PopupDropdownOption {
  title: string;
  id: string;
}

export const PopupDropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: PopupDropdownProps) => {
  const [value, setValue] = useState<PopupDropdownOption>(selectedOption);
  const [open, setOpen] = useState(false);
  const handleOptionClick = (option: PopupDropdownOption) => {
    setValue(option);
    setSelectedOption(option);
    setOpen(!open);
  };
  let ParsedOption = parseValue(value);
  return (
    <>
      <OptionHeader onClick={() => setOpen(!open)}>
        <FlexBox align="left" gap={6} justify="left" direction="row">
          <Text typo="Text_16" color="main_400">
            {ParsedOption}
          </Text>
          <PopupHandler open={open} />
        </FlexBox>
      </OptionHeader>
      <Dropdown open={open}>
        {options.map((option) => (
          <OptionButton
            key={option.id}
            onClick={() => {
              handleOptionClick(option);
            }}
          >
            <DropdownOptionRow option={option} />
          </OptionButton>
        ))}
      </Dropdown>
    </>
  );
};

//드롭다운이 들어가는 공간
const Dropdown = ({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) => {
  return <>{open && <PopupZone>{children}</PopupZone>}</>;
};

const DropdownOptionRow = ({ option }: { option: PopupDropdownOption }) => {
  const { title } = option;
  return (
    <>
      <Padding size={[8, 11]}>
        <Text typo="Text_16_SB" color="gray_500">
          {title}
        </Text>
      </Padding>
    </>
  );
};

const OptionHeader = styled.button`
  position: relative;
  padding: 3px;
  left: 50px;
`;

const OptionButton = styled.button`
  text-align: left;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.palette.main_100};
  }
`;

const PopupZone = styled.div`
  position: relative;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #dedede;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  width: 164px;
`;

const PopupHandler = styled(ChevronDown)<{ open: boolean }>`
  width: 18px;
  height: 18px;
  padding: 2px;
  fill: ${({ theme }) => theme.palette.main_400};
  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
  transition: all 0.4s ease;
`;
