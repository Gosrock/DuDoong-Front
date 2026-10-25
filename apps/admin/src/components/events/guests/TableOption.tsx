import { Popup, PopupOptions } from '@dudoong/ui';
import { ReactComponent as ThreeDot } from '@assets/moreVert.svg';
import { css } from '@emotion/react';
import type { OrderAdminTableElement } from '@lib/apis/order/orderType';
import { TableType } from './useTableData';
import useGuestMutation from './useGuestMutation';
import { useLocation } from 'react-router-dom';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import OrderApi from '@lib/apis/order/OrderApi';
import { useQueryClient } from '@tanstack/react-query';

// 두둥티켓 = 승인 방식 주문 + 결제금액 > 0 (금액은 "10000원" 형식)
const isPositiveAmount = (amount?: string) =>
  Number((amount ?? '').replace(/[^0-9]/g, '')) > 0;

const TableOption = ({
  data,
  tableType,
}: {
  data: OrderAdminTableElement;
  tableType: TableType;
}) => {
  const eventId = useLocation().pathname.split('/')[2];
  const { cancelMutate, approveMutate, refuseMutate } = useGuestMutation();
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const queryClient = useQueryClient();
  const approveWaitingOptions: PopupOptions[] = [
    {
      title: '승인하기',
      onClick: () => {
        approveMutate({ eventId, order_uuid: data.orderUuid });
      },
    },
    {
      title: '거절하기',
      onClick: () => {
        // 승인 대기 목록의 주문은 모두 승인 방식이므로 금액만 확인
        openOverlay({
          content: 'refuseOrder',
          props: {
            isDudoongTicket: isPositiveAmount(data.totalPaymentPrice),
            refuseOrderHandler: () => {
              refuseMutate({ eventId, order_uuid: data.orderUuid });
              closeOverlay();
            },
          },
        });
      },
    },

    {
      title: '자세히 보기',
      onClick: () => {
        openOverlay({
          content: 'tableViewDetail',
          props: { eventId, order_uuid: data.orderUuid },
        });
      },
    },
  ];
  const confirmOptions: PopupOptions[] = [
    {
      title: '자세히 보기',
      onClick: () => {
        openOverlay({
          content: 'tableViewDetail',
          props: { eventId, order_uuid: data.orderUuid },
        });
      },
    },
    {
      title: '주문 취소',
      onClick: async () => {
        // 목록 응답에는 주문 방식이 없어 상세 조회로 두둥티켓 여부 판별.
        // 조회 실패 시에는 안내를 생략하지 않도록 두둥티켓으로 간주한다.
        const isDudoongTicket = await queryClient
          .fetchQuery(['tableViewDetail', eventId, data.orderUuid], () =>
            OrderApi.GET_ORDER_DETAIL({ eventId, order_uuid: data.orderUuid }),
          )
          .then(
            (order) =>
              order.orderMethod === '승인 방식' &&
              isPositiveAmount(order.paymentInfo.totalAmount),
          )
          .catch(() => true);
        openOverlay({
          content: 'cancelOrder',
          props: {
            isDudoongTicket,
            closeOverlay,
            cancelOrderHandler: () => {
              cancelMutate({ eventId, order_uuid: data.orderUuid });
              closeOverlay();
            },
          },
        });
      },
      disabled: data.orderStatus === '취소된 결제',
    },
  ];

  return (
    <Popup
      renderElement={
        <ThreeDot
          css={css`
            cursor: pointer;
            transform: translate3d(0, 4px, 0);
          `}
        />
      }
      options={
        tableType === 'approveWaiting' ? approveWaitingOptions : confirmOptions
      }
      width={110}
    />
  );
};

export default TableOption;
