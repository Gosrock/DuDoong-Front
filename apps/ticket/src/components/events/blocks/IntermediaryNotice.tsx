import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

/** 통신판매중개자 고지 (전자상거래법 제20조). PC 요약과 모바일 상세에서 함께 쓴다 */
const IntermediaryNotice = (props: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <Wrapper {...props}>
      두둥은 통신판매중개자로서 공연의 당사자가 아니며, 공연의 내용과 진행은
      호스트가 책임집니다. 두둥티켓(호스트 계좌 입금) 대금의 환불도 호스트가
      직접 하며, 호스트가 공연 상세에 안내한 환불 기준이 우선합니다. 취소·환불
      규정은 &apos;판매정보&apos;와{' '}
      <a href="https://dudoong.com/meta/term" target="_blank" rel="noreferrer">
        이용약관
      </a>
      에서 확인할 수 있습니다.
    </Wrapper>
  );
};

export default IntermediaryNotice;

const Wrapper = styled.p`
  a {
    text-decoration: underline;
  }
`;
