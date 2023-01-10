/** @jsxImportSource @emotion/react */
import { FlexBox } from "../../layout";
import { Padding } from "../../layout";
import { KeyOfTypo } from "../../theme";
import { KeyOfPalette } from "../../theme";
import { ReactNode } from "react";
import { Text } from "../Text";
import styled from "@emotion/styled";
import dash from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import { PaddingSize } from "../../layout";

export interface CounterProps {
    price: number;
    typo: KeyOfTypo;
    color?: KeyOfPalette;
    rightElement?: ReactNode;
    count: number;
    padding:PaddingSize;
    fixed: boolean;
    setTicketPrice: (price: number) => void;
    setTicketNum: (ticketNum: number) => void;
  }

export const Counter = ({
    price,
    typo = 'Text_16',
    color = 'main_500',
    count,
    fixed,
    rightElement = <></>,
    setTicketNum,
    setTicketPrice,
    } : CounterProps) => {
    const thousandNum = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const handlePlusClick = () => {
        setTicketNum(count + 1);
        setTicketPrice(price + 4000);
    }
    const handleMinusClick = ()=> {
        if(count === 1)
            return
        setTicketNum(count - 1);
        setTicketPrice(price - 4000);
    }
    return (
        <FlexBox id="container" align={'center'} justify={'space-between'}>
            <Padding size = {[16, 24]}>
                <Text typo = {typo} color = {color}>{thousandNum}원</Text>
            </Padding>
            {fixed ? rightElement
            : (
                <Padding size = {[10, 24]}>
                    <CounterWrapper width ={93} height = {36}>
                        <ImgWrapper onClick={handleMinusClick}>
                            <img src={dash} alt="dash"/>
                        </ImgWrapper>
                        <Text typo = {'Text_18'} color = {'gray_500'}>
                                {count}
                        </Text>
                        <ImgWrapper onClick={handlePlusClick}>
                            <img src={plus} alt="plus"/>
                        </ImgWrapper>
                    </CounterWrapper>
                </Padding>
            )}
        </FlexBox>
    );
  };

  export const ImgWrapper = styled.div`
    padding: 6px 4px;
    cursor: pointer;
  `
  export const CounterWrapper = styled.div<{
    width?: number;
    height?: number;
  }>`
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.palette.gray_400};
    border-radius: 18px;
    
    height: ${({ height }) => (height ? `${height}px` : `36px`)};
    width: ${({ width }) => (width ? `${width}px` : '93px')};
  
    //요소 안의 정렬 방법 정의 
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 14;
  `;
