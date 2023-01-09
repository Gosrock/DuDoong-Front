import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatePicker } from '.';

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {},
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 242,
  placeholder: '날짜를 선택해 주세요',
};
