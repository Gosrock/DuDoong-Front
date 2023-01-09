import { GlobalSheetContentKey } from '@components/shared/bottomSheet/GlobalSheet';
import { atom } from 'recoil';

export interface OverlayStateType {
  content: GlobalSheetContentKey;
  props?: any;
  isOpen?: boolean;
}

export const overlayState = atom<OverlayStateType | null>({
  key: 'overlayState',
  default: null,
});
