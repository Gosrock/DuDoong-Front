import DDHead from '@components/shared/Layout/NextHead';
import useOverlay from '@lib/hooks/useOverlay';
import { media } from '@dudoong/ui';
import { EventApi, EventDetailResponse } from '@dudoong/utils';
import SelectTicket from './blocks/SelectTicket';
import { useRouter } from 'next/router';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import OverlayBox from '@components/shared/overlay/OverlayBox';
import PcPage from './blocks/PC/PcPage';
import MobilePage from './blocks/Mobile/MobilePage';
import type { GetEventTicketItemsResponse } from '@lib/apis/ticket/ticketType';
import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

export interface DetailTemplateProps extends HTMLAttributes<HTMLDivElement> {
  detail: EventDetailResponse;
  tickets: GetEventTicketItemsResponse | undefined;
  openTicketOverlay: () => void;
}

const EventDetail = ({ detail }: { detail: EventDetailResponse }) => {
  const router = useRouter();
  const { eventId } = router.query;
  const { data: tickets } = useQuery(['tickets', eventId], () =>
    TicketApi.GET_TICKETITEMS(eventId as string),
  );
  const { isOpen, openOverlay, closeOverlay } = useOverlay();

  return (
    <>
      <DDHead title={`${detail.name} | 두둥`} />
      <Wrapper>
        <PcPage
          detail={detail}
          tickets={tickets}
          openTicketOverlay={openOverlay}
          className={'media-pc'}
        />
        <MobilePage
          detail={detail}
          tickets={tickets}
          openTicketOverlay={openOverlay}
          className={'media-mobile'}
        />
      </Wrapper>
      {tickets && (
        <OverlayBox open={isOpen} onDismiss={closeOverlay}>
          <SelectTicket items={tickets?.ticketItems} eventName={detail.name} />
        </OverlayBox>
      )}
    </>
  );
};

export default EventDetail;

const Wrapper = styled.main`
  ${media.pc} {
    .media-mobile {
      display: none;
    }
  }
  ${media.mobile} {
    .media-pc {
      display: none;
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { eventId } = context.params as unknown as { eventId: string };

  try {
    const detail = await EventApi.GET_EVENT_DETAIL(eventId);
    console.log(detail.status);
    return {
      props: {
        detail,
        revalidate: 1,
      },
    };
  } catch (error: any) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      },
    };
  }
};
