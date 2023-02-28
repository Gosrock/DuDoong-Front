import { FlexBox, ListHeader, Spacing, Button } from '@dudoong/ui';
import { ReactComponent as Scanner } from '@assets/scanner.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import QrScanner from '@components/events/qr/QrScanner';
import { ViewInfoType } from '@pages/events/Qr';

const WebQrScreen = ({
  setViewInfo,
}: {
  setViewInfo: React.Dispatch<React.SetStateAction<ViewInfoType>>;
}) => {
  return (
    <>
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
            setViewInfo((prev: ViewInfoType) => {
              return { ...prev, fullScreen: true };
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

export default WebQrScreen;

const ScannerWrapper = styled(FlexBox)`
  position: absolute;
  margin: 75px 0px;
  width: 100%;
  z-index: 50;
`;
