import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import global400 from './global400';
import global401 from './global401';
import global429 from './global429';
import global500 from './global500';

const GlobalErrorSet: DomainErrorSetType = {
  400: global400,
  401: global401,
  403: null,
  404: null,
  429: global429,
  500: global500,
};

export default GlobalErrorSet;
