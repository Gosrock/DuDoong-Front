import { ListRow } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowBack } from '../../../asset/arrowBack.svg';
import styled from '@emotion/styled';

export const NavToHome = () => {
  const navigate = useNavigate();
  const leftImage = (
    <ImageWrapper>
      <ArrowBack />
    </ImageWrapper>
  );

  return (
    <Wrapper onClick={() => navigate('/')}>
      <ListRow
        padding={0}
        text={'어드민 홈으로'}
        textTypo={'G_Side_14_M'}
        textColor={'gray_500'}
        leftImage={leftImage}
        imageTextGap={15}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 38px;
  bottom: 50px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  & > svg > path {
    color: ${({ theme }) => theme.palette.gray_500};
  }
`;
