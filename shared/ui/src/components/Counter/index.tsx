/** @jsxImportSource @emotion/react */
import { Padding } from '../../layout';
import { Text } from '../Text';
import styled from '@emotion/styled';
import dash from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';
import { PaddingSize } from '../../layout';
import { useState } from 'react';

export interface CounterProps {
  count: number;
  padding?: PaddingSize;
  width?: number;
  hegiht?: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
}

export const Counter = ({
  count = 1,
  padding = [10, 24],
  width,
  hegiht,
  onClickPlus,
  onClickMinus,
}: CounterProps) => {
  const [ticketNum, setTicketNum] = useState<number>(count);
  const handlePlusClick = () => {
    setTicketNum(ticketNum + 1);
    onClickPlus();
  };
  const handleMinusClick = () => {
    if (ticketNum === 1) return;
    setTicketNum(ticketNum - 1);
    onClickMinus();
  };
  return (
    <Padding size={padding}>
      <CounterWrapper width={width} height={hegiht}>
        <ImgWrapper onClick={handleMinusClick}>
          <img src={dash} alt="dash" />
        </ImgWrapper>
        <Text typo={'Text_18'} color={'gray_500'}>
          {ticketNum}
        </Text>
        <ImgWrapper onClick={handlePlusClick}>
          <img src={plus} alt="plus" />
        </ImgWrapper>
      </CounterWrapper>
    </Padding>
  );
};

const ImgWrapper = styled.div`
  padding: 6px 4px;
  cursor: pointer;
`;
const CounterWrapper = styled.div<{
  width?: number;
  height?: number;
}>`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.gray_400};
  border-radius: 18px;

  height: ${({ height }) => (height ? `${height}px` : `36px`)};
  width: ${({ width }) => (width ? `${width}px` : '93px')};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 14;
`;
