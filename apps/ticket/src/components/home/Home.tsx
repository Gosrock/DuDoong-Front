import { Footer, Input, media, Search, Spacing, theme } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import HomeHeader from './blocks/HomeHeader';
import styled from '@emotion/styled';
import EventLink from './blocks/EventLink';
import { useInfiniteQueries } from '@dudoong/utils';
import { ChangeEvent, useState } from 'react';
import { EventApi } from '@lib/apis/events/EventApi';
import { css } from '@emotion/react';
import { useDebouncedCallback } from 'use-debounce';
import { EventResponse } from '@lib/apis/events/eventType';
import SkeletonEvent from './blocks/SkeletonEvent';

const Home = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { infiniteListElement, isLoading } = useInfiniteQueries<EventResponse>(
    ['events', keyword],
    ({ pageParam = 0 }) =>
      EventApi.GET_EVENTS_SEARCH({ keyword, pageParam, size: 12 }),
    EventLink,
  );

  const onChangeKeyword = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
    400,
  );

  return (
    <>
      <Wrapper>
        <DDHead
          title="두둥! | 홈"
          additional={
            <>
              <meta property="og:image" content="/og.png" />
            </>
          }
        />
        <main>
          <HomeHeader />
          <Input
            onChange={onChangeKeyword}
            height={60}
            styles={InputStyle}
            placeholder={'검색어를 입력해주세요'}
            rightIcon={<Search />}
          />
          <EventList>
            {infiniteListElement}
            {isLoading &&
              Array.from({ length: 6 }, (_, i) => <SkeletonEvent key={i} />)}
          </EventList>
        </main>
        <Spacing size={170} />
      </Wrapper>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  padding: 0 24px;
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8fa 100%);
`;

const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 80px 40px;
  ${media.mobile} {
    grid-gap: 32px 32px;
  }
  margin: 145px auto 0 auto;
  max-width: 936px;

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const InputStyle = css`
  border-radius: 16px;
  border: 1px solid black;
  background-color: ${theme.palette.gray_100};
  color: ${theme.palette.black};

  box-sizing: border-box;
  width: 100%;
  max-width: 415px;
  margin: 50px auto 0 auto;
`;
