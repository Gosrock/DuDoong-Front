import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const primary = Template.bind({});
primary.args = { children: '다음', disabled: false };

export const secondary = Template.bind({});
secondary.args = { children: '다음', types: 'secondary', disabled: false };
