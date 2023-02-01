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

export const primary = Template.bind({});
primary.args = { text: '예시 텍스트', color: 'primary', size: 'lg' };

export const secondary = Template.bind({});
secondary.args = { text: '예시 텍스트', color: 'secondary', size: 'sm' };

export const disabled = Template.bind({});
disabled.args = {
  text: '예시 텍스트',
  color: 'secondary',
  size: 'sm',
  disabled: true,
};
