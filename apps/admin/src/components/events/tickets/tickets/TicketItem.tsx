import { FlexBox, ListRow, Tag, TagButton } from '@dudoong/ui';
import styled from '@emotion/styled';

export interface TicketItemProps {
  text: string;
  subText: string;
  stock: number;
  quantity: number;
  isSold: boolean;
}

const TicketItem = ({
  text,
  subText,
  stock,
  quantity,
  isSold,
}: TicketItemProps) => {
  return (
    <FlexBox align="center" justify="space-between">
      <ListRow
        text={text}
        textColor={['main_500', 'gray_400']}
        subText={subText}
      />
      <FlexBox align="center" justify="space-between" gap={20}>
        <Tag text={`재고 ${stock}/${quantity}`} color="main" size="lg" />
        <TagButton text="삭제" color="warn" size="lg" disabled={isSold} />
      </FlexBox>
    </FlexBox>
  );
};
export default TicketItem;
