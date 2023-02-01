import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { SelectButton } from '.';
import { ButtonSet } from '../ButtonSet';

export default {
  title: 'SelectButton',
  component: SelectButton,
  argTypes: {},
} as ComponentMeta<typeof SelectButton>;

const Template: ComponentStory<typeof SelectButton> = (args) => {
  const [selected, setSelected] = useState<1 | 2>(1);

  return (
    <ButtonSet varient="horizontal">
      <SelectButton
        text={'아니오'}
        isSelected={selected === 1}
        onClick={() => setSelected(1)}
      />
      <SelectButton
        text={'네'}
        isSelected={selected === 2}
        onClick={() => setSelected(2)}
      />
    </ButtonSet>
  );
};

export const large = Template.bind({});
large.args = {};
