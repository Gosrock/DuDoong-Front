import BorderBox from '@components/shared/layout/BorderBox';
import { ListHeader, Input, Spacing, Button } from '@dudoong/ui';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateHostRequest } from '@lib/apis/host/hostType';
import { HostApi } from '@lib/apis/host/HostApi';

const CreateHost = () => {
  const [info, setInfo] = useState<CreateHostRequest>({
    name: '',
    contactEmail: '',
    contactNumber: '',
  });

  const { mutate } = useMutation(HostApi.ADD_HOSTS, {});

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(info);
  };
  return (
    <>
      <BorderBox shadow={false} fullWidth={true} padding={[36, 60, 36, 60]}>
        <ListHeader
          title={'호스트를 새로 만들어볼까요?'}
          size={'listHeader_24'}
          description={
            '공연이 확정되기 전까지 바꿀 수 있으니 걱정하지 마세요. 추후 자세한 정보들을 더 작성할 수 있어요!'
          }
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
        <Input
          value={info?.name}
          width={760}
          height={48}
          onChange={(e) =>
            setInfo(
              (prev): CreateHostRequest => ({ ...prev, name: e.target.value }),
            )
          }
        />
        <ListHeader
          title={'호스트 연락처'}
          size={'listHeader_18'}
          description={
            '두둥 서비스를 이용해서 예매를 한 관객들이 연락을 하기 위한 정보에요. 중요한 정보이니 정확하게 작성 부탁드려요!'
          }
          descColor={'red_300'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <ListHeader
          title={'대표 연락처'}
          size={'listHeader_18'}
          padding={[32, 0, 12, 0]}
        ></ListHeader>
        <Input
          width={760}
          height={48}
          placeholder={'호스트의 대표 전화번호를 입력해주세요.'}
          value={info?.contactNumber}
          onChange={(e) =>
            setInfo(
              (prev): CreateHostRequest => ({
                ...prev,
                contactNumber: e.target.value,
              }),
            )
          }
        />
        <ListHeader
          title={'대표 메일'}
          size={'listHeader_18'}
          padding={[6, 0, 12, 0]}
        ></ListHeader>
        <Input
          width={760}
          height={48}
          placeholder={'ex)email@aaa.bbb'}
          value={info?.contactEmail}
          onChange={(e) =>
            setInfo(
              (prev): CreateHostRequest => ({
                ...prev,
                contactEmail: e.target.value,
              }),
            )
          }
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
