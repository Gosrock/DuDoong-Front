import DDHead from '@components/shared/Layout/NextHead';
import { EventDetailResponse } from '@dudoong/utils';
import EventApi from '@dudoong/utils/src/apis/event/EventApi';
import { GetStaticPaths, GetStaticProps } from 'next';

const EventDetail = ({ data }: { data: EventDetailResponse }) => {
  console.log(data);
  return (
    <>
      <DDHead title="두둥! | 공연상세" />
      <main></main>
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
