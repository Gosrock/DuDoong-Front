import { FlexBox, Padding, PaddingSize, RoundBlock } from '../../layout';
import styled from '@emotion/styled';
import { Text } from '../Text';
import { css } from '@emotion/react';
import { ReactComponent as BasicInfo } from '../../assets/icons/basicInfo.svg';
import { ReactComponent as Dashboard } from '../../assets/icons/dashboard.svg';
import { ReactComponent as DetailInfo } from '../../assets/icons/detailInfo.svg';
import { ReactComponent as Option } from '../../assets/icons/option.svg';
import { ReactComponent as Qr } from '../../assets/icons/qr.svg';
import { ReactComponent as Reservationist } from '../../assets/icons/reservationist.svg';
import { ReactComponent as Ticket } from '../../assets/icons/ticket.svg';

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
  | 'basicInfo'
  | 'detailInfo'
  | 'ticket'
  | 'option'
  | 'reservationist'
  | 'qr';

type MenuItemSetType = {
  [key in MenuItemSetTypeKey]: {
    text: string;
    icon: JSX.Element;
  };
};

const menuItemSet: MenuItemSetType = {
  dashboard: {
    text: '대시보드',
    icon: <Dashboard />,
  },
  basicInfo: {
    text: '공연 기본 정보',
    icon: <BasicInfo />,
  },
  detailInfo: {
    text: '공연 이미지/상세',
    icon: <DetailInfo />,
  },
  ticket: {
    text: '티켓 관리',
    icon: <Ticket />,
  },
  option: {
    text: '티켓 옵션 관리',
    icon: <Option />,
  },
  reservationist: {
    text: '예매자 관리',
    icon: <Reservationist />,
  },
  qr: {
    text: 'QR 체크인',
    icon: <Qr />,
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
  const isSelected = curActiveMenu === menuItemKey;

  const menuItemClickHandler = () => {
    setCurActiveMenu(menuItemKey);
  };

  return (
    <OuterPadding
      isSelected={isSelected}
      size={padding}
      onClick={menuItemClickHandler}
    >
      <MenuItemWrapper
        padding={[8, 12]}
        color={isSelected ? 'main_100' : 'white'}
      >
        <FlexBox align={'center'} gap={16} justify={'start'}>
          <IconWrapper align={'center'} isSelected={isSelected}>
            {menuItemSet[type].icon}
          </IconWrapper>
          <Text typo={'Text_14'} color={isSelected ? 'main_500' : 'black'}>
            {menuItemSet[type].text}
          </Text>
        </FlexBox>
      </MenuItemWrapper>
    </OuterPadding>
  );
};

// ------------------------------------------------------

// ------------------------------------------------------

interface SelectedProps {
  isSelected: boolean;
}

const OuterPadding = styled(Padding)<SelectedProps>`
  ${({ theme, isSelected }) =>
    !isSelected
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
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.main_300 : theme.palette.main_200};
`;
