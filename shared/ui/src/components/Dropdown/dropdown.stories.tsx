/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from '.';

export default {
  title: 'Accordion',
  component: Dropdown,
  argType: {},
  decorators: [
    (Story) => (
      <>
        <Story />
        <Story />
      </>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const accordion = Template.bind({});
accordion.args = {};
