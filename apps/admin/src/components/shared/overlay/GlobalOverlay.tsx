import { Modal } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import DeleteEvent from './content/DeleteEvent';
import PostEvent from './content/PostEvent';
import Register from './content/Register';

export type GlobalSheetContentKey = 'register' | 'deleteEvent' | 'postEvent';

export type GlobalSheetContentType = {
  [key in GlobalSheetContentKey]: ReactNode;
};

const globalSheetContent = {
  register: Register,
  deleteEvent: DeleteEvent,
  postEvent: PostEvent,
};

const GlobalOverlay = () => {
  const overlay = useRecoilValue(overlayState);
  const { isOpen, closeOverlay } = useGlobalOverlay();

  if (!overlay) {
    return null;
  } else {
    const Content = globalSheetContent[overlay.content];
    return (
      <Modal open={isOpen} onDismiss={closeOverlay}>
        <Content {...overlay.props} closeOverlay={closeOverlay} />
      </Modal>
    );
  }
};

export default GlobalOverlay;
