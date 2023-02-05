import { Divider, KeyOfTypo, ListRow, Text, theme } from '@dudoong/ui';
import { Link } from 'react-router-dom';
import { HostProfileResponse } from '@lib/apis/host/hostType';
import styled from '@emotion/styled';

export type HostItemTypeKey = 'lg' | 'sm';

type HostItemType = {
  [key in HostItemTypeKey]: {
    padding: [number, number];
    activeLink: boolean;
    imageSize: 50 | 60;
    dividerPos: boolean; // true = 위, false = 아래
    dividerPadding: number;
    typo: [KeyOfTypo, KeyOfTypo];
  };
};

const HOST_ITEM_SET: HostItemType = {
  lg: {
    padding: [16, 16],
    activeLink: true,
    imageSize: 60,
    dividerPos: false,
    dividerPadding: 16,
    typo: ['P_Text_18_M', 'P_Text_16_R'],
  },
  sm: {
    padding: [5, 5],
    activeLink: false,
    imageSize: 50,
    dividerPos: true,
    dividerPadding: 5,
    typo: ['G_Side_15_M', 'P_Text_14_R'],
  },
};

interface HostItemProps
  extends Pick<
    HostProfileResponse,
    'hostId' | 'name' | 'introduce' | 'profileImageUrl' | 'role'
  > {
  type: HostItemTypeKey;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  selectedHostId?: number | null;
}

const HostItem = ({
  type = 'lg',
  onClick = undefined,
  selectedHostId = null,
  ...props
}: HostItemProps) => {
  //   const isselected =
  // selectedHostId !== null && ;

  return (
    <>
      <Link to={`/hosts/${props.hostId}/info`} onClick={onClick}>
        {HOST_ITEM_SET[type].dividerPos && (
          <Divider
            className="host-divider"
            height={28}
            line
            padding={HOST_ITEM_SET[type].dividerPadding}
          />
        )}
        <Content
          isselected={selectedHostId === props.hostId ? 1 : 0}
          padding={HOST_ITEM_SET[type].padding}
          leftImage={
            <HostItemImage type={type} imageSrc={props.profileImageUrl} />
          }
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
      </Link>
      {!HOST_ITEM_SET[type].dividerPos && (
        <Divider
          className="host-divider"
          height={28}
          line
          padding={HOST_ITEM_SET[type].dividerPadding}
        />
      )}
    </>
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
`;
