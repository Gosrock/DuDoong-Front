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

interface SaveTicketProps {
  closeOverlay: () => void;
  saveTicketHandler: () => void;
}

const SaveTicket = ({ closeOverlay, saveTicketHandler }: SaveTicketProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'저장이 완료되었어요!'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        새 티켓이 저장되었어요.
        <br />
        저장된 티켓은 티켓 관리 페이지에서 확인할 수 있어요!
      </Text>
      <Spacing size={36} />
      <FlexBox align={'center'} justify={'end'} gap={10}>
        <Button
          varient="tertiary"
          onClick={saveTicketHandler}
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

export default SaveTicket;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
