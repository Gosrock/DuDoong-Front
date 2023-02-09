import styled from '@emotion/styled';
import Logo from '../../assets/logo/Logo';
import { FlexBox } from '../../layout';
import { media, theme } from '../../theme';
import { Github, Instagram } from 'react-bootstrap-icons';
import Kakao from '../../assets/icons/Kakao';
import { css } from '@emotion/react';
import { useResponsive } from '@dudoong/utils';

export const Footer = () => {
  const { isPC } = useResponsive();
  return (
    <Wrapper>
      <Container>
        <FlexBox align={'center'} justify={'space-between'}>
          <FlexBox
            id="footer-name"
            align={'end'}
            gap={15}
            justify={'flex-start'}
          >
            <Logo fill={theme.palette.gray_400} height={32} width={119} />
            <p>STUDIO</p>
          </FlexBox>
          {!isPC && <OutLink />}
        </FlexBox>
        <p id="footer-content">
          두둥스튜디오 | 서울시 강서구 강서로 266 129동 503호
          <br />
          대표 : 이찬진 | TEL : 0507-0177-0711 | Email : support@dudoong.com
          <br />
          사업자 번호 : 469-21-01595 | 통신판매업 신고번호 : 2022-서울강서-3669
        </p>
        <div id="footer-bottom">
          <p>© Dudoong. 2023 All rights reserved. </p>
          <div>
            <a>개인정보 처리방침</a>
            <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
            <a>서비스 이용약관</a>
          </div>
          {isPC && (
            <OutLink
              css={css`
                margin-left: 32px;
              `}
            />
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

const OutLink = ({ ...props }) => {
  return (
    <FlexBox align={'center'} gap={15} {...props}>
      <a href="https://github.com/Gosrock" target={'_blank'} rel="noreferrer">
        <Github size={21} />
      </a>
      <a
        href="https://www.instagram.com/dudoong_official/"
        target={'_blank'}
        rel="noreferrer"
      >
        <Instagram size={21} />
      </a>
      <a href="http://pf.kakao.com/_xiaLWxj" target={'_blank'} rel="noreferrer">
        <Kakao />
      </a>
    </FlexBox>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray_200};
  color: ${({ theme }) => theme.palette.gray_400};
  box-sizing: border-box;

  ${({ theme }) => theme.typo.P_Text_12_R}
  height: 264px;
  padding: 47px 20px 38px 20px;

  #footer-name {
    p {
      ${({ theme }) => theme.typo.G_Side_14_B}
    }
  }
  #footer-content {
    margin-top: 20px;
  }

  #footer-bottom {
    display: flex;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.palette.gray_400};
    margin-top: 41px;
    & > p {
      margin-right: 20px;
    }
    & > div {
      display: flex;
    }
  }

  ${media.mobile} {
    height: 196px;
    padding: 24px 20px 30px 20px;

    ${({ theme }) => theme.typo.P_Text_10_R}
    #footer-content {
      margin-top: 16px;
    }
    #footer-bottom {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Container = styled.div`
  max-width: 936px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
