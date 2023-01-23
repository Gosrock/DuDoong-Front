import Main from '@components/shared/Layout/Main';
import { Button, ButtonSet, Divider, NavBar, Spacing } from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import { AddCartRequest } from '@lib/apis/cart/cartType';
import DDHead from '@components/shared/Layout/NextHead';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BookHeader from './blocks/order/BookHeader';
import OptionForm from './blocks/OptionForm';

const Option = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);

  const { mutate } = useMutation(CartApi.ADD_CARTLINE, {
    onSuccess: (data) => {
      router.push(
        { pathname: '/book/order', query: { state: JSON.stringify(data) } },
        '/book/order',
      );
    },
  });

  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar
          backHandler={() => {
            router.back();
          }}
        />
        <BookHeader
          title="옵션 선택하기"
          description={['고스락 제 23회 정기공연', '일반티켓', 3]}
        />
        <Divider />
        <OptionForm toggle={toggle} setToggle={() => setToggle(!toggle)} />
        <Spacing size={120} />
        <ButtonSet bottomFixed>
          <Button
            onClick={() => {
              mutate(mockCartLine);
            }}
          >
            선택 완료
          </Button>
        </ButtonSet>
      </Main>
    </>
  );
};

export default Option;

const mockCartLine: AddCartRequest = {
  items: [
    {
      itemId: 1,
      quantity: 2,
      options: [
        {
          optionId: 1,
          answer: '네',
        },
        {
          optionId: 4,
          answer: '아니오',
        },
        {
          optionId: 5,
          answer: '유입경로로 말할 것 같으면~~ 그냥 지인 추천으로 들어왔어요!',
        },
      ],
    },
    {
      itemId: 1,
      quantity: 1,
      options: [
        {
          optionId: 1,
          answer: '예',
        },
        {
          optionId: 4,
          answer: '예',
        },
        {
          optionId: 5,
          answer: '다른거에요',
        },
      ],
    },
  ],
};
