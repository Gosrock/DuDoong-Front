import { useState, useCallback } from 'react';

export const useInputs = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const initForm = (initForm: any) => {
    setForm(initForm);
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form: any) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset, initForm] as const;
};

// https://react.vlpt.us/basic/21-custom-hook.html
