import { Button, FlexBox, KeyOfTypo, ListRow, Text, theme } from '@dudoong/ui';
import type { HostProfileResponse } from '@lib/apis/host/hostType';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import HostApi from '@lib/apis/host/HostApi';
import { useLocation } from 'react-router-dom';

export type HostItemTypeKey = 'lg' | 'sm';

type HostItemType = {
  [key in HostItemTypeKey]: {
    padding: [number, number];
    imageSize: 50 | 60;
    typo: [KeyOfTypo, KeyOfTypo];
  };
};

const HOST_ITEM_SET: HostItemType = {
  lg: {
    padding: [16, 16],
    imageSize: 60,
    typo: ['P_Text_18_M', 'P_Text_16_R'],
  },
  sm: {
    padding: [5, 5],
    imageSize: 50,
    typo: ['P_Text_15_M', 'P_Text_14_R'],
  },
};

export interface HostItemProps
  extends Pick<
    HostProfileResponse,
    'hostId' | 'name' | 'introduce' | 'profileImage' | 'role' | 'active'
  > {
  type?: HostItemTypeKey;
  selectedHostId?: number | null;
}

const HostItem = ({
  type = 'lg',
  selectedHostId = null,
  ...props
}: HostItemProps) => {
  const acceptInvite = (hostId: number) => {
    const { mutate } = useMutation(
      (hostId: string) => HostApi.POST_HOST_JOIN(String(hostId)),
      {
        onSuccess: () => {
          console.log('success');
        },
      },
    );
    mutate;
  };

  return (
    <Content
      isselected={selectedHostId === props.hostId ? 1 : 0}
      padding={HOST_ITEM_SET[type].padding}
      leftImage={<HostItemImage type={type} imageSrc={props.profileImage} />}
      text={props.name}
      subText={type === 'lg' ? props.introduce : undefined}
      textTypo={HOST_ITEM_SET[type].typo}
      textColor={['black', 'gray_400']}
      imageTextGap={type === 'sm' ? 26 : 16}
      rightElement={
        props.active ? (
          <Text
            typo="P_Text_16_SB"
            color={props.active ? 'main_500' : 'sub_mint'}
          >
            {props.active ? props.role : '대기중'}
          </Text>
        ) : (
          <FlexBox align={'flex-start'} gap={26}>
            <Text typo="P_Text_16_SB" color={'red_300'}>
              무시
            </Text>
            <Text
              typo="P_Text_16_SB"
              color={'main_500'}
              onClick={() => acceptInvite(props.hostId)}
            >
              수락
            </Text>
          </FlexBox>
        )
      }
    />
  );
};

export default HostItem;

interface ContentProps {
  isselected: 1 | 0;
}

const Content = styled(ListRow)<ContentProps>`
  cursor: pointer;
  border-radius: 12px;
  &:hover {
    background-color: ${({ isselected }) =>
      !isselected && theme.palette.gray_100};
  }
  background-color: ${({ isselected }) => isselected && theme.palette.gray_200};
`;

interface HostItemImageProps {
  type: HostItemTypeKey;
  imageSrc: string;
}

const HostItemImage = styled.div<HostItemImageProps>`
  background: url(${({ imageSrc }) => imageSrc});
  background-color: ${({ theme }) => theme.palette.gray_300};
  width: ${({ type }) => `${HOST_ITEM_SET[type].imageSize}px`};
  height: ${({ type }) => `${HOST_ITEM_SET[type].imageSize}px`};
  border-radius: 50%;
  background-size: cover;
  background-position: center;
`;
