import { ListHeader, Spacing, media } from '@dudoong/ui';
import WebQrScreen from './WebQrScreen';
import { ViewInfoType } from '@pages/events/Qr';
import MobileQrScreen from './MobileQrScreen';
import { useResponsive } from '@dudoong/utils';

const NormalQrScreen = ({
  setViewInfo,
}: {
  setViewInfo: React.Dispatch<React.SetStateAction<ViewInfoType>>;
}) => {
  const { isPC } = useResponsive();
  return (
    <>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'QR 체크인'}
        size={'listHeader_24'}
        description={'카메라에 QR코드를 비추면, 체크인 가능합니다!'}
      />
      <Spacing size={15} />
      {isPC ? (
        <WebQrScreen setViewInfo={setViewInfo} />
      ) : (
        <MobileQrScreen setViewInfo={setViewInfo} />
      )}
    </>
  );
};

export default NormalQrScreen;
