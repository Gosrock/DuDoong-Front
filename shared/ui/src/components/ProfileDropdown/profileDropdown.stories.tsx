/** @jsxImportSource @emotion/react */
import { ComponentMeta } from '@storybook/react';
import { ProfileDropdown, ProfileDropdownOption } from '.';
import { ComponentStory } from '@storybook/react';
import { useState } from '@storybook/addons';

export default {
  title: 'ProfileDropdown',
  component: ProfileDropdown,
  argType: {},
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = (args) => {
  const [value, setValue] = useState<ProfileDropdownOption>(initialOption);
  return (
    <ProfileDropdown
      {...args}
      selectedOption={value}
      setSelectedOption={setValue}
    />
  );
};

const initialOption: ProfileDropdownOption = {
  title: '옵션',
  id: 'null',
};

const mockOptions: ProfileDropdownOption[] = [
  {
    title: '마이페이지',
    id: 'mypage',
  },
  {
    title: '로그아웃',
    id: 'logout',
  },
];

export const defaultOption = Template.bind({});
defaultOption.args = { options: mockOptions };
