import DDHead from '@components/shared/Layout/NextHead';
import useOverlay from '@lib/hooks/useOverlay';
import { Button } from '@dudoong/ui';
import { EventDetailResponse } from '@dudoong/utils';
import EventApi from '@dudoong/utils/src/apis/event/EventApi';
import { GetStaticPaths, GetStaticProps } from 'next';

const EventDetail = ({ data }: { data: EventDetailResponse }) => {
  console.log(data);
  const { OverlayBox, openOverlay, closeOverlay } = useOverlay();

  return (
    <>
      <DDHead title="두둥! | 공연상세" />
      <main>
        <Button onClick={openOverlay}>예매하기</Button>
      </main>
      <OverlayBox>
        <>열기</>
      </OverlayBox>
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

  const data = await EventApi.GET_EVENT_DETAIL(eventId);

  return {
    props: {
      data,
    },
  };
};
