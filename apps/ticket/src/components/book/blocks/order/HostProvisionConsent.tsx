import { Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useState } from 'react';

interface HostProvisionConsentProps {
  eventName: string;
  isDudoong: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const HostProvisionConsent = ({
  eventName,
  isDudoong,
  checked,
  onChange,
}: HostProvisionConsentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Row>
        <CheckLabel>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <Text typo="P_Text_14_M" color="black">
            [필수] 호스트에게 개인정보 제공 동의
          </Text>
        </CheckLabel>
        <DetailButton
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? '접기' : '자세히'}
        </DetailButton>
      </Row>
      {isOpen && (
        <Detail>
          <li>제공받는 자: 이 공연의 호스트({eventName}의 호스트)</li>
          <li>
            목적: 예매·입장 확인, 공연 변경·취소 안내, 두둥티켓 입금 확인과 환불
          </li>
          <li>
            항목: 이름, 연락처, 이메일, 예매·결제 내역, 이 공연의 추가 질문 응답
            {isDudoong && ', 입금자명·환불 계좌'}
          </li>
          <li>보유기간: 공연 종료 후 6개월 (두둥티켓 입금·환불 내역은 3년)</li>
          <li>동의하지 않으면 예매할 수 없습니다.</li>
        </Detail>
      )}
    </Wrapper>
  );
};

export default HostProvisionConsent;

const Wrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  input {
    width: 20px;
    height: 20px;
    margin: 0;
    accent-color: ${({ theme }) => theme.palette.main_500};
    cursor: pointer;
  }
`;

const DetailButton = styled.button`
  ${({ theme }) => theme.typo.P_Text_12_R}
  color: ${({ theme }) => theme.palette.gray_500};
  text-decoration: underline;
  cursor: pointer;
`;

const Detail = styled.ul`
  max-height: 30vh;
  overflow-y: auto;
  margin-top: 8px;
  padding: 12px 12px 12px 28px;
  border-radius: 8px;
  list-style: disc;
  background-color: ${({ theme }) => theme.palette.gray_100};
  ${({ theme }) => theme.typo.P_Text_12_R}
  color: ${({ theme }) => theme.palette.gray_500};
`;
