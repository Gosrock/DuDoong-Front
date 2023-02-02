import { Divider, ListRow, Tag, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { EventProfileResponse } from '@lib/apis/event/eventType';

const EventItem = (props: EventProfileResponse) => {
  return (
    <>
      <ListRow
        padding={[16, 16]}
        css={css`
          border-radius: 12px;
          &:hover {
            background-color: ${theme.palette.gray_100};
          }
        `}
        leftImage={<EventProfileImage imageSrc={props.posterImage} />}
        text={props.name}
        subText={props.hostName}
        textTypo={['P_Text_18_M', 'P_Text_12_M']}
        textColor={['black', 'gray_400']}
        rightElement={<Tag size="lg" color="main" text={props.status} />}
      />
      <Divider className="host-divider" height={28} line padding={16} />
    </>
  );
};

export default EventItem;

const EventProfileImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div
      css={css`
        background: url(${imageSrc});
        background-color: ${theme.palette.gray_300};
        width: 130px;
        height: 178px;
        border-radius: 16px;
      `}
    />
  );
};
