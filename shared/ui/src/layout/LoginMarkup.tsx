import {
  Button,
  Text,
  Spacing,
  FlexBox,
  TextProps,
  BorderBox,
} from '@dudoong/ui';
import { FlexBoxProps } from '@dudoong/ui';
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
      <PC>
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
                  window.open('https://dudoong.com/meta/term', '_blank');
                }}
              >
                두둥 서비스 약관
              </CustomText>
              <Spacing size={19} />
              <CustomText
                typo={'P_Text_16_R'}
                color={'gray_400'}
                onClick={() => {
                  window.open('https://dudoong.com/meta/privacy', '_blank');
                }}
              >
                두둥 개인정보 처리방침
              </CustomText>
            </FlexBox>
          </BorderBox>
        </Wrapper>
      </PC>
      <Mobile>
        <FlexBox align={'center'} justify={'center'} direction={'column'}>
          <Logo width={203} height={54} />
          <Spacing size={12} />
          <Text typo={'P_Header_24_B'}>YOUR CONCERT LIFE</Text>
          <Spacing size={89} />
          <Button fullWidth varient="kakao" onClick={onKakao}>
            카카오로 로그인하기
          </Button>
          <Spacing size={32} />
          <CustomText
            typo={'P_Text_16_R'}
            color={'gray_400'}
            onClick={() => {
              window.open('https://dudoong.com/meta/term', '_blank');
            }}
          >
            두둥 서비스 약관
          </CustomText>
          <Spacing size={19} />
          <CustomText
            typo={'P_Text_16_R'}
            color={'gray_400'}
            onClick={() => {
              window.open('https://dudoong.com/meta/privacy', '_blank');
            }}
          >
            두둥 개인정보 처리방침
          </CustomText>
        </FlexBox>
      </Mobile>
    </>
  );
};

export default LoginMarkup;

const PC = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 150px);
  & > div {
    width: 100%;
    padding: 0 48px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

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
        top: 75px;
        left: 1vw;
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
        right: 1vw;
        z-index: 3;
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
        top: 58px;
        left: 10vw;
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
        bottom: 122px;
        right: 16vw;
        z-index: 2;
      `}
    >
      <Dots />
    </div>
  );
};
