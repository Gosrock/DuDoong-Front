import { DetailTemplateProps } from '@components/events';
import { Divider, Footer, RoundBlock, Spacing, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import DetailMenu from '../DetailMenu';
import Remote from '../Remote';
import Tickets from '../Tickets';
import Summary from './Summary';

const PcPage = ({
  detail,
  tickets,
  openTicketOverlay,
  ...props
}: DetailTemplateProps) => {
  const MdViewer = dynamic(() => import('../../blocks/MdViewer'), {
    ssr: false,
  });
  const isOutdated = detail.status === '지난공연';
  console.log(detail.status);

  return (
    <div {...props}>
      <Spacing size={100} />
      <Container>
        {/* 상단 헤더 */}
        <LeftContent>
          <Text typo="G_Header_24_B">{detail.name}</Text>
          <Summary detail={detail} />

          {/* 상세정보 */}
          <Spacing size={32} />
          <DetailMenu content={detail.content} MdViewer={MdViewer} />
        </LeftContent>
        <RightSticky>
          <Text typo="P_Header_16_SB">티켓</Text>
          <Divider line />
          {tickets && <Tickets tickets={tickets} />}
          <Spacing size={12} />
          <Remote
            openTicketOverlay={openTicketOverlay}
            eventName={detail.name}
            isOutdated={isOutdated}
          />
        </RightSticky>
      </Container>
      <Spacing size={120} />
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default PcPage;

const Container = styled.div`
  max-width: 936px;
  min-width: 896px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  width: auto;
`;

const RightSticky = styled(RoundBlock)`
  flex-shrink: 0;
  border: 1px solid black;
  position: sticky;
  position: -webkit-sticky;
  margin-top: 44px;
  top: 36px;
  margin-left: 22px;
  width: 356px;
  box-sizing: border-box;
  height: 100%;
`;
