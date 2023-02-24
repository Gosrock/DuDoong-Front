import { SyncLoader, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import OrderApi from '@lib/apis/order/OrderApi';
import {
  OrderAdminTableElement,
  OrderLineTicketResponse,
} from '@lib/apis/order/orderType';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface TableViewDetailProps {
  eventId: string;
  order_uuid: string;
}

const TableViewDetail = ({ eventId, order_uuid }: TableViewDetailProps) => {
  const { data, isSuccess } = useQuery(
    ['tableViewDetail', eventId, order_uuid],
    () => OrderApi.GET_ORDER_DETAIL({ eventId, order_uuid }),
  );
  const payColumns: ColumnsType<any> = [
    {
      title: '결제 수단',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
    },
    {
      title: '금액',
      dataIndex: 'supplyAmount',
      key: 'supplyAmount',
      width: 120,
    },
    {
      title: '할인 쿠폰',
      dataIndex: 'couponName',
      key: 'couponName',
      width: 290,
    },
    {
      title: '할인 금액',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      width: 120,
    },
    {
      title: '총 결제금액',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
    },
  ];
  const payTableSource = [
    {
      key: data?.orderNo,
      paymentMethod: data?.paymentInfo.provider || '승인 결제',
      supplyAmount: data?.paymentInfo.supplyAmount,
      couponName: data?.paymentInfo.couponName,
      discountAmount: data?.paymentInfo.discountAmount,
      totalAmount: data?.paymentInfo.totalAmount,
    },
  ];

  const optionColumns: ColumnsType<any> = [
    {
      title: '티켓 번호',
      dataIndex: 'ticketNos',
      key: 'ticketNos',
      width: 150,
    },
    {
      title: '티켓 옵션 질문',
      dataIndex: 'questions',
      key: 'questiosn',
      width: 200,
      render: (data) => {
        return (
          <div>
            {data.map((question: string) => (
              <div
                key={question}
                css={css`
                  height: 60px;
                `}
              >
                {question}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: '티켓 옵션 응답',
      dataIndex: 'answers',
      key: 'answers',
      width: 300,
      render: (data) => {
        return (
          <div>
            {data.map((answer: string, idx: number) => (
              <div
                key={idx}
                css={css`
                  height: 60px;
                `}
              >
                {answer}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: '추가 금액',
      dataIndex: 'additionalPrice',
      key: 'additionalPrice',

      render: (data) => {
        return (
          <div>
            {data.map((addtionalPrice: string, idx: number) => (
              <div
                key={idx}
                css={css`
                  height: 60px;
                `}
              >
                {addtionalPrice}
              </div>
            ))}
          </div>
        );
      },
    },
  ];
  const generateOptionTableSource = (data: OrderLineTicketResponse[]) => {
    return data.map((row) => {
      const rowData = {
        key: row.orderNo,
        ticketNos: row.ticketNos,
        questions: row.answers.map((answer) => answer.questionName),
        answers: row.answers.map((answer) => answer.answer),
        additionalPrice: row.answers.map((answer) => answer.additionalPrice),
      };
      console.log(rowData);
      return rowData;
    });
  };

  return (
    <Wrapper>
      {isSuccess ? (
        <>
          <Table
            columns={payColumns}
            dataSource={payTableSource}
            pagination={false}
          />
          <Table
            columns={optionColumns}
            dataSource={generateOptionTableSource(data.tickets)}
            pagination={false}
            scroll={{ y: 300 }}
          />
        </>
      ) : (
        <SyncLoader />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 800px;
  min-height: 300px;
`;

export default TableViewDetail;
