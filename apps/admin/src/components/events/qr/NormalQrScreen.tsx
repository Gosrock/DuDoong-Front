import { FlexBox, ListHeader, Spacing, Button } from '@dudoong/ui';
import { ReactComponent as Scanner } from '@assets/scanner.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import QrScanner from '@components/events/qr/QrScanner';
import { useState } from 'react';

const NormalQrScreen = ({
  setNewView,
}: {
  setNewView: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <ListHeader
        padding={[32, 0, 12, 0]}
        title={'QR 체크인'}
        size={'listHeader_24'}
        description={'카메라에 QR코드를 비추면, 체크인 가능합니다!'}
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
        <QrScanner newView={false} />
      </div>
      <Spacing size={20} />
      <FlexBox justify={'flex-end'}>
        <Button
          onClick={() => {
            setNewView((prev: boolean) => {
              return !prev;
            });
          }}
        >
          전체화면
        </Button>
      </FlexBox>
      <Spacing size={30} />
    </>
  );
};

export default NormalQrScreen;

const ScannerWrapper = styled(FlexBox)`
  position: absolute;
  margin: 75px 0px;
  width: 100%;
  z-index: 50;
`;
