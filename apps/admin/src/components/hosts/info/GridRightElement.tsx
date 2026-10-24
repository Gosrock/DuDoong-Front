import {
  ListHeader,
  Spacing,
  Input,
  FlexBox,
  Text,
  ToggleButton,
} from '@dudoong/ui';
import { formatRegistrationNumber } from '@dudoong/utils';
import { InputFormType } from '@pages/hosts/Info';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface GridRightElementProps {
  register: UseFormRegister<InputFormType>;
  watch: UseFormWatch<InputFormType>;
  setValue: UseFormSetValue<InputFormType>;
  errors: FieldErrors<InputFormType>;
}

const GridRightElement = ({
  register,
  watch,
  setValue,
  errors,
}: GridRightElementProps) => {
  const isBusiness = watch('isBusiness');

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
      <Spacing size={40} />
      <FlexBox align={'center'} justify={'space-between'}>
        <ListHeader
          title={'사업자로 판매하나요?'}
          size={'listHeader_18'}
          padding={[32, 0, 12, 0]}
          description={
            '사업자로 판매하는 호스트는 전자상거래법에 따라 판매자 정보를 구매자에게 보여드려요'
          }
        />
        <div style={{ flexShrink: 0 }}>
          <ToggleButton
            key={String(isBusiness)}
            type="button"
            aria-label="사업자로 판매"
            toggle={isBusiness}
            onToggleClick={() =>
              setValue('isBusiness', !isBusiness, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
        </div>
      </FlexBox>
      {isBusiness && (
        <>
          <Spacing size={16} />
          <FlexBox direction={'column'} align={'flex-start'} gap={24}>
            <BusinessField title={'상호'}>
              <Input
                {...register('businessName', {
                  required: '상호를 입력해주세요.',
                  validate: (v) => v.trim() !== '' || '상호를 입력해주세요.',
                })}
                placeholder={'두둥 주식회사'}
                errorMessage={errors.businessName?.message}
              />
            </BusinessField>
            <BusinessField title={'대표자명'}>
              <Input
                {...register('representativeName', {
                  required: '대표자명을 입력해주세요.',
                  validate: (v) =>
                    v.trim() !== '' || '대표자명을 입력해주세요.',
                })}
                placeholder={'홍길동'}
                errorMessage={errors.representativeName?.message}
              />
            </BusinessField>
            <BusinessField title={'사업자등록번호'}>
              <Input
                {...register('registrationNumber', {
                  required: '사업자등록번호를 입력해주세요.',
                  validate: (v) =>
                    v.replace(/\D/g, '').length === 10 ||
                    '사업자등록번호 10자리를 입력해주세요.',
                  onChange: (e) =>
                    setValue(
                      'registrationNumber',
                      formatRegistrationNumber(e.target.value),
                      { shouldValidate: true },
                    ),
                })}
                inputMode={'numeric'}
                placeholder={'000-00-00000'}
                errorMessage={errors.registrationNumber?.message}
              />
            </BusinessField>
            <BusinessField title={'사업장 주소'}>
              <Input
                {...register('businessAddress', {
                  required: '사업장 주소를 입력해주세요.',
                  validate: (v) =>
                    v.trim() !== '' || '사업장 주소를 입력해주세요.',
                })}
                placeholder={'서울특별시 마포구 ...'}
                errorMessage={errors.businessAddress?.message}
              />
            </BusinessField>
          </FlexBox>
        </>
      )}
    </div>
  );
};

const BusinessField = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div style={{ width: '100%' }}>
    <Text typo={'P_Text_16_M'} color={'gray_500'}>
      {title}{' '}
      <Text typo={'P_Text_16_M'} color={'main_500'}>
        *
      </Text>
    </Text>
    <Spacing size={8} />
    {children}
  </div>
);

export default GridRightElement;
