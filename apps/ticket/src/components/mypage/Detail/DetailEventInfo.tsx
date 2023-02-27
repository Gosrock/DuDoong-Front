import { FlexBox, ListRow, Padding, Text } from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import type { eventProfile } from '@lib/apis/order/orderType';
import Image from 'next/image';

const DetailEventInfo = ({ event }: { event: eventProfile }) => {
  const parsedTime = parseDate(event.startAt);

  return (
    <Padding size={[20, 24, 20, 24]}>
      <FlexBox gap={16} justify="flex-start">
        <Image
          src={event.posterImage}
          width={72}
          height={100}
          alt="포스터 이미지"
        />
        <ListRow
          text={event.name}
          subText={
            <Text typo="P_Text_14_R" color="gray_400">
              {`${parsedTime[0]} ${parsedTime[1]}`}
              <br />
              {event.placeName}
            </Text>
          }
        />
      </FlexBox>
    </Padding>
  );
};

export default DetailEventInfo;
