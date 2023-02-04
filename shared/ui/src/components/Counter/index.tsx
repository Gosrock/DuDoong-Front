/** @jsxImportSource @emotion/react */
import { Text } from '../Text';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Plus, Dash } from 'react-bootstrap-icons';
import { theme } from '../../theme';
export interface CounterProps {
  count: number;
  width?: number;
  hegiht?: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
}

export const Counter = ({
  count = 1,
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
    <CounterWrapper width={width} height={hegiht}>
      <ImgWrapper onClick={handleMinusClick}>
        <Dash
          css={{
            width: '24px',
            height: '24px',
            paddingTop: '3px',
            fill: `${theme.palette.gray_500}`,
          }}
        />
      </ImgWrapper>
      <Text typo={'Text_18'} color={'gray_500'}>
        {ticketNum}
      </Text>
      <ImgWrapper onClick={handlePlusClick}>
        <Plus
          css={{
            width: '24px',
            height: '24px',
            paddingTop: '3px',
            fill: `${theme.palette.gray_500}`,
          }}
        />
      </ImgWrapper>
    </CounterWrapper>
  );
};

const ImgWrapper = styled.div`
  padding: 0 4px;
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
  gap: 14;
`;
