import { ButtonSet, SelectButton } from '@dudoong/ui';
import { Dispatch, SetStateAction } from 'react';

interface YnAnswerProps {
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
}

const YnAnswer = ({ answer, setAnswer }: YnAnswerProps) => {
  const handleClickSelect = (key: '예' | '아니요') => {
    setAnswer(key);
  };
  return (
    <ButtonSet varient="horizontal" padding={[0, 24]}>
      <SelectButton
        onClick={() => handleClickSelect('아니요')}
        isSelected={answer === '아니요'}
        text="아니요"
      />
      <SelectButton
        onClick={() => handleClickSelect('예')}
        isSelected={answer === '예'}
        text="예"
      />
    </ButtonSet>
  );
};

export default YnAnswer;
