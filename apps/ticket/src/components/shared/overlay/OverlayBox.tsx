import { useResponsive } from '@dudoong/utils';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { OverlayBoxProps } from './GlobalOverlay';
import Modal from './Modal';

const OverlayBox = ({ open, onDismiss, children }: OverlayBoxProps) => {
  const { isPC } = useResponsive();
  return (
    <>
      {isPC ? (
        <Modal open={open} onDismiss={onDismiss}>
          {children}
        </Modal>
      ) : (
        <BottomSheet open={open} onDismiss={onDismiss}>
          {children}
        </BottomSheet>
      )}
    </>
  );
};

export default OverlayBox;
