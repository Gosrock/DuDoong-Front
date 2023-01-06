/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '.';

export default {
  title: 'Layout',
  component: Layout,
  argTypes: {},
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const layout = Template.bind({});
layout.args = {
  children: (
    <div
      css={css`
        width: 100%;
        height: 100vh;
      `}
    >
      content
    </div>
  ),
};
