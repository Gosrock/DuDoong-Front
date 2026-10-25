import {
  Button,
  Divider,
  FlexBox,
  ListHeader,
  Spacing,
  Text,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface RefuseOrderProps {
  closeOverlay: () => void;
  refuseOrderHandler: () => void;
  isDudoongTicket?: boolean;
}

const RefuseOrder = ({
  closeOverlay,
  refuseOrderHandler,
  isDudoongTicket = false,
}: RefuseOrderProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'주문을 거절하시겠어요?'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        주문을 거절한 이후에는 되돌릴 수 없어요
      </Text>
      {isDudoongTicket && (
        <>
          <Spacing size={12} />
          <Text typo="P_Text_16_R" color="red_300">
            이미 입금을 받았다면 구매자에게 직접 환불해야 해요
          </Text>
        </>
      )}
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
          onClick={refuseOrderHandler}
          css={css`
            width: 194px;
            height: 54px;
          `}
        >
          주문 거절
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default RefuseOrder;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
