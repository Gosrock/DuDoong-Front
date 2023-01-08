import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from '.';

export default {
  title: 'Input',
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const text = Template.bind({});
text.args = {
  type: 'text',
  disabled: false,
  placeholder: '최대 N글자까지 쓸 수 있어요',
};
