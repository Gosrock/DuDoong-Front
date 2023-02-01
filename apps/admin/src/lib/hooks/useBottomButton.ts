import {
  bottomButtonState,
  BottomButtonType,
  initBottomButtonState,
} from '@store/bottomButton';
import { useSetRecoilState } from 'recoil';

const useBottomButton = () => {
  const setButton = useSetRecoilState(bottomButtonState);
  const displayButtons = ({
    type,
    firstButtonClickHandler,
    firstButtonDisable,
    secondButtonClickHandler = () => {},
    secondButtonDisable = false,
  }: BottomButtonType) => {
    setButton({
      type,
      firstButtonClickHandler,
      firstButtonDisable,
      secondButtonClickHandler,
      secondButtonDisable,
      isActive: true,
    });
  };

  const hideButtons = () => {
    setButton(initBottomButtonState as BottomButtonType);
  };

  return { displayButtons, hideButtons };
};

export default useBottomButton;
