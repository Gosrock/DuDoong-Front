import { isEqualObject } from '@dudoong/utils';
import { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { useEffect, useState } from 'react';

interface OptionGroupSelect {
  optionGroupId: number;
  answer: AddCartOptionAnswer;
}

interface ItemOptionsType {
  itemIdx: number;
  optionGroups: OptionGroupSelect[];
}

const useOptionForm = (
  optionGroups: OptionGroupResponse[],
  itemId: number,
  quantity: number,
  toggle: boolean,
) => {
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
    if (toggle) {
      const temp = totalForm.map((item) => {
        return {
          ...item,
          optionGroups: item.optionGroups.map((optionGroup) =>
            optionGroup.optionGroupId === optionGroupId
              ? { ...optionGroup, answer }
              : { ...optionGroup },
          ),
        };
      });
      setTotalForm(temp);
    } else {
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
    }
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

  const getAddCartRequest = () => {
    // 각 티켓 옵션들 개별 객체로 (quantity 0으로 초기화)
    const initAddCartLine = totalForm.map((item) => {
      return {
        itemId: itemId,
        quantity: 0,
        options: item.optionGroups.map((optionGroup) => {
          return {
            optionId: optionGroup.answer.optionId,
            answer: optionGroup.answer.answer,
          };
        }),
      };
    });

    // 중복 제거하고 quantity 증가 로직
    const result = initAddCartLine.reduce(
      (acc, cur) => {
        const matchIndex = acc.findIndex((cartLine) =>
          isEqualObject(cartLine.options, cur.options),
        );
        if (matchIndex == -1) {
          acc = [...acc, { ...cur, quantity: 1 }];
        } else {
          const temp = [...acc];
          temp[matchIndex] = {
            ...temp[matchIndex],
            quantity: temp[matchIndex].quantity + 1,
          };
          acc = temp;
        }
        return acc;
      },
      [initAddCartLine[0]],
    );

    return result;
  };

  return { complete, onChangeForm, getAddCartRequest };
};

export default useOptionForm;
