import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

export interface RegisterAgreements {
  termsAgreed: boolean;
  marketingAgree: boolean;
}

const TERMS_URL = 'https://dudoong.com/meta/term';
const PRIVACY_URL = 'https://dudoong.com/meta/privacy';

interface RegisterProps {
  name: string;
  onMainActionClick: (agreements: RegisterAgreements) => void;
}

const Register = ({ name, onMainActionClick }: RegisterProps) => {
  const [isOver14, setIsOver14] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);
  const canStart = isOver14 && termsAgreed;

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
      />
      <CheckList>
        <CheckRow
          checked={canStart && marketingAgree}
          onChange={(checked) => {
            setIsOver14(checked);
            setTermsAgreed(checked);
            setMarketingAgree(checked);
          }}
          bold
        >
          전체 동의
        </CheckRow>
        <AllDivider />
        <CheckRow checked={isOver14} onChange={setIsOver14}>
          [필수] 만 14세 이상입니다
        </CheckRow>
        <CheckRow
          checked={termsAgreed}
          onChange={setTermsAgreed}
          viewUrl={TERMS_URL}
        >
          [필수] 서비스 이용약관 동의
        </CheckRow>
        <CheckRow
          checked={marketingAgree}
          onChange={setMarketingAgree}
          description="새 공연 소식과 이벤트 혜택을 보내드려요. 마이페이지에서 언제든 끌 수 있어요."
        >
          [선택] 이벤트·혜택 정보 수신 동의
        </CheckRow>
        <Text typo="P_Text_12_R" color="gray_400">
          가입하면{' '}
          <TextLink href={PRIVACY_URL} target="_blank" rel="noreferrer">
            개인정보 처리방침
          </TextLink>
          에 따라 정보가 처리돼요.
        </Text>
      </CheckList>
      <ButtonSet varient="mono" padding={[20, 24]}>
        <Button
          varient="kakao"
          onClick={() => onMainActionClick({ termsAgreed, marketingAgree })}
          disabled={!canStart}
          fullWidth
        >
          동의하고 시작하기
        </Button>
      </ButtonSet>
    </Wrapper>
  );
};

const CheckRow = ({
  checked,
  onChange,
  description,
  viewUrl,
  bold = false,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  viewUrl?: string;
  bold?: boolean;
  children: ReactNode;
}) => (
  <Row>
    <CheckLabel>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div>
        <Text typo={bold ? 'Text_16_SB' : 'Text_14'} color="black">
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
    {viewUrl && (
      <TextLink href={viewUrl} target="_blank" rel="noreferrer">
        <Text typo="P_Text_12_R" color="gray_400">
          보기
        </Text>
      </TextLink>
    )}
  </Row>
);

export default Register;

const Wrapper = styled.div``;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 24px 0;
`;

const AllDivider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.palette.gray_200};
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const TextLink = styled.a`
  flex-shrink: 0;
  color: inherit;
  text-decoration: underline;
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
