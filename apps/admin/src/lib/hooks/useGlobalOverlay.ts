import { overlayState, OverlayStateType } from '@store/globalOverlay';
import { useSetRecoilState } from 'recoil';

const useGlobalOverlay = () => {
  const setOverlay = useSetRecoilState(overlayState);
  const openOverlay = ({ content, props, isOpen = true }: OverlayStateType) => {
    setOverlay({ content, props, isOpen });
  };

  const closeOverlay = () => {
    setOverlay(null);
  };

  return { openOverlay, closeOverlay };
};

export default useGlobalOverlay;
