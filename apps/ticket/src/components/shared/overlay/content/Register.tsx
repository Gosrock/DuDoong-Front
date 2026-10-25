import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

export interface RegisterAgreements {
  marketingAgree: boolean;
}

interface RegisterProps {
  name: string;
  onMainActionClick: (agreements: RegisterAgreements) => void;
}

const Register = ({ name, onMainActionClick }: RegisterProps) => {
  const [isOver14, setIsOver14] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);

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
      <CheckList>
        <CheckRow checked={isOver14} onChange={setIsOver14}>
          [필수] 만 14세 이상입니다
        </CheckRow>
        <CheckRow
          checked={marketingAgree}
          onChange={setMarketingAgree}
          description="새 공연 소식과 이벤트 혜택을 보내드려요. 마이페이지에서 언제든 끌 수 있어요."
        >
          [선택] 이벤트·혜택 정보 수신 동의
        </CheckRow>
      </CheckList>
      <ButtonSet varient="mono" padding={[20, 24]}>
        <Button
          varient="kakao"
          onClick={() => onMainActionClick({ marketingAgree })}
          disabled={!isOver14}
          fullWidth
        >
          약관 동의하고 시작하기
        </Button>
      </ButtonSet>
    </Wrapper>
  );
};

const CheckRow = ({
  checked,
  onChange,
  description,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  children: ReactNode;
}) => (
  <CheckLabel>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div>
      <Text typo="Text_14" color="black">
        {children}
      </Text>
      {description && (
        <Text
          as="p"
          typo="P_Text_12_R"
          color="gray_400"
          css={css`
            margin-top: 2px;
          `}
        >
          {description}
        </Text>
      )}
    </div>
  </CheckLabel>
);

export default Register;

const Wrapper = styled.div``;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 24px 0;
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  input {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin: 0;
    accent-color: ${({ theme }) => theme.palette.main_500};
    cursor: pointer;
  }
`;
