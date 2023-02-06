import useOptionForm from '@components/book/utils/useOptionForm';
import { SelectedTicketState } from '@components/events/blocks/Tickets';
import {
  Accordion,
  Button,
  ButtonSet,
  Divider,
  ListRow,
  ToggleButton,
} from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ItemOptions from './ItemOptions';

interface TotalOptionsProps {
  toggle: boolean;
  selectedTicketState: SelectedTicketState;
  setToggle: () => void;
  optionGroups: OptionGroupResponse[];
}

const TotalOptions = ({
  selectedTicketState,
  toggle,
  setToggle,
  optionGroups,
}: TotalOptionsProps) => {
  const router = useRouter();
  const { eventId, ticketName, itemId, quantity } = selectedTicketState;
  const { complete, onChangeForm, getAddCartRequest } = useOptionForm(
    optionGroups,
    itemId,
    quantity,
    toggle,
  );

  const { mutate } = useMutation(CartApi.ADD_CARTLINE, {
    onSuccess: (data) => {
      router.push(
        {
          pathname: `/events/${eventId}/book/order`,
          query: { state: JSON.stringify(data) },
        },
        `/events/${eventId}/book/order`,
      );
    },
  });

  const contentHeight = optionGroups.reduce((acc, cur) => {
    return (acc += cur.type === '주관식' ? 240 : 168);
  }, 0);

  return (
    <>
      {quantity > 1 && (
        <>
          <ListRow
            text={'모든 티켓에 옵션 한번에 적용하기'}
            subText={'또는, 티켓마다 개별 옵션 선택하기'}
            rightElement={
              <ToggleButton toggle={toggle} onToggleClick={setToggle} />
            }
          />
          <Divider />
        </>
      )}
      {!toggle && quantity > 0 ? (
        <>
          {[...Array(quantity)].map((_, idx) => (
            <Accordion
              key={idx}
              content={
                <ItemOptions
                  itemIdx={idx}
                  optionGroups={optionGroups}
                  onChangeForm={onChangeForm}
                />
              }
              title={`${ticketName} (${idx + 1}/${quantity})`}
              initialState={idx === 0 ? true : false}
              contentHeight={contentHeight}
            />
          ))}
        </>
      ) : (
        <>
          <ItemOptions
            itemIdx={0}
            optionGroups={optionGroups}
            onChangeForm={onChangeForm}
          />
        </>
      )}

      {/* 선택 완료 버튼 */}
      <ButtonSet bottomFixed backGradient>
        <Button
          fullWidth
          onClick={() => {
            mutate({ items: getAddCartRequest() });
          }}
          disabled={!complete}
        >
          선택 완료
        </Button>
      </ButtonSet>
    </>
  );
};

export default TotalOptions;
