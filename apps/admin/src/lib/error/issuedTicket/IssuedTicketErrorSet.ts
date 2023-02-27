import { DomainErrorSetType } from '../common/DomainErrorSetType';
import issuedTicket400 from './issuedTicket400';
import issuedTicket404 from './issuedTicket404';

const IssuedTicketErrorSet: DomainErrorSetType = {
  400: issuedTicket400,
  401: null,
  403: null,
  404: issuedTicket404,
  429: null,
  500: null,
};

export default IssuedTicketErrorSet;
