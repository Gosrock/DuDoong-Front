/** @jsxImportSource @emotion/react */
import { FlexBox, Padding, PaddingSize, RoundBlock } from '../../layout';
import styled from '@emotion/styled';
import { Text } from '../Text';
import { css } from '@emotion/react';
import {
  Table,
  CardChecklist,
  CardImage,
  TicketPerforated,
  PeopleFill,
  Slack,
  QrCodeScan,
  Sliders,
} from 'react-bootstrap-icons';
/**
 * @param type menu 종류
 * @param menuItemKey 현재 메뉴 고유 번호
 * 이 메뉴의 활성/비활성을 구분합니다.
 * @param curActiveMenu 현재 활성된 메뉴의 번호
 * @param setCurActiveMenu 메뉴 변경
 * @param padding 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 */

export type MenuItemSetTypeKey =
  | 'dashboard'
  | 'info'
  | 'detail'
  | 'tickets'
  | 'options'
  | 'guests'
  | 'qr'
  | 'hostInfo'
  | 'hostMember'
  | 'slack';

type MenuItemSetType = {
  [key in MenuItemSetTypeKey]: {
    text: string;
    icon: JSX.Element;
  };
};

const MENU_ITEM_SET: MenuItemSetType = {
  dashboard: {
    text: '대시보드',
    icon: <Table css={{ fill: 'white' }} />,
  },
  info: {
    text: '공연 기본 정보',
    icon: <CardChecklist css={{ fill: 'white' }} />,
  },
  detail: {
    text: '공연 이미지/상세',
    icon: <CardImage css={{ fill: 'white' }} />,
  },
  tickets: {
    text: '티켓 관리',
    icon: <TicketPerforated css={{ fill: 'white' }} />,
  },
  options: {
    text: '티켓 옵션 관리',
    icon: <Sliders css={{ fill: 'white' }} />,
  },
  guests: {
    text: '예매자 관리',
    icon: <PeopleFill css={{ fill: 'white' }} />,
  },
  qr: {
    text: 'QR 체크인',
    icon: <QrCodeScan css={{ fill: 'white' }} />,
  },
  hostInfo: {
    text: '호스트 정보',
    icon: <CardChecklist css={{ fill: 'white' }} />,
  },
  hostMember: {
    text: '호스트 멤버',
    icon: <PeopleFill css={{ fill: 'white' }} />,
  },
  slack: {
    text: '슬랙 알림 등록',
    icon: <Slack css={{ fill: 'white' }} />,
  },
};

export interface MenuItemProps {
  type: MenuItemSetTypeKey;
  menuItemKey: number;
  curActiveMenu: number;
  setCurActiveMenu: (menuItemKey: number) => void;
  padding?: PaddingSize;
}

export const MenuItem = ({
  type,
  menuItemKey,
  curActiveMenu,
  setCurActiveMenu,
  padding = [4, 12],
}: MenuItemProps) => {
  const isselected = curActiveMenu === menuItemKey ? 1 : 0; // camel case 로 쓰면 에러뜸

  const menuItemClickHandler = () => {
    setCurActiveMenu(menuItemKey);
  };

  return (
    <OuterPadding
      isselected={isselected}
      size={padding}
      onClick={menuItemClickHandler}
    >
      <MenuItemWrapper
        padding={[8, 12]}
        color={isselected ? 'main_100' : 'white'}
      >
        <FlexBox align={'center'} gap={16} justify={'start'}>
          <IconWrapper align={'center'} isselected={isselected}>
            {MENU_ITEM_SET[type].icon}
          </IconWrapper>
          <Text typo={'Text_14'} color={isselected ? 'main_500' : 'black'}>
            {MENU_ITEM_SET[type].text}
          </Text>
        </FlexBox>
      </MenuItemWrapper>
    </OuterPadding>
  );
};

// ------------------------------------------------------

// ------------------------------------------------------

interface SelectedProps {
  isselected: number;
}

const OuterPadding = styled(Padding)<SelectedProps>`
  ${({ theme, isselected }) =>
    !isselected
      ? css`
          & > div:hover {
            background: ${theme.palette.gray_100};
          }
        `
      : null}
  cursor: pointer;
`;

const MenuItemWrapper = styled(RoundBlock)``;

const IconWrapper = styled(FlexBox)<SelectedProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ isselected, theme }) =>
    isselected ? theme.palette.main_300 : theme.palette.main_200};
`;
