import { ListHeader, Spacing, Input, FlexBox } from '@dudoong/ui';
import { UpdateHostRequest } from '@lib/apis/host/hostType';
import { ChangeEvent } from 'react';

interface GridRightElementProps extends UpdateHostRequest {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GridRightElement = ({ onChange, ...props }: GridRightElementProps) => {
  return (
    <div>
      <ListHeader
        title={'간단 소개글'}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
      />
      <Input
        name="introduce"
        onChange={onChange}
        placeholder={'최대 N글자까지 쓸 수 있어요.'}
        value={props.introduce}
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
            name="contactNumber"
            onChange={onChange}
            placeholder={'011-2391-9745'}
            value={props.contactNumber}
          />
        </div>
        <div>
          <ListHeader
            title={'대표 이메일'}
            size={'listHeader_18'}
            padding={[32, 0, 12, 0]}
          />
          <Input
            name="contactEmail"
            onChange={onChange}
            placeholder={'email@aaa.bbb'}
            value={props.contactEmail}
          />
        </div>
      </FlexBox>
    </div>
  );
};
export default GridRightElement;
