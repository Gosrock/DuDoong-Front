/** @jsxImportSource @emotion/react */
import { Counter } from "."
import { ComponentMeta } from '@storybook/react';
import { ComponentStory } from '@storybook/react';

export default {
    title: 'Counter',
    component: Counter,
    argTypes: {},
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => {
    return (
            <Counter {...args} />
    )
}

export const DefaultCounter = Template.bind({});
DefaultCounter.args = {
    count : 1,
}

