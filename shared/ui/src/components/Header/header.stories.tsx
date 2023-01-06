import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '.';
import { ListRow } from '../../layout';
import { ImageMock } from '../../layout/ListRow/listRow.stories';
import { Text } from '../Text';

export default {
  title: 'Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const MockProfile = () => {
  return (
    <ListRow
      leftImage={<ImageMock size={32} />}
      text={<Text typo="Text_16">한규진</Text>}
      paddingSize={0}
    />
  );
};

export const user = Template.bind({});
user.args = { rightElement: <MockProfile /> };

export const admin = Template.bind({});
admin.args = {
  rightElement: <MockProfile />,
  title: '고스락 23번째 정기공연',
};
