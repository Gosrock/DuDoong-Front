/** @jsxImportSource @emotion/react */
import { FlexBox } from "../../layout";
import { Padding } from "../../layout";
import { KeyOfTypo } from "../../theme";
import { KeyOfPalette } from "../../theme";
import { ReactNode } from "react";
import { Text } from "../Text";
import { useState } from "react";
import { Counter } from "../Counter";

export interface TicketCountProps {
    price: number;
    typo: KeyOfTypo;
    color?: KeyOfPalette;
    rightElement?: ReactNode;
    count: number;
    fixed: boolean;
    setTicketPrice: (price: number) => void;
    setTicketNum: (ticketNum: number) => void;
}

export const TicketCount =({
    price,
    typo = 'Text_16',
    color = 'main_500',
    count,
    fixed,
    rightElement = <></>,
}: TicketCountProps) => {
    const [ticketPrice, setTicketPrice] = useState<number>(price);
    const thousandNum = ticketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const handlePlusClick = () => {
        setTicketPrice(ticketPrice + 4000);
    }
    const handleMinusClick = ()=> {
        setTicketPrice(ticketPrice - 4000);
    }
    return (
        <FlexBox id="container" align={'center'} justify={'space-between'}>
            <Padding size = {[16, 24]}>
                <Text typo = {typo} color = {color}>{thousandNum}원</Text>
            </Padding>
            {fixed ? rightElement : (
                <Counter count = {count} onClickPlus = {handlePlusClick} onClickMinus = {handleMinusClick}/>
            )}
        </FlexBox>
    );
 };