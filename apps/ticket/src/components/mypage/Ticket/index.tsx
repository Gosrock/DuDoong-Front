import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import Shortcuts from '@components/shared/Shortcuts';
import { Divider, ListHeader, NavBar, Spacing, SyncLoader } from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import styled from '@emotion/styled';
import { OrderApi } from '@lib/apis/order/OrderApi';
import { authState } from '@store/auth';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import TicketList from './TicketList';

const Ticket = () => {
  const {
    query: { id, redirect },
    back,
    push,
  } = useRouter();
  const { isAuthenticated } = useRecoilValue(authState);
  const { data, isSuccess } = useQuery(['ticket', id], () =>
    OrderApi.GET_ORDERS_TICKETS(id as string),
  );

  useEffect(() => {
    !isAuthenticated && push('/home');
  }, [isAuthenticated]);

  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar
          label="모바일 티켓"
          backHandler={redirect === 'true' ? () => push('/home') : back}
        />
        {isSuccess ? (
          <>
            <Poster>
              <div className="poster-container">
                <Image
                  src={data.eventProfile.posterImage}
                  alt={data.eventProfile.name}
                  fill={true}
                  priority={true}
                />
              </div>
            </Poster>
            <ListHeader
              padding={[32, 36, 16, 36]}
              title={data.eventProfile.name}
              size={'listHeader_20'}
              descColor={'black'}
              description={`${parseDate(data.eventProfile.startAt)[0]} ${
                parseDate(data.eventProfile.startAt)[1]
              }\n${data.eventProfile.placeName}`}
            />
            <TicketList
              tickets={data.tickets}
              orderUuid={data.orderUuid}
              title={data.eventProfile.name}
            />
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
            <Spacing size={32} />
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
  margin: 24px 60px;
  .poster-container {
    position: relative;
    padding-top: 141.4%;
    overflow: hidden;
    box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }
  img {
    background: ${({ theme }) => theme.palette.gray_300};
    object-fit: cover;
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
