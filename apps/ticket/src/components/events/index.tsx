import DDHead from '@components/shared/Layout/NextHead';
import useOverlay from '@lib/hooks/useOverlay';
import { Button } from '@dudoong/ui';
import { EventDetailResponse } from '@dudoong/utils';
import EventApi from '@dudoong/utils/src/apis/event/EventApi';
import { GetStaticPaths, GetStaticProps } from 'next';
import Tickets from './blocks/Tickets';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import OverlayBox from '@components/shared/overlay/OverlayBox';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';

const EventDetail = ({ detail }: { detail: EventDetailResponse }) => {
  const router = useRouter();
  const { eventId } = router.query;
  const auth = useRecoilValue(authState);
  const { data: tickets } = useQuery(['tickets', eventId], () =>
    TicketApi.GET_TICKETITEMS(eventId as string),
  );
  const { isOpen, openOverlay, closeOverlay } = useOverlay();
  const { openGlobalOverlay } = useGlobalOverlay();

  const handleClickBooking = () => {
    auth.isAuthenticated
      ? openOverlay()
      : openGlobalOverlay({ content: 'login' });
  };

  return (
    <>
      <DDHead title="두둥! | 공연상세" />
      <main>
        <Button onClick={handleClickBooking}>예매하기</Button>
      </main>
      {tickets && (
        <OverlayBox open={isOpen} onDismiss={closeOverlay}>
          <Tickets items={tickets?.ticketItems} />
        </OverlayBox>
      )}
    </>
  );
};

export default EventDetail;

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
