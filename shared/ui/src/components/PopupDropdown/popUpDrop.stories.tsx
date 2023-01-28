/** @jsxImportSource @emotion/react */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PopupDropdownOption, PopupDropdown } from '.';
import { useState } from 'react';
import { parseValue } from '../../lib/utils/parsing';

export default {
  title: 'PopupDropdown',
  component: PopupDropdown,
  argType: {},
} as ComponentMeta<typeof PopupDropdown>;

const Template: ComponentStory<typeof PopupDropdown> = (args) => {
  const [value, setValue] = useState<PopupDropdownOption>(initialOption);
  return (
    <PopupDropdown
      {...args}
      selectedOption={value}
      setSelectedOption={setValue}
    />
  );
};

const initialOption: PopupDropdownOption = {
  title: '옵션',
  id: 'null',
};

export const ProfileDropdown = Template.bind({});
ProfileDropdown.args = {
  header: '김유진 님',
  type: 'ProfileDropdown',
  options: [
    {
      title: '마이페이지',
      id: 'mypage',
    },
    {
      title: '로그아웃',
      id: 'logout',
    },
  ],
};

export const FinderDropdown = Template.bind({});
FinderDropdown.args = {
  header: '옵션',
  type: 'FinderDropdown',
  options: [
    {
      title: '이름',
      id: 'name',
    },
    {
      title: '전화번호',
      id: 'phone',
    },
  ],
};
