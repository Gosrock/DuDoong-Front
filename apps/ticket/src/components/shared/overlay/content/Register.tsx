import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

interface RegisterProps {
  name: string;
  onMainActionClick: () => void;
}

const Register = ({ name, onMainActionClick }: RegisterProps) => {
  const [isOver14, setIsOver14] = useState(false);

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
          <a
            href="https://dudoong.com/meta/term"
            target="_blank"
            rel="noreferrer"
          >
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
          </a>
        }
      />
      <AgeCheckLabel>
        <input
          type="checkbox"
          checked={isOver14}
          onChange={(e) => setIsOver14(e.target.checked)}
        />
        <Text typo="Text_14" color="black">
          [필수] 만 14세 이상입니다
        </Text>
      </AgeCheckLabel>
      <ButtonSet varient="mono" padding={[20, 24]}>
        <Button
          varient="kakao"
          onClick={onMainActionClick}
          disabled={!isOver14}
          fullWidth
        >
          약관 동의하고 시작하기
        </Button>
      </ButtonSet>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const AgeCheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 24px 0;
  cursor: pointer;
  input {
    width: 20px;
    height: 20px;
    margin: 0;
    accent-color: ${({ theme }) => theme.palette.main_500};
    cursor: pointer;
  }
`;

export default Register;
