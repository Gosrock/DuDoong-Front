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

const cel1 = () => <El1 />;
const cel2 = () => <El2 />;
const cel3 = () => <El3 />;

export const element3 = Template.bind({});
element3.args = {
  paddingSize: 20,
  justify: 'space-between',
  leftElement: cel1,
  rightElement: cel2,
  midElement: cel3,
};

export const element2Start = Template.bind({});
element2Start.args = {
  paddingSize: 20,
  justify: 'start',
  leftElement: cel1,
  rightElement: cel2,
};

export const element2SpaceBetween = Template.bind({});
element2SpaceBetween.args = {
  paddingSize: 20,
  justify: 'space-between',
  leftElement: cel1,
  rightElement: cel2,
};

export const element1Right = Template.bind({});
element1Right.args = {
  paddingSize: 20,
  justify: 'start',
  leftElement: cel1,
};

export const element1Left = Template.bind({});
element1Left.args = {
  paddingSize: 20,
  justify: 'end',
  leftElement: cel1,
};

export const element1Mid = Template.bind({});
element1Mid.args = {
  paddingSize: 20,
  justify: 'center',
  leftElement: cel1,
};

const El1 = styled.div`
  width: 20px;
  height: 20px;
  background-color: aqua;
`;

const El2 = styled.div`
  width: 30px;
  height: 10px;
  background-color: darkblue;
`;

const El3 = styled.div`
  width: 10px;
  height: 30px;
  background-color: #7a4f00;
`;
