import { FlexBox, ListRow, Padding, Text } from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import styled from '@emotion/styled';
import type { eventProfile } from '@lib/apis/order/orderType';
import Image from 'next/image';
import Link from 'next/link';

const DetailEventInfo = ({ event }: { event: eventProfile }) => {
  const parsedTime = parseDate(event.startAt);

  return (
    <Padding size={[10, 14, 10, 14]}>
      <Link href={`/events/${event.eventId}`}>
        <DetailWrapper gap={16} justify="flex-start">
          <Image
            src={event.posterImage}
            width={72}
            height={100}
            alt="포스터 이미지"
          />
          <ListRow
            padding={0}
            text={event.name}
            subText={
              <Text typo="P_Text_14_R" color="gray_400">
                {`${parsedTime[0]} ${parsedTime[1]}`}
                <br />
                {event.placeName}
              </Text>
            }
          />
        </DetailWrapper>
      </Link>
    </Padding>
  );
};

const DetailWrapper = styled(FlexBox)`
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray_100};
    cursor: pointer;
  }
  transition: all 0.1s ease-out;
  :active {
    transform: scale(0.99);
  }
  padding: 10px;
  border-radius: 12px;
`;

export default DetailEventInfo;
