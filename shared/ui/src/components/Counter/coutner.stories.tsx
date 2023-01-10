/** @jsxImportSource @emotion/react */
import { Counter } from "."
import { ComponentMeta } from '@storybook/react';
import { ComponentStory } from '@storybook/react';
import { Text } from "../Text";
import { Padding } from "../../layout";
import { useState } from "react";

export default {
    title: 'Counter',
    component: Counter,
    argTypes: {},
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => {
    const [ticketNum, setTicketNum] = useState<number>(1);
    const [ticketPrice, setTicketPrice] = useState<number>(4000);
    return (
        <>
            <Counter {...args} 
                count = {ticketNum} 
                price = {ticketPrice} 
                setTicketNum = {setTicketNum} 
                setTicketPrice = {setTicketPrice} />
        </>
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


