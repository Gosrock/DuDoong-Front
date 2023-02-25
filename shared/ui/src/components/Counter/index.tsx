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
  limit?: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
}

export const Counter = ({
  count = 1,
  width,
  hegiht,
  limit = 10000,
  onClickPlus,
  onClickMinus,
}: CounterProps) => {
  const [ticketNum, setTicketNum] = useState<number>(count);
  const handlePlusClick = () => {
    if (ticketNum < limit) {
      setTicketNum(ticketNum + 1);
      onClickPlus();
    }
  };
  const handleMinusClick = () => {
    if (ticketNum === 0) return;
    setTicketNum(ticketNum - 1);
    onClickMinus();
  };
  return (
    <CounterWrapper
      width={width}
      height={hegiht}
      count={ticketNum}
      limit={limit}
    >
      <ImgWrapper count={ticketNum} limit={limit} onClick={handleMinusClick}>
        <Dash
          css={{
            width: '24px',
            height: '24px',
            paddingTop: '3px',
            fill: `${
              ticketNum === 0 ? theme.palette.gray_300 : theme.palette.gray_500
            }`,
            cursor: `${ticketNum === 0 ? `default` : `pointer`}`,
          }}
        />
      </ImgWrapper>
      <Text typo={'Text_18'} color={'gray_500'}>
        {ticketNum}
      </Text>
      <ImgWrapper count={ticketNum} limit={limit} onClick={handlePlusClick}>
        <Plus
          css={{
            width: '24px',
            height: '24px',
            paddingTop: '3px',
            fill: `${
              ticketNum >= limit
                ? theme.palette.gray_300
                : theme.palette.gray_500
            }`,
            cursor: `${ticketNum >= limit ? `default` : `pointer`}`,
          }}
        />
      </ImgWrapper>
    </CounterWrapper>
  );
};

const ImgWrapper = styled.div<{
  count: number;
  limit: number;
}>`
  padding: 0 4px;
`;

const CounterWrapper = styled.div<{
  width?: number;
  height?: number;
  count: number;
  limit: number;
}>`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.gray_500};
  border-radius: 18px;
  height: ${({ height }) => (height ? `${height}px` : `36px`)};
  width: ${({ width }) => (width ? `${width}px` : '93px')};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14;
`;
