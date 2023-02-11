import { FlexBox, Spacing, theme } from '@dudoong/ui';
import { ReactComponent as Bucket } from '@assets/bucket.svg';
import { ReactComponent as BucketCheck } from '@assets/bucketcheck.svg';
import { TicketPerforatedFill } from '@dudoong/ui';
import MiniBox from './MiniBox';
import TotalBox from './TotalBox';
import TicketRatio from './TicketRatio';

const EventInfo = () => {
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
            count={10}
          >
            발급된 티켓
          </MiniBox>
          <MiniBox icon={<Bucket />} count={20}>
            미승인 주문
          </MiniBox>
          <MiniBox icon={<BucketCheck />} count={30}>
            완료된 주문
          </MiniBox>
        </FlexBox>
        <Spacing size={13} />
        <TotalBox total={10000} />
      </div>
      <TicketRatio checked={10} notChecked={30} />
    </FlexBox>
  );
};
export default EventInfo;
