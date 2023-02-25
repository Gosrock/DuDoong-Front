import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import Shortcuts from '@components/shared/Shortcuts';
import { Divider, ListHeader, NavBar, Spacing, SyncLoader } from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import styled from '@emotion/styled';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import TicketList from './TicketList';

const Ticket = () => {
  const {
    query: { id },
    back,
  } = useRouter();

  const { data, isSuccess } = useQuery(['ticket', id], () =>
    OrderApi.GET_ORDERS_TICKETS(id as string),
  );
  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar label="모바일 티켓" backHandler={back} />
        {isSuccess ? (
          <>
            <Poster>
              <Image
                src={data?.eventProfile.posterImage}
                alt={data?.eventProfile.name}
                width={204}
                height={287}
              />
            </Poster>
            <ListHeader
              title={data.eventProfile.name}
              size={'listHeader_20'}
              descColor={'black'}
              description={`${parseDate(data.eventProfile.startAt)[0]}${
                parseDate(data.eventProfile.startAt)[1]
              }\n${data.eventProfile.placeName}`}
            />
            <TicketList tickets={data.tickets} orderUuid={data.orderUuid} />
            <Spacing size={20} />
            <Divider />
            <Shortcuts
              text="공연정보"
              url={`/events/${data.eventProfile.eventId}`}
            />
            <a
              target="_blank"
              href="https://dudoong.notion.site/5103784d9d8946b5b48062811dcfe81c"
              rel="noreferrer"
            >
              <Shortcuts text="모바일 티켓 안내" />
            </a>
            <Spacing size={10} />
          </>
        ) : (
          <LoaderWrapper>
            <SyncLoader />
          </LoaderWrapper>
        )}
      </Main>
    </>
  );
};
const Poster = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 60px;

  & > img {
    width: 100%;
    max-width: 300px;
    height: auto;
    box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 200px;
`;
export default Ticket;
