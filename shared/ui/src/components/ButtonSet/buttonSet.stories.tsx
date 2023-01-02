import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonSet } from '.';
import { FlexBox } from '../../layout';
import { Button } from '../Button';

export default {
  title: 'ButtonSet',
  component: ButtonSet,
  argTypes: {},
} as ComponentMeta<typeof ButtonSet>;

const Template: ComponentStory<typeof ButtonSet> = (args) => (
  <ButtonSet {...args} />
);

export const _default = Template.bind({});
_default.args = {
  children: (
    <FlexBox align={'center'} justify={'flex-start'} gap={'10'}>
      <Button types={'secondary'}>다음</Button>
      <Button>다음</Button>
    </FlexBox>
  ),
  size: [24, 20],
};
