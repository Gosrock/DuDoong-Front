import styled from '@emotion/styled';
import Star2 from '@assets/landing/star2.svg';
import { media } from '@dudoong/ui';

const Line = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <LineContainer>
        <span>DUDOONG YOUR CONCERT LIFE</span>
        <Star2 />
        <span>DUDOONG YOUR CONCERT LIFE</span>
        <Star2 />
        <span>DUDOONG YOUR CONCERT LIFE</span>
        <Star2 />
        <span>DUDOONG YOUR CONCERT LIFE</span>
        <Star2 />
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

  font-family: 'jost';
  font-style: italic;
  font-size: 33px;
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
  width: 3000px;
  position: absolute;
  left: -330px;
  display: flex;
  gap: 12px;
  align-items: center;
  svg {
    width: 46px;
  }

  ${media.mobile} {
    left: 12px;
    svg {
      gap: 6px;
      width: 36px;
    }
  }
`;

export default Line;
