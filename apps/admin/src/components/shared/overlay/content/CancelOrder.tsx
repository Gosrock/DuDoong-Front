import {
  Button,
  Divider,
  FlexBox,
  ListHeader,
  Spacing,
  Text,
  theme,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface CancelOrderProps {
  closeOverlay: () => void;
  cancelOrderHandler: () => void;
}

const CancelOrder = ({
  closeOverlay,
  cancelOrderHandler,
}: CancelOrderProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'주문을 취소하시겠어요?'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        주문을 취소한 이후에는 되돌릴 수 없어요
      </Text>
      <Spacing size={36} />
      <FlexBox align={'center'} justify={'end'} gap={10}>
        <Button
          varient="tertiary"
          onClick={closeOverlay}
          css={css`
            width: 108px;
            height: 54px;
          `}
        >
          돌아가기
        </Button>
        <Button
          varient="warn"
          onClick={cancelOrderHandler}
          css={css`
            width: 194px;
            height: 54px;
          `}
        >
          주문 취소
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default CancelOrder;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
