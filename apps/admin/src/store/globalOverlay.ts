import { GlobalSheetContentKey } from '../../src/components/shared/overlay/GlobalOverlay';
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
