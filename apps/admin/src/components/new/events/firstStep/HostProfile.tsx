import { Divider, ListRow, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { HostProfileResponse } from '@lib/apis/host/hostType';

interface HostProfileProps extends HostProfileResponse {
  onClick: () => void;
  isSelected: number;
}

const HostProfile = (props: HostProfileProps) => {
  return (
    <>
      <Divider className="host-divider" height={28} line padding={5} />
      <ListRow
        onClick={props.onClick}
        padding={[5, 5]}
        css={css`
          cursor: pointer;
          border-radius: 12px;
          &:hover {
            background-color: ${props.isSelected !== props.hostId
              ? theme.palette.gray_100
              : null};
          }
          background-color: ${props.isSelected === props.hostId
            ? theme.palette.gray_200
            : null};
        `}
        leftImage={<HostProfileImage imageSrc={props.profileImageUrl} />}
        text={props.name}
        subText={props.introduce}
        textTypo={['G_Side_15_M', 'P_Text_14_R']}
        textColor={['black', 'gray_400']}
        rightElement={
          <Text typo="P_Text_16_SB" color="main_500">
            {props.role}
          </Text>
        }
        imageTextGap={26}
      />
    </>
  );
};

export default HostProfile;

const HostProfileImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div
      css={css`
        background: url(${imageSrc});
        background-color: ${theme.palette.gray_300};
        width: 50px;
        height: 50px;
        border-radius: 50%;
      `}
    />
  );
};
