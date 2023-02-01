import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tag } from '.';

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {},
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const large = Template.bind({});
large.args = { text: '예시 텍스트', color: 'main', size: 'lg' };

export const medium = Template.bind({});
medium.args = { text: '예시 텍스트', color: 'mono', size: 'md' };

export const small = Template.bind({});
small.args = { text: '예시 텍스트', color: 'red', size: 'sm' };
