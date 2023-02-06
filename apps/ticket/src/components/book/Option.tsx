import Main from '@components/shared/Layout/Main';
import { Divider, NavBar, Spacing } from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import DDHead from '@components/shared/Layout/NextHead';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BookHeader from './blocks/order/BookHeader';
import TotalOptions from './blocks/option/TotalOptions';
import type { SelectedTicketState } from '@components/events/blocks/Tickets';
import type { GetServerSideProps } from 'next';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import { TicketApi } from '@lib/apis/ticket/TicketApi';

interface OptionProps {
  selectedTicketState: SelectedTicketState;
  optionGroups: OptionGroupResponse[];
}

const Option = ({ selectedTicketState, optionGroups }: OptionProps) => {
  const router = useRouter();
  const { eventName, ticketName, quantity } = selectedTicketState;
  const [toggle, setToggle] = useState<boolean>(false);

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
        <TotalOptions
          selectedTicketState={selectedTicketState}
          toggle={toggle}
          setToggle={() => setToggle(!toggle)}
          optionGroups={optionGroups}
        />
        <Spacing size={120} />
      </Main>
    </>
  );
};

export default Option;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { selectedTicketState } = context.query;
  try {
    const parsedState: SelectedTicketState = JSON.parse(
      selectedTicketState as string,
    );
    setSsrAxiosHeader(context.req.cookies);
    const options = await TicketApi.GET_TICKETITEM_OPTIONS(
      parsedState.eventId,
      parsedState.itemId,
    );
    return {
      props: {
        selectedTicketState: parsedState,
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
