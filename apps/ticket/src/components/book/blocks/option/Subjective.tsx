import { Padding, TextArea } from '@dudoong/ui';
import { AddCartOptionAnswer } from '@lib/apis/cart/cartType';
import { OptionResponse } from '@lib/apis/ticket/ticketType';
import { Dispatch, SetStateAction } from 'react';

interface SubjectiveProps {
  options: OptionResponse[];
  answer: AddCartOptionAnswer;
  setAnswer: Dispatch<SetStateAction<AddCartOptionAnswer>>;
}

const Subjective = ({ options, answer, setAnswer }: SubjectiveProps) => {
  return (
    <Padding>
      <TextArea
        maxLength={100}
        placeholder="최대 100글자까지 쓸 수 있어요."
        onChange={(e) =>
          setAnswer({ optionId: options[0].optionId, answer: e.target.value })
        }
      />
    </Padding>
  );
};
export default Subjective;
