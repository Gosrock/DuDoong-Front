import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListHeader } from '.';
import { Tag } from '../Tag';

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
    rightElement: <Tag text="태그" color="mono" />
};

export const listHeader_20 = Template.bind({});
listHeader_20.args = {
    rightElement: <Tag text="태그" color="mono" />
};

export const listHeader_24 = Template.bind({});
listHeader_24.args = {
    rightElement: <Tag text="태그" color="mono" />
};

export const listHeader_28 = Template.bind({});
listHeader_28.args = {
    rightElement: <Tag text="태그" color="mono" />
};


