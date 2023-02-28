import Main from '@components/shared/Layout/Main';
import {
  Button,
  ButtonSet,
  FlexBox,
  FullScreen,
  Padding,
  Spacing,
  Text,
} from '@dudoong/ui';
import { useRouter } from 'next/router';
import Keyboard from '@assets/keyboard.svg';
import { css } from '@emotion/react';

const Success = () => {
  const router = useRouter();
  const orderUuid = router.query.order;

  return (
    <Main>
      <FullScreen verticalCenter>
        <FlexBox align={'center'} direction={'column'} fullWidth>
          <Keyboard />
          <Padding size={24}>
            <Text typo="P_Text_16_M">예매가 완료되었습니다!</Text>
          </Padding>
          <ButtonSet
            varient="horizontal"
            css={css`
              width: 100%;
            `}
          >
            <Button
              fullWidth
              varient="tertiary"
              onClick={() => router.push('/')}
            >
              홈으로
            </Button>
            <Button
              fullWidth
              varient="secondary"
              onClick={() => router.push(`/ticket/${orderUuid}`)}
            >
              모바일 티켓
            </Button>
          </ButtonSet>
          <Spacing size={40} />
        </FlexBox>
      </FullScreen>
    </Main>
  );
};

export default Success;
