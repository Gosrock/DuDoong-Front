import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';

interface RegisterProps {
  name: string;
  payload: any;
}

const Register = ({ name, payload }: RegisterProps) => {
  const onRegister = async () => {
    console.log(payload);
  };
  return (
    <>
      <ListHeader
        size="listHeader_20"
        title={
          <Text typo="Header_20" color="black">
            `<span css={{ color: `${theme.palette.main_500}` }}>{name}</span>님,
            안녕하세요!`
          </Text>
        }
        description={
          <Text
            css={css`
              &:hover {
                text-decoration: underline;
              }
            `}
            typo="Text_16"
          >
            두둥 서비스 약관
          </Text>
        }
      />
      <ButtonSet varient="mono" padding={[20, 24]}>
        <>
          <Button varient="kakao" onClick={onRegister}>
            약관 동의하고 시작하기
          </Button>
        </>
      </ButtonSet>
    </>
  );
};

export default Register;
