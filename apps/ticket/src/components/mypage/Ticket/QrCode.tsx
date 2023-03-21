<<<<<<< HEAD
import styled from '@emotion/styled';
=======
>>>>>>> eef4e65b5683dec980933a1cb14c806f2bdb6c77
import type {
  IssuedTicketInfo,
  IssuedTicketStatus,
} from '@lib/apis/order/orderType';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

const qrCode = new QRCodeStyling({
  width: 178,
  height: 178,
  margin: 0,
  dotsOptions: {
    color: 'black',
    type: 'rounded',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  backgroundOptions: { color: '#ffffff' },
  imageOptions: {
    crossOrigin: 'anonymous',
  },
});

const Qrcode = ({
  ticket,
  status,
}: {
  ticket: IssuedTicketInfo;
  status: IssuedTicketStatus;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
    console.log(ticket.uuid);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: ticket.uuid,
    });
    if (status !== '입장 전') {
      qrCode.update({
        cornersDotOptions: { color: '#e3e4e8' },
        cornersSquareOptions: { color: '#e3e4e8' },
        dotsOptions: { color: '#e3e4e8' },
      });
    }
  }, [ticket]);

  const handleReload = () => {
    qrCode.update({ data: ticket.uuid });
    console.log('새로고침 정보', ticket.uuid);
  };

  return (
    <Wrapper>
      <div ref={ref} />
      <Reload onClick={handleReload}>QR 새로고침</Reload>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
`;
const Reload = styled.div`
  position: absolute;
  margin: 0 auto;
  text-align: center;
  left: 0;
  right: 0;
  bottom: -44px;

  ${({ theme }) => theme.typo.P_Text_12_M}
  color : ${({ theme }) => theme.palette.gray_400};

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export default Qrcode;
