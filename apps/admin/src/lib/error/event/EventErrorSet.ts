import { DomainErrorSetType } from '../common/DomainErrorSetType';
import event400 from './event400';
import event404 from './event404';

const EventErrorSet: DomainErrorSetType = {
  400: event400,
  401: null,
  403: null,
  404: event404,
  429: null,
  500: null,
};

export default EventErrorSet;
