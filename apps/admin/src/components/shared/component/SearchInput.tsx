import { Input, Search, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import { SyntheticEvent } from 'react';

interface SearchInputProps {
  placeholder: string;
  value: string | undefined;
  onChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  onInput: (props: SyntheticEvent) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <>
      <Input
        height={60}
        placeholder={props.placeholder}
        styles={InputStyle}
        rightIcon={<Search onClick={props.onInput} />}
        onChange={props.onChange}
        value={props.value}
      ></Input>
    </>
  );
};

const InputStyle = css`
  border-radius: 16px;
  border: 1px solid black;
  background-color: ${theme.palette.gray_100};
  color: ${theme.palette.black};
  margin-top: 16px;
  box-sizing: border-box;
  width: 100%;
`;
