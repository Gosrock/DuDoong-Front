import { Divider, FlexBox, Tag, Text, theme } from '@dudoong/ui';
import { parseDate } from '@dudoong/utils';
import { css } from '@emotion/react';
import type { EventProfileResponse } from '@lib/apis/event/eventType';
import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = (props: EventProfileResponse) => {
  return (
    <>
      <Link to={`/events/${props.eventId}/dashboard`}>
        <FlexBox
          css={css`
            cursor: pointer;
            padding: 16px;
            border-radius: 18px;
            &:hover {
              background-color: ${theme.palette.gray_100};
            }
          `}
          align={'center'}
          justify={'space-between'}
        >
          <FlexBox align={'center'} gap={36}>
            <EventProfileImage imageSrc={props.posterImage} />
            <FlexBox
              css={css`
                height: 178px;
                padding: 16px 0px;
                box-sizing: border-box;
              `}
              align={'flex-start'}
              direction={'column'}
              justify={'space-between'}
            >
              <Text typo="P_Text_18_M">{props.name}</Text>
              <EventProfileContent {...props} />
            </FlexBox>
          </FlexBox>
          <Tag size="lg" text={props.status} color="main" />
        </FlexBox>
      </Link>
      <Divider className="host-divider" height={28} line padding={16} />
    </>
  );
};

export default React.memo(EventItem);

const EventProfileImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div
      css={css`
        background: url(${imageSrc});
        background-color: ${theme.palette.gray_300};
        width: 130px;
        height: 178px;
        border-radius: 16px;
        background-size: cover;
        background-position: center;
      `}
    />
  );
};

const EventProfileContent = (props: EventProfileResponse) => {
  const [date, time] = parseDate(props.startAt, true);
  return (
    <Text typo="P_Text_12_M" color="gray_400">
      호스트 : {props.hostName}
      <br />
      날짜 : {date}
      <br />
      시간 : {time}
      <br />
      장소 : {props.placeName}
    </Text>
  );
};
