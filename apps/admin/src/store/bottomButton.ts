import { atom } from 'recoil';
import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';

export interface BottomButtonType {
  type: AdminBottomButtonTypeKey;
  firstButtonClickHandler: () => void;
  firstButtonDisable: boolean;
  secondButtonClickHandler?: () => void;
  secondButtonDisable?: boolean;
  isActive: boolean;
}

export const initBottomButtonState = {
  type: 'save',
  firstButtonClickHandler: () => {},
  firstButtonDisable: false,
  secondButtonClickHandler: () => {},
  secondButtonDisable: false,
  isActive: false,
};

export const bottomButtonState = atom<BottomButtonType>({
  key: 'bottomButtonState',
  default: initBottomButtonState as BottomButtonType,
});
