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
import Doongdoong from '@assets/doongdoong.svg';
import { useRouter } from 'next/router';

const Fail = () => {
  const router = useRouter();
  const { message, code } = router.query;
  return (
    <Main>
      <FullScreen verticalCenter>
        <FlexBox align={'center'} direction={'column'}>
          <Doongdoong />
          <Padding size={24}>
            <Text typo="P_Text_16_M">
              {message} [Error : {code}]
            </Text>
          </Padding>
          <ButtonSet varient="mono">
            <Button varient="tertiary" onClick={() => router.replace('/')}>
              홈으로
            </Button>
          </ButtonSet>
          <Spacing size={40} />
        </FlexBox>
      </FullScreen>
    </Main>
  );
};

export default Fail;
