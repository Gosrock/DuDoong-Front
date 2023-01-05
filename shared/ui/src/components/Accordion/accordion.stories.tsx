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

export const primary = Template.bind({});
primary.args = {
  children: (
    <>
      <ListRow
        paddingSize={[20, 24]}
        text={'왼쪽 요소'}
        textTypo={'Text_10'}
      ></ListRow>
    </>
  ),
  titlepaddingSize: [20, 10],
};

export const secondary = Template.bind({});
secondary.args = {
  children: (
    <>
      <ListRow
        paddingSize={[20, 24]}
        text={'왼쪽'}
        rightElement={'오른쪽'}
        textTypo={['Text_10', 'Text_12']}
      ></ListRow>
    </>
  ),
  titlepaddingSize: [20, 10],
};

export const normal = Template.bind({});
normal.args = {
  contents: '예시',
  titlepaddingSize: [20, 10],
};
