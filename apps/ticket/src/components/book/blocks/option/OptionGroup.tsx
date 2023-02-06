import { ListHeader, Tag, Text } from '@dudoong/ui';
import type { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { ReactNode, useEffect, useState } from 'react';
import Subjective from './Subjective';
import YnAnswer from './YnAnswer';

interface OptionGroupProps {
  itemIdx: number;
  optionIdx: number;
  data: OptionGroupResponse;
  onChangeForm: (
    itemIdx: number,
    optionGroupId: number,
    answer: AddCartOptionAnswer,
  ) => void;
}

const OptionGroup = ({
  itemIdx,
  optionIdx,
  data,
  onChangeForm,
}: OptionGroupProps) => {
  const [answer, setAnswer] = useState<AddCartOptionAnswer>({
    optionId: 0,
    answer: '',
  });

  useEffect(() => {
    if (answer) {
      onChangeForm(itemIdx, data.optionGroupId, answer);
    }
  }, [answer]);

  const renderAdditionalPrice = (): ReactNode => {
    const additionalPrice = data.options.find(
      (v) => v.answer === answer?.answer,
    )?.additionalPrice;
    if (additionalPrice && additionalPrice !== '0원') {
      return <Tag size="md" color="main" text={`+ ${additionalPrice}`} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <ListHeader
        size="listHeader_18"
        title={`${optionIdx + 1}. ${data.name}`}
        description={
          <Text typo="P_Text_14_R" color="gray_400">
            {data.description}
          </Text>
        }
        rightElement={renderAdditionalPrice()}
      />
      {data.type === 'Y/N' ? (
        <YnAnswer
          options={data.options}
          answer={answer}
          setAnswer={setAnswer}
        />
      ) : (
        <Subjective
          options={data.options}
          answer={answer}
          setAnswer={setAnswer}
        />
      )}
    </>
  );
};

export default OptionGroup;
