import { Spacing } from '@dudoong/ui';
import type { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import OptionGroup from './OptionGroup';

interface ItemOptionsProps {
  itemIdx: number;
  optionGroups: OptionGroupResponse[];
  onChangeForm: (
    itemIdx: number,
    optionGroupId: number,
    answer: AddCartOptionAnswer,
  ) => void;
}

const ItemOptions = ({
  itemIdx,
  optionGroups,
  onChangeForm,
}: ItemOptionsProps) => {
  return (
    <>
      {optionGroups.map((optionGroup, optionIdx) => (
        <OptionGroup
          onChangeForm={onChangeForm}
          key={optionGroup.optionGroupId}
          itemIdx={itemIdx}
          optionIdx={optionIdx}
          data={optionGroup}
        />
      ))}
      <Spacing size={40} />
    </>
  );
};

export default ItemOptions;
