import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import optionGroup400 from './optionGroup400';
import optionGroup404 from './optionGroup404';

const OptionGroupErrorSet: DomainErrorSetType = {
  400: optionGroup400,
  401: null,
  403: null,
  404: optionGroup404,
  429: null,
  500: null,
};

export default OptionGroupErrorSet;
