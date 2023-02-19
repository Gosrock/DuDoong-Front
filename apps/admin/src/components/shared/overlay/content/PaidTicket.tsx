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

interface PaidTicketProps {
  closeOverlay: () => void;
  paidTicketHandler: () => void;
}

const PaidTicket = ({ closeOverlay, paidTicketHandler }: PaidTicketProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'유료티켓은 어떻게 이용하나요?'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        유료티켓은 두둥 제휴 호스트만 설정할 수 있어요.
        <br />
        두둥의 결제 서비스를 통해 쉽고 빠른 결제 및 정산이 가능해요!
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
          닫기
        </Button>
        <Button
          varient="primary"
          onClick={paidTicketHandler}
          css={css`
            width: 194px;
            height: 54px;
          `}
        >
          제휴하러 가기
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default PaidTicket;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
