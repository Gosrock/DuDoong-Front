/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RoundBlock } from '.';
import { css } from '@emotion/react';
import { Profile, Text } from '../../components';
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

export const TextElement = Template.bind({});
TextElement.args = {
  children: <Text typo="Text_16">제목</Text>,
};

export const ListRowElement = Template.bind({});
ListRowElement.args = {
  children: (
    <ListRow
      padding={[0, 0]}
      text="text"
      subText="sub"
      rightElement={<ImageMock />}
      leftImage={<ImageMock />}
    ></ListRow>
  ),
  paddingSize: 0,
  color: 'black',
};

export const profileElement = Template.bind({});
profileElement.args = {
  children: (
    <Profile size={'big'} name={'한규진'} subText={'010 - 1234 - 5678'} />
  ),
  paddingSize: 10,
  color: 'gray_200',
};
