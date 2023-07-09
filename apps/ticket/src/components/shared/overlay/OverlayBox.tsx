import { Modal } from '@dudoong/ui';
import { useResponsive } from '@dudoong/utils';
import { css } from '@emotion/react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { OverlayBoxProps } from './GlobalOverlay';

const OverlayBox = ({ open, onDismiss, children }: OverlayBoxProps) => {
  const { isPC } = useResponsive();

  return (
    <>
      {isPC ? (
        <Modal
          open={open}
          onDismiss={onDismiss}
          css={css`
            width: 375px;
          `}
        >
          {children}
        </Modal>
      ) : (
        <BottomSheet
          open={open}
          onDismiss={onDismiss}
          snapPoints={({ minHeight }) => minHeight}
          css={css`
            & > div > * {
              // 스크롤바 생기는 현상 잡기
              overflow: hidden;
              &::-webkit-scrollbar {
                display: none;
              }
            }
          `}
        >
          {children}
        </BottomSheet>
      )}
    </>
  );
};

export default OverlayBox;
