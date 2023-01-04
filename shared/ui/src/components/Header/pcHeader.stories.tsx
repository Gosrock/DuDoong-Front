import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '.';

export default {
  title: 'Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const user = Template.bind({});
user.args = { profile: { name: '한규진', host: '고스락' } };

export const admin = Template.bind({});
admin.args = {
  profile: { name: '한규진', host: '고스락' },
  title: '고스락 23번째 정기공연',
};
