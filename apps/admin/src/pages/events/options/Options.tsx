import NewOption from '@components/events/tickets/tickets/NewOption';
import { Spacing, ListHeader, FlexBox, Text } from '@dudoong/ui';
import { useLocation } from 'react-router-dom';
import ContentGrid from '@components/shared/layout/ContentGrid';
import OptionList from '@components/events/tickets/ticketoptions/options/OptionList';
import { useQuery } from '@tanstack/react-query';
import OptionApi from '@lib/apis/option/OptionApi';
import TicketListOption from '@components/events/tickets/ticketoptions/options/TicketListOption';
import TicketApi from '@lib/apis/ticket/TicketApi';

const Options = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  const { data } = useQuery(['AllOption', eventId], () =>
    OptionApi.GET_ALL_OPTION(eventId),
  );

  console.log(data);

  return (
    <>
      <Spacing size={32} />
      <ListHeader
        padding={0}
        size="listHeader_24"
        title="티켓에 옵션 넣기"
        description={
          <FlexBox direction="column" align="flex-start">
            <Text typo="P_Text_16_M" color="gray_400">
              티켓을 구매하기 전 설문 응답을 위해 옵션을 각 티켓으로
            </Text>
            <Text typo="P_Text_16_M" color="gray_400">
              드래그 앤 드롭 해보세요. 옵션의 답변은 필수입니다.
            </Text>
          </FlexBox>
        }
      />
      <Spacing size={36} />
      <NewOption eventId={eventId} />
      <Spacing size={72} />
      <ContentGrid>
        <OptionList optionItems={data ? data.optionGroups : null} />
        <TicketListOption />
      </ContentGrid>

      <Spacing size={72} />
    </>
  );
};
export default Options;
