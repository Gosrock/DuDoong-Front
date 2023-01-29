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

export const info = Template.bind({});
info.args = { type: 'info' };

export const detail = Template.bind({});
detail.args = { type: 'detail' };

export const tickets = Template.bind({});
tickets.args = { type: 'tickets' };

export const options = Template.bind({});
options.args = { type: 'options' };

export const guests = Template.bind({});
guests.args = { type: 'guests' };

export const qr = Template.bind({});
qr.args = { type: 'qr' };

export const hostinfo = Template.bind({});
hostinfo.args = { type: 'hostinfo' };

export const hostmember = Template.bind({});
hostmember.args = { type: 'hostmember' };

export const hostevents = Template.bind({});
hostevents.args = { type: 'hostevents' };

export const hostalliance = Template.bind({});
hostalliance.args = { type: 'hostalliance' };
