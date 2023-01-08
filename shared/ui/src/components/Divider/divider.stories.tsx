import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Divider } from '.';

export default {
  title: 'Divider',
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const line = Template.bind({});
line.args = { line: true };

export const _default = Template.bind({});
_default.args = {};
