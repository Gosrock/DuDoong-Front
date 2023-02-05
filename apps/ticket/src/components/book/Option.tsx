import Main from '@components/shared/Layout/Main';
import { Button, ButtonSet, Divider, NavBar, Spacing } from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import DDHead from '@components/shared/Layout/NextHead';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BookHeader from './blocks/order/BookHeader';
import OptionForm from './blocks/option/OptionForm';
import type { AddCartRequest } from '@lib/apis/cart/cartType';
import type { TicketSelectState } from '@components/events/blocks/Tickets';
import type { GetServerSideProps } from 'next';
import type {
  GetTicketItemOptionsResponse,
  OptionGroupResponse,
} from '@lib/apis/ticket/ticketType';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import { TicketApi } from '@lib/apis/ticket/TicketApi';

interface OptionProps {
  selectTicketState: TicketSelectState;
  optionGroups: OptionGroupResponse[];
}

const Option = ({ selectTicketState, optionGroups }: OptionProps) => {
  const router = useRouter();
  const { eventName, ticketName, itemId, quantity } = selectTicketState;
  const [toggle, setToggle] = useState<boolean>(false);

  const { mutate } = useMutation(CartApi.ADD_CARTLINE, {
    onSuccess: (data) => {
      router.push(
        {
          pathname: `${router.asPath}/book/order`,
          query: { state: JSON.stringify(data) },
        },
        `${router.asPath}/book/order`,
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
          description={[eventName, ticketName, quantity]}
        />
        <Divider />

        {/* 옵션 선택하기 폼 */}
        <OptionForm
          ticketName={ticketName}
          quantity={quantity}
          toggle={toggle}
          setToggle={() => setToggle(!toggle)}
          optionGroups={optionGroups}
        />
        <Spacing size={120} />

        {/* 선택 완료 버튼 */}
        <ButtonSet bottomFixed>
          <Button
            fullWidth
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { selectTicketState } = context.query;
  const eventId = context.params!.eventId as string;
  try {
    const parsedState: TicketSelectState = JSON.parse(
      selectTicketState as string,
    );
    setSsrAxiosHeader(context.req.cookies);
    const options = await TicketApi.GET_TICKETITEM_OPTIONS(
      eventId,
      parsedState.itemId,
    );
    return {
      props: {
        selectTicketState: parsedState,
        optionGroups: options.optionGroups,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      // 새로고침 등으로 query 데이터가 없을땐 이벤트 상세로 리다이렉트
      redirect: {
        destination: `/events/${context.params!.eventId}`,
        permanent: false,
      },
    };
  }
};

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
