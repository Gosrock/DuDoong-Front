import { Divider, MenuItem, MenuItemSetTypeKey, Spacing } from '@dudoong/ui';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { NavToHome } from './NavToHome';
import { ContentHeader } from './ContentHeader';
import { useRecoilState } from 'recoil';
import { menuRouting } from '@store/menuRouting';
import { useEffect } from 'react';

const MENU_ITEM_SET = {
  events: {
    items: [
      'dashboard',
      'basicInfo',
      'detailInfo',
      'ticket',
      'option',
      'reservationist',
      'qr',
    ],
    dividerPos: [2, 4],
    url: ['dashboard', 'info', 'detail', 'tickets', 'options', 'guests', 'qr'],
    route: [
      '대시보드',
      '공연 기본 정보',
      '공연 이미지/상세',
      '티켓 관리',
      '티켓 옵션 관리',
      '예매자 관리',
      'QR 체크인',
    ],
  },
  hosts: {
    items: ['dashboard', 'hostInfo', 'hostMember', 'slack'],
    dividerPos: [0, 2],
    url: ['dashboard', 'info', 'member', 'slack'],
    route: ['대시보드', '호스트 정보', '호스트 멤버', '슬랙 알림 등록'],
  },
};

type PageType = 'events' | 'hosts';

interface AdminMenuLayoutProps {
  page: PageType;
  curActiveMenu: number;
  setCurActiveMenu: (menuItemKey: number) => void;
}

export const AdminMenuLayout = ({
  page,
  curActiveMenu,
  setCurActiveMenu,
}: AdminMenuLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageType = MENU_ITEM_SET[page];
  const [menuRoute, setMenuRoute] = useRecoilState(menuRouting);

  useEffect(() => {
    setMenuRoute({ ...menuRoute, secondText: pageType.route[curActiveMenu] });
  }, []);

  const menuActiveHandler = (menuItemKey: number) => {
    setCurActiveMenu(menuItemKey);
    setMenuRoute({
      ...menuRoute,
      secondText: pageType.route[menuItemKey],
      thirdText: null,
    });
    navigate(
      `/${page}/${location.pathname.split('/')[2]}/${
        pageType.url[menuItemKey]
      }`,
    );
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <Spacing size={40} />
        <>
          {pageType.items.map((item, index) => {
            const itemEl = (
              <MenuItem
                type={item as MenuItemSetTypeKey}
                menuItemKey={index}
                curActiveMenu={curActiveMenu}
                setCurActiveMenu={menuActiveHandler}
              />
            );
            const itemElDivider = pageType.dividerPos.includes(index) ? (
              <Divider line={true} padding={12} height={32} />
            ) : null;
            return (
              <div key={index}>
                {itemEl}
                {itemElDivider}
              </div>
            );
          })}
        </>
        <NavToHome />
      </MenuWrapper>
      <OutletWrapper>
        <ContentHeader />
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MenuWrapper = styled.div`
  width: 250px;
  height: 100vh;
`;

const OutletWrapper = styled.div`
  width: calc(100% - 250px);
  height: calc(100vh-72px);
  background-color: ${({ theme }) => theme.palette.gray_100};
`;
