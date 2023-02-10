import DDHead from '@components/shared/Layout/NextHead';
import useOverlay from '@lib/hooks/useOverlay';
import { Footer, media } from '@dudoong/ui';
import { EventDetailResponse } from '@dudoong/utils';
import EventApi from '@dudoong/utils/src/apis/event/EventApi';
import { GetStaticPaths, GetStaticProps } from 'next';
import SelectTicket from './blocks/SelectTicket';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import OverlayBox from '@components/shared/overlay/OverlayBox';
import PcPage from './blocks/PC/PcPage';
import MobilePage from './blocks/Mobile/MobilePage';
import { GetEventTicketItemsResponse } from '@lib/apis/ticket/ticketType';
import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface DetailTemplateProps extends HTMLAttributes<HTMLDivElement> {
  detail: EventDetailResponse;
  tickets: GetEventTicketItemsResponse | undefined;
  openOverlay: () => void;
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
          openOverlay={openOverlay}
          className={'media-pc'}
        />
        <MobilePage
          detail={detail}
          tickets={tickets}
          openOverlay={openOverlay}
          className={'media-mobile'}
        />
        <section>
          <Footer />
        </section>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { eventId: '1' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { eventId } = context.params as unknown as { eventId: string };

  const detail = await EventApi.GET_EVENT_DETAIL(eventId);

  return {
    props: {
      detail,
    },
  };
};
