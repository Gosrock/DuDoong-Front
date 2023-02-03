import { useState, useCallback } from 'react';

export const useInputs = <T>(
  initialForm: T,
  middleFc?: (arg: string) => string,
) => {
  const [form, setForm] = useState<T>(initialForm);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const val = middleFc ? middleFc(value) : value;
    setForm((form: any) => ({ ...form, [name]: val }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset] as const;
};

// https://react.vlpt.us/basic/21-custom-hook.html
