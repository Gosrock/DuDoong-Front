import { DomainErrorSetType } from '../common/DomainErrorSetType';
import ticketItem400 from './ticketItem400';
import ticketItem404 from './ticketItem404';

const TicketItemErrorSet: DomainErrorSetType = {
  400: ticketItem400,
  401: null,
  403: null,
  404: ticketItem404,
  429: null,
  500: null,
};

export default TicketItemErrorSet;
