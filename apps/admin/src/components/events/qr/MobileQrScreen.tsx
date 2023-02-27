import { FlexBox, Button, Spacing } from '@dudoong/ui';
import { ViewInfoType } from '@pages/events/Qr';

const MobileQrScreen = ({
  setViewInfo,
}: {
  setViewInfo: React.Dispatch<React.SetStateAction<ViewInfoType>>;
}) => {
  return (
    <>
      <FlexBox direction={'column'} align={'start'} gap={20}>
        <Button
          onClick={() => {
            setViewInfo({
              fullScreen: true,
              cam: 'user',
            });
          }}
        >
          전면 카메라
        </Button>
        <Button
          onClick={() => {
            setViewInfo({
              fullScreen: true,
              cam: 'environment',
            });
          }}
        >
          후면 카메라
        </Button>
      </FlexBox>
      <Spacing size={30} />
    </>
  );
};

export default MobileQrScreen;
