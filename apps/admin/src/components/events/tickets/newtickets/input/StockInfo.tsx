import { FlexBox, ListHeader, Text, ToggleButton } from '@dudoong/ui';
import { Control, Controller, FieldValues } from 'react-hook-form';

export const StockInfo = ({
  control,
}: {
  control: Control<FieldValues, any>;
}) => {
  return (
    <FlexBox align="center" justify="space-between" style={{ width: '100%' }}>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title="재고 정보 공개"
        description={
          <Text typo="P_Text_16_M" color="gray_400">
            티켓이 남은 재고 수를 공개합니다.
          </Text>
        }
      />
      <Controller
        rules={{ required: true }}
        control={control}
        name="isQuantityPublic"
        defaultValue={true}
        render={({ field: { onChange, value } }) => (
          <ToggleButton toggle={true} onToggleClick={() => onChange(!value)} />
        )}
      />
    </FlexBox>
  );
};
