import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ElementsBox } from '.';
import styled from '@emotion/styled';

export default {
  title: 'ElementsBox',
  component: ElementsBox,
  argTypes: {},
} as ComponentMeta<typeof ElementsBox>;

const Template: ComponentStory<typeof ElementsBox> = (args) => (
  <ElementsBox {...args} />
);

const Cel = () => <El />;

export const Text1 = Template.bind({});
Text1.args = {
  paddingSize: 20,
  text: 'text',
};

export const Text2 = Template.bind({});
Text2.args = {
  paddingSize: 20,
  text: 'text',
  subtext: 'text2',
};

export const RightEl = Template.bind({});
RightEl.args = {
  paddingSize: 20,
  rightElement: <Cel />,
};

export const Text1RightEl = Template.bind({});
Text1RightEl.args = {
  paddingSize: 20,
  text: 'text',
  rightElement: <Cel />,
};
export const Text1ImageRightEl = Template.bind({});
Text1ImageRightEl.args = {
  paddingSize: 20,
  text: 'text',
  imageURL:
    'https://blog.kakaocdn.net/dn/dQgYtU/btqVe8WNkSr/18o2eEG2sXHkZR3T2TZl81/img.png',
  rightElement: <Cel />,
};

export const Text2RightEl = Template.bind({});
Text2RightEl.args = {
  paddingSize: 20,
  text: 'text',
  subtext: 'text2',
  rightElement: <Cel />,
};

export const Text2ImageRightEl = Template.bind({});
Text2ImageRightEl.args = {
  paddingSize: 20,
  text: 'text',
  subtext: 'text2',
  imageURL:
    'https://blog.kakaocdn.net/dn/dQgYtU/btqVe8WNkSr/18o2eEG2sXHkZR3T2TZl81/img.png',
  rightElement: <Cel />,
};

const El = styled.div`
  width: 20px;
  height: 20px;
  background-color: aqua;
`;
