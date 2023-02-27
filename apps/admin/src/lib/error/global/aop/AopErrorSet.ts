import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import aop500 from './aop500';

const AopErrorSet: DomainErrorSetType = {
  400: null,
  401: null,
  403: null,
  404: null,
  429: null,
  500: aop500,
};

export default AopErrorSet;
