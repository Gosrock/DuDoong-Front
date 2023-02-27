import EventErrorSet from '../event/EventErrorSet';
import HostErrorSet from '../host/HostErrorSet';
import OrderErrorSet from '../order/OrderErrorSet';
import ItemOptionGroupErrorSet from '../ticketItem/ItemOptionGroupErrorSet';
import OptionErrorSet from '../ticketItem/OptionErrorSet';
import OptionGroupErrorSet from '../ticketItem/OptionGroupErrorSet';
import TicketItemErrorSet from '../ticketItem/TicketItemErrorSet';
import UserErrorSet from '../user/UserErrorSet';
import { DomainErrorSetType } from './DomainErrorSetType';

export type ErrorSetTypeKey =
  | 'Event'
  | 'USER'
  | 'HOST'
  | 'Order'
  | 'Ticket_Item'
  | 'Option_Group'
  | 'Option'
  | 'Item_Option_Group';

export type ErrorSetType = {
  [key in ErrorSetTypeKey]: DomainErrorSetType;
};

const ErrorSet: ErrorSetType = {
  Event: EventErrorSet,
  USER: UserErrorSet,
  HOST: HostErrorSet,
  Order: OrderErrorSet,
  Ticket_Item: TicketItemErrorSet,
  Option_Group: OptionGroupErrorSet,
  Option: OptionErrorSet,
  Item_Option_Group: ItemOptionGroupErrorSet,
};

export default ErrorSet;
