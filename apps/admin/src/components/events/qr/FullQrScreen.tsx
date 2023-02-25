import { FlexBox, ListHeader, Spacing, Button } from '@dudoong/ui';
import { ReactComponent as Scanner } from '@assets/scanner.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import QrScanner from '@components/events/qr/QrScanner';

const FullQrScreen = ({
  setNewView,
}: {
  setNewView: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <ScannerWrapper>
        <Scanner />
      </ScannerWrapper>
      <QrScanner newView={true} />
      <CustomButton
        onClick={() => {
          setNewView((prev: boolean) => {
            return !prev;
          });
        }}
      >
        돌아가기
      </CustomButton>
    </>
  );
};

export default FullQrScreen;

const ScannerWrapper = styled(FlexBox)`
  position: fixed;
  top: calc(50vh - 225px);
  left: calc(50vw - 225px);
  z-index: 11;
`;

const CustomButton = styled(Button)`
  z-index: 11;
  position: fixed;
  right: 40px;
  bottom: 40px;
`;
