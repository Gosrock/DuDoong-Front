import { FlexBox, Spacing, Text } from '@dudoong/ui';
import { CheckLg } from '@dudoong/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const listOption = [
  '공연 기본 정보',
  '공연 이미지 / 상세 정보 작성',
  '하나 이상의 티켓 생성',
];

const ListContents = ({ check }: { check: boolean[] }) => {
  return (
    <>
      {listOption.map((option, index) => {
        console.log(option, check[index] ? 1 : 0);
        return (
          <div key={index}>
            <Spacing size={10} />
            <ListContent text={option} ischecked={check[index] ? 1 : 0} />
          </div>
        );
      })}
    </>
  );
};

export default ListContents;

const ListContent = ({
  text,
  ischecked,
}: {
  text: string;
  ischecked: number;
}) => {
  return (
    <FlexBox align={'center'} justify={'start'} gap={16}>
      <CheckMarker ischecked={ischecked} />
      <Text typo={'P_Text_16_M'} color={'gray_500'}>
        {text}
      </Text>
    </FlexBox>
  );
};

const CheckMarker = ({ ischecked }: { ischecked: number }) => {
  console.log(ischecked);
  return (
    <MarkerContainer align={'center'} ischecked={ischecked}>
      <CheckLg />
    </MarkerContainer>
  );
};

interface MarkerContainerProps {
  ischecked: number;
}

const MarkerContainer = styled(FlexBox)<MarkerContainerProps>`
  width: 20px;
  height: 20px;
  background-color: ${({ ischecked, theme }) =>
    ischecked ? theme.palette.point_mint : theme.palette.gray_300};
  border-radius: 10px;
  box-sizing: border-box;

  ${({ ischecked, theme }) =>
    ischecked &&
    css`
      border: 1px ${theme.palette.black} solid;
    `};

  & > svg {
    width: 10px;
  }

  & > svg > path {
    color: ${({ ischecked, theme }) =>
      ischecked ? theme.palette.black : theme.palette.white};
  }
`;
