/** @jsxImportSource @emotion/react */
import { ComponentMeta } from '@storybook/react';
import { ComponentStory } from '@storybook/react';
import { PopupDropdownOption, PopupDropdown } from '.';
import { useState } from 'react';

export default {
  title: 'PopupDropdown',
  component: PopupDropdown,
  argType: {},
} as ComponentMeta<typeof PopupDropdown>;

const Template: ComponentStory<typeof PopupDropdown> = (args) => {
  const [value, setValue] = useState<PopupDropdownOption>(initialOption);
  return <PopupDropdown {...args} />;
};

const initialOption: PopupDropdownOption = {
  title: '옵션 선택',
  id: 'null',
};

export const initial = Template.bind({});
