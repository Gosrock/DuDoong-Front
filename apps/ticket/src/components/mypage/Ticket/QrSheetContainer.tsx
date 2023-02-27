import { Text } from '@dudoong/ui';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import styled from '@emotion/styled';
import {
  IssuedTicketInfo,
  IssuedTicketStatus,
} from '@lib/apis/order/orderType';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const GRADIENT_COLOR: Record<IssuedTicketStatus, string[]> = {
  '입장 전': ['#6B36DC', '#92F5CE'],
  '입장 완료': ['#C7C7CB', '#E3E4E8'],
  '취소 티켓': [],
};

const QrSheetContainer = ({ ticket }: { ticket: IssuedTicketInfo }) => {
  const QrCode = dynamic(() => import('./QrCode'), { ssr: false });
  const { data } = useQuery(
    ['tickets', ticket.uuid, 'pulling'],
    () => TicketApi.GET_ISSUEDTICKETS(ticket.issuedTicketId),
    { refetchInterval: 1000 },
  );

  const { setToast } = useToastify();

  useEffect(() => {
    if (ticket.issuedTicketStatus === '입장 완료') {
      setToast({ comment: '입장이 완료되었어요!', type: 'info' });
    }
  }, [data?.issuedTicketInfo.issuedTicketStatus, ticket.issuedTicketStatus]);

  return (
    <Wrapper>
      <Text typo="P_Text_14_M" color="gray_300">
        {ticket.issuedTicketNo} ({ticket.ticketName}) | {ticket.ticketPrice}
      </Text>
      <QrWrapper>
        <QrContainer>
          <StatusIndicator
            status={
              data?.issuedTicketInfo.issuedTicketStatus ||
              ticket.issuedTicketStatus
            }
          />
          <QrCode ticket={ticket} />
        </QrContainer>
      </QrWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const QrWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray_100};
  border-radius: 30px;
  padding: 36px;
  margin: 16px auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QrContainer = styled.div`
  position: relative;
  & > div:nth-of-type(2) {
    z-index: 2;
    position: relative;
    display: flex;

    canvas {
      border-radius: 16px;
    }
  }
`;
const StatusIndicator = styled.div<{ status: IssuedTicketStatus }>`
  position: absolute;
  width: 270px;
  height: 270px;
  top: -10px;
  left: -10px;
  z-index: 1;
  border-radius: 24px;
  @keyframes spin {
    100% {
      transform: rotate(-360deg);
    }
  }
  overflow: hidden;
  &:before {
    content: '';
    height: 150%;
    width: 150%;
    position: absolute;
    left: -25%;
    top: -25%;
    animation: spin 2s infinite linear;

    background: ${({ status }) =>
      `conic-gradient(${GRADIENT_COLOR[status][0]},${GRADIENT_COLOR[status][1]})`};

    @keyframes spin {
      100% {
        transform: rotate(-360deg);
      }
    }
  }
`;
export default QrSheetContainer;
