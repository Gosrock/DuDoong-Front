import Main from '@components/shared/Layout/Main';
import {
  Button,
  ButtonSet,
  Divider,
  ListHeader,
  NavBar,
  Text,
  theme,
} from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import { AddCartRequest } from '@lib/apis/cart/cartType';
import DDHead from '@lib/utils/NextHead';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import OptionForm from './blocks/OptionForm';

const Option = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);

  const addCartMutation = useMutation(CartApi.ADD_CARTLINE, {
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
        <ListHeader
          title={'옵션 선택하기'}
          size={'listHeader_20'}
          description={
            <Text typo="Text_14" color="gray_500">
              고스락 제 23회 정기공연
              <span css={{ color: `${theme.palette.main_500}` }}>
                {' '}
                일반티켓 총 3매
              </span>
            </Text>
          }
        />
        <Divider />
        <OptionForm toggle={toggle} setToggle={() => setToggle(!toggle)} />
        <ButtonSet bottomFixed>
          <Button
            onClick={() => {
              addCartMutation.mutate(mockCartLine);
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
      quantity: 2,
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
