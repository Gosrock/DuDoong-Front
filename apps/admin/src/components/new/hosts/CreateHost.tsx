import {
  ListHeader,
  Input,
  Spacing,
  Button,
  FlexBox,
  BorderBox,
} from '@dudoong/ui';
import { useMutation } from '@tanstack/react-query';
import type { CreateHostRequest } from '@lib/apis/host/hostType';
import { HostContactDes } from '@components/new/hosts/HostDescription';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInputs } from '@dudoong/utils';
import HostApi from '@lib/apis/host/HostApi';
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const CreateHost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch, setValue, formState } = useForm({
    mode: 'onChange',
  });
  const [disabled, setDisabled] = useState<boolean>(true);

  const [form, onChange] = useInputs<CreateHostRequest>({
    name: '',
    contactEmail: '',
    contactNumber: '',
  });

  const returnUrl = location.state ? location.state.returnUrl : null;
  const { mutate } = useMutation(HostApi.ADD_HOSTS, {
    onSuccess: (data) => {
      const curId = data.hostId;
      if (returnUrl) {
        navigate(returnUrl, {
          state: {
            hostId: curId,
          },
        });
      } else {
        navigate(`/hosts/${curId}/info`);
      }
    },
  });

  useEffect(() => {
    formState.isValid ? setDisabled(false) : setDisabled(true);
  }, [formState.isValid]);

  useEffect(() => {
    if (watch('contactNumber').length === 10) {
      setValue(
        'contactNumber',
        watch('contactNumber').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      );
    }
    if (watch('contactNumber').length === 13) {
      setValue(
        'contactNumber',
        watch('contactNumber')
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [watch('contactNumber')]);

  const onSubmit = (data: any) => {
    console.log(form);
    mutate(form);
  };

  const onError = (error: any) => {
    console.log('error', error);
  };

  return (
    <div onSubmit={handleSubmit(onSubmit, onError)}>
      <BorderBox padding={[36, 60, 52, 60]}>
        <ListHeader
          title={'호스트 이름'}
          size={'listHeader_18'}
          description={
            '저장 후에는 수정하실 수 없어요. 호스트의 이름을 정확하게 입력해주세요!'
          }
          descColor={'red_300'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <Input
          autoFocus
          placeholder="최대 15자까지 쓸 수 있어요."
          {...register('name', {
            required: true,
            maxLength: {
              value: 15,
              message: '*15글자를 초과하였습니다.',
            },
          })}
        />
        <Spacing size={14} />
        <ListHeader
          title={'호스트 연락처'}
          size={'listHeader_18'}
          description={<HostContactDes />}
          descColor={'red_300'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <FlexBox align={'center'} gap={32}>
          <div
            css={css`
              width: 100%;
            `}
          >
            <ListHeader
              title={'대표 전화번호'}
              size={'listHeader_18'}
              padding={[32, 0, 12, 0]}
            ></ListHeader>
            <Input
              placeholder={'010-XXXX-XXXX'}
              {...register('contactNumber', {
                required: true,

                maxLength: {
                  value: 15,
                  message: '*15글자를 초과하였습니다.',
                },
                pattern: /[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}/,
              })}
            />
          </div>
          <div
            css={css`
              width: 100%;
            `}
          >
            <ListHeader
              title={'대표 이메일'}
              size={'listHeader_18'}
              padding={[32, 0, 12, 0]}
            ></ListHeader>
            <Input
              placeholder={'ex)email@aaa.bbb'}
              {...register('contactEmail', {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: '*이메일 형식이 아닙니다',
                },
              })}
            />
          </div>
        </FlexBox>
      </BorderBox>
      <Spacing size={100} />
      <Button
        varient="primary"
        fullWidth={true}
        disabled={disabled}
        onClick={handleSubmit(onSubmit, onError)}
      >
        호스트 만들기
      </Button>
    </div>
  );
};
export default CreateHost;
