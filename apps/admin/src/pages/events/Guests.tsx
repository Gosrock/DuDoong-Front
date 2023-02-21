import { TableType } from '@components/events/guests/useTableData';
import GuestTable from '@components/events/guests/GuestTable';
import { BorderBox, ListHeader, MenuBar, Spacing } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const menus: { title: string; key: TableType }[] = [
  { title: '예매티켓', key: 'issuedTicket' },
  { title: '주문 승인대기', key: 'approveWaiting' },
  { title: '주문 목록', key: 'confirmed' },
];

const Guests = () => {
  const [menu, setMenu] = useState<number>(0);
  return (
    <>
      <GuestsHeader
        title={'예매자 관리'}
        description={'공연을 예매한 사람들의 정보를 관리해요.'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <BorderBox
        padding={0}
        css={css`
          position: relative;
          margin: 0 20px;
        `}
      >
        <>
          <MenuBar
            menus={menus.map((menu) => menu.title)}
            curActiveMenu={menu}
            setCurActiveMenu={setMenu}
          />
          {/* <Filter>
            <Input width={398} />
          </Filter> */}
          <GuestTable tableType={menus[menu].key} />
          <Spacing size={20} />
        </>
      </BorderBox>
      <Spacing size={72} />
    </>
  );
};

const GuestsHeader = styled(ListHeader)`
  width: 876px;
  margin: 0 auto;
`;

const Filter = styled.div`
  position: absolute;
  right: 20px;
  top: 12px;
`;
export default Guests;
