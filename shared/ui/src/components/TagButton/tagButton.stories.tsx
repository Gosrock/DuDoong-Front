import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TagButton } from '.';

export default {
  title: 'TagButton',
  component: TagButton,
  argTypes: {},
} as ComponentMeta<typeof TagButton>;

const Template: ComponentStory<typeof TagButton> = (args) => (
  <TagButton {...args} />
);

export const main = Template.bind({});
main.args = { text: '예시 텍스트', color: 'main' };

export const red = Template.bind({});
red.args = { text: '예시 텍스트', color: 'red' };
