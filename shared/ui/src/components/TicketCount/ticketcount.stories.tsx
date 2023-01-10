/** @jsxImportSource @emotion/react */
import { ComponentMeta } from '@storybook/react';
import { ComponentStory } from '@storybook/react';
import { Text } from "../Text";
import { Padding } from "../../layout";
import { TicketCount } from '.';

export default {
    title:'TicketCount',
    component: TicketCount,
    argTypes:{}
} as ComponentMeta<typeof TicketCount>;

const Template: ComponentStory<typeof TicketCount> = (args) => {
    return (
        <TicketCount {...args}/>
    )
}

export const defaultCounter = Template.bind({});
defaultCounter.args = {
    price : 4000,
    count : 1,
    fixed : false,
}

export const fixedCounter = Template.bind({});
fixedCounter.args = {
    price : 4000,
    count : 1,
    fixed : true,
    rightElement : 
        <Padding size = {[16, 24]}>
            <Text typo="Text_16" color="gray_300">
                1인 1매(매수 선택 불가)
            </Text>
        </Padding> 
}
