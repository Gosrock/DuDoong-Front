/** @jsxImportSource @emotion/react */
import { Counter } from "."
import { ComponentMeta } from '@storybook/react';
import { ComponentStory } from '@storybook/react';
import { Text } from "../Text";
import { Padding } from "../../layout";


export default {
    title: 'Counter',
    component: Counter,
    argTypes: {},
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => (
    <Counter {...args}/>
)


export const defaultCounter = Template.bind({});
defaultCounter.args = {
    rightElement : 
        <Padding size = {[16, 24]}>
            <Text typo="Text_16" color="gray_300">
                1인 1매(매수 선택 불가)
            </Text>
        </Padding>
}

