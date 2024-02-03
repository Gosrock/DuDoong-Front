import styled from '@emotion/styled';
import Outro from '@assets/landing/outro.svg';
import { media } from '@dudoong/ui';

const OutroSection = () => {
  return (
    <Wrapper>
      <Outro />
      <div className="line" />
      <h3>
        이 모든 서비스를 <br />
        무료로 시작해보세요
      </h3>
      <p>제휴 문의를 통해 카드 결제도 가능해요</p>
      <button
        onClick={() => (window.location.href = 'https://dudoong.com/home')}
      >
        두둥 시작하기
      </button>
      <button
        onClick={() => (window.location.href = 'https://dudoong.com/admin')}
      >
        공연 준비하기
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 295px;
  position: relative;
  svg {
    text-align: center;
    width: 428px;
    z-index: 1;
    padding-right: 20px;
  }
  .line {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #000000;
    bottom: 524px;
  }

  ${media.mobile} {
    padding-top: 172px;
    svg {
      width: 342px;
    }
    .line {
      height: 1.5px;
      bottom: 444.5px;
    }
  }

  h3 {
    font-family: 'Gmarket Sans';
    font-weight: 700;
    text-align: center;
    font-size: 45px;
    line-height: 1.2;
    margin-top: 60px;
    ${media.mobile} {
      font-size: 20px;
    }
  }
  p {
    font-family: 'Pretendard';
    font-weight: 500;
    text-align: center;
    font-size: 24px;
    color: ${({ theme }) => theme.palette.gray_500};
    margin-top: 20px;
    ${media.mobile} {
      font-size: 14px;
      font-weight: 400;
    }
  }

  button {
    margin-top: 43px;

    height: 56px;
    width: 300px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.point_mint};
    border: 1px solid black;
    ${({ theme }) => theme.typo.G_Header_24_B};
    box-sizing: border-box;
    line-height: 1;
    color: ${({ theme }) => theme.palette.black};

    &:last-of-type {
      margin-bottom: 113px;
      margin-top: 20px;
      background-color: ${({ theme }) => theme.palette.white};
    }

    ${media.mobile} {
      font-size: 16px;
      width: 197px;
      height: 42px;
      &:last-of-type {
        margin-top: 12px;
        margin-bottom: 144px;
        background-color: ${({ theme }) => theme.palette.white};
      }
    }
  }
`;

export default OutroSection;
