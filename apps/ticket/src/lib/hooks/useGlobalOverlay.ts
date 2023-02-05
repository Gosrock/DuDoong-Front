import { useResponsive } from '@dudoong/utils';
import { overlayState, OverlayStateType } from '@store/globalOverlay';
import { useRecoilState } from 'recoil';

const useGlobalOverlay = () => {
  const [overlay, setOverlay] = useRecoilState(overlayState);
  const { isPC } = useResponsive();
  const openGlobalOverlay = ({
    content,
    props,
    isOpen = true,
  }: OverlayStateType) => {
    setOverlay({ content, props, isOpen });
  };

  const closeGlobalOverlay = () => {
    setOverlay({ ...overlay!, isOpen: false });
    if (isPC) {
      setOverlay(null);
    } else {
      setTimeout(() => {
        setOverlay(null);
      }, 400);
    }
  };

  const isOpen = overlay?.isOpen || false;

  return { isOpen, openGlobalOverlay, closeGlobalOverlay };
};

export default useGlobalOverlay;
