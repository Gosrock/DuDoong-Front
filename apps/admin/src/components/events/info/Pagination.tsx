import { Left, Right } from '@assets/Pagination';
import { FlexBox, Spacing, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Pagination = (pagination: any) => {
  const [current, setCurrent] = useState<number>(1);
  const setChange = (num: number) => {
    pagination.pagination.gotoPage(num);
    setCurrent(num);
  };

  const arr = [];
  for (let i = 0; i < pagination.pagination.last; i++) {
    arr.push(i + 1);
  }
  useEffect(() => {
    setCurrent(pagination.pagination.current);
  }, [pagination.pagination.current]);

  return (
    <>
      <Spacing size={32} />
      <FlexBox align={'center'} gap={30}>
        <button onClick={() => pagination.pagination.prevPage()}>
          <Left />
        </button>
        {arr.map((num) => (
          <Mini cur={current} num={num} key={num}>
            <button onClick={() => setChange(num)}>
              <Text
                typo={'P_Text_16_M'}
                color={current === num ? 'white' : 'black'}
              >
                {num}
              </Text>
            </button>
          </Mini>
        ))}
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
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
