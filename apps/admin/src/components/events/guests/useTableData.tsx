import { OrderAdminTableElement } from '@lib/apis/order/orderType';
import { ColumnsType } from 'antd/es/table';
import { IssuedTicketAdminTableElement } from '@lib/apis/ticket/ticketType';
import { parseDate } from '@dudoong/utils';
import TableOption from './TableOption';
import TicketApi from '@lib/apis/ticket/TicketApi';
import OrderApi from '@lib/apis/order/OrderApi';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';

export type TableType = 'issuedTicket' | 'approveWaiting' | 'confirmed';

interface TableMapValue {
  columns: ColumnsType<any>;
  dataSource: any;
  scroll?: number;
  queryFn?: any;
}

const useTableData = () => {
  const { openOverlay } = useGlobalOverlay();
  const issuedTicketColumns: ColumnsType<unknown> = [
    { title: '티켓 번호', dataIndex: 'ticketNo', key: 'ticketNo', width: 100 },
    { title: '이름', dataIndex: 'userName', key: 'userName', width: 100 },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    { title: '전화 번호', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '주문 번호', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '발급 일시', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '체크인',
      dataIndex: 'issuedTicketStatus',
      key: 'issuedTicketStatus',
    },
    {
      title: '체크인 시간',
      dataIndex: 'enteredAt',
      key: 'enteredAt',
    },
  ];

  const generateIssuedTicketTableSource = (
    data: IssuedTicketAdminTableElement[],
  ) => {
    return data.map((row) => {
      return {
        key: row.uuid,
        ticketNo: row.issuedTicketNo,
        userName: row.userInfo.userName,
        email: row.userInfo.email,
        phoneNumber: row.userInfo.phoneNumber,
        orderNo: row.orderNo,
        createdAt: `${parseDate(row.createdAt)[0]} ${
          parseDate(row.createdAt)[1]
        }`,
        issuedTicketStatus: row.issuedTicketStatus,
        issuedTicketTime: row.enteredAt,
      };
    });
  };

  // -----------------------------------------------

  const approveWaitingColumns: ColumnsType<OrderAdminTableElement> = [
    { title: '주문 번호', dataIndex: 'orderNo', key: 'orderNo', width: 100 },
    { title: '이름', dataIndex: 'userName', key: 'userName', width: 100 },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    { title: '전화 번호', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    {
      title: '매수',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 100,
    },
    {
      title: '총 결제금액',
      dataIndex: 'totalPaymentPrice',
      key: 'totalPaymentPrice',
      width: 120,
    },
    { title: '주문 일시', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '',
      dataIndex: 'remote',
      key: 'remote',
      width: 50,
      render: (data) => (
        <TableOption data={data} tableType={'approveWaiting'} />
      ),
    },
  ];

  const generateApproveWaitingTableSource = (
    data: OrderAdminTableElement[],
  ) => {
    console.log(data);
    return data.map((row) => {
      return {
        key: row.orderNo,
        orderNo: row.orderNo,
        userName: row.userInfoVo?.userName,
        email: row.userInfoVo?.email,
        phoneNumber: row.userInfoVo?.phoneNumber,
        totalQuantity: row.totalQuantity,
        totalPaymentPrice: row.totalPaymentPrice,
        createdAt: `${parseDate(row.createdAt)[0]} ${
          parseDate(row.createdAt)[1]
        }`,
        remote: row,
      };
    });
  };

  // -----------------------------------------------

  const confirmedColumns: ColumnsType<unknown> = [
    { title: '주문 번호', dataIndex: 'orderNo', key: 'orderNo', width: 100 },
    { title: '이름', dataIndex: 'userName', key: 'userName', width: 100 },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    { title: '전화 번호', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '주문 티켓', dataIndex: 'orderName', key: 'orderName' },
    {
      title: '매수',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 100,
    },
    {
      title: '총 결제금액',
      dataIndex: 'totalPaymentPrice',
      key: 'totalPaymentPrice',
      width: 120,
    },
    { title: '주문 일시', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '철회/환불',
      dataIndex: 'withDraw',
      key: 'withDraw',
    },
    {
      title: '',
      dataIndex: 'remote',
      key: 'remote',
      width: 50,
      render: (data) => <TableOption data={data} tableType={'confirmed'} />,
    },
  ];

  const generateConfirmedTableSource = (data: OrderAdminTableElement[]) => {
    return data.map((row) => {
      return {
        key: row.orderNo,
        orderNo: row.orderNo,
        userName: row.userInfoVo.userName,
        email: row.userInfoVo.email,
        phoneNumber: row.userInfoVo.phoneNumber,
        orderName: row.orderName,
        totalQuantity: row.totalQuantity,
        totalPaymentPrice: row.totalPaymentPrice,
        createdAt: `${parseDate(row.createdAt)[0]} ${
          parseDate(row.createdAt)[1]
        }`,
        withDraw: row.withDrawAt ? `${row.withDrawAt}` : '--',
        remote: row,
      };
    });
  };

  const tableMap: Record<TableType, TableMapValue> = {
    issuedTicket: {
      columns: issuedTicketColumns,
      dataSource: (arg: IssuedTicketAdminTableElement[]) =>
        generateIssuedTicketTableSource(arg),
      queryFn: (eventId: string, page: number) =>
        TicketApi.GET_ISSUEDTICKETS({
          eventId,
          page,
        }),
      scroll: 1200,
    },
    approveWaiting: {
      columns: approveWaitingColumns,
      dataSource: (arg: OrderAdminTableElement[]) =>
        generateApproveWaitingTableSource(arg),
      queryFn: (eventId: string, page: number) =>
        OrderApi.GET_ORDERS({
          eventId,
          page,
          orderStage: 'APPROVE_WAITING',
        }),
      scroll: 1200,
    },
    confirmed: {
      columns: confirmedColumns,
      dataSource: (arg: OrderAdminTableElement[]) =>
        generateConfirmedTableSource(arg),
      queryFn: (eventId: string, page: number) =>
        OrderApi.GET_ORDERS({
          eventId,
          page,
          orderStage: 'CONFIRMED',
        }),
      scroll: 1500,
    },
  };

  return tableMap;
};

export { useTableData };
