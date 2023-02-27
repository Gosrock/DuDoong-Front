import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import redisson500 from './redisson500';

const RedissonErrorSet: DomainErrorSetType = {
  400: null,
  401: null,
  403: null,
  404: null,
  429: null,
  500: redisson500,
};

export default RedissonErrorSet;
