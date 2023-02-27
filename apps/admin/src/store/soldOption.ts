import { atom } from 'recoil';

export const soldOptionState = atom<number[] | null>({
  key: 'soldOptions',
  default: null,
});
