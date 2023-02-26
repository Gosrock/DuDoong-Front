import { media } from '@dudoong/ui';
import styled from '@emotion/styled';
import Alert from '@assets/landing/alert.svg';
import Event from '@assets/landing/event.svg';
import Host from '@assets/landing/host.svg';
import EventMobile from '@assets/landing/eventMobile.svg';
import AlertMobile from '@assets/landing/alertMobile.svg';
import { css } from '@emotion/react';
import { ComponentProps } from 'react';
const FeatureSection = () => {
  return (
    <Wrapper>
      <Container>
        <Content
          css={css`
            max-width: 1070px;
          `}
        >
          <ContentText
            tag="호스트 관리"
            title={`여러분이 속한 그룹을\n호스트로 만들어보세요!`}
            description={`그룹의 히스토리를 남기고,\n관리자를 초대하고 같이 공연을 만들어가세요!`}
          />
          <Host
            width={540}
            css={css`
              ${media.mobile} {
                width: 100%;
                padding: 0 48px 0 42px;
                box-sizing: border-box;
                margin-top: 64px;
              }
            `}
          />
        </Content>
        <Content
          css={css`
            max-width: 892px;
            margin-top: 200px;
          `}
        >
          <Event
            css={css`
              width: 497px;
            `}
            className="image-pc"
          />
          <ContentText
            tag="공연 홍보 및 안내"
            title={`두둥을 통해\n공연을 홍보하세요!`}
            description={`이벤트 관리에서 에디터를 활용해서\n여러분들의 공연을 소개해 보세요!`}
            css={css`
              ${media.pc} {
                padding-right: 28px;
              }
            `}
          />

          <EventMobile
            className="image-mobile"
            css={css`
              margin-top: 34px;
              width: 100%;
            `}
          />
        </Content>
        <Content
          css={css`
            max-width: 962px;
            margin-top: 150px;
          `}
        >
          <ContentText
            tag="슬랙 알림 받기"
            title={`이벤트의 중요 알림을\n놓치지 마세요`}
            description={`호스트의 슬랙 알림 기능을 통해서\n두둥 티켓 입금 확인 요청 알림,\n주문 상태변경 알림등을 받아보세요!`}
          />
          <Alert width={551} className="image-pc" />
          <AlertMobile
            className="image-mobile"
            css={css`
              margin-top: 34px;
              width: 100%;
              padding: 0 28px;
              box-sizing: border-box;
            `}
          />
        </Content>
      </Container>
    </Wrapper>
  );
};

interface ContentProps extends ComponentProps<'div'> {
  tag: string;
  title: string;
  description: string;
}
const ContentText = ({ tag, title, description, ...props }: ContentProps) => {
  return (
    <ContentTextWrapper {...props}>
      <p>{tag}</p>
      <h3>{title}</h3>
      <div>{description}</div>
    </ContentTextWrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray_100};
  padding-top: 135px;
  padding-bottom: 103px;
  ${media.mobile} {
    padding-top: 77px;
    padding-bottom: 140px;
  }
`;

const Container = styled.div`
  max-width: 1070px;
  margin: 0 auto;

  ${media.pc} {
    padding-left: 70px;
    .image-mobile {
      display: none;
    }
  }

  ${media.mobile} {
    .image-pc {
      display: none;
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  img {
    width: 100%;
    height: auto;
  }

  ${media.mobile} {
    display: block;
  }
`;

const ContentTextWrapper = styled.div`
  white-space: pre-wrap;
  flex-shrink: 0;

  p {
    font-family: 'Gmarket Sans';
    font-weight: 500;
    font-size: 24px;
    color: ${({ theme }) => theme.palette.main_500};
  }
  h3 {
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-size: 40px;
    line-height: 1.2;
    margin-top: 16px;
  }
  div {
    margin-top: 30px;
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: 20px;
    color: ${({ theme }) => theme.palette.gray_400};
    line-height: 1.5;
  }

  ${media.mobile} {
    padding: 0 28px;
    p {
      font-size: 14px;
    }
    h3 {
      margin-top: 16px;
      font-size: 24px;
    }
    div {
      margin-top: 18px;
      font-size: 14px;
    }
  }
`;
export default FeatureSection;
