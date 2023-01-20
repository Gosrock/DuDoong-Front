import TextListRow from '@components/shared/TextListRow';
import { ListRow, Text } from '@dudoong/ui';

interface TotalPriceProps {
  price: string;
  coupon?: any; //쿠폰 api 생기면 {쿠폰이름, 할인가격}
}

const Totalprice = ({ price, coupon }: TotalPriceProps) => {
  return (
    <>
      <TextListRow left="금액" right={price} />
      <TextListRow left="할인" right={'0원'} />
      <TextListRow left="할인쿠폰" right={'사용하지 않음'} />
      <ListRow
        text={'총 결제금액'}
        rightElement={
          <Text typo="Text_16_SB" color="red_300">
            {price}
          </Text>
        }
      />
    </>
  );
};

export default Totalprice;
