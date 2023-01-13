import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea } from '.';

export default {
  title: 'TextArea',
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const text = Template.bind({});
text.args = {
  disabled: false,
  placeholder: '최대 N글자까지 쓸 수 있어요',
};
