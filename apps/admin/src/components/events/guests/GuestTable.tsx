import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'antd';
import styled from '@emotion/styled';
import { TableType, useTableData } from './useTableData';
import { PageResponseOrderAdminTableElement } from '@lib/apis/order/orderType';
import { PageResponseIssuedTicketAdminTableElement } from '@lib/apis/ticket/ticketType';

const GuestTable = ({ tableType }: { tableType: TableType }) => {
  const eventId = useLocation().pathname.split('/')[2];
  const [page, setPage] = useState<number>(0);
  const tableMap = useTableData();
  const { data, isSuccess } = useQuery<
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
          pagination={{
            current: page + 1,
            pageSize: 10,
            total: data.totalElements,
            showSizeChanger: false,
            onChange: (e) => {
              setPage(e - 1);
            },
          }}
        />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  tr > td:last-of-type {
    padding: 0px 16px 0px 16px !important;
    & > svg {
      transform: translate3d(0, 6px, 0);
    }
  }

  .ant-pagination {
    position: absolute;
    bottom: 24px;
    right: 16px;
  }

  .ant-table-content {
    overflow: scroll hidden !important;
    padding-bottom: 80px;
  }
  .ant-pagination-item-active {
    background-color: ${({ theme }) => theme.palette.main_400};
    &:hover {
      background-color: ${({ theme }) => theme.palette.main_500};
    }

    border: none;
    & > a {
      color: ${({ theme }) => theme.palette.white};
      &:hover {
        color: ${({ theme }) => theme.palette.white};
      }
    }
  }
`;
export default GuestTable;
