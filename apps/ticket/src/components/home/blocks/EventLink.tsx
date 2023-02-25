import { Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { EventResponse } from '@lib/apis/events/eventType';
import Image from 'next/image';
import Link from 'next/link';

const EventLink = (props: EventResponse) => {
  return (
    <Wrapper href={`events/${props.eventId}`}>
      <Image
        src={props.posterImage}
        alt=""
        className="poster"
        width={210}
        height={297}
      />
      <Text typo="P_Text_14_R" color="gray_400" as="p">
        {props.startAt}
      </Text>
      <Text typo="P_Header_18_SB" color="black" as="p">
        {props.name}
      </Text>
    </Wrapper>
  );
};

export default EventLink;

const Wrapper = styled(Link)`
  .poster {
    width: 100%;
    background: ${({ theme }) => theme.palette.gray_300};
    border-radius: 12px;
    margin-bottom: 10px;
    object-fit: cover;
  }
`;
