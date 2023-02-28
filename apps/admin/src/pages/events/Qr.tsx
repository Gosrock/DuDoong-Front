import { useState } from 'react';
import NormalQrScreen from '@components/events/qr/NormalQrScreen';
import FullQrScreen from '@components/events/qr/FullQrScreen';
import { type } from 'os';

export type ViewType = 'user' | 'environment';

export interface ViewInfoType {
  fullScreen: boolean;
  cam: ViewType;
}

const Qr = () => {
  const [viewInfo, setViewInfo] = useState<ViewInfoType>({
    fullScreen: false,
    cam: 'user',
  });
  return viewInfo.fullScreen ? (
    <FullQrScreen viewInfo={viewInfo} setViewInfo={setViewInfo} />
  ) : (
    <NormalQrScreen setViewInfo={setViewInfo} />
  );
};
export default Qr;
