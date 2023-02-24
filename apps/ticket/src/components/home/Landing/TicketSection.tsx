import styled from '@emotion/styled';
import DudoongTicket from '@assets/landing/dudoongTicket.svg';
import QrTicket from '@assets/landing/qrTicket.svg';
import AdminTicket from '@assets/landing/adminTicket.svg';
import { media } from '@dudoong/ui';
import Line from './Line';

const TicketSection = () => {
  return (
    <>
      <Dudoong>
        <p>ONLY DUDOONG</p>
        <h3>수수료 ZERO 두둥티켓</h3>
        <p>
          두둥 티켓은 수수료 없이 온라인으로 입금 받고
          <br />
          이벤트 관리에서 주문을 승인해 티켓을 발급하는 두둥만의 서비스에요!
        </p>
        <DudoongTicket width={562} />
      </Dudoong>
      <Tickets>
        <div>
          <div>
            <h3>QR 티켓 입장</h3>
            <p>
              두둥에서 발매한 티켓은 QR코드로
              <br />
              쉽게 관리할 수 있어요
            </p>
          </div>

          <QrTicket />
        </div>
        <div>
          <div>
            <h3>손쉬운 티켓관리</h3>
            <p>
              두둥 관리시스템이 티켓 관리,
              <br />
              정산을 더욱 빠르게 도와줘요
            </p>
          </div>
          <AdminTicket />
        </div>
      </Tickets>
      <MobileLine />
    </>
  );
};

const Dudoong = styled.div`
  text-align: center;
  p:first-of-type {
    margin-top: 140px;
    font-size: 24px;
    font-family: 'Gmarket Sans';
    font-weight: 700;
    color: ${({ theme }) => theme.palette.main_500};
  }
  h3 {
    font-size: 40px;
    font-family: 'Gmarket Sans';
    font-weight: 700;
    line-height: 1.2;
    margin-top: 16px;
  }
  p:last-of-type {
    margin-top: 20px;
    font-size: 20px;
    font-family: 'Pretendard';
    font-weight: 500;
    line-height: 1.5;
    color: ${({ theme }) => theme.palette.black};
  }

  svg {
    margin-top: 72px;
  }

  ${media.mobile} {
    p:first-of-type {
      font-size: 14px;
    }
    h3 {
      font-size: 24px;
    }
    p:last-of-type {
      font-size: 12px;
      margin-top: 21px;
    }

    svg {
      margin-top: 48px;
      width: calc(100% - 92px);
      padding-left: 12px;
    }
  }
`;

const Tickets = styled.div`
  display: flex;
  max-width: 796px;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 116px;
  padding: 0 28px;
  ${media.mobile} {
    flex-direction: column;
    gap: 64px;
  }
  & > div {
    display: flex;
    flex-direction: column-reverse;
    width: 316px;
    & > div {
      min-width: 192px;
    }
    h3 {
      font-size: 40px;
      font-family: 'Gmarket Sans';
      font-weight: 700;
      line-height: 1.2;
      margin-top: 18px;
    }
    p {
      margin-top: 20px;
      font-size: 20px;
      font-family: 'Pretendard';
      font-weight: 500;
      line-height: 1.5;
      color: ${({ theme }) => theme.palette.black};
    }
    ${media.mobile} {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 18px;
      }
      p {
        font-size: 14px;
        color: ${({ theme }) => theme.palette.gray_400};
      }
      svg {
        max-width: 300px;
      }
    }
  }
`;

const MobileLine = styled(Line)`
  margin-top: 104px;
  ${media.pc} {
    display: none;
  }
`;

export default TicketSection;
