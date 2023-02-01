import { Divider, MenuItem, MenuItemSetTypeKey, Padding } from '@dudoong/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { NavToHome } from './NavToHome';
import { useState } from 'react';

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

const AdminMenu = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname.split('/');
  const page = path[1] as PageType;
  const pageType = MENU_SET[page];
  const acticeMenuIndex = pageType.url.indexOf(path[3]);
  const [curActiveMenu, setCurActiveMenu] = useState<number>(acticeMenuIndex);

  const menuActiveHandler = (menuItemKey: number) => {
    setCurActiveMenu(menuItemKey);
    navigate(
      `/${page}/${location.pathname.split('/')[2]}/${
        pageType.url[menuItemKey]
      }`,
    );
  };

  return (
    <MenuWrapper size={[28, 18]}>
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
          <Divider line={true} padding={0} height={8} />
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
  );
};

export default AdminMenu;

const MenuWrapper = styled(Padding)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 252px;
  height: calc(100vh - 80px);
  border-right: 1px solid ${({ theme }) => theme.palette.gray_200};
  background-color: ${({ theme }) => theme.palette.white};
`;
