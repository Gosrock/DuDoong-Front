import { Button, ButtonSet, Padding, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { IssuedTicketInfo } from '@lib/apis/order/orderType';
import useOverlay from '@lib/hooks/useOverlay';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { BottomSheet } from 'react-spring-bottom-sheet';
import QrSheetContainer from './QrSheetContainer';

const TicketItem = ({
  ticket,
  orderUuid,
  title,
}: {
  ticket: IssuedTicketInfo;
  orderUuid: string;
  title: string;
}) => {
  const { isOpen, openOverlay, closeOverlay } = useOverlay();
  const { push } = useRouter();

  return (
    <Wrapper>
      <Padding size={[0, 36]}>
        <Text typo="P_Text_14_M" color="gray_300">
          {ticket.issuedTicketNo} ({ticket.ticketName}) | {ticket.ticketPrice}
        </Text>
      </Padding>
      <ButtonSet varient="horizontal" padding={[20, 24]}>
        <Link href={`/history/${orderUuid}`}>
          <Button varient="tertiary" fullWidth>
            예매 상세
          </Button>
        </Link>
        <Button
          fullWidth
          varient="secondary"
          onClick={openOverlay}
          disabled={ticket.issuedTicketStatus === '취소 티켓'}
        >
          {ticket.issuedTicketStatus === '취소 티켓'
            ? '취소된 티켓'
            : 'QR코드 보기'}
        </Button>
      </ButtonSet>

      {/* 바텀시트 */}
      <BottomSheet
        open={isOpen}
        onDismiss={closeOverlay}
        css={css`
          position: relative;
          & > div > * {
            // 스크롤바 생기는 현상 잡기
            overflow: hidden;
            &::-webkit-scrollbar {
              display: none;
            }
          }
        `}
      >
        <QrSheetContainer ticket={ticket} title={title} />
        {/* <BlankPage onClick={() => push(`qr?uuid=${ticket.uuid}`)}>
          새 창 열기
        </BlankPage> */}
      </BottomSheet>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 20px;
  a {
    width: 100%;
  }
`;

const BlankPage = styled.button`
  ${({ theme }) => theme.typo.P_Text_14_M}
  color : ${({ theme }) => theme.palette.gray_400};
  position: absolute;
  margin: 0 auto;
  width: 100%;
  bottom: 58px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: 1s forwards fadeIn ease-out;
`;

export default TicketItem;
