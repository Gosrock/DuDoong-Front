import { Popup } from '@dudoong/ui';
import { ReactComponent as ThreeDot } from '@assets/moreVert.svg';
import { css } from '@emotion/react';
import type { OrderAdminTableElement } from '@lib/apis/order/orderType';
import { TableType } from './useTableData';
import useGuestMutation from './useGuestMutation';
import { useLocation } from 'react-router-dom';

const TableOption = ({
  data,
  tableType,
}: {
  data: OrderAdminTableElement;
  tableType: TableType;
}) => {
  const eventId = useLocation().pathname.split('/')[2];
  const { mutate } = useGuestMutation();
  const approveWaitingOptions = [
    {
      title: '승인하기',
      onClick: () => {
        mutate({ eventId, order_uuid: data.orderUuid });
      },
    },

    {
      title: '자세히 보기',
      onClick: () => {
        console.log('자세히 보기');
      },
    },
  ];
  const confirmOptions = [
    {
      title: '자세히 보기',
      onClick: () => {
        console.log('자세히 보기');
      },
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
