/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListHeader } from '.';
import { theme } from '../../theme';
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
  size: 'listHeader_18',
};

export const listHeader_18_Custom = Template.bind({});
listHeader_18_Custom.args = {
  size: 'listHeader_18',
  title: (
    <Text typo="Text_18_SB" color="main_500">
      작은글씨 18px 커스텀
    </Text>
  ),
  description: (
    <Text typo="Text_16" color="gray_500">
      여기만
      <span css={{ color: `${theme.palette.main_500} !important` }}>
        보라색
      </span>
    </Text>
  ),
};

export const listHeader_20 = Template.bind({});
listHeader_20.args = {
  size: 'listHeader_20',
  title: '202020',
  rightElement: <Tag text="태그" color="mono" />,
};

export const listHeader_24 = Template.bind({});
listHeader_24.args = {
  size: 'listHeader_24',
  title: '큰글씨 24px',
  rightElement: <Tag text="태그" color="mono" />,
};

export const listHeader_28 = Template.bind({});
listHeader_28.args = {
  size: 'listHeader_28',
  title: ' 큰글씨 28',
  rightElement: <Tag text="태그" color="mono" />,
};
