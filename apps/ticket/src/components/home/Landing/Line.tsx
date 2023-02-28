import styled from '@emotion/styled';
import Star2 from '@assets/landing/star2.svg';
import { media } from '@dudoong/ui';

const Line = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <LineContainer>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
      </LineContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.main_500};
  height: 66px;

  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-size: 33px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.white};
  letter-spacing: 0.1em;

  ${media.mobile} {
    height: 47px;
    font-size: 20px;
  }

  ${media.custom(1320)} {
    margin-top: 260px;
  }
  margin-top: 50px;
`;
const LineContainer = styled.div`
  width: 3500px;
  position: absolute;
  left: -630px;
  display: flex;
  align-items: center;
  svg {
    width: 46px;
  }

  ${media.mobile} {
    left: -380px;
    svg {
      margin-left: 4px;
      width: 36px;
    }
  }

  @keyframes textLoop {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
  }

  & > div {
    animation: textLoop 10s linear infinite;

    display: flex;
    align-items: center;
    padding-right: 10px;
  }
`;

export default Line;
