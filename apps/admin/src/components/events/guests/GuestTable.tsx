import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'antd';
import styled from '@emotion/styled';
import { TableType, useTableData } from './useTableData';
import { css } from '@emotion/react';
import { PageResponseOrderAdminTableElement } from '@lib/apis/order/orderType';
import { PageResponseIssuedTicketAdminTableElement } from '@lib/apis/ticket/ticketType';

const GuestTable = ({ tableType }: { tableType: TableType }) => {
  const eventId = useLocation().pathname.split('/')[2];
  const [page, setPage] = useState<number>(1);
  const tableMap = useTableData();
  const { data, refetch, isSuccess } = useQuery<
    | PageResponseIssuedTicketAdminTableElement
    | PageResponseOrderAdminTableElement
  >(['events', eventId, tableType, page], () =>
    tableMap[tableType].queryFn(eventId, page),
  );

  return (
    <Wrapper>
      {isSuccess ? (
        <Table
          columns={tableMap[tableType].columns}
          dataSource={tableMap[tableType].dataSource(data.content)}
          scroll={{ x: tableMap[tableType].scroll }}
          pagination={false}
          css={css`
            .ant-table-content {
              overflow: auto visible !important;
              padding-bottom: 80px;
            }
          `}
        />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  tr > td:last-of-type {
    padding: 0px 16px 0px 16px !important;
    & > svg {
      transform: translate3d(0, 6px, 0);
    }
  }
`;
export default GuestTable;
