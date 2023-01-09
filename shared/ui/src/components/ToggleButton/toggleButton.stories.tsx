import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToggleButton } from '.';

export default {
  title: 'ToggleButton',
  component: ToggleButton,
  argTypes: {},
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => (
  <ToggleButton {...args} />
);

export const main = Template.bind({});
main.args = {};
