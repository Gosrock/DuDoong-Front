import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text } from '.';

export default {
  title: 'Text',
  component: Text,
  argTypes: {},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const example = Template.bind({});
example.args = {
  children: '두둥!',
  typo: 'Text_18',
  as: 'h5',
};
