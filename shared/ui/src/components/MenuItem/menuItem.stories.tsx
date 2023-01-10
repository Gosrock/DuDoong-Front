import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { MenuItem } from '.';

export default {
  title: 'MenuItem',
  component: MenuItem,
  argTypes: {},
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => {
  const [menu, setMenu] = useState<number>(0);
  return (
    <>
      <MenuItem
        {...args}
        menuItemKey={0}
        curActiveMenu={menu}
        setCurActiveMenu={setMenu}
      />
      <MenuItem
        {...args}
        menuItemKey={1}
        curActiveMenu={menu}
        setCurActiveMenu={setMenu}
      />
      <MenuItem
        {...args}
        menuItemKey={2}
        curActiveMenu={menu}
        setCurActiveMenu={setMenu}
      />
    </>
  );
};

export const dashboard = Template.bind({});
dashboard.args = { type: 'dashboard' };

export const basicInfo = Template.bind({});
basicInfo.args = { type: 'basicInfo' };

export const detailInfo = Template.bind({});
detailInfo.args = { type: 'detailInfo' };

export const ticket = Template.bind({});
ticket.args = { type: 'ticket' };

export const option = Template.bind({});
option.args = { type: 'option' };

export const reservationist = Template.bind({});
reservationist.args = { type: 'reservationist' };

export const qr = Template.bind({});
qr.args = { type: 'qr' };

export const hostInfo = Template.bind({});
hostInfo.args = { type: 'hostInfo' };

export const hostMember = Template.bind({});
hostMember.args = { type: 'hostMember' };

export const slack = Template.bind({});
slack.args = { type: 'slack' };
