/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RoundBlock } from '.';
import { css } from '@emotion/react';
import { Text } from '../../components';
import { ListRow } from '../ListRow';

const ImageMock = () => {
  return (
    <div
      css={css`
        width: 49px;
        height: 49px;
        border-radius: 50%;
        background-color: gray;
      `}
    />
  );
};

export default {
  title: 'RoundBlock',
  component: RoundBlock,
  argTypes: {},
} as ComponentMeta<typeof RoundBlock>;

const Template: ComponentStory<typeof RoundBlock> = (args) => (
  <RoundBlock {...args} />
);

export const OnlyText = Template.bind({});
OnlyText.args = {
  content: 'asd',
  color: 'red_300',
  paddingSize: [4, 12],
  radius: 8,
  textType: 'Text_12',
  textColor: 'gray_500',
};

export const TextElement = Template.bind({});
TextElement.args = {
  content: <Text typo="Text_16">제목</Text>,
};

export const ListRowElement = Template.bind({});
ListRowElement.args = {
  content: (
    <ListRow
      paddingSize={[0, 0]}
      text="text"
      subText="sub"
      rightElement={<ImageMock />}
      leftImage={<ImageMock />}
    ></ListRow>
  ),
  color: 'black',
};
