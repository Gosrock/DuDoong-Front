import { ListRow } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import styled from '@emotion/styled';

export const NavToHome = () => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate('/')}>
      <ListRow
        padding={0}
        text={'어드민 홈'}
        textTypo={'G_Menu_14_M'}
        textColor={'gray_500'}
        leftImage={
          <ArrowLeftShort
            css={{ fill: 'gray_500', width: '24px', height: '24px' }}
          />
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 48px;
  bottom: 52px;
`;
