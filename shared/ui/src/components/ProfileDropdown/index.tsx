import React from 'react';
import { useState } from 'react';
import { Profile } from '../Profile/Profile';
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Padding } from '../../layout';
import { theme } from '../../theme';
import { Text } from '../Text';
import { FlexBox } from '../../layout';

export interface ProfileDropdownProps {
  options: ProfileDropdownOption[];
  selectedOption: ProfileDropdownOption;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<ProfileDropdownOption>
  >;
}

export interface ProfileDropdownOption {
  title: string;
  id: string;
}

export const ProfileDropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: ProfileDropdownProps) => {
  const [value, setValue] = useState<ProfileDropdownOption>(selectedOption);
  const [open, setOpen] = useState(false);
  const handleOptionClick = (option: ProfileDropdownOption) => {
    setValue(option);
    setSelectedOption(option);
    setOpen(!open);
  };
  return (
    <>
      <FlexBox align={'left'} direction={'column'} gap={20} justify={'start'}>
        <ProfileButton onClick={() => setOpen(!open)}>
          <Profile size={'big'} name={'김유진'} subText={'고스락 밴드'} />
        </ProfileButton>
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
      </FlexBox>
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

const ProfileButton = styled.button`
  padding: 5px;
`;

const PopupZone = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: 5px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 16px;
  padding: 12px 30px;
  z-index: 100;
  width: fit-content;
  box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.15);

  &:after {
    border-color: #ffffff transparent;
    border-style: solid;
    border-width: 0 11px 16px 11px;
    content: '';
    display: block;
    position: absolute;
    top: -16px;
    left: 18px;
    z-index: 1;
  }
  &:before {
    border-color: #000000 transparent;
    border-style: solid;
    border-width: 0 11px 16px 11px;
    content: '';
    display: block;
    position: absolute;
    top: -17px;
    left: 18px;
    z-index: 0;
  }
`;

const OptionButton = styled.button`
  text-align: left;
  //padding-left : 10px;
  display: block;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.palette.main_100};
  }
`;

const DropdownOptionRow = ({ option }: { option: ProfileDropdownOption }) => {
  const { title } = option;
  return (
    <>
      <Padding size={[8, 8]}>
        <Text typo="Text_18" color="gray_500">
          {title}
        </Text>
      </Padding>
    </>
  );
};
