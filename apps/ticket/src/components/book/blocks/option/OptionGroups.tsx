import { ListHeader, Spacing, Tag, Text } from '@dudoong/ui';
import { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import { ReactNode, useState } from 'react';
import Subjective from './Subjective';
import YnAnswer from './YnAnswer';

interface OptionGroupsProps {
  optionGroups: OptionGroupResponse[];
}

const OptionGroups = ({ optionGroups }: OptionGroupsProps) => {
  const initOptions = optionGroups.map((v) => {
    return { optionId: v.optionGroupId, answer: '' };
  });

  const [optionGroupsForm, setOptionGroupsForm] =
    useState<AddCartOptionAnswer[]>(initOptions);

  const isCompleted =
    optionGroupsForm.filter((v) => v.answer === '').length === 0;

  return (
    <>
      {optionGroups.map((optionGroup, idx) => (
        <OptionGroup
          key={optionGroup.optionGroupId}
          idx={idx}
          data={optionGroup}
        />
      ))}
      <Spacing size={40} />
    </>
  );
};

export default OptionGroups;

// --------------------------------------

interface OptionGroupProps {
  idx: number;
  data: OptionGroupResponse;
}

const OptionGroup = ({ idx, data }: OptionGroupProps) => {
  const [answer, setAnswer] = useState<string>('');

  const renderAdditionalPrice = (): ReactNode => {
    const additionalPrice = data.options.find(
      (v) => v.answer === answer,
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
        title={`${idx + 1}. ${data.name}`}
        description={
          <Text typo="P_Text_14_R" color="gray_400">
            {data.description}
          </Text>
        }
        rightElement={renderAdditionalPrice()}
      />
      {data.type === 'Y/N' ? (
        <YnAnswer answer={answer} setAnswer={setAnswer} />
      ) : (
        <Subjective answer={answer} setAnswer={setAnswer} />
      )}
    </>
  );
};
