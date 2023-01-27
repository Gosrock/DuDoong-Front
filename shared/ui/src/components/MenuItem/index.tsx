/** @jsxImportSource @emotion/react */
import { FlexBox, Padding, PaddingSize, RoundBlock } from '../../layout';
import styled from '@emotion/styled';
import { Text } from '../Text';
import { css } from '@emotion/react';
import {
  Table,
  CardChecklist,
  CardImage,
  TicketPerforatedFill,
  PeopleFill,
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
  | 'hostinfo'
  | 'hostmember'
  | 'hostevents'
  | 'hostalliance';

type MenuItemSetType = {
  [key in MenuItemSetTypeKey]: {
    text: string;
    icon: JSX.Element;
  };
};

const MENU_ITEM_SET: MenuItemSetType = {
  dashboard: {
    text: '대시보드',
    icon: <Table css={{ width: '24px', height: '24px' }} />,
  },
  info: {
    text: '공연 기본 정보',
    icon: <CardChecklist css={{ width: '24px', height: '24px' }} />,
  },
  detail: {
    text: '공연 이미지･상세',
    icon: <CardImage css={{ width: '24px', height: '24px' }} />,
  },
  tickets: {
    text: '티켓 관리',
    icon: <TicketPerforatedFill css={{ width: '24px', height: '24px' }} />,
  },
  options: {
    text: '티켓 옵션 관리',
    icon: <Sliders css={{ width: '24px', height: '24px' }} />,
  },
  guests: {
    text: '예매자 관리',
    icon: <PeopleFill css={{ width: '24px', height: '24px' }} />,
  },
  qr: {
    text: 'QR 체크인',
    icon: <QrCodeScan css={{ width: '24px', height: '24px' }} />,
  },
  hostinfo: {
    text: '호스트 정보 관리',
    icon: <CardChecklist css={{ width: '24px', height: '24px' }} />,
  },
  hostmember: {
    text: '멤버 관리',
    icon: <PeopleFill css={{ width: '24px', height: '24px' }} />,
  },
  hostevents: {
    text: '등록한 공연',
    icon: <TicketPerforatedFill css={{ width: '24px', height: '24px' }} />,
  },
  hostalliance: {
    text: '제휴 관련',
    icon: <CardChecklist css={{ width: '24px', height: '24px' }} />,
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
  padding = [12, 0],
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
        padding={[12, 24]}
        color={isselected ? 'point_mint' : 'white'}
        isselected={isselected}
        radius={8}
      >
        <FlexBox align={'center'} gap={24} justify={'start'}>
          {MENU_ITEM_SET[type].icon}
          <Text
            typo={isselected ? 'G_Menu_14_B' : 'G_Menu_14_M'}
            color={isselected ? 'black' : 'gray_500'}
          >
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
  & > div:hover {
    background: ${({ theme, isselected }) =>
      !isselected ? theme.palette.gray_200 : null};
    & > div > span {
      ${({ theme }) => theme.typo.G_Menu_14_B};
      color: ${({ theme }) => theme.palette.black};
    }
    & > div > svg > path {
      color: ${({ theme }) => theme.palette.black};
    }
  }
  cursor: pointer;
`;

const MenuItemWrapper = styled(RoundBlock)<SelectedProps>`
  & > div > svg > path {
    color: ${({ theme, isselected }) =>
      isselected ? theme.palette.black : theme.palette.gray_500};
  }
`;
