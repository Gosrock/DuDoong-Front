import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '.';
import { Profile } from '../Profile/Profile';

export default {
  title: 'Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const user = Template.bind({});
user.args = { rightElement: <Profile size={'small'} name={'한규진'} /> };

export const admin = Template.bind({});
admin.args = {
  rightElement: <Profile size={'small'} name={'한규진'} />,
  title: '고스락 23번째 정기공연',
};
