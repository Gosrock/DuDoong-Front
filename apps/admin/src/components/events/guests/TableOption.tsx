import { Popup, PopupOptions } from '@dudoong/ui';
import { ReactComponent as ThreeDot } from '@assets/moreVert.svg';
import { css } from '@emotion/react';
import type { OrderAdminTableElement } from '@lib/apis/order/orderType';
import { TableType } from './useTableData';
import useGuestMutation from './useGuestMutation';
import { useLocation } from 'react-router-dom';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';

const TableOption = ({
  data,
  tableType,
}: {
  data: OrderAdminTableElement;
  tableType: TableType;
}) => {
  const eventId = useLocation().pathname.split('/')[2];
  const { cancelMutate, approveMutate } = useGuestMutation();
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const approveWaitingOptions = [
    {
      title: '승인하기',
      onClick: () => {
        approveMutate({ eventId, order_uuid: data.orderUuid });
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
      onClick: () => {
        openOverlay({
          content: 'cancelOrder',
          props: {
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
