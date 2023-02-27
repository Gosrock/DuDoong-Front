import EventErrorSet from '../event/EventErrorSet';
import { DomainErrorSetType } from './DomainErrorSetType';

export type ErrorSetTypeKey = 'Event';

export type ErrorSetType = {
  [key in ErrorSetTypeKey]: DomainErrorSetType;
};

const ErrorSet: ErrorSetType = {
  Event: EventErrorSet,
};

export default ErrorSet;
