import { FlexBox, Spacing, theme } from '@dudoong/ui';
import { ReactComponent as Bucket } from '@assets/bucket.svg';
import { ReactComponent as BucketCheck } from '@assets/bucketcheck.svg';
import { TicketPerforatedFill } from '@dudoong/ui';
import MiniBox from './MiniBox';
import TotalBox from './TotalBox';
import TicketRatio from './TicketRatio';
import { useQuery } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';
import { DashBoardStatisticResponse } from '@lib/apis/event/eventType';
import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';
import { useEffect } from 'react';

interface EventInfoProps {
  eventId: string;
  setButtonInfo: (props: any) => void;
  changeButtonType: (type: AdminBottomButtonTypeKey) => void;
}

const EventInfo = ({
  eventId,
  setButtonInfo,
  changeButtonType,
}: EventInfoProps) => {
  // 이벤트 통계 정보
  const { data, status } = useQuery(
    ['eventStatistics'],
    () => EventApi.GET_EVENT_STATISTICS(eventId),
    {
      onSuccess: (data: DashBoardStatisticResponse) => {
        if (checkIsSold(data)) {
          changeButtonType('pay');
        }
        console.log('GET_EVENT_STATISTICS : ', data);
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

const checkIsSold = (data: DashBoardStatisticResponse) => {
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
