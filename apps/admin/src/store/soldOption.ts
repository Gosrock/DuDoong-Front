import { atom } from "recoil";

export const soldOptionState = atom<number[]>({
    key: 'soldOptions',
    default : [],
})
