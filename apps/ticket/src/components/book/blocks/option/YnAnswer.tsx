import { ButtonSet, SelectButton } from '@dudoong/ui';
import type { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import type { OptionResponse } from '@lib/apis/ticket/ticketType';
import { Dispatch, SetStateAction } from 'react';

interface YnAnswerProps {
  options: OptionResponse[];
  answer: AddCartOptionAnswer;
  setAnswer: Dispatch<SetStateAction<AddCartOptionAnswer>>;
}

const YnAnswer = ({ options, answer, setAnswer }: YnAnswerProps) => {
  const answerObject = (key: '예' | '아니요') =>
    options.find((option) => option.answer === key)!;

  const handleClickSelect = (key: '예' | '아니요') => {
    setAnswer(answerObject(key));
  };
  return (
    <ButtonSet varient="horizontal" padding={[0, 24]}>
      <SelectButton
        onClick={() => handleClickSelect('아니요')}
        isSelected={answer?.answer === '아니요'}
        text="아니요"
      />
      <SelectButton
        onClick={() => handleClickSelect('예')}
        isSelected={answer?.answer === '예'}
        text="예"
      />
    </ButtonSet>
  );
};

export default YnAnswer;
