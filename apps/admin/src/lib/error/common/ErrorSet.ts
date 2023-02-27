import EventErrorSet from '../event/EventErrorSet';
import AopErrorSet from '../global/aop/AopErrorSet';
import AuthErrorSet from '../global/auth/AuthErrorSet';
import FileErrorSet from '../global/file/FileErrorSet';
import GlobalErrorSet from '../global/global/GlobalErrorSet';
import RedissonErrorSet from '../global/redisson/RedissonErrorSet';
import HostErrorSet from '../host/HostErrorSet';
import IssuedTicketErrorSet from '../issuedTicket/IssuedTicketErrorSet';
import OrderErrorSet from '../order/OrderErrorSet';
import ItemOptionGroupErrorSet from '../ticketItem/itemOptionGroup/ItemOptionGroupErrorSet';
import OptionErrorSet from '../ticketItem/option/OptionErrorSet';
import OptionGroupErrorSet from '../ticketItem/optionGroup/OptionGroupErrorSet';
import TicketItemErrorSet from '../ticketItem/ticketItem/TicketItemErrorSet';
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
  | 'Item_Option_Group'
  | 'IssuedTicket'
  | 'AUTH'
  | 'GLOBAL'
  | 'FILE'
  | 'AOP'
  | 'Redisson';

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
  IssuedTicket: IssuedTicketErrorSet,
  AUTH: AuthErrorSet,
  GLOBAL: GlobalErrorSet,
  FILE: FileErrorSet,
  AOP: AopErrorSet,
  Redisson: RedissonErrorSet,
};

export default ErrorSet;
