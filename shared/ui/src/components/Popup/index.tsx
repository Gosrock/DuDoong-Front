import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, useEffect, useRef, useState } from 'react';

interface DropdownProps extends ComponentProps<'div'> {
  size: DropdownSize;
  width: number;
  options: { title: string; onClick: () => void }[];
  disabled: boolean;
  onClickOption: () => void;
  renderElement: JSX.Element;
}

type DropdownSize = 'large' | 'small';
type Props = Partial<DropdownProps>;
type WapperProps = Pick<Props, 'size' | 'disabled' | 'width'>;
type DropdownOptionsProps = Pick<
  DropdownProps,
  'size' | 'options' | 'onClickOption' | 'width'
>;

/**
 * @param size 기본값 : small
 * @param placeholder value가 null이면 placeholder가 표시됩니다
 * @param width (size === 'small'일 때) 기본적으로 auto, width 지정하면 fix
 * @param value 외부 state
 * @param setValue 외부 setState
 * @param renderElement
 */
function Popup(props: Props) {
  const {
    size = 'small',
    disabled = false,
    options = [],
    onClickOption,
    width = 90,
    renderElement,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <Wrapper
      size={size}
      disabled={disabled}
      onClick={onToggleDropdown}
      ref={ref}
    >
      {renderElement}
      {isOpen && (
        <DropdownOptions
          size={size}
          options={options}
          onClickOption={onClickOption!}
          width={width}
        />
      )}
    </Wrapper>
  );
}

function DropdownOptions(props: DropdownOptionsProps) {
  const { size, options, onClickOption, width } = props;
  return (
    <DropdownOptionsContainer size={size} width={width}>
      {options.map((option) => (
        <DropdownTable
          key={option.title}
          size={size}
          onClick={() => {
            option.onClick();
            onClickOption && onClickOption();
          }}
        >
          {option.title}
        </DropdownTable>
      ))}
    </DropdownOptionsContainer>
  );
}

const Wrapper = styled.div<WapperProps>`
  position: relative;
`;

const DropdownOptionsContainer = styled.div<{
  size: DropdownSize;
  width: number;
}>`
  position: absolute;
  z-index: 3;
  width: ${({ width }) => width}px;
  ${({ theme, size }) =>
    size === 'large'
      ? css`
          top: 56px;
          border: 1px solid ${theme.palette.gray_400};
          ${theme.typo.P_Text_16_M}
        `
      : css`
          border: 1px solid ${theme.palette.gray_400};
          ${theme.typo.P_Text_14_M}
        `}

  right: 0;
  margin-top: 4px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const DropdownTable = styled.div<{ size: DropdownSize }>`
  cursor: pointer;
  ${({ theme, size }) =>
    size === 'large'
      ? css`
          ${theme.typo.P_Text_16_M}
          padding :12px 16px;
        `
      : css`
          ${theme.typo.P_Text_14_M}
          padding : 8px 16px;
        `}
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray_100};
  }

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export { Popup };
