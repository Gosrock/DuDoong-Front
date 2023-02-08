import { isEqualObject } from '@dudoong/utils';
import { CartApi } from '@lib/apis/cart/CartApi';
import { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface ItemOptionsType {
  itemIdx: number;
  optionGroups: OptionGroupSelect[];
}

interface OptionGroupSelect {
  optionGroupId: number;
  answer: AddCartOptionAnswer;
}

const useOptionForm = (
  optionGroups: OptionGroupResponse[],
  itemId: number,
  quantity: number,
  eventId: string,
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

  const router = useRouter();
  const [totalForm, setTotalForm] = useState<ItemOptionsType[]>(initForm);
  const [complete, setComplete] = useState<boolean>(false);

  const { mutate, status } = useMutation(CartApi.ADD_CARTLINE, {
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

  const onSubmitForm = () => {
    mutate({ items: getAddCartRequest() });
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

  const isloading = status !== 'idle';

  return { complete, isloading, onChangeForm, onSubmitForm };
};

export default useOptionForm;
