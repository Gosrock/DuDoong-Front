/** @jsxImportSource @emotion/react */

import React from 'react';
import { useState } from 'react';
import { Text } from '../../Text';
import { ReactNode } from 'react';

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
  };
  return (
    <>
      <button onClick={() => setOpen(!open)}>오픈버튼</button>
      <Dropdown open={open}>
        <ul>
          <li>안녕ㅋ</li>
          <li>나도 널 따라갈래</li>
        </ul>
      </Dropdown>
    </>
  );
};

const DropdownList = ({ option }: { option: PopupDropdownOption }) => {
  const { id, title } = option;
  return (
    <ul ref={id}>
      <Text typo={'Text_14'} color={'black'}>
        {title}
      </Text>
    </ul>
  );
};

//드롭다운이 들어가는 공간먼저 생성한다.
const Dropdown = ({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) => {
  return <article>{open && children}</article>;
};
