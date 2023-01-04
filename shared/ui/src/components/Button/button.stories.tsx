import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const primary = Template.bind({});
primary.args = { children: '다음', varient: 'primary', disabled: false };

export const fixed = Template.bind({});
fixed.args = {
  children: '다음',
  varient: 'primary',
  disabled: false,
  size: 'fixed',
};

export const secondary = Template.bind({});
secondary.args = { children: '다음', varient: 'secondary' };

export const unselected = Template.bind({});
unselected.args = { children: '다음', varient: 'unselected' };

export const selected = Template.bind({});
selected.args = { children: '다음', varient: 'selected' };

export const alert = Template.bind({});
alert.args = { children: '다음', varient: 'alert' };
