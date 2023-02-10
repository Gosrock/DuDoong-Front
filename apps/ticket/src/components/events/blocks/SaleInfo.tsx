import styled from '@emotion/styled';

const SaleInfo = () => {
  return (
    <Wrapper>
      <h4>두둥 서비스 티켓 종류 안내</h4>
      <ul>
        <li>
          공연 관리자 승인 방식 무료 티켓
          <br />
          주문 시 호스트 관리자의 승인을 통해 티켓을 발급 받으실 수 있습니다.
          승인 요청과 , 관리자 승인시 안내 메일을 보내드립니다.
        </li>
        <li>
          선착순 방식 무료 티켓
          <br />
          주문 시 결제 없이 선착순으로 티켓을 발급 받으 실 수 있습니다.
        </li>
        <li>
          두둥 티켓
          <br />
          예매시에 공연 관리자가 안내하는 입금계좌로 입금하시고, 공연 관리자의
          입금 확인을 통해 티켓을 발급 받으 실 수 있습니다. 공연 관리자가 입금을
          확인해야 하므로 티켓 발급까지 시간이 걸릴 수 있습니다. 티켓 발급시
          안내메일을 보내 드립니다.
        </li>
        <li>
          유료 티켓
          <br />
          두둥 서비스에서 제공하는 결제 방식으로 , 결제 성공 시 바로 티켓을
          발급해 드립니다.
        </li>
      </ul>
      <h4>티켓 수령 안내</h4>
      <p>
        두둥 서비스를 통해 티켓을 예매하면 주문 완료또는 승인 시, 서비스 내에서
        조회가능한 QR코드 형태로 티켓이 발급됩니다.
        <br />
        해당 티켓의 QR코드는 마이페이지/내 예매내역에서 조회가능합니다.
        <br />
        공연 입장시 빠른 입장을 위해 QR코드를 미리 준비해 주세요
      </p>
    </Wrapper>
  );
};

export default SaleInfo;

const Wrapper = styled.div`
  h4 {
    ${({ theme }) => theme.typo.P_Text_16_SB}
  }
  ul,
  p {
    margin-top: 8px;
    margin-bottom: 24px;
    list-style: disc;
    padding-left: 20px;
    ${({ theme }) => theme.typo.P_Text_14_M}
    color :${({ theme }) => theme.palette.gray_400};
  }
`;
