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

interface SaveOptionProps {
  closeOverlay: () => void;
  saveOptionHandler: () => void;
}

const SaveOption = ({ saveOptionHandler }: SaveOptionProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'저장이 완료되었어요!'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        새 옵션이 저장되었어요.
        <br />
        저장된 옵션은 옵션 적용 페이지에서 확인할 수 있어요!
      </Text>
      <Spacing size={36} />
      <FlexBox align={'center'} justify={'end'} gap={10}>
        <Button
          varient="tertiary"
          onClick={saveOptionHandler}
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

export default SaveOption;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
