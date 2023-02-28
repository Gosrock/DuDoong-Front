import { DomainErrorSetType } from '../common/DomainErrorSetType';
import order400 from './order400';
import order404 from './order404';

const OrderErrorSet: DomainErrorSetType = {
  400: order400,
  401: null,
  403: null,
  404: order404,
  429: null,
  500: null,
};

export default OrderErrorSet;
