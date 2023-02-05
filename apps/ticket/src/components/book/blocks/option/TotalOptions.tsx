import {
  Accordion,
  Button,
  ButtonSet,
  Divider,
  ListRow,
  ToggleButton,
} from '@dudoong/ui';
import type { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { useEffect, useState } from 'react';
import ItemOptions from './ItemOptions';

interface TotalOptionsProps {
  toggle: boolean;
  quantity: number;
  ticketName: string;
  setToggle: () => void;
  optionGroups: OptionGroupResponse[];
}

interface OptionGroupSelect {
  optionGroupId: number;
  answer: AddCartOptionAnswer;
}
interface ItemOptionsType {
  itemIdx: number;
  optionGroups: OptionGroupSelect[];
}

const TotalOptions = ({
  toggle,
  quantity,
  ticketName,
  setToggle,
  optionGroups,
}: TotalOptionsProps) => {
  const initOptions = optionGroups.map((v) => {
    return {
      optionGroupId: v.optionGroupId,
      answer: { optionId: 0, answer: '' },
    };
  });

  const initForm = [...Array(quantity)].map((_, idx) => {
    return { itemIdx: idx, optionGroups: initOptions };
  });

  const [totalForm, setTotalForm] = useState<ItemOptionsType[]>(initForm);
  const [complete, setComplete] = useState<boolean>(false);

  const onChangeForm = (
    itemIdx: number,
    optionGroupId: number,
    answer: AddCartOptionAnswer,
  ) => {
    // https://dev.to/shareef/how-to-work-with-arrays-in-reactjs-usestate-4cmi
    const temp = totalForm.map((item) =>
      item.itemIdx === itemIdx
        ? {
            ...item,
            optionGroups: item.optionGroups.map((optionGroup) =>
              optionGroup.optionGroupId === optionGroupId
                ? { ...optionGroup, answer }
                : { ...optionGroup },
            ),
          }
        : { ...item },
    );
    setTotalForm(temp);
  };

  useEffect(() => {
    setComplete(
      totalForm.filter(
        (item) =>
          item.optionGroups.filter((optionGroup) =>
            optionGroup.answer.answer === '' ? true : false,
          ).length !== 0,
      ).length === 0
        ? true
        : false,
    );
  }, [totalForm]);

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
      <ButtonSet bottomFixed>
        <Button fullWidth onClick={() => {}} disabled={!complete}>
          선택 완료
        </Button>
      </ButtonSet>
    </>
  );
};

export default TotalOptions;
