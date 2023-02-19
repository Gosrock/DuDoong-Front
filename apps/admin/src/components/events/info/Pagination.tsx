import { Left, Right } from '@assets/Pagination';
import { FlexBox, Spacing, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Pagination = (pagination: any) => {
  const [cur, setCu] = useState<number>(1);
  console.log(pagination.pagination);
  const count = [1, 2, 3];

  const setChange = (num: number) => {
    pagination.pagination.gotoPage(num);
    setCu(num);
  };
  useEffect(() => {
    setCu(pagination.pagination.current);
  }, [pagination.pagination.current]);

  console.log(cur);
  return (
    <>
      <Spacing size={56} />
      <FlexBox align={'center'} gap={50}>
        <button onClick={() => pagination.pagination.prevPage()}>
          <Left />
        </button>
        {pagination.pagination.last !== 1 ? (
          count.map((num) => (
            <>
              <Mini cur={cur} num={num}>
                <button onClick={() => setChange(num)}>
                  <Text
                    typo={'P_Text_16_M'}
                    color={cur === num ? 'white' : 'black'}
                  >
                    {num}
                  </Text>
                </button>
              </Mini>
            </>
          ))
        ) : (
          <>
            <Mini num={1} cur={1}>
              <button onClick={() => setChange(1)}>
                <Text typo={'P_Text_16_M'} color={'white'}>
                  1
                </Text>
              </button>
            </Mini>
          </>
        )}
        <button onClick={() => pagination.pagination.nextPage()}>
          <Right />
        </button>
      </FlexBox>
    </>
  );
};
export default Pagination;

const Mini = styled.div<any>`
  width: 28px;
  height: 28px;
  display: flex;
  background-color: ${(props) =>
    props.cur === props.num ? '#6b36dc' : 'white'};
  justify-content: center;
  align-items: center;
`;
