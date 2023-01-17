/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Accordion } from '.';
import { ListRow } from '../../layout';
import { theme } from '../../theme';

export default {
  title: 'Accordion',
  component: Accordion,
  argType: {},
  decorators: [
    (Story) => (
      <>
        <Story />
        <Story />
      </>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const accordion = Template.bind({});
accordion.args = {
  title: '아코디언',
  content: (
    // 내 티켓확인하기 아코디언 내용
    <ListRow
      text={'1. 학번을 적어주세요'}
      subText={'B811204'}
      textTypo={['Text_16', 'Text_14']}
      textColor={['gray_500', 'gray_400']}
      gap={10}
      padding={[12, 24]}
      css={css`
        background-color: ${theme.palette.gray_100};
      `}
    />
  ),
};
