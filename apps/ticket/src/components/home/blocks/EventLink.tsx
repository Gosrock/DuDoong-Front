import { Tag, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { EventResponse } from '@lib/apis/events/eventType';
import Link from 'next/link';

const EventLink = (props: EventResponse) => {
  return (
    <Link href={`events/${props.eventId}`}>
      <Poster>
        <img src={props.posterImage} alt="" className="poster" />
        {props.status === '지난공연' && (
          <Tag size="md" color="mono" text="지난 공연" className="tag" />
        )}
      </Poster>
      <Text
        typo="P_Text_14_R"
        color="gray_400"
        as="p"
        css={css`
          padding-top: 10px;
        `}
      >
        {props.startAt}
      </Text>
      <Text
        typo="P_Header_18_SB"
        color="black"
        as="p"
        css={css`
          padding-top: 3px;
        `}
      >
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
    margin-bottom: 10px;
    object-fit: cover;
  }
  box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.01);
  border-radius: 12px;

  .tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.05);
  }
`;
