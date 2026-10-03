// v2 API로 만든 '수량 무제한' / '1인 매수 제한 없음' 티켓은 서버에 1,000,000 이상의 값으로 저장된다.
const UNLIMITED_TICKET_COUNT = 1_000_000;

const isUnlimitedTicketCount = (count: number) =>
  count >= UNLIMITED_TICKET_COUNT;

export { UNLIMITED_TICKET_COUNT, isUnlimitedTicketCount };
