import { Accordion, Divider, ListRow, ToggleButton } from '@dudoong/ui';
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

  const initForm = [...Array(quantity)].map(() => initOptions);

  const [totalForm, setTotalForm] = useState<OptionGroupSelect[][]>(initForm);
  const [complete, setComplete] = useState<boolean>(false);

  const onChangeForm = (
    itemIdx: number,
    optionGroupId: number,
    answer: AddCartOptionAnswer,
  ) => {
    // eslint-disable-next-line prefer-const
    let temp = [...totalForm];
    const optionGroupIdx = totalForm[itemIdx].findIndex(
      (v) => optionGroupId === v.optionGroupId,
    );

    temp[itemIdx][optionGroupIdx].answer = answer;
    setTotalForm(temp);
  };

  useEffect(() => {
    console.log(
      totalForm,
      /* totalForm.filter((item) => {
        const blank = item.filter(
          (optionGroup) => optionGroup.answer.answer == '',
        ).length;
        return blank !== 0 ? false : true;
      }), */
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
    </>
  );
};

export default TotalOptions;
