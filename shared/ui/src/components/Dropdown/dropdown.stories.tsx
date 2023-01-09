/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown, DropdownOption } from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
  argType: {},
  decorators: [
    (Story) => (
      <>
        <Story />
        <Story />
      </>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

const mockOptions: DropdownOption[] = [
  {
    title: '일반 티켓',
    id: 'asdf',
    description: '4000원',
    disabled: false,
  },
  {
    title: '새내기 티켓',
    id: 'ㅂㅈㄷㄱ',
    description: '0원',
    disabled: false,
  },
];

export const accordion = Template.bind({});
accordion.args = { options: mockOptions, initialState: 'asdf' };
