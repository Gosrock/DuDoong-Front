import { Divider, ListRow, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { HostProfileResponse } from '@lib/apis/host/hostType';

const HostItem = (props: HostProfileResponse) => {
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
        leftImage={<HostProfile imageSrc={props.profileImageUrl} />}
        text={props.name}
        subText={props.introduce}
        textTypo={['P_Text_18_M', 'P_Text_16_R']}
        textColor={['black', 'gray_400']}
        rightElement={
          <Text typo="P_Text_16_SB" color="main_500">
            {props.role}
          </Text>
        }
      />
      <Divider className="host-divider" height={28} line padding={16} />
    </>
  );
};

export default HostItem;

const HostProfile = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div
      css={css`
        background: url(${imageSrc});
        background-color: ${theme.palette.gray_300};
        width: 60px;
        height: 60px;
        border-radius: 50%;
      `}
    />
  );
};
