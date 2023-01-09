/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ListRow } from '../../layout';
import { theme } from '../../theme';
import { Accordion, AccordionProps } from '../Accordion';
import { Text } from '../Text';

export interface DropdownProps extends AccordionProps {
  options: DropdownOption[];
  initialState: string; //id
  onSelectOption: () => void;
}

export interface DropdownOption {
  title: string;
  id: string;
  description: string;
  disabled: boolean;
}

export const Dropdown = ({
  options,
  initialState,
  onSelectOption,
}: DropdownProps) => {
  return (
    <Accordion
      title={options.filter((v) => initialState === v.id)[0].title}
      textColor={'main_500'}
      content={options.map((option) => (
        <DropdownOptionRow option={option} />
      ))}
    />
  );
};

const DropdownOptionRow = ({ option }: { option: DropdownOption }) => {
  const { id, title, disabled, description } = option;
  return (
    <div
      id={id}
      css={css`
        cursor: pointer;
        &:hover {
          background-color: ${theme.palette.gray_100};
        }
      `}
    >
      <ListRow
        padding={[13.5, 24]}
        text={title}
        textTypo="Text_14"
        textColor={disabled ? 'gray_400' : 'gray_500'}
        rightElement={
          <Text typo="Text_14_SB" color="gray_500">
            {description}
          </Text>
        }
      />
    </div>
  );
};
