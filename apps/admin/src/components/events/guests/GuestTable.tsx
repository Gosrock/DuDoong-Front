import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'antd';
import styled from '@emotion/styled';
import { TableType, useTableData } from './useTableData';
import { PageResponseOrderAdminTableElement } from '@lib/apis/order/orderType';
import { PageResponseIssuedTicketAdminTableElement } from '@lib/apis/ticket/ticketType';
import { ChevronDown, Input, Popup, TagButton, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { useInput } from '@dudoong/utils';

const GuestTable = ({ tableType }: { tableType: TableType }) => {
  const eventId = useLocation().pathname.split('/')[2];
  const [page, setPage] = useState<number>(0);
  const [searchType, setSearchType] = useState<'NAME' | 'PHONE'>('NAME');
  const [searchString, onChange, reset] = useInput('');
  const tableMap = useTableData();
  const { data, refetch, isSuccess } = useQuery<
    | PageResponseIssuedTicketAdminTableElement
    | PageResponseOrderAdminTableElement
  >(['events', eventId, tableType, page], () =>
    tableMap[tableType].queryFn(eventId, page, searchType, searchString),
  );
  const selectOption = [
    {
      title: '이름',
      onClick: () => {
        setSearchType('NAME');
      },
    },
    {
      title: '전화번호',
      onClick: () => {
        setSearchType('PHONE');
      },
    },
  ];

  useEffect(() => {
    reset();
    setPage(0);
  }, [tableType]);

  return (
    <Wrapper>
      <Filter>
        <Popup
          renderElement={
            <SearchOptionDropdown>
              {searchType === 'NAME' ? '이름으로 검색' : '전화번호로 검색'}
              <ChevronDown width={16} height={16} />
            </SearchOptionDropdown>
          }
          options={selectOption}
          width={100}
        />
        <Input
          height={36}
          width={200}
          placeholder={
            searchType === 'PHONE' ? 'ex) 010-1234-5678' : '검색어를 입력하세요'
          }
          css={css`
            ${theme.typo.P_Text_14_R}
          `}
          value={searchString}
          onChange={onChange}
        />
        <TagButton
          color="secondary"
          size="lg"
          text="검색"
          onClick={() => {
            refetch();
          }}
        />
      </Filter>

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

const Filter = styled.div`
  position: absolute;
  right: 30px;
  top: -45px;
  z-index: 2;

  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
`;

const SearchOptionDropdown = styled.div`
  ${({ theme }) => theme.typo.P_Text_14_M}
  color: ${({ theme }) => theme.palette.main_500};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding-top: 12px;
`;
export default GuestTable;
