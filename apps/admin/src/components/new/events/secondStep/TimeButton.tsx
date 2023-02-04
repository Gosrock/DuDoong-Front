import { darken } from 'polished';
import { FlexBox, theme } from '@dudoong/ui';
import { TagButton } from '@dudoong/ui';
import styled from '@emotion/styled';

type TimeButtonColorKey = 'reset' | 'modify';

type TimeButtonColorType = {
  [key in TimeButtonColorKey]: {
    default: string;
    hover: string;
    active: string;
    text: string;
  };
};

const TAG_BUTTON_COLOR: TimeButtonColorType = {
  reset: {
    default: `${theme.palette.red_200}`,
    hover: `${darken(0.01, theme.palette.red_200)}`,
    active: `${darken(0.03, theme.palette.red_200)}`,
    text: `${theme.palette.white}`,
  },
  modify: {
    default: `${theme.palette.main_100}`,
    hover: `${darken(0.01, theme.palette.main_100)}`,
    active: `${darken(0.03, theme.palette.main_100)}`,
    text: `${theme.palette.main_500}`,
  },
};

interface TimeButtonProps {
  type: TimeButtonColorKey;
  text: string;
  onClick: () => void;
}

const TimeButton = ({ type, text, onClick }: TimeButtonProps) => {
  return (
    <TimeButtonWrapper
      align={'center'}
      justify={'center'}
      type={type}
      onClick={onClick}
    >
      {text}
    </TimeButtonWrapper>
  );
};

export default TimeButton;

interface TimeButtonWrapperProps {
  type: TimeButtonColorKey;
}

const TimeButtonWrapper = styled(FlexBox)<TimeButtonWrapperProps>`
  height: 48px;
  padding: ${({ type }) => (type === 'reset' ? '12px 16.5px' : '12px 11px')};
  background-color: ${({ type }) => TAG_BUTTON_COLOR[type].default};
  border-radius: 10px;
  box-sizing: border-box;
  color: ${({ type }) => TAG_BUTTON_COLOR[type].text};
  ${({ theme }) => theme.typo.P_Text_16_M}

  &:hover {
    background-color: ${({ type }) => TAG_BUTTON_COLOR[type].hover};
  }

  &:active {
    background-color: ${({ type }) => TAG_BUTTON_COLOR[type].active};
  }
`;
