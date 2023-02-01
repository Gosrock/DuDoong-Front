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

export const secondary = Template.bind({});
secondary.args = { children: '다음', varient: 'secondary', fullWidth: true };

export const tertiary = Template.bind({});
tertiary.args = { children: '다음', varient: 'tertiary' };

export const warn = Template.bind({});
warn.args = { children: '다음', varient: 'warn' };

export const kakao = Template.bind({});
kakao.args = { children: '다음', varient: 'kakao' };
