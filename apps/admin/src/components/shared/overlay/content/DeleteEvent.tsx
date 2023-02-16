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

interface DeleteEventProps {
  closeOverlay: () => void;
  eventDeleteHandler: () => void;
}

const DeleteEvent = ({
  closeOverlay,
  eventDeleteHandler,
}: DeleteEventProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={'공연을 삭제하시겠어요?'}
        padding={0}
      />
      <Divider line={true} height={24} />
      <Text typo="P_Text_16_R" color="gray_500">
        공연을 삭제한 이후에는 되돌릴 수 없습니다. <br />
        <span
          css={css`
            color: ${theme.palette.red_300};
          `}
        >
          정말 공연을 삭제하시겠습니까?
        </span>
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
          onClick={eventDeleteHandler}
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

export default DeleteEvent;

const Wrapper = styled.div`
  padding: 15px 35px;
  width: 492px;
  box-sizing: border-box;
`;
