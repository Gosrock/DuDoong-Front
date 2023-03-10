import { SelectedTicketState } from '@components/events/blocks/SelectTicket';
import { Accordion, Divider, ListRow, ToggleButton } from '@dudoong/ui';
import type { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import ItemOptions from './ItemOptions';

interface TotalOptionsProps {
  toggle: boolean;
  selectedTicketState: SelectedTicketState;
  setToggle: () => void;
  onChangeForm: (
    itemIdx: number,
    optionGroupId: number,
    answer: AddCartOptionAnswer,
  ) => void;
  optionGroups: OptionGroupResponse[];
}

const TotalOptions = ({
  selectedTicketState,
  toggle,
  setToggle,
  onChangeForm,
  optionGroups,
}: TotalOptionsProps) => {
  const { ticketName, quantity } = selectedTicketState;
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
              initialState={true}
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
    </>
  );
};

export default TotalOptions;
