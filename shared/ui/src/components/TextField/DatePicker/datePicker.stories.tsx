import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatePicker } from '.';

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {},
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = () => <DatePicker />;

export const text = Template.bind({});
// // text.args = {
// //   type: 'text',
// //   disabled: false,
// //   value: '',
// //   placeholder: '최대 N글자까지 쓸 수 있어요',
// // };
