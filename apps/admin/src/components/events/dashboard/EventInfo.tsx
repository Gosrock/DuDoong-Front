import { FlexBox, Spacing, theme } from '@dudoong/ui';
import { ReactComponent as Bucket } from '@assets/bucket.svg';
import { ReactComponent as BucketCheck } from '@assets/bucketcheck.svg';
import { TicketPerforatedFill } from '@dudoong/ui';
import MiniBox from './MiniBox';
import TotalBox from './TotalBox';
import TicketRatio from './TicketRatio';
import type { DashBoardStatisticResponse } from '@lib/apis/event/eventType';
import { useQuery } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { Dispatch, SetStateAction } from 'react';
import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';

interface EventInfoProps {
  eventId: string;
  setButtonType: Dispatch<SetStateAction<AdminBottomButtonTypeKey>>;
}

const EventInfo = ({ eventId, setButtonType }: EventInfoProps) => {
  // 이벤트 통계 정보 api
  const { data } = useQuery(
    ['eventStatistics'],
    () => EventApi.GET_EVENT_STATISTICS(eventId),
    {
      onSuccess: (data: DashBoardStatisticResponse) => {
        if (checkIsSold(data)) {
          setButtonType('pay');
        } else {
          setButtonType('deleteEvent');
        }
        //console.log('GET_EVENT_STATISTICS : ', data);
      },
    },
  );

  return (
    <FlexBox align={'center'} gap={13}>
      <div>
        <FlexBox align={'center'} gap={13}>
          <MiniBox
            icon={
              <TicketPerforatedFill
                fill={theme.palette.main_500}
                size={'25px'}
              />
            }
            count={data ? data?.issuedCount : 0}
          >
            발급된 티켓
          </MiniBox>
          <MiniBox icon={<Bucket />} count={data ? data?.notApprovedCount : 0}>
            미승인 주문
          </MiniBox>
          <MiniBox icon={<BucketCheck />} count={data ? data?.doneCount : 0}>
            완료된 주문
          </MiniBox>
        </FlexBox>
        <Spacing size={13} />
        <TotalBox total={data ? data?.sellAmount : '0'} />
      </div>
      <TicketRatio
        checked={data ? data?.enteredCount : 0}
        notChecked={data ? data?.notEnteredCount : 0}
      />
    </FlexBox>
  );
};

export default EventInfo;

const checkIsSold = (data: DashBoardStatisticResponse | undefined) => {
  if (!data) return false;
  if (
    !data.notApprovedCount &&
    !data.notEnteredCount &&
    !data.doneCount &&
    !data.enteredCount &&
    !data.issuedCount
  )
    return false;
  return true;
};
