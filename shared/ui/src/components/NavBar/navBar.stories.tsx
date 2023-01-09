import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavBar } from '.';

export default {
  title: 'NavBar',
  component: NavBar,
  argTypes: {},
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

const Title = Template.bind({});
Title.args = { title: '예매페이지' };
