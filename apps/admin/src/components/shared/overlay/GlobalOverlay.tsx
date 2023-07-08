import { Modal } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { overlayState } from '@store/globalOverlay';
import { useRecoilValue } from 'recoil';

import Approve from './content/Approve';
import DeleteEvent from './content/DeleteEvent';
import Invitation from './content/Invitation';
import PaidTicket from './content/PaidTicket';
import Pay from './content/Pay';
import PostEvent from './content/PostEvent';
import Register from './content/Register';
import Saved from './content/Saved';
import SaveTicket from './content/SaveTicket';
import TableViewDetail from './content/TableDetailView';
import SaveOption from './content/SaveOption';
import CancelOption from './content/CancelOption';
import CancelOrder from './content/CancelOrder';

export type GlobalSheetContentKey =
  | 'register'
  | 'deleteEvent'
  | 'postEvent'
  | 'pay'
  | 'paidTicket'
  | 'approve'
  | 'saveTicket'
  | 'saveOption'
  | 'tableViewDetail'
  | 'saved'
  | 'invitation'
  | 'cancelOption'
  | 'cancelOrder';

const globalSheetContent: Record<GlobalSheetContentKey, any> = {
  register: Register,
  deleteEvent: DeleteEvent,
  postEvent: PostEvent,
  pay: Pay,
  paidTicket: PaidTicket,
  approve: Approve,
  saveTicket: SaveTicket,
  saveOption: SaveOption,
  tableViewDetail: TableViewDetail,
  saved: Saved,
  invitation: Invitation,
  cancelOption: CancelOption,
  cancelOrder: CancelOrder,
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
