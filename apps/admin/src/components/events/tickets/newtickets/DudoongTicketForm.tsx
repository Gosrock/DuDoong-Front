import TicketInput from '@components/events/tickets/newtickets/TicketInput';
import { Counter, FlexBox, ListHeader, Spacing, Tag } from '@dudoong/ui';
import TicketToggle from './TicketToggle';

const DudoongTicketForm = () => {
  return (
    <FlexBox direction="column" align="flex-start" justify="flex-start">
      <TicketInput
        title="계좌번호 입력"
        description="은행과 계좌번호를 적어주세요 (ex. 우리 123456789)"
        placeholder="최대 N글자까지 쓸 수 있어요"
      />
      <Spacing size={32} />
      <FlexBox align="flex-start" gap={18}>
        <TicketInput
          title="티켓 가격"
          description="송금 받을 티켓 가격을 써주세요"
          descriptionTypo="P_Text_14_M"
          placeholder="0"
        />
        <TicketInput
          title="발행매수"
          description="최대 1000장까지 발행 가능해요"
          descriptionTypo="P_Text_14_M"
          placeholder="0"
        />
      </FlexBox>
      <Spacing size={72} />
      <TicketToggle
        title={
          <FlexBox align="center" justify="space-between" gap={16}>
            <div>관리자 승인 여부</div>
            <Tag text="관리자 승인이란?" color="red" size="md" />
          </FlexBox>
        }
        description="관리자가 승인해야 티켓이 발급돼요."
      />
      <Spacing size={44} />
      <TicketToggle
        title="재고 정보 공개"
        description="티켓이 남은 재고 수를 공개합니다."
      />
      <Spacing size={44} />
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
    </FlexBox>
  );
};

export default DudoongTicketForm;
