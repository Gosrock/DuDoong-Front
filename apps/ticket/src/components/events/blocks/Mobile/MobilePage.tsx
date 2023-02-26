import { DetailTemplateProps } from '@components/events';
import {
  Accordion,
  ButtonSet,
  Divider,
  Footer,
  ListHeader,
  ListRow,
  NavBar,
  RoundBlock,
  Spacing,
  Text,
} from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DetailMenu from '../DetailMenu';
import Remote from '../Remote';
import Tickets from '../Tickets';
import MobileMap from './MobileMap';

const MobilePage = ({
  tickets,
  detail,
  openTicketOverlay,
  ...props
}: DetailTemplateProps) => {
  const router = useRouter();
  const [date, time] = parseDate(detail.startAt, true);
  const MdViewer = dynamic(() => import('../../blocks/MdViewer'), {
    ssr: false,
  });

  return (
    <Wrapper {...props}>
      <NavBar label={detail.name} backHandler={() => router.back()} />
      <Spacing size={48} />
      <Poster>
        <Image
          src={detail.posterImage}
          alt={detail.name}
          width={204}
          height={287}
        />
      </Poster>
      <Title
        size="listHeader_28"
        title={detail.name}
        description={
          <Text typo="P_Text_16_M" color="gray_500">
            {date} {time} <br />
            {detail.place.placeName}
          </Text>
        }
      />
      <Divider />
      <Container>
        <Block>
          <Text typo={'P_Text_18_SB'}>티켓</Text>
          {tickets ? <Tickets tickets={tickets} /> : <></>}
        </Block>
        <Block>
          <Text typo={'P_Text_18_SB'}>공연시간</Text>
          <ListRow
            padding={[16, 0, 0, 0]}
            text={
              <Text typo="P_Text_16_M" color="gray_500">
                {date}
                {time}
              </Text>
            }
          />
        </Block>
        <Block>
          <Text typo={'P_Text_18_SB'}>공연장소</Text>
          <Accordion
            css={css`
              & > button {
                border-bottom: none;
              }
            `}
            padding={[16, 0, 0, 0]}
            title={detail.place.placeName}
            content={<MobileMap place={detail.place} />}
            rightElement={
              <Text typo={'P_Text_16_R'} color={'main_500'}>
                지도보기
              </Text>
            }
          />
        </Block>
        <Block>
          <Text typo={'P_Text_18_SB'}>호스트</Text>
          <ListRow
            padding={[16, 0, 0, 0]}
            text={
              <Text typo="P_Text_16_M" color="gray_500">
                {detail.host.name}
              </Text>
            }
            rightElement={
              <Text typo="P_Text_16_R" color="main_500">
                {detail.host.contactNumber}
              </Text>
            }
          />
        </Block>
      </Container>
      <Divider />
      <DetailMenu content={detail.content} MdViewer={MdViewer} />

      <Spacing size={60} />
      <Footer />
      <Spacing size={120} color={'gray_200'} />
      <ButtonSet
        bottomFixed
        backGradient
        css={css`
          z-index: 5;
        `}
      >
        <Remote openTicketOverlay={openTicketOverlay} eventName={detail.name} />
      </ButtonSet>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
const Title = styled(ListHeader)``;
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

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray_100};
`;
const Block = styled(RoundBlock)`
  margin: 16px 16px;

  &:first-of-type {
    margin-top: 0px;
  }
  &:last-of-type {
    margin-bottom: 0px;
  }
`;

export default MobilePage;
