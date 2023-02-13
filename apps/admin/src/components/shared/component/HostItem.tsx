import { KeyOfTypo, ListRow, Text, theme } from '@dudoong/ui';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import styled from '@emotion/styled';

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
    typo: ['G_Side_15_M', 'P_Text_14_R'],
  },
};

export interface HostItemProps
  extends Pick<
    HostProfileResponse,
    'hostId' | 'name' | 'introduce' | 'profileImage' | 'role'
  > {
  type?: HostItemTypeKey;
  selectedHostId?: number | null;
}

const HostItem = ({
  type = 'lg',
  selectedHostId = null,
  ...props
}: HostItemProps) => {
  return (
    <Content
      isselected={selectedHostId === props.hostId ? 1 : 0}
      padding={HOST_ITEM_SET[type].padding}
      leftImage={<HostItemImage type={type} imageSrc={props.profileImage} />}
      text={props.name}
      subText={props.introduce}
      textTypo={HOST_ITEM_SET[type].typo}
      textColor={['black', 'gray_400']}
      rightElement={
        <Text typo="P_Text_16_SB" color="main_500">
          {props.role}
        </Text>
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
