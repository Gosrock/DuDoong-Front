/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { ListRow } from '../../layout';
import { theme } from '../../theme';
import { Accordion } from '../Accordion';
import { Text } from '../Text';

export interface DropdownProps {
  options: DropdownOption[];
  selectedOption: DropdownOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<DropdownOption>>;
}

export interface DropdownOption {
  title: string;
  id: string | number;
  description?: string;
  disabled: boolean;
}

export const Dropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) => {
  const [value, setValue] = useState<DropdownOption>(selectedOption);
  const { accordionRef, toggleAccordion } = useAccordion();
  const handleOptionClick = (option: DropdownOption) => {
    setValue(option);
    setSelectedOption(option);
    toggleAccordion();
  };

  return (
    <Accordion
      ref={accordionRef}
      title={value.title}
      textColor={options.length === 0 ? 'gray_400' : 'main_500'}
      content={options.map((option) => (
        <button
          key={option.id}
          disabled={option.disabled}
          css={css`
            width: 100%;
            cursor: pointer;
            &:hover:not(:disabled) {
              background-color: ${theme.palette.gray_100};
            }
          `}
          onClick={() => {
            handleOptionClick(option);
          }}
        >
          <DropdownOptionRow option={option} />
        </button>
      ))}
      contentHeight={options.length * 56}
      disabled={options.length === 0}
    />
  );
};

const DropdownOptionRow = ({ option }: { option: DropdownOption }) => {
  const { id, title, disabled, description } = option;
  return (
    <ListRow
      padding={[16, 24]}
      text={title}
      textTypo="P_Text_16_R"
      textColor={disabled ? 'gray_300' : 'gray_500'}
      rightElement={
        disabled ? (
          <Text typo="P_Text_16_R" color="gray_300">
            {description}
          </Text>
        ) : (
          <Text typo="P_Text_16_R" color="gray_400">
            {description}
          </Text>
        )
      }
    />
  );
};

export const useAccordion = () => {
  const toggleAccordion = () => {
    accordionRef.current?.click();
  };
  const accordionRef = useRef<HTMLButtonElement>(null);

  return { accordionRef, toggleAccordion };
};
