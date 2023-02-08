import {
  bottomButtonState,
  BottomButtonType,
  initBottomButtonState,
} from '@store/bottomButton';
import { useSetRecoilState } from 'recoil';
import { AdminBottomButtonTypeKey } from '@components/shared/layout/AdminBottomButton';
import { useEffect } from 'react';

interface useBottomButtonProps {
  type?: AdminBottomButtonTypeKey;
  firstButtonClickHandler?: () => void;
  secondButtonClickHandler?: () => void;
  isActive: boolean;
}

const useBottomButton = ({
  isActive,
  type = 'save',
  firstButtonClickHandler = () => {},
  secondButtonClickHandler = () => {},
}: useBottomButtonProps) => {
  const setButton = useSetRecoilState(bottomButtonState);

  useEffect(() => {
    setButton({
      type: type,
      firstButtonClickHandler: firstButtonClickHandler,
      firstButtonDisable: true,
      secondButtonClickHandler: secondButtonClickHandler,
      secondButtonDisable: true,
      isActive: isActive,
    });
  }, []);

  const hideButtons = () => {
    setButton(initBottomButtonState as BottomButtonType);
  };

  const setButtonDisableStatus = ({
    first,
    second = false,
  }: {
    first: boolean;
    second?: boolean;
  }) => {
    setButton((prev) => {
      return {
        ...prev,
        firstButtonDisable: first,
        secondButtonDisable: second,
      };
    });
  };

  return { setButtonDisableStatus, hideButtons };
};

export default useBottomButton;
