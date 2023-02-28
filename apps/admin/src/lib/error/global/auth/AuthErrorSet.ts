import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import auth401 from './auth401';
import auth403 from './auth403';

const AuthErrorSet: DomainErrorSetType = {
  400: auth401,
  401: null,
  403: null,
  404: auth403,
  429: null,
  500: null,
};

export default AuthErrorSet;
