import { Button, theme, Text, Spacing, FlexBox, TextProps } from '@dudoong/ui';
import { FlexBoxProps } from '@dudoong/ui';
import BorderBox from './BorderBox';
import { css } from '@emotion/react';
import Logo from '../assets/logo/Logo';
import Keyboard from '../assets/image/Keyboard';
import DoongDoongs from '../assets/image/DoongDoongs';
import Dots from '../assets/image/Dots';
import styled from '@emotion/styled';

interface LoginMarkupProps {
  onKakao: () => void;
}

const LoginMarkup = ({ onKakao }: LoginMarkupProps) => {
  return (
    <>
      <Wrapper align={'center'} justify={'center'}>
        <KeyboardItem />
        <DoongDoongsItem />
        <DotsItem1 />
        <DotsItem2 />
        <BorderBox
          padding={[120, 60]}
          css={css`
            width: 595px;
            height: 584px;
            z-index: 1;
          `}
        >
          <FlexBox align={'center'} justify={'center'} direction={'column'}>
            <Logo width={254} height={67} />
            <Spacing size={12} />
            <Text typo={'P_Header_24_B'}>DUDOONG YOUR CONCERT LIFE</Text>
            <Spacing size={89} />
            <Button fullWidth varient="kakao" onClick={onKakao}>
              카카오로 로그인하기
            </Button>
            <Spacing size={32} />
            <CustomText
              typo={'P_Text_16_R'}
              color={'gray_400'}
              onClick={() => {
                window.open(
                  'https://9yujin.notion.site/7b2b68ddd6054579befc86baf691db9f',
                  '_blank',
                );
              }}
            >
              두둥 서비스 약관
            </CustomText>
            <Spacing size={19} />
            <CustomText
              typo={'P_Text_16_R'}
              color={'gray_400'}
              onClick={() => {
                window.open(
                  'https://9yujin.notion.site/91eafd1fc2864386b9961d8e5277c2df',
                  '_blank',
                );
              }}
            >
              두둥 개인정보 처리방침
            </CustomText>
          </FlexBox>
        </BorderBox>
      </Wrapper>
    </>
  );
};

export default LoginMarkup;

const Wrapper = styled((props: FlexBoxProps) => <FlexBox {...props} />)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.gray_100};
  overflow-x: hidden;
  z-index: 100000;
`;

const CustomText = styled((props: TextProps) => <Text {...props} />)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const KeyboardItem = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0px;
        left: 5vw;
        z-index: 2;
      `}
    >
      <Keyboard />
    </div>
  );
};

const DoongDoongsItem = () => {
  return (
    <div
      css={css`
        position: fixed;
        bottom: -3px;
        right: 6vw;
        z-index: 2;
      `}
    >
      <DoongDoongs />
    </div>
  );
};

const DotsItem1 = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 195px;
        left: 12vw;
      `}
    >
      <Dots />
    </div>
  );
};

const DotsItem2 = () => {
  return (
    <div
      css={css`
        position: fixed;
        bottom: 150px;
        right: 11vw;
      `}
    >
      <Dots />
    </div>
  );
};
