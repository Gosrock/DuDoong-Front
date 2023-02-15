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
  isActive: boolean;
}

interface setButtonInfoProps {
  firstHandler: () => void;
  firstDisable: boolean;
  secondHandler?: () => void;
  secondDisable?: boolean;
}

const useBottomButton = ({ isActive, type = 'save' }: useBottomButtonProps) => {
  const setButton = useSetRecoilState(bottomButtonState);

  useEffect(() => {
    setButton({
      type: type,
      firstButtonClickHandler: () => {},
      firstButtonDisable: true,
      secondButtonClickHandler: () => {},
      secondButtonDisable: true,
      isActive: isActive,
    });
  }, []);

  const hideButtons = () => {
    setButton(initBottomButtonState as BottomButtonType);
  };

  const setButtonInfo = ({
    firstHandler,
    firstDisable,
    secondHandler = () => {},
    secondDisable = true,
  }: setButtonInfoProps) => {
    setButton((prev) => {
      return {
        ...prev,
        firstButtonClickHandler: firstHandler,
        firstButtonDisable: firstDisable,
        secondButtonClickHandler: secondHandler,
        secondButtonDisable: secondDisable,
      };
    });
  };

  const changeButtonType = (type: AdminBottomButtonTypeKey) => {
    setButton((prev) => {
      return {
        ...prev,
        type: type,
      };
    });
  };

  return { setButtonInfo, hideButtons, changeButtonType };
};

export default useBottomButton;
