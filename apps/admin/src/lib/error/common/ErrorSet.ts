import EventErrorSet from '../event/EventErrorSet';
import UserErrorSet from '../user/UserErrorSet';
import { DomainErrorSetType } from './DomainErrorSetType';

export type ErrorSetTypeKey = 'Event' | 'USER';

export type ErrorSetType = {
  [key in ErrorSetTypeKey]: DomainErrorSetType;
};

const ErrorSet: ErrorSetType = {
  Event: EventErrorSet,
  USER: UserErrorSet,
};

export default ErrorSet;
