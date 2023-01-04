/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListRow } from '.';
import { css } from '@emotion/react';
import { Text } from '../../components';

export default {
  title: 'ListRow',
  component: ListRow,
  argTypes: {},
} as ComponentMeta<typeof ListRow>;

const Template: ComponentStory<typeof ListRow> = (args) => (
  <ListRow {...args} />
);

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

export const Full = Template.bind({});
Full.args = {
  paddingSize: [20, 24],
  text: 'text',
  subText: 'sub',
  rightElement: <ImageMock />,
  leftImage: <ImageMock />,
};

export const NoImage = Template.bind({});
NoImage.args = {
  paddingSize: [20, 24],
  text: 'text',
  subText: 'sub',
  rightElement: <ImageMock />,
};

export const LeftText = Template.bind({});
LeftText.args = {
  paddingSize: [20, 24],
  text: <Text typo="Text_16">제목</Text>,
};

export const LeftRightText = Template.bind({});
LeftRightText.args = {
  paddingSize: [20, 24],
  text: <Text typo="Text_16">제목</Text>,
  rightElement: <Text typo="Text_16_SB">예시</Text>,
};
