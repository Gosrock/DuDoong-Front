import { Padding, TextArea } from '@dudoong/ui';
import { Dispatch, SetStateAction } from 'react';

interface SubjectiveProps {
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
}

const Subjective = ({ answer, setAnswer }: SubjectiveProps) => {
  return (
    <Padding>
      <TextArea
        placeholder="최대 100글자까지 쓸 수 있어요."
        onChange={(e) => setAnswer(e.target.value)}
      />
    </Padding>
  );
};
export default Subjective;
