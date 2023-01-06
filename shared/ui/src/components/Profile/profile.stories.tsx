import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Profile } from '../Profile/Profile';

export default {
  title: 'Profile',
  component: Profile,
  argTypes: {},
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => (
  <Profile {...args} />
);

export const big = Template.bind({});
big.args = { size: 'big', name: '한규진', subText: '010-1234-5678' };

export const small = Template.bind({});
small.args = { size: 'small', name: '한규진', subText: '고스락' };
