/** @jsxImportSource @emotion/react */
import { KeyOfPalette, theme, KeyOfTypo } from '../../theme';
import { useState, ReactNode } from 'react';
import { Text } from '../Text';
import styled from '@emotion/styled';
import { FlexBox, Padding } from '../../layout';
import { css } from '@emotion/react';
import { ChevronDown, CaretDownFill } from 'react-bootstrap-icons';
import { parseValue } from '../../lib/utils/parsing';

export type DropdownKey = 'ProfileDropdown' | 'FinderDropdown';

type DropdownType = {
  [key in DropdownKey]: {
    typo: KeyOfTypo;
    textColor: KeyOfPalette;
    palette: string;
    icon: any;
    iconSize: string;
  };
};

const DROPDOWN_TYPE_SET: DropdownType = {
  ProfileDropdown: {
    typo: 'Text_16',
    textColor: 'gray_500',
    palette: `${theme.palette.gray_500}`,
    icon: CaretDownFill,
    iconSize: '10px',
  },
  FinderDropdown: {
    typo: 'Text_16',
    textColor: 'main_400',
    palette: `${theme.palette.main_400}`,
    icon: ChevronDown,
    iconSize: '18px',
  },
};

export interface PopupDropdownOption {
  title: string;
  id: string;
}

export interface PopupDropdownProps {
  type?: DropdownKey;
  header: string;
  openSet: boolean;
  options: PopupDropdownOption[];
  selectedOption: PopupDropdownOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<PopupDropdownOption>>;
}

interface IconStyle {
  open: boolean;
  color: string;
  size: string;
}

export const PopupDropdown = ({
  type = 'FinderDropdown',
  header,
  options,
  openSet = false,
  selectedOption,
  setSelectedOption,
}: PopupDropdownProps) => {
  const [value, setValue] = useState<PopupDropdownOption>(selectedOption);
  const [open, setOpen] = useState(openSet);
  const handleOptionClick = (option: PopupDropdownOption) => {
    setValue(option);
    setSelectedOption(option);
    setOpen(!open);
  };

  if (type === 'FinderDropdown') header = parseValue(value);

  const PopupHandler = styled(DROPDOWN_TYPE_SET[type].icon)<IconStyle>`
    width: ${(size) => size};
    height: ${(size) => size};
    padding: 2px;
    ${({ open }) =>
      open &&
      css`
        transform: rotate(180deg);
      `}
    fill: ${(color) => color};
  `;

  return (
    <>
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
      <OptionHeader onClick={() => setOpen(!open)}>
        <FlexBox align="center" gap={6} justify="left" direction="row">
          <Text
            typo={DROPDOWN_TYPE_SET[type].typo}
            color={DROPDOWN_TYPE_SET[type].textColor}
          >
            {header}
          </Text>
          <PopupHandler
            open={open}
            color={DROPDOWN_TYPE_SET[type].palette}
            size={DROPDOWN_TYPE_SET[type].iconSize}
          />
        </FlexBox>
      </OptionHeader>
    </>
  );
};

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
  position: fixed;
  padding: 3px;
  left: 50px;
  top: 100px;
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
