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

interface SavedProps {
  closeOverlay: () => void;
}

const Saved = ({ closeOverlay }: SavedProps) => {
  return (
    <Wrapper>
      <ListHeader size="listHeader_20" title={'저장 완료'} padding={0} />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        요청하신 수정사항이 적용되었어요.
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

export default Saved;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
