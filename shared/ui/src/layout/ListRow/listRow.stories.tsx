/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListRow } from '.';
import { Text } from '../../components/Text';
import { ProfileImage } from '../../components/Profile/ProfileImage';
import { Tag } from '../../components';

export default {
  title: 'ListRow',
  component: ListRow,
  argTypes: {},
} as ComponentMeta<typeof ListRow>;

const Template: ComponentStory<typeof ListRow> = (args) => (
  <ListRow {...args} />
);

export const Full = Template.bind({});
Full.args = {
  padding: [20, 24],
  text: 'text',
  subText: 'sub',
  rightElement: <Tag text="예시 태그" color="red" />,
  leftImage: <ProfileImage size={49} alliance={false} />,
};

export const NoImage = Template.bind({});
NoImage.args = {
  padding: [20, 24],
  text: 'text',
  subText: 'sub',
  rightElement: <Tag text="예시 태그" color="main" />,
};

export const LeftText = Template.bind({});
LeftText.args = {
  padding: [20, 24],
  text: <Text typo="Text_16">제목</Text>,
};

export const LeftRightText = Template.bind({});
LeftRightText.args = {
  padding: [20, 24],
  text: <Text typo="Text_16">제목</Text>,
  rightElement: <Text typo="Text_16_SB">예시</Text>,
};
