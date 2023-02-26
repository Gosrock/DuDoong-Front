import { css } from '@emotion/react';
import {
  FlexBox,
  Spacing,
  Text,
  PeopleFill,
  theme,
  BorderBox,
} from '@dudoong/ui';
import styled from '@emotion/styled';

const TicketRatio = ({
  checked,
  notChecked,
}: {
  checked: number;
  notChecked: number;
}) => {
  return (
    <BorderBox
      shadow
      padding={[38, 57, 25, 57]}
      css={css`
        width: 317px;
        height: 271px;
      `}
    >
      <FlexBox direction={'column'} align={'center'}>
        <Ratio ratio={calcRatio(checked, notChecked)} />
        <Spacing size={26} />
        <FlexBox align={'center'} gap={27}>
          <div>
            <Text typo={'P_Text_16_SB'} color={'gray_500'}>
              {checked ? `${checked}장` : '0장'}
              <br />
            </Text>
            <Spacing size={2} />
            <Text typo={'P_Text_12_R'} color={'gray_500'}>
              입장 확인된 티켓
            </Text>
          </div>
          <div>
            <Text typo={'P_Text_16_SB'} color={'gray_500'}>
              {notChecked ? `${notChecked}장` : '0장'}
              <br />
            </Text>
            <Spacing size={2} />
            <Text typo={'P_Text_12_R'} color={'gray_500'}>
              입장 미확인 티켓
            </Text>
          </div>
        </FlexBox>
      </FlexBox>
    </BorderBox>
  );
};

export default TicketRatio;

const calcRatio = (checked: number, notChecked: number) => {
  if (!checked && !notChecked) return 0;
  return checked / (checked + notChecked);
};

const Ratio = ({ ratio }: { ratio: number }) => {
  return (
    <CircularGraph deg={ratio * 360}>
      <CenterCircle align={'center'} justify={'center'}>
        <PeopleFill fill={theme.palette.main_500} size={25} />
      </CenterCircle>
    </CircularGraph>
  );
};

interface CircularGraphProps {
  deg: number;
}

const CircularGraph = styled.div<CircularGraphProps>`
  ${({ theme, deg }) =>
    css`
      background: conic-gradient(
        ${theme.palette.main_500} ${deg}deg,
        ${theme.palette.gray_200} ${deg}deg
      );
    `};
  border-radius: 70px;
  box-sizing: border-box;
  width: 140px;
  height: 140px;
  padding: 33px;
`;

const CenterCircle = styled(FlexBox)`
  width: 74px;
  height: 74px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 37px;
`;
