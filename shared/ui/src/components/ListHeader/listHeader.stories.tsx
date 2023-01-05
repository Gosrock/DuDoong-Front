import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListHeader } from '.';

export default {
    title: "listHeader",
    component: ListHeader,
    argTypes: {},
} as ComponentMeta<typeof ListHeader>;

const Template: ComponentStory<typeof ListHeader> = (args) => (
    <ListHeader {...args} />
);


export const listHeader_18 = Template.bind({});
listHeader_18.args = {
};

export const listHeader_20 = Template.bind({});
listHeader_20.args = {
};

export const listHeader_24 = Template.bind({});
listHeader_24.args = {
};

export const listHeader_28 = Template.bind({});
listHeader_28.args = {
};


