import { atom } from 'recoil';

interface IMenuRoutingType {
  firstText: string;
  secondText: string;
  thirdText: string | null;
}

const initMenuRouting = {
  firstText: '공연',
  secondText: '',
  thirdText: null,
};

export const menuRouting = atom<IMenuRoutingType>({
  key: 'menuRouting',
  default: initMenuRouting,
});
