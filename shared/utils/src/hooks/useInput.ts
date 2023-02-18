import React, { useState, ChangeEventHandler } from 'react';

export interface IBindState<T> {
  value: T;
  onChange: ChangeEventHandler<any>;
}

export const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const onChange = (e: React.ChangeEvent<any>) => {
    setValue(e.target.value);
  };

  return [value, onChange, reset, setValue] as const;
};
