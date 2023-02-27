import { FlexBox, ListHeader, Spacing, Button, media } from '@dudoong/ui';
import { ReactComponent as Scanner } from '@assets/scanner.svg';
import styled from '@emotion/styled';
import QrScanner from '@components/events/qr/QrScanner';
import { ViewInfoType } from '@pages/events/Qr';

const FullQrScreen = ({
  setViewInfo,
}: {
  setViewInfo: React.Dispatch<React.SetStateAction<ViewInfoType>>;
}) => {
  return (
    <>
      <ScannerWrapper>
        <Scanner />
      </ScannerWrapper>
      <QrScanner newView={true} />
      <CustomButton
        onClick={() => {
          setViewInfo((prev: ViewInfoType) => {
            return { ...prev, fullScreen: false };
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
  ${media.mobile} {
    & > svg {
      width: 300px;
      height: 300px;
    }
    top: calc(50vh - 150px);
    left: calc(50vw - 150px);
  }
`;

const CustomButton = styled(Button)`
  z-index: 11;
  position: fixed;
  right: 40px;
  bottom: 40px;
`;
