import {
  Spacing,
  ListHeader,
  FlexBox,
  Text,
  Input,
  SelectButton,
} from '@dudoong/ui';
import ContentGrid from '@components/shared/layout/ContentGrid';
import OptionPreview from '@components/events/options/create/OptionPreview';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useForm } from 'react-hook-form';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import OptionApi from '@lib/apis/option/OptionApi';
import { OptionGroupType } from '@lib/apis/option/optionType';
import { Controller } from 'react-hook-form';

const NewOptions = () => {
  const navigate = useNavigate();
  const [optionType, setOptionType] = useState<OptionGroupType>();
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const [optionName, setOptionName] = useState<string>('');
  const [optionDescrip, setOptionDescrip] = useState<string>('');
  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onChange',
  });
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const { setButtonInfo, hideButtons } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  //티켓 생성 api
  const postOptionCreationMutation = useMutation(OptionApi.POST_OPTION, {
    onSuccess: (data) => {
      console.log('POST_OPTION: ', data);
      openOverlay({
        content: 'saveOption',
        props: {
          saveOptionHandler: () => {
            navigate(`/events/${eventId}/options`);
            closeOverlay();
            hideButtons();
          },
        },
      });
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    postOptionCreationMutation.mutate({
      eventId: eventId,
      payload: {
        ...data,
      },
    });
  };

  const onError = (error: any) => {
    console.log('error', error);
  };

  //제출 버튼 상태 조절
  useEffect(() => {
    formState.isValid
      ? setButtonInfo({
          firstDisable: false,
          firstHandler: handleSubmit(onSubmit, onError),
        })
      : setButtonInfo({
          firstDisable: true,
          firstHandler: () => {},
        });
  }, [formState.isValid]);

  return (
    <div onSubmit={handleSubmit(onSubmit, onError)}>
      <Spacing size={32} />
      <ListHeader
        padding={0}
        size="listHeader_24"
        title="새 옵션 만들기"
        description={
          <FlexBox direction="column" align="flex-start">
            <Text typo="P_Text_16_M" color="gray_400">
              티켓에 옵션을 부여해 설문을 받거나
            </Text>
            <Text typo="P_Text_16_M" color="gray_400">
              부가 상품을 추가할 수 있어요.
            </Text>
          </FlexBox>
        }
      />
      <Spacing size={32} />
      <ContentGrid>
        <FlexBox direction="column" align="flex-start">
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'옵션 이름'}
            size={'listHeader_18'}
          />
          <Input
            value={optionName}
            disabled={false}
            maxLength={20}
            placeholder="최대 20글자까지 쓸 수 있어요"
            {...register('name', {
              required: true,
              maxLength: {
                value: 20,
                message: '20글자를 초과하였습니다.',
              },
              onChange: (e) => setOptionName(e.target.value),
            })}
          />
          <Spacing size={32} />
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'옵션 설명'}
            description={'옵션에 대한 상세한 설명을 써주세요'}
            size={'listHeader_18'}
          />
          <Input
            disabled={false}
            maxLength={50}
            value={optionDescrip}
            placeholder="최대 50글자까지 쓸 수 있어요"
            {...register('description', {
              required: true,
              maxLength: {
                value: 50,
                message: '50글자를 초과하였습니다.',
              },
              onChange: (e) => setOptionDescrip(e.target.value),
            })}
          />
          <Spacing size={32} />
          <ListHeader
            padding={[32, 0, 12, 0]}
            title={'옵션 응답 형식'}
            size={'listHeader_18'}
          />
          <Controller
            rules={{ required: true }}
            control={control}
            name="type"
            render={({ field: { onChange } }) => (
              <FlexBox gap={10}>
                <SelectButton
                  text={'주관식'}
                  fullWidth={false}
                  isSelected={optionType === '주관식'}
                  onClick={() => {
                    setOptionType('주관식');
                    onChange('주관식');
                  }}
                />
                <SelectButton
                  text={'Y/N'}
                  fullWidth={false}
                  isSelected={optionType === 'Y/N'}
                  onClick={() => {
                    setOptionType('Y/N');
                    onChange('Y/N');
                  }}
                />
              </FlexBox>
            )}
          />
          <Spacing size={32} />
          <div>
            {optionType === 'Y/N' ? (
              <>
                <ListHeader
                  padding={[32, 0, 12, 0]}
                  title={`'네' 응답에 가격 인상하기`}
                  description={
                    '옵션에 따른 추가금액이 있다면 옵션의 가격을 추가해주세요.'
                  }
                  size={'listHeader_18'}
                />
                <Input
                  type="number"
                  disabled={optionType === 'Y/N' ? false : true}
                  maxLength={5}
                  placeholder="0"
                  {...register('additionalPrice', {
                    required: false,
                    valueAsNumber: true,
                    value: 0,
                  })}
                />
              </>
            ) : (
              <div
                {...register('additionalPrice', {
                  required: false,
                  valueAsNumber: true,
                  value: 0,
                })}
              ></div>
            )}
          </div>
        </FlexBox>
        <OptionPreview
          name={optionName}
          description={optionDescrip}
          type={optionType}
        />
      </ContentGrid>
    </div>
  );
};
export default NewOptions;
