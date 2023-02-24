import { Button, FlexBox, ListHeader, Spacing, Text } from '@dudoong/ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { ReactComponent as Scanner } from '@assets/scanner.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Qr = () => {
  const handleScan = (result: any, error: any) => {
    // console.log(result, error);
  };
  return (
    <>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'QR 체크인'}
        size={'listHeader_24'}
        description={'체크인에 활용할 카메라를 선택해주세요!'}
      />
      <Spacing size={15} />
      <div
        css={css`
          position: relative;
        `}
      >
        <ScannerWrapper>
          <Scanner />
        </ScannerWrapper>
        <QrReader
          scanDelay={500}
          onResult={handleScan}
          constraints={{ facingMode: 'user' }}
          videoStyle={{
            backgroundSize: 'cover',
          }}
          containerStyle={{
            borderRadius: '12px',
            boxShadow: '3px 4px 7px rgba(0, 0, 0, 0.15)',
            border: ` 1px solid #000`,
          }}
          videoContainerStyle={{
            width: '100%',
            height: '600px',
            padding: '0',
            margin: '0',
          }}
        />
      </div>
      <Spacing size={30} />
    </>
  );
};
export default Qr;

const ScannerWrapper = styled(FlexBox)`
  /* position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0; */
  /* transition: all 200ms ease-in; */
  /* background-color: #000; */
  position: absolute;
  /* bottom: 525px; */
  /* float: left; */
  margin: 75px 0px;
  width: 100%;
  z-index: 100;
  /* margin: auto; */
`;
