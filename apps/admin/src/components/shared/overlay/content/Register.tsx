import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface RegisterProps {
  name: string;
  onMainActionClick: () => void;
  closeOverlay?: () => void;
}

const Register = ({ name, onMainActionClick }: RegisterProps) => {
  return (
    <Wrapper>
      <ListHeader
        size="listHeader_20"
        title={
          <Text typo="Header_20" color="black">
            <span css={{ color: `${theme.palette.main_500}` }}>{name}</span>님,
            안녕하세요!
          </Text>
        }
        description={
          <Text
            css={css`
              color: ${theme.palette.gray_500};
              text-decoration: underline;
              &:hover {
                color: ${theme.palette.gray_400};
              }
            `}
            typo="Text_14"
          >
            두둥 서비스 약관
          </Text>
        }
      />
      <ButtonSet varient="mono" padding={[20, 24]}>
        <Button varient="kakao" onClick={onMainActionClick} fullWidth>
          약관 동의하고 시작하기
        </Button>
      </ButtonSet>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 390px;
`;
export default Register;
