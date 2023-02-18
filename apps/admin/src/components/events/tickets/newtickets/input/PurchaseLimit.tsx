import { Counter, FlexBox, ListHeader } from '@dudoong/ui';
import { Control, Controller, FieldValues } from 'react-hook-form';

export const PurchaseLimit = ({
  control,
}: {
  control: Control<FieldValues, any>;
}) => {
  return (
    <FlexBox align="center" justify="space-between" style={{ width: '100%' }}>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title="1인당 구매 가능 매수 제한"
        description="한명이 구매 가능한 티켓 매수를 제한합니다."
      />
      <Controller
        rules={{ required: true }}
        control={control}
        name="purchaseLimit"
        defaultValue={1}
        render={({ field: { onChange, value } }) => (
          <Counter
            count={1}
            onClickMinus={() => onChange(value - 1)}
            onClickPlus={() => onChange(value + 1)}
          />
        )}
      />
    </FlexBox>
  );
};
