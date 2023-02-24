import { Button, ButtonVarient, FlexBox, Padding } from '@dudoong/ui';
import styled from '@emotion/styled';
import { bottomButtonState } from '@store/bottomButton';
import { useRecoilValue } from 'recoil';
import { keyframes } from '@emotion/react';

export type AdminBottomButtonTypeKey =
  | 'save'
  | 'pay'
  | 'deleteEvent'
  | 'postEvent'
  | 'deletePostEvent';

export type AdminBottomButtonType = {
  [key in AdminBottomButtonTypeKey]: {
    buttons: string[];
    varient: 'primary' | 'warn';
    text: string;
  };
};

const adminBottomButtonContent = {
  save: { buttons: ['save'], varient: 'primary', text: '저장하기' },
  pay: { buttons: ['pay'], varient: 'primary', text: '정산하기' },
  deleteEvent: {
    buttons: ['deleteEvent'],
    varient: 'warn',
    text: '공연 삭제하기',
  },
  postEvent: {
    buttons: ['postEvent'],
    varient: 'primary',
    text: '공연 등록하기',
  },
  deletePostEvent: {
    buttons: ['deleteEvent', 'postEvent'],
    varient: 'primary',
    text: '',
  },
};

const AdminBottomButton = () => {
  const {
    type,
    firstButtonClickHandler,
    firstButtonDisable,
    secondButtonClickHandler,
    secondButtonDisable,
    isActive,
  } = useRecoilValue(bottomButtonState);

  const buttonTypes = adminBottomButtonContent[type].buttons;
  const buttons = (
    <>
      <ButtonWrapper>
        <Button
          varient={getVarient(buttonTypes, 0)}
          onClick={firstButtonClickHandler}
          disabled={firstButtonDisable}
        >
          {getText(buttonTypes, 0)}
        </Button>
      </ButtonWrapper>
      {buttonTypes.length === 2 && (
        <ButtonWrapper>
          <Button
            varient={getVarient(buttonTypes, 1)}
            onClick={secondButtonClickHandler}
            disabled={secondButtonDisable}
          >
            {getText(buttonTypes, 1)}
          </Button>
        </ButtonWrapper>
      )}
    </>
  );

  if (!isActive) {
    return null;
  } else {
    return (
      <Wrapper size={[16, 24]}>
        <div>
          <FlexBox align={'center'} justify={'flex-end'} gap={12}>
            {buttons}
          </FlexBox>
        </div>
      </Wrapper>
    );
  }
};

export default AdminBottomButton;

// -------------------------------------------------------

const getVarient = (buttonTypes: string[], index: 0 | 1): ButtonVarient => {
  return adminBottomButtonContent[
    buttonTypes[index] as AdminBottomButtonTypeKey
  ].varient as ButtonVarient;
};

const getText = (buttonTypes: string[], index: 0 | 1): string => {
  return adminBottomButtonContent[
    buttonTypes[index] as AdminBottomButtonTypeKey
  ].text;
};

// -------------------------------------------------------

const buttonMov = keyframes`
  0% {
    transform: translateY(96px);
  }
  100% {
      transform: translateY(0px);
  }
`;

const Wrapper = styled(Padding)`
  position: fixed;
  bottom: 0px;
  left: 252px;
  width: calc(100vw - 252px);
  height: 88px;
  border-top: 1px solid ${({ theme }) => theme.palette.gray_200};
  background-color: ${({ theme }) => theme.palette.gray_100};
  animation: ${buttonMov} 0.4s ease-out;
  & > div {
    max-width: 876px;
    margin: 0 auto;
  }
`;

const ButtonWrapper = styled.div`
  width: 194px;
  height: 56px;
`;
