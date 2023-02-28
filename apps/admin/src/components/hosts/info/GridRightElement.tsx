import { ListHeader, Spacing, Input, FlexBox } from '@dudoong/ui';
import { InputFormType } from '@pages/hosts/Info';
import { UseFormRegister } from 'react-hook-form';

interface GridRightElementProps {
  register: UseFormRegister<InputFormType>;
}

const GridRightElement = ({ register }: GridRightElementProps) => {
  return (
    <div>
      <ListHeader
        title={'간단 소개글'}
        required={true}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
      />
      <Input
        {...register('introduce', {
          required: true,
        })}
        placeholder={'최대 50글자까지 쓸 수 있어요.'}
        maxLength={50}
      />
      <Spacing size={40} />
      <FlexBox align={'center'} gap={10}>
        <div>
          <ListHeader
            title={'대표 연락처'}
            required={true}
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
            required={true}
            size={'listHeader_18'}
            padding={[32, 0, 12, 0]}
          />
          <Input
            {...register('contactEmail', {
              required: true,
              pattern: /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/,
            })}
            placeholder={'email@aaa.bbb'}
          />
        </div>
      </FlexBox>
    </div>
  );
};
export default GridRightElement;
