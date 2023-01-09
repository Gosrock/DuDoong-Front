import { AccordionProps } from '../Accordion';

export interface DropdownProps extends AccordionProps {
  options: DropdownOption[];
}

export interface DropdownOption {
  title: string;
  description: string;
  disabled: boolean;
}

export const Dropdown = ({}: DropdownProps) => {
  return <></>;
};
