import { Counter, FlexBox, ListHeader, Tag } from '@dudoong/ui';

export const PurchaseLimit = () => {
  return (
    <FlexBox align="center" justify="space-between" style={{ width: '100%' }}>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title="1인당 구매 가능 매수 제한"
        description="한명이 구매 가능한 티켓 매수를 제한합니다."
      />
      <Counter
        count={0}
        onClickMinus={() => console.log('')}
        onClickPlus={() => console.log('')}
      />
    </FlexBox>
  );
};
