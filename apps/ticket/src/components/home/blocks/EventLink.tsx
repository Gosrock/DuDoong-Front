import { Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { EventResponse } from '@lib/apis/events/eventType';
import Link from 'next/link';

const EventLink = (props: EventResponse) => {
  return (
    <Link href={`events/${props.eventId}`}>
      <Poster>
        <img src={props.posterImage} alt="" className="poster" />
      </Poster>
      <Text typo="P_Text_14_R" color="gray_400" as="p">
        {props.startAt}
      </Text>
      <Text typo="P_Header_18_SB" color="black" as="p">
        {props.name}
      </Text>
    </Link>
  );
};

export default EventLink;

const Poster = styled.div`
  position: relative;
  padding-top: 141.4%;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.palette.gray_300};
    border-radius: 12px;
    margin-bottom: 10px;
    object-fit: cover;
  }
`;
