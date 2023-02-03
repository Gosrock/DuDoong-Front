import {
  Divider,
  FlexBox,
  MenuItem,
  MenuItemSetTypeKey,
  Padding,
  Spacing,
  Text,
  theme,
} from '@dudoong/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import useBottomButton from '@lib/hooks/useBottomButton';
import { DiscFill } from '@dudoong/ui';
import { css } from '@emotion/react';

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

const AdminMenu = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname.split('/');
  const page = path[1] as PageType;
  const id = path[2];
  const pageType = MENU_SET[page];
  const acticeMenuIndex = pageType.url.indexOf(path[3]);
  const [curActiveMenu, setCurActiveMenu] = useState<number>(acticeMenuIndex);
  const { hideButtons } = useBottomButton();

  const menuActiveHandler = (menuItemKey: number) => {
    setCurActiveMenu(menuItemKey);
    hideButtons();
    navigate(`/${page}/${id}/${pageType.url[menuItemKey]}`);
  };

  return (
    <MenuWrapper size={[20, 18]}>
      <AdminTitle title={title} onClick={() => navigate('/')} />
      <Spacing size={4} />
      <Divider line={true} padding={0} height={8} />
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
      {/* <NavToHome /> */}
    </MenuWrapper>
  );
};

export default AdminMenu;

const MenuWrapper = styled(Padding)`
  position: fixed;
  left: 0;
  width: 252px;
  height: calc(100vh - 64px);
  border-right: 1px solid ${({ theme }) => theme.palette.gray_200};
  background-color: ${({ theme }) => theme.palette.white};
`;

const AdminTitle = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <FlexBox
      onClick={onClick}
      align={'center'}
      justify={'center'}
      direction={'column'}
      css={css`
        height: 100px;
        border-radius: 12px;
        cursor: pointer;
        &:hover {
          background-color: ${theme.palette.gray_200};
          box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
        }
        & > svg {
          margin-bottom: 12px;
        }
      `}
    >
      <DiscFill width={32} height={32} />
      <Text typo="G_Side_14_B">{title}</Text>
    </FlexBox>
  );
};
