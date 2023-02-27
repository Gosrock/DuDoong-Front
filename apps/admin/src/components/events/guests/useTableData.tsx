import { OrderAdminTableElement } from '@lib/apis/order/orderType';
import { ColumnsType } from 'antd/es/table';
import { IssuedTicketAdminTableElement } from '@lib/apis/ticket/ticketType';
import { parseDate } from '@dudoong/utils';
import TableOption from './TableOption';
import TicketApi from '@lib/apis/ticket/TicketApi';
import OrderApi from '@lib/apis/order/OrderApi';

export type TableType = 'issuedTicket' | 'approveWaiting' | 'confirmed';

interface TableMapValue {
  columns: ColumnsType<any>;
  dataSource: any;
  scroll?: number;
  queryFn?: any;
}

const useTableData = () => {
  const issuedTicketColumns: ColumnsType<unknown> = [
    { title: '티켓 번호', dataIndex: 'ticketNo', key: 'ticketNo', width: 100 },
    {
      title: '티켓 이름',
      dataIndex: 'ticketName',
      key: 'ticketName',
      width: 250,
    },
    { title: '이름', dataIndex: 'userName', key: 'userName', width: 100 },
    { title: '이메일', dataIndex: 'email', key: 'email', width: 270 },
    {
      title: '전화 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    { title: '주문 번호', dataIndex: 'orderNo', key: 'orderNo', width: 100 },
    {
      title: '발급 일시',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
    },
    {
      title: '체크인',
      dataIndex: 'issuedTicketStatus',
      key: 'issuedTicketStatus',
      width: 100,
    },
    {
      title: '체크인 시간',
      dataIndex: 'enteredAt',
      key: 'enteredAt',
      width: 200,
    },
  ];

  const generateIssuedTicketTableSource = (
    data: IssuedTicketAdminTableElement[],
  ) => {
    return data.map((row) => {
      return {
        key: row.uuid,
        ticketNo: row.issuedTicketNo,
        ticketName: row.ticketName,
        userName: row.userInfo.userName,
        email: row.userInfo.email,
        phoneNumber: row.userInfo.phoneNumber,
        orderNo: row.orderNo,
        createdAt: `${parseDate(row.createdAt)[0]} ${
          parseDate(row.createdAt)[1]
        }`,
        issuedTicketStatus: row.issuedTicketStatus,
        enteredAt: row.enteredAt
          ? `${parseDate(row.enteredAt)[0]} ${parseDate(row.enteredAt)[1]}`
          : '--',
      };
    });
  };

  // -----------------------------------------------

  const approveWaitingColumns: ColumnsType<OrderAdminTableElement> = [
    { title: '주문 번호', dataIndex: 'orderNo', key: 'orderNo', width: 100 },
    { title: '이름', dataIndex: 'userName', key: 'userName', width: 100 },
    { title: '이메일', dataIndex: 'email', key: 'email', width: 270 },
    {
      title: '전화 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: '매수',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 70,
    },
    {
      title: '총 결제금액',
      dataIndex: 'totalPaymentPrice',
      key: 'totalPaymentPrice',
      width: 120,
    },
    {
      title: '주문 일시',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
    },
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
    { title: '이메일', dataIndex: 'email', key: 'email', width: 270 },
    {
      title: '전화 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: '주문 티켓',
      dataIndex: 'orderName',
      key: 'orderName',
      width: 150,
    },
    {
      title: '매수',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 70,
    },
    {
      title: '총 결제금액',
      dataIndex: 'totalPaymentPrice',
      key: 'totalPaymentPrice',
      width: 120,
    },
    {
      title: '주문 일시',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
    },
    {
      title: '철회/환불',
      dataIndex: 'withDraw',
      key: 'withDraw',
      width: 200,
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
        withDraw: row.withDrawAt
          ? `${parseDate(row.withDrawAt)[0]} ${parseDate(row.withDrawAt)[1]}`
          : '--',
        remote: row,
      };
    });
  };

  const tableMap: Record<TableType, TableMapValue> = {
    issuedTicket: {
      columns: issuedTicketColumns,
      dataSource: (arg: IssuedTicketAdminTableElement[]) =>
        generateIssuedTicketTableSource(arg),
      queryFn: (
        eventId: string,
        page: number,
        searchType?: 'PHONE' | 'NAME',
        searchString?: string,
      ) =>
        TicketApi.GET_ISSUEDTICKETS({
          eventId,
          page,
          searchType: searchString ? searchType : undefined,
          searchString,
        }),
      scroll: 1470,
    },
    approveWaiting: {
      columns: approveWaitingColumns,
      dataSource: (arg: OrderAdminTableElement[]) =>
        generateApproveWaitingTableSource(arg),
      queryFn: (
        eventId: string,
        page: number,
        searchType?: 'PHONE' | 'NAME',
        searchString?: string,
      ) =>
        OrderApi.GET_ORDERS({
          eventId,
          page,
          orderStage: 'APPROVE_WAITING',
          searchType: searchString ? searchType : undefined,
          searchString,
        }),
      scroll: 1060,
    },
    confirmed: {
      columns: confirmedColumns,
      dataSource: (arg: OrderAdminTableElement[]) =>
        generateConfirmedTableSource(arg),
      queryFn: (
        eventId: string,
        page: number,
        searchType?: 'PHONE' | 'NAME',
        searchString?: string,
      ) =>
        OrderApi.GET_ORDERS({
          eventId,
          page,
          orderStage: 'CONFIRMED',
          searchType: searchString ? searchType : undefined,
          searchString,
        }),
      scroll: 1410,
    },
  };

  return tableMap;
};

export { useTableData };
