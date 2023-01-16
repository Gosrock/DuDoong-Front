import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavBar } from '.';

export default {
  title: 'NavBar',
  component: NavBar,
  argTypes: {},
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

const TestFunc = () => {
  return action('alert');
};

export const Title = Template.bind({});
Title.args = { label: '예매 상세 내역', backHandler: TestFunc() };

export const NoTitle = Template.bind({});
NoTitle.args = { backHandler: TestFunc() };
