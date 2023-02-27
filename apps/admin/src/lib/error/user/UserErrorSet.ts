import { DomainErrorSetType } from '../common/DomainErrorSetType';
import user400 from './user400';
import user403 from './user403';
import user404 from './user404';

const UserErrorSet: DomainErrorSetType = {
  400: user400,
  401: null,
  403: user403,
  404: user404,
  429: null,
  500: null,
};

export default UserErrorSet;
