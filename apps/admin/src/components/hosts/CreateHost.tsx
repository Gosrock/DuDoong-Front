import BorderBox from '@components/shared/layout/BorderBox';
import { ListHeader, Input, Spacing, Button } from '@dudoong/ui';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateHostRequest } from '@lib/apis/host/hostType';
import { HostApi } from '@lib/apis/host/HostApi';
import { HostContactDes, HostDescription } from './HostDescription';
import { useNavigate } from 'react-router-dom';

const CreateHost = () => {
  const [info, setInfo] = useState<CreateHostRequest>({
    name: '',
    contactEmail: '',
    contactNumber: '010',
  });
  const navigate = useNavigate();

  const { mutate } = useMutation(HostApi.ADD_HOSTS, {
    onSuccess: (data) => {
      const curId = data.hostId;
      navigate(`/hosts/${curId}/info`);
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(info);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string,
  ) => {
    let data = e.target.value;
    if (val == 'contactNumber') {
      data = data.replace(/[^0-9]/g, '');
      data = data.replace(/(\d{3})(\d{4})(\d)/, '$1-$2-$3');
    }
    setInfo((prev): CreateHostRequest => ({ ...prev, [val]: data }));
  };
  return (
    <>
      <BorderBox padding={[36, 60, 36, 60]}>
        <ListHeader
          title={'호스트를 새로 만들어볼까요?'}
          size={'listHeader_24'}
          description={HostDescription()}
          padding={[32, 0, 16, 0]}
        ></ListHeader>
        <ListHeader
          title={'호스트 이름'}
          size={'listHeader_18'}
          description={
            '한번 입력되면 수정하기 어려우니, 밴드의 이름을 정확하게 입력해주세요!'
          }
          descColor={'red_300'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <Input value={info?.name} onChange={(e) => handleChange(e, 'name')} />
        <ListHeader
          title={'호스트 연락처'}
          size={'listHeader_18'}
          description={HostContactDes()}
          descColor={'red_300'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <ListHeader
          title={'대표 연락처'}
          size={'listHeader_18'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <Input
          type="tel"
          placeholder={'호스트의 대표 전화번호를 입력해주세요.'}
          value={info?.contactNumber}
          onChange={(e) => handleChange(e, 'contactNumber')}
        />
        <ListHeader
          title={'대표 메일'}
          size={'listHeader_18'}
          padding={[6, 0, 12, 0]}
        ></ListHeader>
        <Input
          placeholder={'ex)email@aaa.bbb'}
          value={info?.contactEmail}
          onChange={(e) => handleChange(e, 'contactEmail')}
        />
      </BorderBox>
      <Spacing size={100} />
      <Button varient="primary" fullWidth={true} onClick={handleSubmit}>
        다음
      </Button>
    </>
  );
};
export default CreateHost;
