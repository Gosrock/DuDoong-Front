import { Tag, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { EventResponse } from '@lib/apis/events/eventType';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { EventStatus } from '@dudoong/utils';

const EventLink = (props: EventResponse) => {
  const [img, setImg] = useState(props.posterImage);

  useEffect(() => {
    setImg(props.posterImage);
  }, [props.posterImage]);

  return (
    <Link href={`events/${props.eventId}`}>
      <Wrapper>
        <Poster status={props.status}>
          <Image
            src={img || ''}
            fill={true}
            sizes="(max-width: 768px) 50vw, 25vw"
            alt={`${props.name}`}
            onError={() => setImg(`/no-poster.png`)}
            className="poster"
            priority
          />
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
          color={props.status === '지난공연' ? 'gray_400' : 'black'}
          as="p"
          css={css`
            padding-top: 3px;
          `}
        >
          {props.name}
        </Text>
      </Wrapper>
    </Link>
  );
};

export default React.memo(EventLink);

const Wrapper = styled.div`
  transform: translateY(0px);
  transition: transform 0.15s ease-in 0s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Poster = styled.div<{ status: EventStatus }>`
  position: relative;
  padding-top: 141.4%;
  overflow: hidden;
  img {
    background: rgba(165, 165, 165, 0.3);

    object-fit: cover;
    ${({ status }) =>
      status === '지난공연' &&
      css`
        filter: brightness(60%);
      `}
  }
  transition: box-shadow 0.15s ease-in 0s;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  border-radius: 12px;

  .tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.05);
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }
`;
