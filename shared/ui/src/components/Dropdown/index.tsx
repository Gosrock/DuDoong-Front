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
  id: string;
  description: string;
  disabled: boolean;
}

export const Dropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) => {
  const [value, setValue] = useState<DropdownOption>(selectedOption);
  const handleOptionClick = (option: DropdownOption) => {
    setValue(option);
    setSelectedOption(option);
    accordionRef.current?.click();
  };
  const accordionRef = useRef<HTMLButtonElement>(null);

  return (
    <Accordion
      ref={accordionRef}
      title={value.title}
      textColor={'main_500'}
      content={options.map((option) => (
        <button
          key={option.id}
          css={css`
            width: 100%;
            cursor: pointer;
            &:hover {
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
    />
  );
};

const DropdownOptionRow = ({ option }: { option: DropdownOption }) => {
  const { id, title, disabled, description } = option;
  return (
    <ListRow
      padding={[16, 24]}
      text={title}
      textTypo="Text_16"
      textColor={disabled ? 'gray_400' : 'gray_500'}
      rightElement={
        <Text typo="Text_16_SB" color="gray_500">
          {description}
        </Text>
      }
    />
  );
};
