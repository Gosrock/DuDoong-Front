import styled from '@emotion/styled';
import type {
  IssuedTicketInfo,
  IssuedTicketStatus,
} from '@lib/apis/order/orderType';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

const qrCode = new QRCodeStyling({
  width: 178,
  height: 178,
  margin: 0,
  type: 'svg',
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
  uuid,
  status,
}: {
  uuid: string;
  status: IssuedTicketStatus;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
    console.log(uuid);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: uuid,
    });

    if (status !== '입장 전') {
      qrCode.update({
        cornersDotOptions: { color: '#e3e4e8' },
        cornersSquareOptions: { color: '#e3e4e8' },
        dotsOptions: { color: '#e3e4e8' },
      });
    }

    return () =>
      qrCode.update({
        cornersDotOptions: { color: 'black' },
        cornersSquareOptions: { color: 'black' },
        dotsOptions: { color: 'black' },
      });
  }, [uuid, status]);

  const handleReload = () => {
    router.push(`qr?uuid=${uuid}`, 'qr');
  };

  return <div ref={ref} />;
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
