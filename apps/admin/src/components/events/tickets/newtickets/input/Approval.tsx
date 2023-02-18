import { FlexBox, ListHeader, Tag, Text, ToggleButton } from '@dudoong/ui';
import { Control, Controller, FieldValues } from 'react-hook-form';

export const Approval = ({
  control,
  disabled,
}: {
  control: Control<FieldValues, any>;
  disabled: boolean;
}) => {
  return (
    <FlexBox align="center" justify="space-between" style={{ width: '100%' }}>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title={
          <FlexBox align="center" justify="space-between" gap={16}>
            <div>관리자 승인 여부</div>
            <Tag text="관리자 승인이란?" color="red" size="md" />
          </FlexBox>
        }
        description={
          <Text typo="P_Text_16_M" color="gray_400">
            관리자가 승인해야 티켓이 발급돼요.
          </Text>
        }
      />
      <Controller
        rules={{ required: true }}
        control={control}
        name="approveType"
        defaultValue={true}
        render={({ field: { onChange, value } }) => (
          <ToggleButton
            toggle={true}
            onToggleClick={() => onChange(!value)}
            disabled={disabled}
          />
        )}
      />
    </FlexBox>
  );
};
