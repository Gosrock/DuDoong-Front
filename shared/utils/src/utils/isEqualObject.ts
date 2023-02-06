export const isEqualObject = (arg1: Object, arg2: Object) => {
  return JSON.stringify(arg1) === JSON.stringify(arg2);
};
