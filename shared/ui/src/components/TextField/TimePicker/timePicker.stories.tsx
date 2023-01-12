import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TimePicker } from '.';

export default {
  title: 'TimePicker',
  component: TimePicker,
  argTypes: {},
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = (args) => (
  <TimePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 242,
  placeholder: 'Select Time',
};
