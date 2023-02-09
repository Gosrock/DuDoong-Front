import { Footer, media, Spacing } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import HomeHeader from './blocks/HomeHeader';
import styled from '@emotion/styled';
import EventLink, { EventLinkProps } from './blocks/EventLink';

const event1: EventLinkProps = {
  eventId: 1,
  eventName: '고스락 제 22회 정기공연',
  date: '2023.02.05',
  posterImage: '',
};

const Home = () => {
  return (
    <>
      <DDHead title="두둥! | 홈" />
      <main>
        <HomeHeader />
        <EventList>
          <EventLink {...event1} />
        </EventList>
      </main>
      <Spacing size={170} />
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;

const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 80px 40px;
  padding: 0 24px;
  margin: 0 auto;
  max-width: 936px;

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
