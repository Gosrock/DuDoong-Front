import { SyncLoader as SyncLoaderLibrary } from 'react-spinners';
import { theme } from '../../theme';

export const SyncLoader = () => {
  return <SyncLoaderLibrary color={theme.palette.main_300} />;
};
