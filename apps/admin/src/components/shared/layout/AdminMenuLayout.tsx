import { Divider, MenuItem, MenuItemSetTypeKey, Padding } from '@dudoong/ui';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { NavToHome } from './NavToHome';
import Breadcrumb from './Breadcrumb';

type MenuSetTypeKey = 'events' | 'hosts';

type MenuSetType = {
  [key in MenuSetTypeKey]: {
    items: string[];
    dividerPos: number[];
    url: string[];
  };
};

const MENU_SET: MenuSetType = {
  events: {
    items: [
      'dashboard',
      'info',
      'detail',
      'tickets',
      'options',
      'guests',
      'qr',
    ],
    dividerPos: [2, 4],
    url: ['dashboard', 'info', 'detail', 'tickets', 'options', 'guests', 'qr'],
  },
  hosts: {
    items: ['hostinfo', 'hostmember', 'hostevents', 'hostalliance'],
    dividerPos: [],
    url: ['info', 'member', 'events', 'alliance'],
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
  const pageType = MENU_SET[page];

  const menuActiveHandler = (menuItemKey: number) => {
    setCurActiveMenu(menuItemKey);
    navigate(
      `/${page}/${location.pathname.split('/')[2]}/${
        pageType.url[menuItemKey]
      }`,
    );
  };

  return (
    <Wrapper>
      <MenuWrapper size={[36, 23, 0, 23]}>
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
            <Divider line={true} padding={0} height={0} />
          ) : null;
          return (
            <div key={index}>
              {itemEl}
              {itemElDivider}
            </div>
          );
        })}
        <NavToHome />
      </MenuWrapper>
      <ContentWrapper>
        <Breadcrumb />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </ContentWrapper>
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

const MenuWrapper = styled(Padding)`
  width: 250px;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: calc(100% - 250px);
  height: 100%;
  background-color: ${({ theme }) => theme.palette.gray_100};
`;

const OutletWrapper = styled.div`
  width: 954px;
  padding: 0 53px;
`;
