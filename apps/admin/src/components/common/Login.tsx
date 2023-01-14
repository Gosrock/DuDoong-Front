import { Button, ListHeader, ButtonSet, FlexBox, Header } from '@dudoong/ui';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { AuthApi } from '@dudoong/utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const onLogin = async () => {
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.link;
  };
  const navigate = useNavigate();
  return (
    <>
      <Header rightElement={null} />
      <BottomWrapper>
        <Wrapper align={'center'} justify={'center'}>
          <ButtonWrapper>
            <ListHeader size="listHeader_20" title={'로그인이 필요해요'} />
            <ButtonSet varient="sub" padding={[20, 24]}>
              <>
                <Button onClick={() => navigate('/')}>login</Button>
                <Button varient="kakao" onClick={onLogin}>
                  카카오로 로그인하기
                </Button>
              </>
            </ButtonSet>
          </ButtonWrapper>
        </Wrapper>
      </BottomWrapper>
    </>
  );
};

export default Login;

const BottomWrapper = styled.div`
  position: fixed;
  top: 72px;
  left: 0px;
  width: 100%;
  height: calc(100%-72px);
`;

const Wrapper = styled(FlexBox)`
  position: fixed;
  top: 72px;
  left: 0px;
  width: 100%;
  height: calc(100% - 72px);
`;

const ButtonWrapper = styled.div`
  width: 300px;
`;
