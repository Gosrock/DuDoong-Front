import { BusinessInfo, formatRegistrationNumber } from '@dudoong/utils';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

interface SellerInfoProps extends HTMLAttributes<HTMLDetailsElement> {
  businessInfo: BusinessInfo;
}

/** 사업자 호스트의 판매자 정보 (전자상거래법). PC 요약과 모바일 상세에서 함께 쓴다 */
const SellerInfo = ({ businessInfo, ...props }: SellerInfoProps) => {
  const rows: [string, string][] = [
    ['상호', businessInfo.businessName],
    ['대표자', businessInfo.representativeName],
    [
      '사업자등록번호',
      formatRegistrationNumber(businessInfo.registrationNumber),
    ],
    ['사업장 주소', businessInfo.address],
  ];

  return (
    <Wrapper {...props}>
      <summary>판매자 정보</summary>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Wrapper>
  );
};

export default SellerInfo;

const Wrapper = styled.details`
  summary {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.main_500};
  }

  dl {
    margin: 8px 0 0;
  }

  dl > div {
    display: grid;
    grid-template-columns: 112px auto;
    gap: 8px;
    margin-bottom: 4px;
  }

  dt {
    white-space: nowrap;
    color: ${({ theme }) => theme.palette.gray_400};
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.palette.gray_500};
    word-break: keep-all;
  }
`;
