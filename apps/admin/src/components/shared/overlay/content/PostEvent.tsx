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

interface PostEventProps {
  closeOverlay: () => void;
  eventOpenHandler: () => void;
}

const PostEvent = ({ closeOverlay, eventOpenHandler }: PostEventProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'공연을 등록하시겠어요?'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        공연을 등록한 이후에는 두둥의 공연 리스트에 노출되며
        <br />
        1장 이상의 티켓이 판매된 이후엔 삭제가 불가능합니다.
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
          varient="primary"
          onClick={eventOpenHandler}
          css={css`
            width: 194px;
            height: 54px;
          `}
        >
          등록하기
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default PostEvent;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
`;
