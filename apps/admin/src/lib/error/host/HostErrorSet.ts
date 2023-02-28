import { DomainErrorSetType } from '../common/DomainErrorSetType';
import host400 from './host400';
import host404 from './host404';

const HostErrorSet: DomainErrorSetType = {
  400: host400,
  401: null,
  403: null,
  404: host404,
  429: null,
  500: null,
};

export default HostErrorSet;
