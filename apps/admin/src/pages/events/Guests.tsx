import ApproveWaiting from '@components/events/guests/ApproveWaiting';
import Confirmed from '@components/events/guests/Confirmed';
import IssuedTickets from '@components/events/guests/IssuedTickets';
import { Input, ListHeader, MenuBar, Spacing } from '@dudoong/ui';
import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const menus = ['예매티켓', '주문 승인대기', '주문 목록'];

const Guests = () => {
  const [menu, setMenu] = useState<number>(0);
  return (
    <>
      <ListHeader
        title={'예매자 관리'}
        description={'공연을 예매한 사람들의 정보를 관리해요.'}
        size={'listHeader_24'}
        padding={[32, 0, 40, 0]}
      />
      <BorderBox
        padding={0}
        css={css`
          position: relative;
        `}
      >
        <>
          <MenuBar
            menus={menus}
            curActiveMenu={menu}
            setCurActiveMenu={setMenu}
          />
          <Filter>
            <Input width={398} />
          </Filter>
          <Spacing size={20} />
          {menu === 0 && <IssuedTickets />}
          {menu === 1 && <ApproveWaiting />}
          {menu === 2 && <Confirmed />}
        </>
      </BorderBox>
    </>
  );
};
const Filter = styled.div`
  position: absolute;
  right: 20px;
  top: 12px;
`;
export default Guests;
