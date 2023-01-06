import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tag } from '.';

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {},
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const main = Template.bind({});
main.args = { text: '예시 텍스트', color: 'main' };

export const mono = Template.bind({});
mono.args = { text: '예시 텍스트', color: 'mono' };

export const red = Template.bind({});
red.args = { text: '예시 텍스트', color: 'red' };
