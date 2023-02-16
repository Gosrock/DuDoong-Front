import Main from '@components/shared/Layout/Main';
import {
  Button,
  ButtonSet,
  Divider,
  FullScreen,
  NavBar,
  Spacing,
  Spinner,
  SyncLoader,
} from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookHeader from './blocks/order/BookHeader';
import TotalOptions from './blocks/option/TotalOptions';
import type { SelectedTicketState } from '@components/events/blocks/SelectTicket';
import type { GetServerSideProps } from 'next';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';
import { TicketApi } from '@lib/apis/ticket/TicketApi';
import useOptionForm from './utils/useOptionForm';

interface OptionProps {
  selectedTicketState: SelectedTicketState;
  optionGroups: OptionGroupResponse[];
}

const Option = ({ selectedTicketState, optionGroups }: OptionProps) => {
  const router = useRouter();
  const { eventId, ticketName, itemId, quantity, eventName } =
    selectedTicketState;
  const [toggle, setToggle] = useState<boolean>(false);

  const { complete, onChangeForm, isloading, onSubmitForm } = useOptionForm(
    optionGroups,
    itemId,
    quantity,
    eventId,
    toggle,
  );

  const skipSelectOptions = optionGroups.length === 0;

  useEffect(() => {
    skipSelectOptions && onSubmitForm();
  }, []);

  if (skipSelectOptions) {
    return (
      <FullScreen verticalCenter>
        <SyncLoader />
      </FullScreen>
    );
  } else
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
            onChangeForm={onChangeForm}
          />
          <Spacing size={120} />

          {/* 선택 완료 버튼 */}
          <ButtonSet bottomFixed backGradient>
            <Button
              fullWidth
              onClick={onSubmitForm}
              disabled={!complete}
              isLoading={isloading}
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
  } catch (e: any) {
    const { status } = e.response.data;

    //토큰 만료일때 -> 재로그인 페이지로
    if (status === 401 || status === 403) {
      return {
        redirect: {
          destination: `/login/expired?redirect=/events/${
            context.params!.eventId
          }`,
          permanent: false,
        },
      };
    }
    return {
      // 새로고침 등으로 query 데이터가 없을땐 이벤트 상세로 리다이렉트
      redirect: {
        destination: `/events/${context.params!.eventId}`,
        permanent: false,
      },
    };
  }
};
