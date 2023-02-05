export const useMoneyType = () => {
  const getCount = (arg: string) => parseInt(arg.split('원')[0]);

  const addMoneyType = (arg1: string, arg2: string) => {
    const result = getCount(arg1) + getCount(arg2);
    return result + '원';
  };

  const subMoneyType = (arg1: string, arg2: string) => {
    const result = getCount(arg1) - getCount(arg2);
    return result + '원';
  };

  const mulMoneyType = (mutiplicand: string, multiplier: number) => {
    const result = getCount(mutiplicand) * multiplier;
    return result + '원';
  };

  return { addMoneyType, subMoneyType, mulMoneyType };
};
