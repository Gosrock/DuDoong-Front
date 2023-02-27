import { media, MenuBar, Spacing } from '@dudoong/ui';
import { useInfiniteQueries } from '@dudoong/utils';
import styled from '@emotion/styled';
import { OrderApi } from '@lib/apis/order/OrderApi';
import type { OrderListResponse } from '@lib/apis/order/orderType';
import { ForwardedRef, forwardRef, HTMLAttributes, useState } from 'react';
import NoData from './NoData';
import OrderItem from './OrderItem';

const OrderList = (
  props: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const [menu, setMenu] = useState<number>(0);
  const { infiniteListElement, isEmpty } =
    useInfiniteQueries<OrderListResponse>(
      ['orderDetail', menu],
      ({ pageParam = 0 }) =>
        OrderApi.GET_ORDERS(
          {
            pageParam,
          },
          menu === 0,
        ),
      OrderItem,
    );

  return (
    <>
      <MenuWrapper>
        <MenuBar
          menus={['예매확인/취소', '지난 관람내역']}
          curActiveMenu={menu}
          setCurActiveMenu={setMenu}
        />
      </MenuWrapper>

      {isEmpty && (
        <>
          <Spacing size={182} />
          <NoData
            text={
              menu === 0 ? '예매내역이 없습니다.' : '지난 관람내역이 없습니다.'
            }
          />
        </>
      )}
      <Wrapper ref={ref}>{infiniteListElement}</Wrapper>
    </>
  );
};

const MenuWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  ${media.pc} {
    position: sticky;
  }
  top: 48px;
  z-index: 3;
  background-color: ${({ theme }) => theme.palette.white};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 20px 24px 20px 24px;

  box-sizing: border-box;
`;

export default forwardRef(OrderList);
