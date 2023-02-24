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

interface ApproveProps {
  closeOverlay: () => void;
}

const Approve = ({ closeOverlay }: ApproveProps) => {
  return (
    <Wrapper>
      <ListHeader size="listHeader_20" title={'관리자 승인이란?'} padding={0} />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        관객이 주문 후 관리자의 승인이 있어야 티켓 발급이 이루어져요.
        <br />
        관리자 승인은 예매자 관리 페이지에서 가능해요!
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
          알겠어요!
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default Approve;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
