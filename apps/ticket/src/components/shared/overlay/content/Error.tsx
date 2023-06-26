import {
  Button,
  ButtonSet,
  ListHeader,
  Padding,
  Spacing,
  Text,
} from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useRouter } from 'next/router';

const Error = ({ text }: { text: string }) => {
  const { closeGlobalOverlay } = useGlobalOverlay();
  const router = useRouter();
  return (
    <>
      <ListHeader size="listHeader_20" title={'오류가 발생했어요'} />
      <Padding>
        <Text typo="P_Text_16_M" color="gray_500">
          {text}
        </Text>
      </Padding>
      <Spacing size={16} />
      <ButtonSet varient="sub" padding={[20, 24]}>
        <>
          <Button
            varient="tertiary"
            onClick={() => {
              router.replace('/home');
              closeGlobalOverlay();
            }}
            fullWidth
          >
            공연 홈으로
          </Button>
        </>
      </ButtonSet>
    </>
  );
};

export default Error;
