import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import option400 from './option400';
import option404 from './option404';

const OptionErrorSet: DomainErrorSetType = {
  400: option400,
  401: null,
  403: null,
  404: option404,
  429: null,
  500: null,
};

export default OptionErrorSet;
