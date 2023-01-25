/** @jsxImportSource @emotion/react */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PopupDropdownOption, PopupDropdown } from '.';
import { useState } from 'react';

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

const mockOptions: PopupDropdownOption[] = [
  {
    title: '이름',
    id: 'name',
  },
  {
    title: '전화번호',
    id: 'phone',
  },
  {
    title: '닉네임',
    id: 'nickname',
  },
];
export const popupDropdown = Template.bind({});
popupDropdown.args = { options: mockOptions };
