import { Spacing, Text } from '@dudoong/ui';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import styled from '@emotion/styled';
import type {
  IssuedTicketInfo,
  IssuedTicketStatus,
} from '@lib/apis/order/orderType';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Bbanzzaks from '@assets/bbanzzaks-qr.svg';
import Bbanzzak from '@assets/bbanzzak-qr.svg';

const GRADIENT_COLOR: Record<IssuedTicketStatus, string[]> = {
  '입장 전': ['#6B36DC', '#92F5CE'],
  '입장 완료': ['#C7C7CB', '#E3E4E8'],
  '취소 티켓': [],
};

const QrSheetContainer = ({
  ticket,
  title,
}: {
  ticket: IssuedTicketInfo;
  title: string;
}) => {
  const QrCode = dynamic(() => import('./QrCode'), { ssr: false });
  const [isToastReady, setIsToastReady] = useState<boolean>(
    ticket.issuedTicketStatus === '입장 전',
  );
  const { data } = useQuery(
    ['ticket', ticket.uuid, 'pulling'],
    () => TicketApi.GET_ISSUEDTICKETS(ticket.uuid),
    { refetchInterval: 1000 },
  );

  const { setToast } = useToastify();

  useEffect(() => {
    console.log(isToastReady);
    if (isToastReady) {
      if (data?.issuedTicketInfo.issuedTicketStatus === '입장 완료') {
        setToast({ comment: '입장이 완료되었어요!', type: 'info' });
        setIsToastReady(false);
      }
    }
  }, [data?.issuedTicketInfo.issuedTicketStatus]);

  return (
    <Wrapper>
      <Spacing size={16} />
      <Text typo="P_Header_20_B" color="black" className={'title'}>
        {title}
      </Text>
      <QrWrapper
        status={
          data
            ? data.issuedTicketInfo.issuedTicketStatus === '입장 전'
            : ticket.issuedTicketStatus === '입장 전'
        }
      >
        <QrContainer>
          {/* <StatusIndicator
            status={
              data?.issuedTicketInfo.issuedTicketStatus ||
              ticket.issuedTicketStatus
            }
          /> */}
          <QrCode
            uuid={ticket.uuid}
            status={
              data
                ? data.issuedTicketInfo.issuedTicketStatus
                : ticket.issuedTicketStatus
            }
          />
          <Bbanzzaks className="bbanzzaks" />
          <Bbanzzak className="bbanzzak" />
        </QrContainer>
      </QrWrapper>
      <Text typo="P_Text_14_M" color="gray_300">
        {ticket.issuedTicketNo} ({ticket.ticketName}) | {ticket.ticketPrice}
      </Text>
      <Spacing size={15} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    display: block;
    margin: 0 auto;
    text-align: center;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0px 20px;
  }
`;
const QrWrapper = styled.div<{ status: boolean }>`
  background-color: ${({ theme, status }) =>
    status ? theme.palette.point_mint : theme.palette.gray_100};
  border-radius: 48px;
  padding: 36px;
  margin: 16px auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QrContainer = styled.div`
  /* position: relative;
  & > div:nth-of-type(2) {
    z-index: 2;
    position: relative;
    display: flex;

    canvas {
      border-radius: 16px;
    }
  } */
  padding: 14px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.palette.black};
  box-shadow: 3px 4px 3px rgba(0, 0, 0, 0.12);

  position: relative;
  .bbanzzaks {
    top: -21px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: 29px;
    position: absolute;
  }
  .bbanzzak {
    bottom: -18.5px;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: 27px;
    position: absolute;
  }
`;
/* const StatusIndicator = styled.div<{ status: IssuedTicketStatus }>`
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
`; */
export default QrSheetContainer;
