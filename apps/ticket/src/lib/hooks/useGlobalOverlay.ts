import { overlayState, OverlayStateType } from '@store/globalOverlay';
import { useRecoilState } from 'recoil';

const useGlobalOverlay = () => {
  const [overlay, setOverlay] = useRecoilState(overlayState);
  const openOverlay = ({ content, props, isOpen = true }: OverlayStateType) => {
    setOverlay({ content, props, isOpen });
  };

  const closeOverlay = () => {
    setOverlay({ ...overlay!, isOpen: false });
    setTimeout(() => {
      setOverlay(null);
    }, 400);
  };

  const isOpen = overlay?.isOpen || false;

  return { isOpen, openOverlay, closeOverlay };
};

export default useGlobalOverlay;
