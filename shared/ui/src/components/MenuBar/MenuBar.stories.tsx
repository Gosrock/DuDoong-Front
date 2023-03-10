import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { MenuBar } from '.';

export default {
  title: 'MenuBar',
  component: MenuBar,
  argTypes: {},
} as ComponentMeta<typeof MenuBar>;

const Template: ComponentStory<typeof MenuBar> = (args) => {
  const [menu, setMenu] = useState<number>(0);
  return <MenuBar {...args} curActiveMenu={menu} setCurActiveMenu={setMenu} />;
};

export const threeMenus = Template.bind({});
threeMenus.args = { menus: ['예매확인/취소', '예매확인/취소', 'test'] };

export const twoMenus = Template.bind({});
twoMenus.args = { menus: ['예매확인/취소', 'test'] };
