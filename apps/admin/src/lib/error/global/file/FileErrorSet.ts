import { DomainErrorSetType } from '../../common/DomainErrorSetType';
import file400 from './file400';

const FileErrorSet: DomainErrorSetType = {
  400: file400,
  401: null,
  403: null,
  404: null,
  429: null,
  500: null,
};

export default FileErrorSet;
