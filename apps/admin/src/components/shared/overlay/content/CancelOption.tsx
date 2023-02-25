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

interface CancelOptionProps {
  closeOverlay: () => void;
  cancelOptionHandler: () => void;
}

const CancelOption = ({
  closeOverlay,
  cancelOptionHandler,
}: CancelOptionProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'티켓에 부착된 옵션을 해제하시겠어요?'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        티켓이 판매되기 이전에는 다시 적용할 수 있어요. <br />
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
          취소
        </Button>
        <Button
          varient="warn"
          onClick={cancelOptionHandler}
          css={css`
            width: 194px;
            height: 54px;
          `}
        >
          삭제하기
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default CancelOption;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
