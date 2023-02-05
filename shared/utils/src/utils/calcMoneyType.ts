export const getCount = (arg: string) => parseInt(arg.split('원')[0]);

export const calcMoneyType = {
  add: (arg1: string, arg2: string) => {
    const result = getCount(arg1) + getCount(arg2);
    return result + '원';
  },

  sub: (arg1: string, arg2: string) => {
    const result = getCount(arg1) - getCount(arg2);
    return result + '원';
  },

  mul: (mutiplicand: string, multiplier: number) => {
    const result = getCount(mutiplicand) * multiplier;
    return result + '원';
  },
};
