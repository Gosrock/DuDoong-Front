import { ListHeader, Spacing, Input, FlexBox } from '@dudoong/ui';
import { InputFormType } from '@pages/hosts/Info';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface GridRightElementProps {
  register: UseFormRegister<InputFormType>;
}

const GridRightElement = ({ register }: GridRightElementProps) => {
  return (
    <div>
      <ListHeader
        title={'간단 소개글'}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
      />
      <Input
        {...register('introduce', {
          required: true,
        })}
        placeholder={'최대 N글자까지 쓸 수 있어요.'}
      />
      <Spacing size={40} />
      <FlexBox align={'center'} gap={10}>
        <div>
          <ListHeader
            title={'대표 연락처'}
            size={'listHeader_18'}
            padding={[32, 0, 12, 0]}
          />
          <Input
            {...register('contactNumber', {
              required: true,
              pattern: /^\d{3}-\d{3,4}-\d{4}$/,
            })}
            placeholder={'011-2391-9745'}
          />
        </div>
        <div>
          <ListHeader
            title={'대표 이메일'}
            size={'listHeader_18'}
            padding={[32, 0, 12, 0]}
          />
          <Input
            {...register('contactEmail', {
              required: true,
              pattern:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            })}
            placeholder={'email@aaa.bbb'}
          />
        </div>
      </FlexBox>
    </div>
  );
};
export default GridRightElement;
