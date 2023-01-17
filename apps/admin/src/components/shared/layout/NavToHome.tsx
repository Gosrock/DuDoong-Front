import { ListRow } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'react-bootstrap-icons';
import styled from '@emotion/styled';

export const NavToHome = () => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate('/')}>
      <ListRow
        text={'어드민 홈'}
        textTypo={'Text_14'}
        textColor={'black'}
        leftImage={
          <ChevronLeft
            css={{ fill: 'gray_500', width: '16px', margin: '8px' }}
          />
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0px;
  bottom: 16px;
`;
