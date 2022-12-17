import { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const Button = ({ ...props }: ButtonProps) => {
  return <button {...props} />;
};
