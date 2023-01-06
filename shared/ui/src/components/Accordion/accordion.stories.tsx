import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';
import { Accordion } from '.';
import { ListRow } from '../../layout';

export default {
  title: 'Accordion',
  component: Accordion,
  argType: {},
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const normal = Template.bind({});
normal.args = {
  contents: '예시',
  titlepaddingSize: [20, 10],
  titleTypo: 'Text_14_SB',
  titleAs: 'h5',
};
