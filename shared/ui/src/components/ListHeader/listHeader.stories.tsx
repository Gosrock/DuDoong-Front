import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListHeader } from '.';
import { Tag } from '../Tag';
import { Text } from '../Text';

export default {
  title: 'listHeader',
  component: ListHeader,
  argTypes: {},
} as ComponentMeta<typeof ListHeader>;

const Template: ComponentStory<typeof ListHeader> = (args) => (
  <ListHeader {...args} />
);

export const listHeader_18 = Template.bind({});
listHeader_18.args = {
  title: '작은글씨 18px',
  description: '설명설명',
  variant: 'listHeader_18',
};

export const listHeader_18_Custom = Template.bind({});
listHeader_18_Custom.args = {
  title: (
    <Text typo="Text_18_SB" color="main_500">
      작은글씨 18px 커스텀
    </Text>
  ),
  description: '설명설명',
};

export const listHeader_20 = Template.bind({});
listHeader_20.args = {
  title: '202020',
  rightElement: <Tag text="태그" color="mono" />,
};

export const listHeader_24 = Template.bind({});
listHeader_24.args = {
  rightElement: <Tag text="태그" color="mono" />,
};

export const listHeader_28 = Template.bind({});
listHeader_28.args = {
  rightElement: <Tag text="태그" color="mono" />,
};
